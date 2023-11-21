package resolvers

import (
	"context"
	"fmt"
	"strings"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/email"
	"github.com/cmsgov/mint-app/pkg/shared/oddmail"
	"github.com/cmsgov/mint-app/pkg/storage/loaders"

	"github.com/cmsgov/mint-app/pkg/graph/model"
	"github.com/cmsgov/mint-app/pkg/userhelpers"

	"github.com/cmsgov/mint-app/pkg/authentication"
	"github.com/cmsgov/mint-app/pkg/constants"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/storage"
)

// ModelPlanCreate implements resolver logic to create a model plan
// TODO Revist this function, as we probably want to add all of these DB entries inthe scope of a single SQL transaction
// so that we can roll back if there is an error with any of these calls.
func ModelPlanCreate(
	ctx context.Context,
	logger *zap.Logger,
	emailService oddmail.EmailService,
	emailTemplateService email.TemplateService,
	addressBook email.AddressBook,
	modelName string,
	store *storage.Store,
	principal authentication.Principal,
	getAccountInformation userhelpers.GetAccountInfoFunc,
) (*models.ModelPlan, error) {
	// Create DB entities in a transaction
	newPlan, err := storage.WithTransaction[models.ModelPlan](store, func(tx *sqlx.Tx) (*models.ModelPlan, error) {
		plan := models.NewModelPlan(principal.Account().ID, modelName)

		err := BaseStructPreCreate(logger, plan, principal, store, false) //We don't check access here, because the user can't yet be a collaborator. Collaborators are created after ModelPlan initiation.
		if err != nil {
			return nil, err
		}

		createdPlan, err := store.ModelPlanCreate(logger, plan)
		if err != nil {
			return nil, err
		}

		userAccount := principal.Account()
		_, _, err = CreatePlanCollaborator(
			ctx,
			logger,
			nil,
			nil,
			email.AddressBook{},
			&model.PlanCollaboratorCreateInput{
				ModelPlanID: plan.ID,
				UserName:    *userAccount.Username,
				TeamRoles:   []models.TeamRole{models.TeamRoleModelLead},
			},
			principal,
			store,
			false,
			getAccountInformation,
		)
		if err != nil {
			return nil, err
		}

		baseTaskListUser := models.NewBaseTaskListSection(userAccount.ID, createdPlan.ID)

		// Create a default plan basics object
		basics := models.NewPlanBasics(baseTaskListUser)

		_, err = store.PlanBasicsCreate(logger, basics)
		if err != nil {
			return nil, err
		}

		// Create a default plan general characteristics object
		generalCharacteristics := models.NewPlanGeneralCharacteristics(baseTaskListUser)

		_, err = store.PlanGeneralCharacteristicsCreate(logger, generalCharacteristics)
		if err != nil {
			return nil, err
		}
		// Create a default Plan Beneficiares object
		beneficiaries := models.NewPlanBeneficiaries(baseTaskListUser)

		_, err = store.PlanBeneficiariesCreate(logger, beneficiaries)
		if err != nil {
			return nil, err
		}
		//Create a default Plan Participants and Providers object
		participantsAndProviders := models.NewPlanParticipantsAndProviders(baseTaskListUser)

		_, err = store.PlanParticipantsAndProvidersCreate(logger, participantsAndProviders)
		if err != nil {
			return nil, err
		}

		//Create default Plan OpsEvalAndLearning object
		opsEvalAndLearning := models.NewPlanOpsEvalAndLearning(baseTaskListUser)

		_, err = store.PlanOpsEvalAndLearningCreate(logger, opsEvalAndLearning)
		if err != nil {
			return nil, err
		}

		//Create default PlanPayments object
		planPayments := models.NewPlanPayments(baseTaskListUser)

		_, err = store.PlanPaymentsCreate(logger, planPayments)
		if err != nil {
			return nil, err
		}

		//Create default Operational Needs
		_, err = store.OperationalNeedInsertAllPossible(logger, createdPlan.ID, principal.Account().ID)
		if err != nil {
			return nil, err
		}

		return createdPlan, nil
	})

	// If error occurred in DB transcation, it will be rolled back, but we should return an error in the resolver
	if err != nil {
		return nil, err
	}

	// DB transcation was a success, so we can send the email
	if emailService != nil && emailTemplateService != nil {
		go func() {
			sendEmailErr := sendModelPlanCreatedEmail(
				ctx,
				emailService,
				emailTemplateService,
				addressBook,
				addressBook.MINTTeamEmail,
				newPlan,
			)
			if sendEmailErr != nil {
				logger.Error("failed to send model plan created email to dev team", zap.String(
					"createdPlanID",
					newPlan.ID.String(),
				), zap.Error(sendEmailErr))
			}
		}()
	}

	return newPlan, err
}

func sendModelPlanCreatedEmail(
	ctx context.Context,
	emailService oddmail.EmailService,
	emailTemplateService email.TemplateService,
	addressBook email.AddressBook,
	receiverEmail string,
	modelPlan *models.ModelPlan,
) error {
	emailTemplate, err := emailTemplateService.GetEmailTemplate(email.ModelPlanCreatedTemplateName)
	if err != nil {
		return err
	}

	emailSubject, err := emailTemplate.GetExecutedSubject(email.ModelPlanCreatedSubjectContent{
		ModelName: modelPlan.ModelName,
	})
	if err != nil {
		return err
	}

	emailBody, err := emailTemplate.GetExecutedBody(email.ModelPlanCreatedBodyContent{
		ClientAddress: emailService.GetConfig().GetClientAddress(),
		ModelName:     modelPlan.ModelName,
		ModelID:       modelPlan.GetModelPlanID().String(),
		UserName:      modelPlan.CreatedByUserAccount(ctx).CommonName,
	})
	if err != nil {
		return err
	}

	err = emailService.Send(addressBook.DefaultSender, []string{receiverEmail}, nil, emailSubject, "text/html", emailBody)
	if err != nil {
		return err
	}
	return nil
}

// ModelPlanUpdate implements resolver logic to update a model plan
func ModelPlanUpdate(logger *zap.Logger, id uuid.UUID, changes map[string]interface{}, principal authentication.Principal, store *storage.Store) (*models.ModelPlan, error) {
	// Get existing plan
	existingPlan, err := store.ModelPlanGetByID(logger, id)
	if err != nil {
		return nil, err
	}

	err = BaseStructPreUpdate(logger, existingPlan, changes, principal, store, true, true)
	if err != nil {
		return nil, err
	}

	retPlan, err := store.ModelPlanUpdate(logger, existingPlan)
	if err != nil {
		return nil, err
	}
	return retPlan, err

}

// ModelPlanGetByID implements resolver logic to get a model plan by its ID
func ModelPlanGetByID(logger *zap.Logger, id uuid.UUID, store *storage.Store) (*models.ModelPlan, error) {
	plan, err := store.ModelPlanGetByID(logger, id)
	if err != nil {
		return nil, err
	}

	return plan, nil
}

// ModelPlanGetByIDLOADER implements resolver logic to get Model Plan by a model plan ID using a data loader
func ModelPlanGetByIDLOADER(ctx context.Context, id uuid.UUID) (*models.ModelPlan, error) {
	allLoaders := loaders.Loaders(ctx)
	planLoader := allLoaders.ModelPlanLoader
	key := loaders.NewKeyArgs()
	key.Args["id"] = id

	thunk := planLoader.Loader.Load(ctx, key)
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result.(*models.ModelPlan), nil
}

// ModelPlanGetSampleModel returns the sample model plan
func ModelPlanGetSampleModel(logger *zap.Logger, store *storage.Store) (*models.ModelPlan, error) {
	plan, err := store.ModelPlanGetByName(logger, constants.SampleModelName)
	if err != nil {
		return nil, err
	}

	return plan, nil
}

// ModelPlanCollection implements resolver logic to get a list of model plans by who's a collaborator on them (TODO)
func ModelPlanCollection(logger *zap.Logger, principal authentication.Principal, store *storage.Store, filter model.ModelPlanFilter) ([]*models.ModelPlan, error) {
	var modelPlans []*models.ModelPlan
	var err error
	switch filter {
	case model.ModelPlanFilterIncludeAll:
		modelPlans, err = store.ModelPlanCollection(logger, false)
	case model.ModelPlanFilterCollabOnly:
		modelPlans, err = store.ModelPlanCollectionCollaboratorOnly(logger, false, principal.Account().ID)
	case model.ModelPlanFilterWithCrTdls:
		modelPlans, err = store.ModelPlanCollectionWithCRTDLS(logger, false)
	default:
		modelPlans = nil
		err = fmt.Errorf("model plan filter not defined for filter: %s", filter)
	}

	return modelPlans, err
}

// ModelPlanNameHistory returns a slice of AuditChanges, with the only values returned being the model_name field
func ModelPlanNameHistory(logger *zap.Logger, modelPlanID uuid.UUID, sortDir models.SortDirection, store *storage.Store) ([]string, error) {
	fieldName := "model_name"

	changes, err := store.AuditChangeCollectionByIDAndTableAndField(logger, "model_plan", modelPlanID, fieldName, sortDir)
	nameHistory := make([]string, len(changes)) // more efficient than appending
	for i := 0; i < len(changes); i++ {

		nameField := changes[i].Fields[fieldName]
		name := fmt.Sprintf("%s", nameField.New)

		nameHistory[i] = name

	}
	if err != nil {
		return nil, err
	}

	return nameHistory, nil
}

// ModelPlanShare implements resolver logic to share a model plan with a list of emails
func ModelPlanShare(
	ctx context.Context,
	logger *zap.Logger,
	store *storage.Store,
	principal authentication.Principal,
	emailService oddmail.EmailService,
	emailTemplateService email.TemplateService,
	addressBook email.AddressBook,
	modelPlanID uuid.UUID,
	viewFilter *models.ModelViewFilter,
	usernames []string,
	optionalMessage *string,
	getAccountInformation userhelpers.GetAccountInfoFunc,
) (bool, error) {
	modelPlan, err := store.ModelPlanGetByID(logger, modelPlanID)
	if err != nil {
		return false, err
	}

	planBasics, err := PlanBasicsGetByModelPlanIDLOADER(ctx, modelPlanID)
	if err != nil {
		return false, err
	}

	receiverEmails := make([]string, len(usernames))

	for i, username := range usernames {
		collabAccount, err := userhelpers.GetOrCreateUserAccount(
			ctx,
			store,
			username,
			false,
			false,
			getAccountInformation,
		)
		if err != nil {
			return false, fmt.Errorf("failed to get or create user account: %w", err)
		}

		receiverEmails[i] = collabAccount.Email
	}

	// Get client address
	clientAddress := emailService.GetConfig().GetClientAddress()

	// Get email template
	emailTemplate, err := emailTemplateService.GetEmailTemplate(email.ModelPlanShareTemplateName)
	if err != nil {
		return false, fmt.Errorf("failed to get email template: %w", err)
	}

	// Get email subject
	emailSubject, err := emailTemplate.GetExecutedSubject(email.ModelPlanShareSubjectContent{
		UserName: principal.Account().CommonName,
	})
	if err != nil {
		return false, fmt.Errorf("failed to execute email subject: %w", err)
	}

	var modelPlanCategoriesHumainzed []string
	if planBasics.ModelCategory != nil {
		modelPlanCategoriesHumainzed = append(modelPlanCategoriesHumainzed, models.ModelCategoryHumanized[*planBasics.ModelCategory])
	}

	for _, category := range planBasics.AdditionalModelCategories {
		// Have to cast the additional category as a models.ModelCategory so we can fetch it from the models.ModelCategoryHumanized map
		modelPlanCategoriesHumainzed = append(modelPlanCategoriesHumainzed, models.ModelCategoryHumanized[models.ModelCategory(category)])
	}

	lastModified := modelPlan.CreatedDts
	if modelPlan.ModifiedDts != nil {
		lastModified = *modelPlan.ModifiedDts
	}

	planCollaborators, err := PlanCollaboratorGetByModelPlanIDLOADER(ctx, modelPlanID)
	if err != nil {
		return false, fmt.Errorf("failed to get plan collaborators: %w", err)
	}

	var modelLeads []string
	for _, collaborator := range planCollaborators {
		for _, role := range collaborator.TeamRoles {
			if role == string(models.TeamRoleModelLead) {
				modelLeads = append(modelLeads, collaborator.UserAccount(ctx).CommonName)
				break
			}
		}
	}

	humanizedModelStatus := models.ModelStatusHumanized[modelPlan.Status]

	var humanizedViewFilter *string
	var lowercasedViewFilter *string
	if viewFilter != nil {
		humanizedViewFilter = models.StringPointer(
			models.ModelViewFilterHumanized[*viewFilter])

		lowercasedViewFilter = models.StringPointer(
			strings.ToLower(string(*viewFilter)))
	}

	// Get email body
	emailBody, err := emailTemplate.GetExecutedBody(email.ModelPlanShareBodyContent{
		UserName:                 principal.Account().CommonName,
		OptionalMessage:          optionalMessage,
		ModelName:                modelPlan.ModelName,
		ModelShortName:           modelPlan.Abbreviation,
		ModelCategories:          modelPlanCategoriesHumainzed,
		ModelStatus:              humanizedModelStatus,
		ModelLastUpdated:         lastModified,
		ModelLeads:               modelLeads,
		ModelViewFilter:          lowercasedViewFilter,
		HumanizedModelViewFilter: humanizedViewFilter,
		ClientAddress:            clientAddress,
		ModelID:                  modelPlan.ID.String(),
	})
	if err != nil {
		return false, fmt.Errorf("failed to execute email body: %w", err)
	}

	// Send email
	err = emailService.Send(addressBook.DefaultSender, receiverEmails, nil, emailSubject, "text/html", emailBody)
	if err != nil {
		return false, fmt.Errorf("failed to send email: %w", err)
	}

	return true, nil
}
