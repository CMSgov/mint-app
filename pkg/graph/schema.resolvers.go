package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/authentication"
	"github.com/cmsgov/mint-app/pkg/constants"
	"github.com/cmsgov/mint-app/pkg/flags"
	"github.com/cmsgov/mint-app/pkg/graph/generated"
	"github.com/cmsgov/mint-app/pkg/graph/model"
	"github.com/cmsgov/mint-app/pkg/graph/resolvers"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/userhelpers"
)

// Fields is the resolver for the fields field.
func (r *auditChangeResolver) Fields(ctx context.Context, obj *models.AuditChange) (map[string]interface{}, error) {
	return obj.Fields.ToInterface()
}

// Basics is the resolver for the basics field.
func (r *modelPlanResolver) Basics(ctx context.Context, obj *models.ModelPlan) (*models.PlanBasics, error) {
	return resolvers.PlanBasicsGetByModelPlanIDLOADER(ctx, obj.ID)
}

// GeneralCharacteristics is the resolver for the generalCharacteristics field.
func (r *modelPlanResolver) GeneralCharacteristics(ctx context.Context, obj *models.ModelPlan) (*models.PlanGeneralCharacteristics, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.FetchPlanGeneralCharacteristicsByModelPlanID(logger, obj.ID, r.store)
}

// ParticipantsAndProviders is the resolver for the participantsAndProviders field.
func (r *modelPlanResolver) ParticipantsAndProviders(ctx context.Context, obj *models.ModelPlan) (*models.PlanParticipantsAndProviders, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanParticipantsAndProvidersGetByModelPlanID(logger, obj.ID, r.store)
}

// Beneficiaries is the resolver for the beneficiaries field.
func (r *modelPlanResolver) Beneficiaries(ctx context.Context, obj *models.ModelPlan) (*models.PlanBeneficiaries, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanBeneficiariesGetByModelPlanID(logger, obj.ID, r.store)
}

// OpsEvalAndLearning is the resolver for the opsEvalAndLearning field.
func (r *modelPlanResolver) OpsEvalAndLearning(ctx context.Context, obj *models.ModelPlan) (*models.PlanOpsEvalAndLearning, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanOpsEvalAndLearningGetByModelPlanID(logger, obj.ID, r.store)
}

// Collaborators is the resolver for the collaborators field.
func (r *modelPlanResolver) Collaborators(ctx context.Context, obj *models.ModelPlan) ([]*models.PlanCollaborator, error) {
	logger := appcontext.ZLogger(ctx)

	collaborators, err := resolvers.FetchCollaboratorsByModelPlanID(logger, obj.ID, r.store)

	return collaborators, err
}

// Documents is the resolver for the documents field.
func (r *modelPlanResolver) Documents(ctx context.Context, obj *models.ModelPlan) ([]*models.PlanDocument, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx)

	documents, err := resolvers.PlanDocumentsReadByModelPlanID(logger, obj.ID, principal, r.store, r.s3Client)
	return documents, err
}

// Discussions is the resolver for the discussions field.
func (r *modelPlanResolver) Discussions(ctx context.Context, obj *models.ModelPlan) ([]*models.PlanDiscussion, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanDiscussionCollectionByModelPlanID(logger, obj.ID, r.store)
}

// Payments is the resolver for the payments field.
func (r *modelPlanResolver) Payments(ctx context.Context, obj *models.ModelPlan) (*models.PlanPayments, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanPaymentsReadByModelPlan(logger, r.store, obj.ID)
}

// IsFavorite is the resolver for the isFavorite field.
func (r *modelPlanResolver) IsFavorite(ctx context.Context, obj *models.ModelPlan) (bool, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.IsPlanFavorited(logger, principal, r.store, obj.ID)
}

// IsCollaborator is the resolver for the isCollaborator field.
func (r *modelPlanResolver) IsCollaborator(ctx context.Context, obj *models.ModelPlan) (bool, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.IsPlanCollaborator(logger, principal, r.store, obj.ID)
}

// CrTdls is the resolver for the crTdls field.
func (r *modelPlanResolver) CrTdls(ctx context.Context, obj *models.ModelPlan) ([]*models.PlanCrTdl, error) {
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanCrTdlsGetByModelPlanID(logger, obj.ID, r.store)
}

// PrepareForClearance is the resolver for the prepareForClearance field.
func (r *modelPlanResolver) PrepareForClearance(ctx context.Context, obj *models.ModelPlan) (*model.PrepareForClearance, error) {
	logger := appcontext.ZLogger(ctx)
	return resolvers.ReadyForClearanceRead(logger, r.store, obj.ID)
}

// NameHistory is the resolver for the nameHistory field.
func (r *modelPlanResolver) NameHistory(ctx context.Context, obj *models.ModelPlan, sort models.SortDirection) ([]string, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.ModelPlanNameHistory(logger, obj.ID, sort, r.store)
}

// OperationalNeeds is the resolver for the operationalNeeds field.
func (r *modelPlanResolver) OperationalNeeds(ctx context.Context, obj *models.ModelPlan) ([]*models.OperationalNeed, error) {
	return resolvers.OperationalNeedCollectionGetByModelPlanIDLOADER(ctx, obj.ID)
}

// CreateModelPlan is the resolver for the createModelPlan field.
func (r *mutationResolver) CreateModelPlan(ctx context.Context, modelName string) (*models.ModelPlan, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx)

	return resolvers.ModelPlanCreate(
		ctx,
		logger,
		r.emailService,
		r.emailTemplateService,
		r.addressBook,
		modelName,
		r.store,
		principal,
		userhelpers.GetUserInfoAccountInfoWrapperFunc(r.service.FetchUserInfo),
	)
}

// UpdateModelPlan is the resolver for the updateModelPlan field.
func (r *mutationResolver) UpdateModelPlan(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.ModelPlan, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.ModelPlanUpdate(logger, id, changes, principal, r.store)
}

// CreatePlanCollaborator is the resolver for the createPlanCollaborator field.
func (r *mutationResolver) CreatePlanCollaborator(ctx context.Context, input model.PlanCollaboratorCreateInput) (*models.PlanCollaborator, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	planCollaborator, _, err := resolvers.CreatePlanCollaborator(
		ctx,
		logger,
		r.emailService,
		r.emailTemplateService,
		r.addressBook,
		&input,
		principal,
		r.store,
		true,
		userhelpers.GetUserInfoAccountInfoWrapperFunc(r.service.FetchUserInfo),
	)
	return planCollaborator, err
}

// UpdatePlanCollaborator is the resolver for the updatePlanCollaborator field.
func (r *mutationResolver) UpdatePlanCollaborator(ctx context.Context, id uuid.UUID, newRole models.TeamRole) (*models.PlanCollaborator, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.UpdatePlanCollaborator(logger, id, newRole, principal, r.store)
}

// DeletePlanCollaborator is the resolver for the deletePlanCollaborator field.
func (r *mutationResolver) DeletePlanCollaborator(ctx context.Context, id uuid.UUID) (*models.PlanCollaborator, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.DeletePlanCollaborator(logger, id, principal, r.store)
}

// UpdatePlanBasics is the resolver for the updatePlanBasics field.
func (r *mutationResolver) UpdatePlanBasics(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanBasics, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.UpdatePlanBasics(logger, id, changes, principal, r.store)
}

// UpdatePlanGeneralCharacteristics is the resolver for the updatePlanGeneralCharacteristics field.
func (r *mutationResolver) UpdatePlanGeneralCharacteristics(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanGeneralCharacteristics, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.UpdatePlanGeneralCharacteristics(logger, id, changes, principal, r.store)
}

// UpdatePlanBeneficiaries is the resolver for the updatePlanBeneficiaries field.
func (r *mutationResolver) UpdatePlanBeneficiaries(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanBeneficiaries, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanBeneficiariesUpdate(logger, id, changes, principal, r.store)
}

// UpdatePlanParticipantsAndProviders is the resolver for the updatePlanParticipantsAndProviders field.
func (r *mutationResolver) UpdatePlanParticipantsAndProviders(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanParticipantsAndProviders, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanParticipantsAndProvidersUpdate(logger, id, changes, principal, r.store)
}

// UpdatePlanOpsEvalAndLearning is the resolver for the updatePlanOpsEvalAndLearning field.
func (r *mutationResolver) UpdatePlanOpsEvalAndLearning(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanOpsEvalAndLearning, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanOpsEvalAndLearningUpdate(logger, id, changes, principal, r.store)
}

// UploadNewPlanDocument is the resolver for the uploadNewPlanDocument field.
func (r *mutationResolver) UploadNewPlanDocument(ctx context.Context, input model.PlanDocumentInput) (*models.PlanDocument, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	planDocument, err := resolvers.PlanDocumentCreate(logger, &input, principal, r.store, r.s3Client)
	return planDocument, err
}

// DeletePlanDocument is the resolver for the deletePlanDocument field.
func (r *mutationResolver) DeletePlanDocument(ctx context.Context, id uuid.UUID) (int, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanDocumentDelete(logger, r.s3Client, id, principal, r.store)
}

// CreatePlanDiscussion is the resolver for the createPlanDiscussion field.
func (r *mutationResolver) CreatePlanDiscussion(ctx context.Context, input model.PlanDiscussionCreateInput) (*models.PlanDiscussion, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.CreatePlanDiscussion(
		ctx,
		logger,
		r.emailService,
		r.emailTemplateService,
		r.addressBook,
		&input,
		principal,
		r.store,
	)
}

// UpdatePlanDiscussion is the resolver for the updatePlanDiscussion field.
func (r *mutationResolver) UpdatePlanDiscussion(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanDiscussion, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.UpdatePlanDiscussion(logger, id, changes, principal, r.store)
}

// DeletePlanDiscussion is the resolver for the deletePlanDiscussion field.
func (r *mutationResolver) DeletePlanDiscussion(ctx context.Context, id uuid.UUID) (*models.PlanDiscussion, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.DeletePlanDiscussion(logger, id, principal, r.store)
}

// CreateDiscussionReply is the resolver for the createDiscussionReply field.
func (r *mutationResolver) CreateDiscussionReply(ctx context.Context, input model.DiscussionReplyCreateInput) (*models.DiscussionReply, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.CreateDiscussionReply(logger, &input, principal, r.store)
}

// UpdateDiscussionReply is the resolver for the updateDiscussionReply field.
func (r *mutationResolver) UpdateDiscussionReply(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.DiscussionReply, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.UpdateDiscussionReply(logger, id, changes, principal, r.store)
}

// DeleteDiscussionReply is the resolver for the deleteDiscussionReply field.
func (r *mutationResolver) DeleteDiscussionReply(ctx context.Context, id uuid.UUID) (*models.DiscussionReply, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.DeleteDiscussionReply(logger, id, principal, r.store)
}

// LockTaskListSection is the resolver for the lockTaskListSection field.
func (r *mutationResolver) LockTaskListSection(ctx context.Context, modelPlanID uuid.UUID, section models.TaskListSection) (bool, error) {
	principal := appcontext.Principal(ctx)

	return resolvers.LockTaskListSection(r.pubsub, modelPlanID, section, principal)
}

// UnlockTaskListSection is the resolver for the unlockTaskListSection field.
func (r *mutationResolver) UnlockTaskListSection(ctx context.Context, modelPlanID uuid.UUID, section models.TaskListSection) (bool, error) {
	userID := appcontext.Principal(ctx).Account().ID

	return resolvers.UnlockTaskListSection(r.pubsub, modelPlanID, section, userID, model.ActionTypeNormal)
}

// UnlockAllTaskListSections is the resolver for the unlockAllTaskListSections field.
func (r *mutationResolver) UnlockAllTaskListSections(ctx context.Context, modelPlanID uuid.UUID) ([]*model.TaskListSectionLockStatus, error) {
	return resolvers.UnlockAllTaskListSections(r.pubsub, modelPlanID)
}

// UpdatePlanPayments is the resolver for the updatePlanPayments field.
func (r *mutationResolver) UpdatePlanPayments(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanPayments, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx)

	return resolvers.PlanPaymentsUpdate(logger, r.store, id, changes, principal)
}

// AgreeToNda is the resolver for the agreeToNDA field.
func (r *mutationResolver) AgreeToNda(ctx context.Context, agree bool) (*model.NDAInfo, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx)
	return resolvers.NDAAgreementUpdateOrCreate(logger, agree, principal, r.store)
}

// AddPlanFavorite is the resolver for the addPlanFavorite field.
func (r *mutationResolver) AddPlanFavorite(ctx context.Context, modelPlanID uuid.UUID) (*models.PlanFavorite, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanFavoriteCreate(logger, principal, principal.Account().ID, r.store, modelPlanID)
}

// DeletePlanFavorite is the resolver for the deletePlanFavorite field.
func (r *mutationResolver) DeletePlanFavorite(ctx context.Context, modelPlanID uuid.UUID) (*models.PlanFavorite, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanFavoriteDelete(logger, principal, r.store, modelPlanID)
}

// CreatePlanCrTdl is the resolver for the createPlanCrTdl field.
func (r *mutationResolver) CreatePlanCrTdl(ctx context.Context, input model.PlanCrTdlCreateInput) (*models.PlanCrTdl, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanCrTdlCreate(logger, &input, principal, r.store)
}

// UpdatePlanCrTdl is the resolver for the updatePlanCrTdl field.
func (r *mutationResolver) UpdatePlanCrTdl(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanCrTdl, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanCrTdlUpdate(logger, id, changes, principal, r.store)
}

// DeletePlanCrTdl is the resolver for the deletePlanCrTdl field.
func (r *mutationResolver) DeletePlanCrTdl(ctx context.Context, id uuid.UUID) (*models.PlanCrTdl, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanCrTdlDelete(logger, id, principal, r.store)
}

// AddOrUpdateCustomOperationalNeed is the resolver for the addOrUpdateCustomOperationalNeed field.
func (r *mutationResolver) AddOrUpdateCustomOperationalNeed(ctx context.Context, modelPlanID uuid.UUID, customNeedType string, needed bool) (*models.OperationalNeed, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.OperationalNeedInsertOrUpdateCustom(logger, modelPlanID, customNeedType, needed, principal, r.store)
}

// UpdateCustomOperationalNeedByID is the resolver for the updateCustomOperationalNeedByID field.
func (r *mutationResolver) UpdateCustomOperationalNeedByID(ctx context.Context, id uuid.UUID, customNeedType *string, needed bool) (*models.OperationalNeed, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.OperationalNeedCustomUpdateByID(logger, id, customNeedType, needed, principal, r.store)
}

// CreateOperationalSolution is the resolver for the createOperationalSolution field.
func (r *mutationResolver) CreateOperationalSolution(ctx context.Context, operationalNeedID uuid.UUID, solutionType *models.OperationalSolutionKey, changes map[string]interface{}) (*models.OperationalSolution, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.OperationalSolutionCreate(logger, operationalNeedID, solutionType, changes, principal, r.store)
}

// UpdateOperationalSolution is the resolver for the updateOperationalSolution field.
func (r *mutationResolver) UpdateOperationalSolution(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.OperationalSolution, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.OperationalSolutionUpdate(logger, id, changes, principal, r.store)
}

// CreatePlanDocumentSolutionLinks is the resolver for the createPlanDocumentSolutionLinks field.
func (r *mutationResolver) CreatePlanDocumentSolutionLinks(ctx context.Context, solutionID uuid.UUID, documentIDs []uuid.UUID) ([]*models.PlanDocumentSolutionLink, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanDocumentSolutionLinksCreate(logger, r.store, solutionID, documentIDs, principal)
}

// RemovePlanDocumentSolutionLinks is the resolver for the removePlanDocumentSolutionLinks field.
func (r *mutationResolver) RemovePlanDocumentSolutionLinks(ctx context.Context, solutionID uuid.UUID, documentIDs []uuid.UUID) (bool, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanDocumentSolutionLinkRemove(logger, solutionID, documentIDs, r.store, principal)
}

// CreateOperationalSolutionSubtasks is the resolver for the createOperationalSolutionSubtasks field.
func (r *mutationResolver) CreateOperationalSolutionSubtasks(ctx context.Context, solutionID uuid.UUID, inputs []*model.CreateOperationalSolutionSubtaskInput) ([]*models.OperationalSolutionSubtask, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx)

	return resolvers.OperationalSolutionSubtasksCreate(logger, r.store, inputs, solutionID, principal)
}

// UpdateOperationalSolutionSubtasks is the resolver for the updateOperationalSolutionSubtasks field.
func (r *mutationResolver) UpdateOperationalSolutionSubtasks(ctx context.Context, inputs []*model.UpdateOperationalSolutionSubtaskInput) ([]*models.OperationalSolutionSubtask, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.OperationalSolutionSubtasksUpdateByID(logger, r.store, principal, inputs)
}

// DeleteOperationalSolutionSubtask is the resolver for the deleteOperationalSolutionSubtask field.
func (r *mutationResolver) DeleteOperationalSolutionSubtask(ctx context.Context, id uuid.UUID) (int, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx)

	return resolvers.OperationalSolutionSubtaskDelete(logger, r.store, principal, id)
}

// Solutions is the resolver for the solutions field.
func (r *operationalNeedResolver) Solutions(ctx context.Context, obj *models.OperationalNeed, includeNotNeeded bool) ([]*models.OperationalSolution, error) {
	return resolvers.OperationaSolutionsAndPossibleGetByOPNeedIDLOADER(ctx, obj.ID, includeNotNeeded)
}

// Documents is the resolver for the documents field.
func (r *operationalSolutionResolver) Documents(ctx context.Context, obj *models.OperationalSolution) ([]*models.PlanDocument, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanDocumentsReadBySolutionID(
		logger,
		obj.ID,
		principal,
		r.store,
		r.s3Client,
	)
}

// OperationalSolutionSubtasks is the resolver for the operationalSolutionSubtasks field.
func (r *operationalSolutionResolver) OperationalSolutionSubtasks(ctx context.Context, obj *models.OperationalSolution) ([]*models.OperationalSolutionSubtask, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.OperationalSolutionSubtasksGetBySolutionID(logger, r.store, obj.ID)
}

// CmsCenters is the resolver for the cmsCenters field.
func (r *planBasicsResolver) CmsCenters(ctx context.Context, obj *models.PlanBasics) ([]model.CMSCenter, error) {
	cmsCenters := models.ConvertEnums[model.CMSCenter](obj.CMSCenters)
	return cmsCenters, nil
}

// CmmiGroups is the resolver for the cmmiGroups field.
func (r *planBasicsResolver) CmmiGroups(ctx context.Context, obj *models.PlanBasics) ([]model.CMMIGroup, error) {
	cmmiGroups := models.ConvertEnums[model.CMMIGroup](obj.CMMIGroups)
	return cmmiGroups, nil
}

// Beneficiaries is the resolver for the beneficiaries field.
func (r *planBeneficiariesResolver) Beneficiaries(ctx context.Context, obj *models.PlanBeneficiaries) ([]model.BeneficiariesType, error) {
	bTypes := models.ConvertEnums[model.BeneficiariesType](obj.Beneficiaries)
	return bTypes, nil
}

// BeneficiarySelectionMethod is the resolver for the beneficiarySelectionMethod field.
func (r *planBeneficiariesResolver) BeneficiarySelectionMethod(ctx context.Context, obj *models.PlanBeneficiaries) ([]model.SelectionMethodType, error) {
	sTypes := models.ConvertEnums[model.SelectionMethodType](obj.BeneficiarySelectionMethod)
	return sTypes, nil
}

// Replies is the resolver for the replies field.
func (r *planDiscussionResolver) Replies(ctx context.Context, obj *models.PlanDiscussion) ([]*models.DiscussionReply, error) {
	//TODO see if you can check if the PlanDiscussion already has replies, and if not go to DB, otherwise return the replies
	logger := appcontext.ZLogger(ctx)
	return resolvers.DiscussionReplyCollectionByDiscusionID(logger, obj.ID, r.store)
}

// OtherType is the resolver for the otherType field.
func (r *planDocumentResolver) OtherType(ctx context.Context, obj *models.PlanDocument) (*string, error) {
	return obj.OtherTypeDescription.Ptr(), nil
}

// OptionalNotes is the resolver for the optionalNotes field.
func (r *planDocumentResolver) OptionalNotes(ctx context.Context, obj *models.PlanDocument) (*string, error) {
	return obj.OptionalNotes.Ptr(), nil
}

// DownloadURL is the resolver for the downloadUrl field.
func (r *planDocumentResolver) DownloadURL(ctx context.Context, obj *models.PlanDocument) (*string, error) {
	url, err := r.s3Client.NewGetPresignedURL(obj.FileKey)
	if err != nil {
		return nil, err
	}

	return url, nil
}

// NumLinkedSolutions is the resolver for the numLinkedSolutions field.
func (r *planDocumentResolver) NumLinkedSolutions(ctx context.Context, obj *models.PlanDocument) (int, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanDocumentNumLinkedSolutions(logger, principal, r.store, obj.ID)
}

// ResemblesExistingModelWhich is the resolver for the resemblesExistingModelWhich field.
func (r *planGeneralCharacteristicsResolver) ResemblesExistingModelWhich(ctx context.Context, obj *models.PlanGeneralCharacteristics) ([]string, error) {
	return obj.ResemblesExistingModelWhich, nil
}

// AlternativePaymentModelTypes is the resolver for the alternativePaymentModelTypes field.
func (r *planGeneralCharacteristicsResolver) AlternativePaymentModelTypes(ctx context.Context, obj *models.PlanGeneralCharacteristics) ([]model.AlternativePaymentModelType, error) {
	apmTypes := models.ConvertEnums[model.AlternativePaymentModelType](obj.AlternativePaymentModelTypes)
	return apmTypes, nil
}

// KeyCharacteristics is the resolver for the keyCharacteristics field.
func (r *planGeneralCharacteristicsResolver) KeyCharacteristics(ctx context.Context, obj *models.PlanGeneralCharacteristics) ([]model.KeyCharacteristic, error) {
	keyCharacteristics := models.ConvertEnums[model.KeyCharacteristic](obj.KeyCharacteristics)
	return keyCharacteristics, nil
}

// GeographiesTargetedTypes is the resolver for the geographiesTargetedTypes field.
func (r *planGeneralCharacteristicsResolver) GeographiesTargetedTypes(ctx context.Context, obj *models.PlanGeneralCharacteristics) ([]model.GeographyType, error) {
	geographyTypes := models.ConvertEnums[model.GeographyType](obj.GeographiesTargetedTypes)
	return geographyTypes, nil
}

// GeographiesTargetedAppliedTo is the resolver for the geographiesTargetedAppliedTo field.
func (r *planGeneralCharacteristicsResolver) GeographiesTargetedAppliedTo(ctx context.Context, obj *models.PlanGeneralCharacteristics) ([]model.GeographyApplication, error) {
	geographyApplications := models.ConvertEnums[model.GeographyApplication](obj.GeographiesTargetedAppliedTo)
	return geographyApplications, nil
}

// AgreementTypes is the resolver for the agreementTypes field.
func (r *planGeneralCharacteristicsResolver) AgreementTypes(ctx context.Context, obj *models.PlanGeneralCharacteristics) ([]model.AgreementType, error) {
	agreementTypes := models.ConvertEnums[model.AgreementType](obj.AgreementTypes)
	return agreementTypes, nil
}

// AuthorityAllowances is the resolver for the authorityAllowances field.
func (r *planGeneralCharacteristicsResolver) AuthorityAllowances(ctx context.Context, obj *models.PlanGeneralCharacteristics) ([]model.AuthorityAllowance, error) {
	authorityAllowances := models.ConvertEnums[model.AuthorityAllowance](obj.AuthorityAllowances)
	return authorityAllowances, nil
}

// WaiversRequiredTypes is the resolver for the waiversRequiredTypes field.
func (r *planGeneralCharacteristicsResolver) WaiversRequiredTypes(ctx context.Context, obj *models.PlanGeneralCharacteristics) ([]model.WaiverType, error) {
	waiverTypes := models.ConvertEnums[model.WaiverType](obj.WaiversRequiredTypes)
	return waiverTypes, nil
}

// AgencyOrStateHelp is the resolver for the agencyOrStateHelp field.
func (r *planOpsEvalAndLearningResolver) AgencyOrStateHelp(ctx context.Context, obj *models.PlanOpsEvalAndLearning) ([]model.AgencyOrStateHelpType, error) {
	agencyOrStateHelpTypes := models.ConvertEnums[model.AgencyOrStateHelpType](obj.AgencyOrStateHelp)
	return agencyOrStateHelpTypes, nil
}

// Stakeholders is the resolver for the stakeholders field.
func (r *planOpsEvalAndLearningResolver) Stakeholders(ctx context.Context, obj *models.PlanOpsEvalAndLearning) ([]model.StakeholdersType, error) {
	stakeholdersTypes := models.ConvertEnums[model.StakeholdersType](obj.Stakeholders)
	return stakeholdersTypes, nil
}

// ContractorSupport is the resolver for the contractorSupport field.
func (r *planOpsEvalAndLearningResolver) ContractorSupport(ctx context.Context, obj *models.PlanOpsEvalAndLearning) ([]model.ContractorSupportType, error) {
	contractorSupportTypes := models.ConvertEnums[model.ContractorSupportType](obj.ContractorSupport)
	return contractorSupportTypes, nil
}

// DataMonitoringFileTypes is the resolver for the dataMonitoringFileTypes field.
func (r *planOpsEvalAndLearningResolver) DataMonitoringFileTypes(ctx context.Context, obj *models.PlanOpsEvalAndLearning) ([]model.MonitoringFileType, error) {
	monitoringFileTypes := models.ConvertEnums[model.MonitoringFileType](obj.DataMonitoringFileTypes)
	return monitoringFileTypes, nil
}

// EvaluationApproaches is the resolver for the evaluationApproaches field.
func (r *planOpsEvalAndLearningResolver) EvaluationApproaches(ctx context.Context, obj *models.PlanOpsEvalAndLearning) ([]model.EvaluationApproachType, error) {
	evaluationApproachTypes := models.ConvertEnums[model.EvaluationApproachType](obj.EvaluationApproaches)
	return evaluationApproachTypes, nil
}

// CcmInvolvment is the resolver for the ccmInvolvment field.
func (r *planOpsEvalAndLearningResolver) CcmInvolvment(ctx context.Context, obj *models.PlanOpsEvalAndLearning) ([]model.CcmInvolvmentType, error) {
	ccmInvolvmentTypes := models.ConvertEnums[model.CcmInvolvmentType](obj.CcmInvolvment)
	return ccmInvolvmentTypes, nil
}

// DataNeededForMonitoring is the resolver for the dataNeededForMonitoring field.
func (r *planOpsEvalAndLearningResolver) DataNeededForMonitoring(ctx context.Context, obj *models.PlanOpsEvalAndLearning) ([]model.DataForMonitoringType, error) {
	dataForMonitoringTypes := models.ConvertEnums[model.DataForMonitoringType](obj.DataNeededForMonitoring)
	return dataForMonitoringTypes, nil
}

// DataToSendParticicipants is the resolver for the dataToSendParticicipants field.
func (r *planOpsEvalAndLearningResolver) DataToSendParticicipants(ctx context.Context, obj *models.PlanOpsEvalAndLearning) ([]model.DataToSendParticipantsType, error) {
	dataToSendParticipantsTypes := models.ConvertEnums[model.DataToSendParticipantsType](obj.DataToSendParticicipants)
	return dataToSendParticipantsTypes, nil
}

// DataSharingFrequency is the resolver for the dataSharingFrequency field.
func (r *planOpsEvalAndLearningResolver) DataSharingFrequency(ctx context.Context, obj *models.PlanOpsEvalAndLearning) ([]model.DataFrequencyType, error) {
	dataFrequencyTypes := models.ConvertEnums[model.DataFrequencyType](obj.DataSharingFrequency)
	return dataFrequencyTypes, nil
}

// DataCollectionFrequency is the resolver for the dataCollectionFrequency field.
func (r *planOpsEvalAndLearningResolver) DataCollectionFrequency(ctx context.Context, obj *models.PlanOpsEvalAndLearning) ([]model.DataFrequencyType, error) {
	dataFrequencyTypes := models.ConvertEnums[model.DataFrequencyType](obj.DataCollectionFrequency)
	return dataFrequencyTypes, nil
}

// ModelLearningSystems is the resolver for the modelLearningSystems field.
func (r *planOpsEvalAndLearningResolver) ModelLearningSystems(ctx context.Context, obj *models.PlanOpsEvalAndLearning) ([]model.ModelLearningSystemType, error) {
	modelLearningSystemTypes := models.ConvertEnums[model.ModelLearningSystemType](obj.ModelLearningSystems)
	return modelLearningSystemTypes, nil
}

// Participants is the resolver for the participants field.
func (r *planParticipantsAndProvidersResolver) Participants(ctx context.Context, obj *models.PlanParticipantsAndProviders) ([]model.ParticipantsType, error) {
	participants := models.ConvertEnums[model.ParticipantsType](obj.Participants)
	return participants, nil
}

// SelectionMethod is the resolver for the selectionMethod field.
func (r *planParticipantsAndProvidersResolver) SelectionMethod(ctx context.Context, obj *models.PlanParticipantsAndProviders) ([]model.ParticipantSelectionType, error) {
	selectionTypes := models.ConvertEnums[model.ParticipantSelectionType](obj.SelectionMethod)
	return selectionTypes, nil
}

// CommunicationMethod is the resolver for the communicationMethod field.
func (r *planParticipantsAndProvidersResolver) CommunicationMethod(ctx context.Context, obj *models.PlanParticipantsAndProviders) ([]model.ParticipantCommunicationType, error) {
	communicationTypes := models.ConvertEnums[model.ParticipantCommunicationType](obj.CommunicationMethod)
	return communicationTypes, nil
}

// ParticipantsIds is the resolver for the participantsIds field.
func (r *planParticipantsAndProvidersResolver) ParticipantsIds(ctx context.Context, obj *models.PlanParticipantsAndProviders) ([]model.ParticipantsIDType, error) {
	participantsIDTypes := models.ConvertEnums[model.ParticipantsIDType](obj.ParticipantsIds)
	return participantsIDTypes, nil
}

// ProviderAddMethod is the resolver for the providerAddMethod field.
func (r *planParticipantsAndProvidersResolver) ProviderAddMethod(ctx context.Context, obj *models.PlanParticipantsAndProviders) ([]model.ProviderAddType, error) {
	providerAddTypes := models.ConvertEnums[model.ProviderAddType](obj.ProviderAddMethod)
	return providerAddTypes, nil
}

// ProviderLeaveMethod is the resolver for the providerLeaveMethod field.
func (r *planParticipantsAndProvidersResolver) ProviderLeaveMethod(ctx context.Context, obj *models.PlanParticipantsAndProviders) ([]model.ProviderLeaveType, error) {
	providerLeaveTypes := models.ConvertEnums[model.ProviderLeaveType](obj.ProviderLeaveMethod)
	return providerLeaveTypes, nil
}

// FundingSource is the resolver for the fundingSource field.
func (r *planPaymentsResolver) FundingSource(ctx context.Context, obj *models.PlanPayments) ([]models.FundingSource, error) {
	return models.ConvertEnums[models.FundingSource](obj.FundingSource), nil
}

// FundingSourceR is the resolver for the fundingSourceR field.
func (r *planPaymentsResolver) FundingSourceR(ctx context.Context, obj *models.PlanPayments) ([]models.FundingSource, error) {
	return models.ConvertEnums[models.FundingSource](obj.FundingSourceR), nil
}

// PayRecipients is the resolver for the payRecipients field.
func (r *planPaymentsResolver) PayRecipients(ctx context.Context, obj *models.PlanPayments) ([]models.PayRecipient, error) {
	return models.ConvertEnums[models.PayRecipient](obj.PayRecipients), nil
}

// PayType is the resolver for the payType field.
func (r *planPaymentsResolver) PayType(ctx context.Context, obj *models.PlanPayments) ([]models.PayType, error) {
	return models.ConvertEnums[models.PayType](obj.PayType), nil
}

// PayClaims is the resolver for the payClaims field.
func (r *planPaymentsResolver) PayClaims(ctx context.Context, obj *models.PlanPayments) ([]models.ClaimsBasedPayType, error) {
	return models.ConvertEnums[models.ClaimsBasedPayType](obj.PayClaims), nil
}

// NonClaimsPayments is the resolver for the nonClaimsPayments field.
func (r *planPaymentsResolver) NonClaimsPayments(ctx context.Context, obj *models.PlanPayments) ([]model.NonClaimsBasedPayType, error) {
	return models.ConvertEnums[model.NonClaimsBasedPayType](obj.NonClaimsPayments), nil
}

// NonClaimsPaymentOther is the resolver for the nonClaimsPaymentOther field.
func (r *planPaymentsResolver) NonClaimsPaymentOther(ctx context.Context, obj *models.PlanPayments) (*string, error) {
	return obj.NonClaimsPaymentsOther, nil
}

// AnticipatedPaymentFrequency is the resolver for the anticipatedPaymentFrequency field.
func (r *planPaymentsResolver) AnticipatedPaymentFrequency(ctx context.Context, obj *models.PlanPayments) ([]models.AnticipatedPaymentFrequencyType, error) {
	return models.ConvertEnums[models.AnticipatedPaymentFrequencyType](obj.AnticipatedPaymentFrequency), nil
}

// PossibleSolutions is the resolver for the possibleSolutions field.
func (r *possibleOperationalNeedResolver) PossibleSolutions(ctx context.Context, obj *models.PossibleOperationalNeed) ([]*models.PossibleOperationalSolution, error) {
	logger := appcontext.ZLogger(ctx)
	return resolvers.PossibleOperationalSolutionCollectionGetByNeedType(logger, obj.Key, r.store)
}

// CurrentUser is the resolver for the currentUser field.
func (r *queryResolver) CurrentUser(ctx context.Context) (*model.CurrentUser, error) {
	ldUser := flags.Principal(ctx)
	userKey := ldUser.GetKey()
	signedHash := r.ldClient.SecureModeHash(ldUser)

	currentUser := model.CurrentUser{
		LaunchDarkly: &model.LaunchDarklySettings{
			UserKey:    userKey,
			SignedHash: signedHash,
		},
	}
	return &currentUser, nil
}

// ModelPlan is the resolver for the modelPlan field.
func (r *queryResolver) ModelPlan(ctx context.Context, id uuid.UUID) (*models.ModelPlan, error) {
	logger := appcontext.ZLogger(ctx)
	constants.GetSampleUUID()

	if id == constants.GetSampleUUID() {
		return resolvers.ModelPlanGetSampleModel(logger, r.store)
	}

	return resolvers.ModelPlanGetByID(logger, id, r.store)
}

// PlanDocument is the resolver for the planDocument field.
func (r *queryResolver) PlanDocument(ctx context.Context, id uuid.UUID) (*models.PlanDocument, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanDocumentRead(logger, r.store, r.s3Client, id)
}

// ModelPlanCollection is the resolver for the modelPlanCollection field.
func (r *queryResolver) ModelPlanCollection(ctx context.Context, filter model.ModelPlanFilter) ([]*models.ModelPlan, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)
	return resolvers.ModelPlanCollection(logger, principal, r.store, filter)
}

// ExistingModelCollection is the resolver for the existingModelCollection field.
func (r *queryResolver) ExistingModelCollection(ctx context.Context) ([]*models.ExistingModel, error) {
	logger := appcontext.ZLogger(ctx)
	return resolvers.ExistingModelCollectionGet(logger, r.store)
}

// SearchOktaUsers is the resolver for the searchOktaUsers field.
func (r *queryResolver) SearchOktaUsers(ctx context.Context, searchTerm string) ([]*models.UserInfo, error) {
	response, err := r.service.SearchByName(ctx, searchTerm)
	if err != nil {
		return nil, err
	}

	return response, nil
}

// PlanCollaboratorByID is the resolver for the planCollaboratorByID field.
func (r *queryResolver) PlanCollaboratorByID(ctx context.Context, id uuid.UUID) (*models.PlanCollaborator, error) {
	logger := appcontext.ZLogger(ctx)
	return resolvers.FetchCollaboratorByID(logger, id, r.store)
}

// TaskListSectionLocks is the resolver for the taskListSectionLocks field.
func (r *queryResolver) TaskListSectionLocks(ctx context.Context, modelPlanID uuid.UUID) ([]*model.TaskListSectionLockStatus, error) {
	return resolvers.GetTaskListSectionLocks(modelPlanID)
}

// PlanPayments is the resolver for the planPayments field.
func (r *queryResolver) PlanPayments(ctx context.Context, id uuid.UUID) (*models.PlanPayments, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanPaymentsRead(logger, r.store, id)
}

// NdaInfo is the resolver for the ndaInfo field.
func (r *queryResolver) NdaInfo(ctx context.Context) (*model.NDAInfo, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx)
	return resolvers.NDAAgreementGetByUserID(logger, principal, r.store)
}

// CrTdl is the resolver for the crTdl field.
func (r *queryResolver) CrTdl(ctx context.Context, id uuid.UUID) (*models.PlanCrTdl, error) {
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanCrTdlGet(logger, id, r.store)
}

// OperationalSolutions is the resolver for the operationalSolutions field.
func (r *queryResolver) OperationalSolutions(ctx context.Context, operationalNeedID uuid.UUID, includeNotNeeded bool) ([]*models.OperationalSolution, error) {
	return resolvers.OperationaSolutionsAndPossibleGetByOPNeedIDLOADER(ctx, operationalNeedID, includeNotNeeded)
}

// OperationalSolution is the resolver for the operationalSolution field.
func (r *queryResolver) OperationalSolution(ctx context.Context, id uuid.UUID) (*models.OperationalSolution, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.OperationalSolutionGetByID(logger, id, r.store)
}

// OperationalNeed is the resolver for the operationalNeed field.
func (r *queryResolver) OperationalNeed(ctx context.Context, id uuid.UUID) (*models.OperationalNeed, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.OperationalNeedGetByID(logger, id, r.store)
}

// AuditChanges is the resolver for the auditChanges field.
func (r *queryResolver) AuditChanges(ctx context.Context, tableName string, primaryKey uuid.UUID) ([]*models.AuditChange, error) {
	logger := appcontext.ZLogger(ctx)
	return resolvers.AuditChangeCollectionByIDAndTable(logger, tableName, primaryKey, r.store)
}

// PossibleOperationalNeeds is the resolver for the possibleOperationalNeeds field.
func (r *queryResolver) PossibleOperationalNeeds(ctx context.Context) ([]*models.PossibleOperationalNeed, error) {
	logger := appcontext.ZLogger(ctx)
	return resolvers.PossibleOperationalNeedCollectionGet(logger, r.store)
}

// PossibleOperationalSolutions is the resolver for the possibleOperationalSolutions field.
func (r *queryResolver) PossibleOperationalSolutions(ctx context.Context) ([]*models.PossibleOperationalSolution, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.PossibleOperationalSolutionCollectionGetAll(logger, r.store)
}

// UserAccount is the resolver for the userAccount field.
func (r *queryResolver) UserAccount(ctx context.Context, username string) (*authentication.UserAccount, error) {
	logger := appcontext.ZLogger(ctx)
	return resolvers.UserAccountGetByUsername(logger, r.store, username)
}

// OnTaskListSectionLocksChanged is the resolver for the onTaskListSectionLocksChanged field.
func (r *subscriptionResolver) OnTaskListSectionLocksChanged(ctx context.Context, modelPlanID uuid.UUID) (<-chan *model.TaskListSectionLockStatusChanged, error) {
	principal := appcontext.Principal(ctx)

	return resolvers.SubscribeTaskListSectionLockChanges(r.pubsub, modelPlanID, principal, ctx.Done())
}

// OnLockTaskListSectionContext is the resolver for the onLockTaskListSectionContext field.
func (r *subscriptionResolver) OnLockTaskListSectionContext(ctx context.Context, modelPlanID uuid.UUID) (<-chan *model.TaskListSectionLockStatusChanged, error) {
	principal := appcontext.Principal(ctx)

	return resolvers.OnLockTaskListSectionContext(r.pubsub, modelPlanID, principal, ctx.Done())
}

// AuditChange returns generated.AuditChangeResolver implementation.
func (r *Resolver) AuditChange() generated.AuditChangeResolver { return &auditChangeResolver{r} }

// ModelPlan returns generated.ModelPlanResolver implementation.
func (r *Resolver) ModelPlan() generated.ModelPlanResolver { return &modelPlanResolver{r} }

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// OperationalNeed returns generated.OperationalNeedResolver implementation.
func (r *Resolver) OperationalNeed() generated.OperationalNeedResolver {
	return &operationalNeedResolver{r}
}

// OperationalSolution returns generated.OperationalSolutionResolver implementation.
func (r *Resolver) OperationalSolution() generated.OperationalSolutionResolver {
	return &operationalSolutionResolver{r}
}

// PlanBasics returns generated.PlanBasicsResolver implementation.
func (r *Resolver) PlanBasics() generated.PlanBasicsResolver { return &planBasicsResolver{r} }

// PlanBeneficiaries returns generated.PlanBeneficiariesResolver implementation.
func (r *Resolver) PlanBeneficiaries() generated.PlanBeneficiariesResolver {
	return &planBeneficiariesResolver{r}
}

// PlanDiscussion returns generated.PlanDiscussionResolver implementation.
func (r *Resolver) PlanDiscussion() generated.PlanDiscussionResolver {
	return &planDiscussionResolver{r}
}

// PlanDocument returns generated.PlanDocumentResolver implementation.
func (r *Resolver) PlanDocument() generated.PlanDocumentResolver { return &planDocumentResolver{r} }

// PlanGeneralCharacteristics returns generated.PlanGeneralCharacteristicsResolver implementation.
func (r *Resolver) PlanGeneralCharacteristics() generated.PlanGeneralCharacteristicsResolver {
	return &planGeneralCharacteristicsResolver{r}
}

// PlanOpsEvalAndLearning returns generated.PlanOpsEvalAndLearningResolver implementation.
func (r *Resolver) PlanOpsEvalAndLearning() generated.PlanOpsEvalAndLearningResolver {
	return &planOpsEvalAndLearningResolver{r}
}

// PlanParticipantsAndProviders returns generated.PlanParticipantsAndProvidersResolver implementation.
func (r *Resolver) PlanParticipantsAndProviders() generated.PlanParticipantsAndProvidersResolver {
	return &planParticipantsAndProvidersResolver{r}
}

// PlanPayments returns generated.PlanPaymentsResolver implementation.
func (r *Resolver) PlanPayments() generated.PlanPaymentsResolver { return &planPaymentsResolver{r} }

// PossibleOperationalNeed returns generated.PossibleOperationalNeedResolver implementation.
func (r *Resolver) PossibleOperationalNeed() generated.PossibleOperationalNeedResolver {
	return &possibleOperationalNeedResolver{r}
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

type auditChangeResolver struct{ *Resolver }
type modelPlanResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type operationalNeedResolver struct{ *Resolver }
type operationalSolutionResolver struct{ *Resolver }
type planBasicsResolver struct{ *Resolver }
type planBeneficiariesResolver struct{ *Resolver }
type planDiscussionResolver struct{ *Resolver }
type planDocumentResolver struct{ *Resolver }
type planGeneralCharacteristicsResolver struct{ *Resolver }
type planOpsEvalAndLearningResolver struct{ *Resolver }
type planParticipantsAndProvidersResolver struct{ *Resolver }
type planPaymentsResolver struct{ *Resolver }
type possibleOperationalNeedResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }
