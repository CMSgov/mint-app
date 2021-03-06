package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/flags"
	"github.com/cmsgov/mint-app/pkg/graph/generated"
	"github.com/cmsgov/mint-app/pkg/graph/model"
	"github.com/cmsgov/mint-app/pkg/graph/resolvers"
	"github.com/cmsgov/mint-app/pkg/models"
)

// CmsCenters is the resolver for the cmsCenters field.
func (r *modelPlanResolver) CmsCenters(ctx context.Context, obj *models.ModelPlan) ([]model.CMSCenter, error) {
	cmsCenters := models.ConvertEnums[model.CMSCenter](obj.CMSCenters)
	return cmsCenters, nil
}

// CmmiGroups is the resolver for the cmmiGroups field.
func (r *modelPlanResolver) CmmiGroups(ctx context.Context, obj *models.ModelPlan) ([]model.CMMIGroup, error) {
	cmmiGroups := models.ConvertEnums[model.CMMIGroup](obj.CMMIGroups)
	return cmmiGroups, nil
}

// Basics is the resolver for the basics field.
func (r *modelPlanResolver) Basics(ctx context.Context, obj *models.ModelPlan) (*models.PlanBasics, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx).ID()

	return resolvers.PlanBasicsGetByModelPlanID(logger, &principal, obj.ID, r.store)
}

// Milestones is the resolver for the milestones field.
func (r *modelPlanResolver) Milestones(ctx context.Context, obj *models.ModelPlan) (*models.PlanMilestones, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx).ID()

	return resolvers.FetchPlanMilestonesByModelPlanID(logger, &principal, obj.ID, r.store)
}

// GeneralCharacteristics is the resolver for the generalCharacteristics field.
func (r *modelPlanResolver) GeneralCharacteristics(ctx context.Context, obj *models.ModelPlan) (*models.PlanGeneralCharacteristics, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx).ID()

	return resolvers.FetchPlanGeneralCharacteristicsByModelPlanID(logger, principal, obj.ID, r.store)
}

// ParticipantsAndProviders is the resolver for the participantsAndProviders field.
func (r *modelPlanResolver) ParticipantsAndProviders(ctx context.Context, obj *models.ModelPlan) (*models.PlanParticipantsAndProviders, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx).ID()

	return resolvers.PlanParticipantsAndProvidersGetByModelPlanID(logger, principal, obj.ID, r.store)
}

// Beneficiaries is the resolver for the beneficiaries field.
func (r *modelPlanResolver) Beneficiaries(ctx context.Context, obj *models.ModelPlan) (*models.PlanBeneficiaries, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx).ID()

	return resolvers.PlanBeneficiariesGetByModelPlanID(logger, principal, obj.ID, r.store)
}

// OpsEvalAndLearning is the resolver for the opsEvalAndLearning field.
func (r *modelPlanResolver) OpsEvalAndLearning(ctx context.Context, obj *models.ModelPlan) (*models.PlanOpsEvalAndLearning, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanOpsEvalAndLearningGetByModelPlanID(logger, obj.ID, r.store)
}

// Collaborators is the resolver for the collaborators field.
func (r *modelPlanResolver) Collaborators(ctx context.Context, obj *models.ModelPlan) ([]*models.PlanCollaborator, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	collaborators, err := resolvers.FetchCollaboratorsByModelPlanID(logger, &principal, obj.ID, r.store)

	return collaborators, err
}

// Documents is the resolver for the documents field.
func (r *modelPlanResolver) Documents(ctx context.Context, obj *models.ModelPlan) ([]*models.PlanDocument, error) {
	logger := appcontext.ZLogger(ctx)

	documents, err := resolvers.PlanDocumentsReadByModelPlanID(logger, obj.ID, r.store, r.s3Client)
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

// ItTools is the resolver for the itTools field.
func (r *modelPlanResolver) ItTools(ctx context.Context, obj *models.ModelPlan) (*models.PlanITTools, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanITToolsGetByModelPlanID(logger, obj.ID, r.store)
}

// CreateModelPlan is the resolver for the createModelPlan field.
func (r *mutationResolver) CreateModelPlan(ctx context.Context, modelName string) (*models.ModelPlan, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx).ID()
	principalInfo, err := r.service.FetchUserInfo(ctx, principal)
	if err != nil { //if can't get user info, use EUAID as commonName
		tempPrincipalInfo := models.UserInfo{
			EuaUserID:  principal,
			CommonName: principal,
		}
		principalInfo = &tempPrincipalInfo
	}

	return resolvers.ModelPlanCreate(logger, modelName, r.store, principalInfo)
}

// UpdateModelPlan is the resolver for the updateModelPlan field.
func (r *mutationResolver) UpdateModelPlan(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.ModelPlan, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.ModelPlanUpdate(logger, id, changes, &principal, r.store)
}

// CreatePlanCollaborator is the resolver for the createPlanCollaborator field.
func (r *mutationResolver) CreatePlanCollaborator(ctx context.Context, input model.PlanCollaboratorCreateInput) (*models.PlanCollaborator, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.CreatePlanCollaborator(logger, &input, principal, r.store)
}

// UpdatePlanCollaborator is the resolver for the updatePlanCollaborator field.
func (r *mutationResolver) UpdatePlanCollaborator(ctx context.Context, id uuid.UUID, newRole models.TeamRole) (*models.PlanCollaborator, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.UpdatePlanCollaborator(logger, id, newRole, principal, r.store)
}

// DeletePlanCollaborator is the resolver for the deletePlanCollaborator field.
func (r *mutationResolver) DeletePlanCollaborator(ctx context.Context, id uuid.UUID) (*models.PlanCollaborator, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.DeletePlanCollaborator(logger, id, principal, r.store)
}

// UpdatePlanBasics is the resolver for the updatePlanBasics field.
func (r *mutationResolver) UpdatePlanBasics(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanBasics, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.UpdatePlanBasics(logger, id, changes, principal, r.store)
}

// UpdatePlanMilestones is the resolver for the updatePlanMilestones field.
func (r *mutationResolver) UpdatePlanMilestones(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanMilestones, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.UpdatePlanMilestones(logger, id, changes, principal, r.store)
}

// UpdatePlanGeneralCharacteristics is the resolver for the updatePlanGeneralCharacteristics field.
func (r *mutationResolver) UpdatePlanGeneralCharacteristics(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanGeneralCharacteristics, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.UpdatePlanGeneralCharacteristics(logger, id, changes, principal, r.store)
}

// UpdatePlanBeneficiaries is the resolver for the updatePlanBeneficiaries field.
func (r *mutationResolver) UpdatePlanBeneficiaries(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanBeneficiaries, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanBeneficiariesUpdate(logger, id, changes, principal, r.store)
}

// UpdatePlanParticipantsAndProviders is the resolver for the updatePlanParticipantsAndProviders field.
func (r *mutationResolver) UpdatePlanParticipantsAndProviders(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanParticipantsAndProviders, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanParticipantsAndProvidersUpdate(logger, id, changes, principal, r.store)
}

// UpdatePlanItTools is the resolver for the updatePlanItTools field.
func (r *mutationResolver) UpdatePlanItTools(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanITTools, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanITToolsUpdate(logger, id, changes, principal, r.store)
}

// UpdatePlanOpsEvalAndLearning is the resolver for the updatePlanOpsEvalAndLearning field.
func (r *mutationResolver) UpdatePlanOpsEvalAndLearning(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanOpsEvalAndLearning, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)
	return resolvers.PlanOpsEvalAndLearningUpdate(logger, id, changes, principal, r.store)
}

// GeneratePresignedUploadURL is the resolver for the generatePresignedUploadURL field.
func (r *mutationResolver) GeneratePresignedUploadURL(ctx context.Context, input model.GeneratePresignedUploadURLInput) (*model.GeneratePresignedUploadURLPayload, error) {
	url, err := r.s3Client.NewPutPresignedURL(input.MimeType)
	if err != nil {
		return nil, err
	}

	return &model.GeneratePresignedUploadURLPayload{
		URL: &url.URL,
	}, nil
}

// CreatePlanDocument is the resolver for the createPlanDocument field.
func (r *mutationResolver) CreatePlanDocument(ctx context.Context, input model.PlanDocumentInput) (*model.PlanDocumentPayload, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	document := ConvertToPlanDocumentModel(&input)
	payload, err := resolvers.PlanDocumentCreate(logger, document, input.URL, principal, r.store, r.s3Client)

	return payload, err
}

// UpdatePlanDocument is the resolver for the updatePlanDocument field.
func (r *mutationResolver) UpdatePlanDocument(ctx context.Context, input model.PlanDocumentInput) (*model.PlanDocumentPayload, error) {
	document := ConvertToPlanDocumentModel(&input)
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanDocumentUpdate(logger, r.s3Client, document, &principal, r.store)
}

// DeletePlanDocument is the resolver for the deletePlanDocument field.
func (r *mutationResolver) DeletePlanDocument(ctx context.Context, input model.PlanDocumentInput) (int, error) {
	document := ConvertToPlanDocumentModel(&input)
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanDocumentDelete(logger, document, &principal, r.store)
}

// CreatePlanDiscussion is the resolver for the createPlanDiscussion field.
func (r *mutationResolver) CreatePlanDiscussion(ctx context.Context, input model.PlanDiscussionCreateInput) (*models.PlanDiscussion, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.CreatePlanDiscussion(logger, &input, principal, r.store)
}

// UpdatePlanDiscussion is the resolver for the updatePlanDiscussion field.
func (r *mutationResolver) UpdatePlanDiscussion(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanDiscussion, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.UpdatePlanDiscussion(logger, id, changes, principal, r.store)
}

// DeletePlanDiscussion is the resolver for the deletePlanDiscussion field.
func (r *mutationResolver) DeletePlanDiscussion(ctx context.Context, id uuid.UUID) (*models.PlanDiscussion, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.DeletePlanDiscussion(logger, id, principal, r.store)
}

// CreateDiscussionReply is the resolver for the createDiscussionReply field.
func (r *mutationResolver) CreateDiscussionReply(ctx context.Context, input model.DiscussionReplyCreateInput) (*models.DiscussionReply, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.CreateDiscussionReply(logger, &input, principal, r.store)
}

// UpdateDiscussionReply is the resolver for the updateDiscussionReply field.
func (r *mutationResolver) UpdateDiscussionReply(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.DiscussionReply, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.UpdateDiscussionReply(logger, id, changes, principal, r.store)
}

// DeleteDiscussionReply is the resolver for the deleteDiscussionReply field.
func (r *mutationResolver) DeleteDiscussionReply(ctx context.Context, id uuid.UUID) (*models.DiscussionReply, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)

	return resolvers.DeleteDiscussionReply(logger, id, principal, r.store)
}

// UpdatePlanPayments is the resolver for the updatePlanPayments field.
func (r *mutationResolver) UpdatePlanPayments(ctx context.Context, id uuid.UUID, changes map[string]interface{}) (*models.PlanPayments, error) {
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx).ID()

	return resolvers.PlanPaymentsUpdate(logger, r.store, id, changes, principal)
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
	return obj.OtherTypeDescription, nil
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

// GcPartCd is the resolver for the gcPartCD field.
func (r *planITToolsResolver) GcPartCd(ctx context.Context, obj *models.PlanITTools) ([]model.GcPartCDType, error) {
	GcPartCDs := models.ConvertEnums[model.GcPartCDType](obj.GcPartCD)
	return GcPartCDs, nil
}

// GcCollectBids is the resolver for the gcCollectBids field.
func (r *planITToolsResolver) GcCollectBids(ctx context.Context, obj *models.PlanITTools) ([]model.GcCollectBidsType, error) {
	GcCollectBidss := models.ConvertEnums[model.GcCollectBidsType](obj.GcCollectBids)
	return GcCollectBidss, nil
}

// GcUpdateContract is the resolver for the gcUpdateContract field.
func (r *planITToolsResolver) GcUpdateContract(ctx context.Context, obj *models.PlanITTools) ([]model.GcUpdateContractType, error) {
	GcUpdateContracts := models.ConvertEnums[model.GcUpdateContractType](obj.GcUpdateContract)
	return GcUpdateContracts, nil
}

// PpToAdvertise is the resolver for the ppToAdvertise field.
func (r *planITToolsResolver) PpToAdvertise(ctx context.Context, obj *models.PlanITTools) ([]model.PpToAdvertiseType, error) {
	PpToAdvertises := models.ConvertEnums[model.PpToAdvertiseType](obj.PpToAdvertise)
	return PpToAdvertises, nil
}

// PpCollectScoreReview is the resolver for the ppCollectScoreReview field.
func (r *planITToolsResolver) PpCollectScoreReview(ctx context.Context, obj *models.PlanITTools) ([]model.PpCollectScoreReviewType, error) {
	PpCollectScoreReviews := models.ConvertEnums[model.PpCollectScoreReviewType](obj.PpCollectScoreReview)
	return PpCollectScoreReviews, nil
}

// PpAppSupportContractor is the resolver for the ppAppSupportContractor field.
func (r *planITToolsResolver) PpAppSupportContractor(ctx context.Context, obj *models.PlanITTools) ([]model.PpAppSupportContractorType, error) {
	PpAppSupportContractors := models.ConvertEnums[model.PpAppSupportContractorType](obj.PpAppSupportContractor)
	return PpAppSupportContractors, nil
}

// PpCommunicateWithParticipant is the resolver for the ppCommunicateWithParticipant field.
func (r *planITToolsResolver) PpCommunicateWithParticipant(ctx context.Context, obj *models.PlanITTools) ([]model.PpCommunicateWithParticipantType, error) {
	PpCommunicateWithParticipants := models.ConvertEnums[model.PpCommunicateWithParticipantType](obj.PpCommunicateWithParticipant)
	return PpCommunicateWithParticipants, nil
}

// PpManageProviderOverlap is the resolver for the ppManageProviderOverlap field.
func (r *planITToolsResolver) PpManageProviderOverlap(ctx context.Context, obj *models.PlanITTools) ([]model.PpManageProviderOverlapType, error) {
	PpManageProviderOverlaps := models.ConvertEnums[model.PpManageProviderOverlapType](obj.PpManageProviderOverlap)
	return PpManageProviderOverlaps, nil
}

// BManageBeneficiaryOverlap is the resolver for the bManageBeneficiaryOverlap field.
func (r *planITToolsResolver) BManageBeneficiaryOverlap(ctx context.Context, obj *models.PlanITTools) ([]model.BManageBeneficiaryOverlapType, error) {
	BManageBeneficiaryOverlaps := models.ConvertEnums[model.BManageBeneficiaryOverlapType](obj.BManageBeneficiaryOverlap)
	return BManageBeneficiaryOverlaps, nil
}

// OelHelpdeskSupport is the resolver for the oelHelpdeskSupport field.
func (r *planITToolsResolver) OelHelpdeskSupport(ctx context.Context, obj *models.PlanITTools) ([]model.OelHelpdeskSupportType, error) {
	OelHelpdeskSupports := models.ConvertEnums[model.OelHelpdeskSupportType](obj.OelHelpdeskSupport)
	return OelHelpdeskSupports, nil
}

// OelManageAco is the resolver for the oelManageAco field.
func (r *planITToolsResolver) OelManageAco(ctx context.Context, obj *models.PlanITTools) ([]model.OelManageAcoType, error) {
	OelManageAcos := models.ConvertEnums[model.OelManageAcoType](obj.OelManageAco)
	return OelManageAcos, nil
}

// OelPerformanceBenchmark is the resolver for the oelPerformanceBenchmark field.
func (r *planITToolsResolver) OelPerformanceBenchmark(ctx context.Context, obj *models.PlanITTools) ([]model.OelPerformanceBenchmarkType, error) {
	OelPerformanceBenchmarks := models.ConvertEnums[model.OelPerformanceBenchmarkType](obj.OelPerformanceBenchmark)
	return OelPerformanceBenchmarks, nil
}

// OelProcessAppeals is the resolver for the oelProcessAppeals field.
func (r *planITToolsResolver) OelProcessAppeals(ctx context.Context, obj *models.PlanITTools) ([]model.OelProcessAppealsType, error) {
	OelProcessAppealss := models.ConvertEnums[model.OelProcessAppealsType](obj.OelProcessAppeals)
	return OelProcessAppealss, nil
}

// OelEvaluationContractor is the resolver for the oelEvaluationContractor field.
func (r *planITToolsResolver) OelEvaluationContractor(ctx context.Context, obj *models.PlanITTools) ([]model.OelEvaluationContractorType, error) {
	OelEvaluationContractors := models.ConvertEnums[model.OelEvaluationContractorType](obj.OelEvaluationContractor)
	return OelEvaluationContractors, nil
}

// OelCollectData is the resolver for the oelCollectData field.
func (r *planITToolsResolver) OelCollectData(ctx context.Context, obj *models.PlanITTools) ([]model.OelCollectDataType, error) {
	OelCollectDatas := models.ConvertEnums[model.OelCollectDataType](obj.OelCollectData)
	return OelCollectDatas, nil
}

// OelObtainData is the resolver for the oelObtainData field.
func (r *planITToolsResolver) OelObtainData(ctx context.Context, obj *models.PlanITTools) ([]model.OelObtainDataType, error) {
	OelObtainDatas := models.ConvertEnums[model.OelObtainDataType](obj.OelObtainData)
	return OelObtainDatas, nil
}

// OelClaimsBasedMeasures is the resolver for the oelClaimsBasedMeasures field.
func (r *planITToolsResolver) OelClaimsBasedMeasures(ctx context.Context, obj *models.PlanITTools) ([]model.OelClaimsBasedMeasuresType, error) {
	OelClaimsBasedMeasuress := models.ConvertEnums[model.OelClaimsBasedMeasuresType](obj.OelClaimsBasedMeasures)
	return OelClaimsBasedMeasuress, nil
}

// OelQualityScores is the resolver for the oelQualityScores field.
func (r *planITToolsResolver) OelQualityScores(ctx context.Context, obj *models.PlanITTools) ([]model.OelQualityScoresType, error) {
	OelQualityScoress := models.ConvertEnums[model.OelQualityScoresType](obj.OelQualityScores)
	return OelQualityScoress, nil
}

// OelSendReports is the resolver for the oelSendReports field.
func (r *planITToolsResolver) OelSendReports(ctx context.Context, obj *models.PlanITTools) ([]model.OelSendReportsType, error) {
	OelSendReportss := models.ConvertEnums[model.OelSendReportsType](obj.OelSendReports)
	return OelSendReportss, nil
}

// OelLearningContractor is the resolver for the oelLearningContractor field.
func (r *planITToolsResolver) OelLearningContractor(ctx context.Context, obj *models.PlanITTools) ([]model.OelLearningContractorType, error) {
	OelLearningContractors := models.ConvertEnums[model.OelLearningContractorType](obj.OelLearningContractor)
	return OelLearningContractors, nil
}

// OelParticipantCollaboration is the resolver for the oelParticipantCollaboration field.
func (r *planITToolsResolver) OelParticipantCollaboration(ctx context.Context, obj *models.PlanITTools) ([]model.OelParticipantCollaborationType, error) {
	OelParticipantCollaborations := models.ConvertEnums[model.OelParticipantCollaborationType](obj.OelParticipantCollaboration)
	return OelParticipantCollaborations, nil
}

// OelEducateBeneficiaries is the resolver for the oelEducateBeneficiaries field.
func (r *planITToolsResolver) OelEducateBeneficiaries(ctx context.Context, obj *models.PlanITTools) ([]model.OelEducateBeneficiariesType, error) {
	OelEducateBeneficiariess := models.ConvertEnums[model.OelEducateBeneficiariesType](obj.OelEducateBeneficiaries)
	return OelEducateBeneficiariess, nil
}

// PMakeClaimsPayments is the resolver for the pMakeClaimsPayments field.
func (r *planITToolsResolver) PMakeClaimsPayments(ctx context.Context, obj *models.PlanITTools) ([]model.PMakeClaimsPaymentsType, error) {
	PMakeClaimsPaymentss := models.ConvertEnums[model.PMakeClaimsPaymentsType](obj.PMakeClaimsPayments)
	return PMakeClaimsPaymentss, nil
}

// PInformFfs is the resolver for the pInformFfs field.
func (r *planITToolsResolver) PInformFfs(ctx context.Context, obj *models.PlanITTools) ([]model.PInformFfsType, error) {
	PInformFfss := models.ConvertEnums[model.PInformFfsType](obj.PInformFfs)
	return PInformFfss, nil
}

// PNonClaimsBasedPayments is the resolver for the pNonClaimsBasedPayments field.
func (r *planITToolsResolver) PNonClaimsBasedPayments(ctx context.Context, obj *models.PlanITTools) ([]model.PNonClaimsBasedPaymentsType, error) {
	PNonClaimsBasedPaymentss := models.ConvertEnums[model.PNonClaimsBasedPaymentsType](obj.PNonClaimsBasedPayments)
	return PNonClaimsBasedPaymentss, nil
}

// PSharedSavingsPlan is the resolver for the pSharedSavingsPlan field.
func (r *planITToolsResolver) PSharedSavingsPlan(ctx context.Context, obj *models.PlanITTools) ([]model.PSharedSavingsPlanType, error) {
	PSharedSavingsPlans := models.ConvertEnums[model.PSharedSavingsPlanType](obj.PSharedSavingsPlan)
	return PSharedSavingsPlans, nil
}

// PRecoverPayments is the resolver for the pRecoverPayments field.
func (r *planITToolsResolver) PRecoverPayments(ctx context.Context, obj *models.PlanITTools) ([]model.PRecoverPaymentsType, error) {
	PRecoverPaymentss := models.ConvertEnums[model.PRecoverPaymentsType](obj.PRecoverPayments)
	return PRecoverPaymentss, nil
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
	principal := appcontext.Principal(ctx).ID()

	return resolvers.ModelPlanGetByID(logger, principal, id, r.store)
}

// PlanDocument is the resolver for the planDocument field.
func (r *queryResolver) PlanDocument(ctx context.Context, id uuid.UUID) (*models.PlanDocument, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanDocumentRead(logger, r.store, r.s3Client, id)
}

// PlanDocumentDownloadURL is the resolver for the planDocumentDownloadURL field.
func (r *queryResolver) PlanDocumentDownloadURL(ctx context.Context, id uuid.UUID) (*model.PlanDocumentPayload, error) {
	logger := appcontext.ZLogger(ctx)

	document, err := resolvers.PlanDocumentRead(logger, r.store, r.s3Client, id)
	if err != nil {
		return nil, err
	}

	url, err := r.s3Client.NewGetPresignedURL(document.FileKey)
	if err != nil {
		return nil, err
	}

	return &model.PlanDocumentPayload{
		Document:     document,
		PresignedURL: url,
	}, nil
}

// ReadPlanDocumentByModelID is the resolver for the readPlanDocumentByModelID field.
func (r *queryResolver) ReadPlanDocumentByModelID(ctx context.Context, id uuid.UUID) ([]*models.PlanDocument, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanDocumentsReadByModelPlanID(logger, id, r.store, r.s3Client)
}

// ModelPlanCollection is the resolver for the modelPlanCollection field.
func (r *queryResolver) ModelPlanCollection(ctx context.Context) ([]*models.ModelPlan, error) {
	principal := appcontext.Principal(ctx).ID()
	logger := appcontext.ZLogger(ctx)
	return resolvers.ModelPlanCollectionByUser(logger, principal, r.store)
}

// ExistingModelCollection is the resolver for the existingModelCollection field.
func (r *queryResolver) ExistingModelCollection(ctx context.Context) ([]*models.ExistingModel, error) {
	logger := appcontext.ZLogger(ctx)
	return resolvers.ExistingModelCollectionGet(logger, r.store)
}

// CedarPersonsByCommonName is the resolver for the cedarPersonsByCommonName field.
func (r *queryResolver) CedarPersonsByCommonName(ctx context.Context, commonName string) ([]*models.UserInfo, error) {
	response, err := r.service.SearchCommonNameContains(ctx, commonName)
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

// PlanPayments is the resolver for the planPayments field.
func (r *queryResolver) PlanPayments(ctx context.Context, id uuid.UUID) (*models.PlanPayments, error) {
	logger := appcontext.ZLogger(ctx)

	return resolvers.PlanPaymentsRead(logger, r.store, id)
}

// Email is the resolver for the email field.
func (r *userInfoResolver) Email(ctx context.Context, obj *models.UserInfo) (string, error) {
	return string(obj.Email), nil
}

// ModelPlan returns generated.ModelPlanResolver implementation.
func (r *Resolver) ModelPlan() generated.ModelPlanResolver { return &modelPlanResolver{r} }

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

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

// PlanITTools returns generated.PlanITToolsResolver implementation.
func (r *Resolver) PlanITTools() generated.PlanITToolsResolver { return &planITToolsResolver{r} }

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

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// UserInfo returns generated.UserInfoResolver implementation.
func (r *Resolver) UserInfo() generated.UserInfoResolver { return &userInfoResolver{r} }

type modelPlanResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type planBeneficiariesResolver struct{ *Resolver }
type planDiscussionResolver struct{ *Resolver }
type planDocumentResolver struct{ *Resolver }
type planGeneralCharacteristicsResolver struct{ *Resolver }
type planITToolsResolver struct{ *Resolver }
type planOpsEvalAndLearningResolver struct{ *Resolver }
type planParticipantsAndProvidersResolver struct{ *Resolver }
type planPaymentsResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userInfoResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *planPaymentsResolver) NumberPaymentsPerPayCycleNote(ctx context.Context, obj *models.PlanPayments) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *planPaymentsResolver) AnticipatedPaymentFrequencyNote(ctx context.Context, obj *models.PlanPayments) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *planPaymentsResolver) WillRecoverPaymentsNote(ctx context.Context, obj *models.PlanPayments) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *planPaymentsResolver) AnticipateReconcilingPaymentsRetrospectivelyNote(ctx context.Context, obj *models.PlanPayments) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *planPaymentsResolver) PaymentStartDateNote(ctx context.Context, obj *models.PlanPayments) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *planPaymentsResolver) PayRecipientsOtherSpecification(ctx context.Context, obj *models.PlanPayments) (*string, error) {
	return obj.PayRecipientsOtherSpecification, nil
}
