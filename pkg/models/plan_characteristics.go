package models

import (
	"time"

	"github.com/google/uuid"
)

type PlanCharacteristics struct {
	ID                                   uuid.UUID      `json:"id" db:"id"`
	ModelPlanID                          uuid.UUID      `json:"modelPlanID" db:"model_plan_id"`
	ExistingModelOrNewTrack              *string        `json:"existingModelOrNewTrack" db:"existing_model_or_new_track"`
	ExistingModel                        *string        `json:"existingModel" db:"existing_model"`
	ResemblesExistingModel               *string        `json:"resemblesExistingModel" db:"resembles_existing_model"`
	ExistingModelResemblance             *string        `json:"existingModelResemblance" db:"existing_model_resemblance"`
	HowModelResemblesNote                *string        `json:"howModelResemblesNote" db:"how_model_resembles_note"`
	HowModelDiffersNote                  *string        `json:"howModelDiffersNote" db:"how_model_differs_note"`
	ModelMatchAddNote                    *string        `json:"modelMatchAddNote" db:"model_match__add_note"`
	DifferentComponents                  TriStateAnswer `json:"differentComponents" db:"different_components"`
	DifferentComponentsNote              *string        `json:"differentComponentsNote" db:"different_components_note"`
	ApmQpp                               TriStateAnswer `json:"apmQpp" db:"apm_qpp"`
	ApmQppType                           *string        `json:"apmQppType" db:"apm_qpp_type"`
	ApmQppNote                           *string        `json:"apmQppNote" db:"apm_qpp_note"`
	ModelKeyCharacteristics              *string        `json:"modelKeyCharacteristics" db:"model_key_characteristics"`
	ModelKeyCharacteristicsOther         *string        `json:"modelKeyCharacteristicsOther" db:"model_key_characteristics_other"`
	ModelKeyCharacteristicsNote          *string        `json:"modelKeyCharacteristicsNote" db:"model_key_characteristics_note"`
	MedicareReviewPlanBids               TriStateAnswer `json:"medicareReviewPlanBids" db:"medicare_review_plan_bids"`
	MedicareReviewPlanBidsNote           *string        `json:"medicareReviewPlanBidsNote" db:"medicare_review_plan_bids_note"`
	MedicareManageEnrollment             TriStateAnswer `json:"medicareManageEnrollment" db:"medicare_manage_enrollment"`
	MedicareManageEnrollmentNote         *string        `json:"medicareManageEnrollmentNote" db:"medicare_manage_enrollment_note"`
	UpdatedPlanContact                   TriStateAnswer `json:"updatedPlanContact" db:"updated_plan_contact"`
	UpdatedPlanContactNote               *string        `json:"updatedPlanContactNote" db:"updated_plan_contact_note"`
	CareCoordinationInvolved             TriStateAnswer `json:"careCoordinationInvolved" db:"care_coordination_involved"`
	CareCoordinationInvolvedNote         *string        `json:"careCoordinationInvolvedNote" db:"care_coordination_involved_note"`
	AdditionalServicesInvolved           TriStateAnswer `json:"additionalServicesInvolved" db:"additional_services_involved"`
	AdditionalServicesInvolvedNote       *string        `json:"additionalServicesInvolvedNote" db:"additional_services_involved_note"`
	CommunityPartnersInvolved            TriStateAnswer `json:"communityPartnersInvolved" db:"community_partners_involved"`
	CommunityPartnersInvolvedNote        *string        `json:"communityPartnersInvolvedNote" db:"community_partners_involved_note"`
	TargetedAtSpecificGeographies        TriStateAnswer `json:"targetedAtSpecificGeographies" db:"targeted_at_specific_geographies"`
	GeographyType                        *string        `json:"geographyType" db:"geography_type"`
	GeographyTypeOther                   *string        `json:"geographyTypeOther" db:"geography_type_other"`
	GeographiesAppliedTo                 *string        `json:"geographiesAppliedTo" db:"geographies_applied_to"`
	GeographiesAppliedToOther            *string        `json:"geographiesAppliedToOther" db:"geographies_applied_to_other"`
	TargetedAtSpecificGeographiesNote    *string        `json:"targetedAtSpecificGeographiesNote" db:"targeted_at_specific_geographies_note"`
	DifferentOptionsForParticipation     TriStateAnswer `json:"differentOptionsForParticipation" db:"different_options_for_participation"`
	DifferentOptionsForParticipationNote *string        `json:"differentOptionsForParticipationNote" db:"different_options_for_participation_note"`
	AgreementType                        *string        `json:"agreementType" db:"agreement_type"`
	AgreementTypeOther                   *string        `json:"agreementTypeOther" db:"agreement_type_other"`
	AgreementTypeNote                    *string        `json:"agreementTypeNote" db:"agreement_type_note"`
	RuleMaking                           TriStateAnswer `json:"ruleMaking" db:"rule_making"`
	RuleMakingDetails                    *string        `json:"ruleMakingDetails" db:"rule_making_details"`
	RuleMakingNote                       *string        `json:"ruleMakingNote" db:"rule_making_note"`
	AutthorityToTest                     *string        `json:"autthorityToTest" db:"autthority_to_test"`
	AutthorityToTestOther                *string        `json:"autthorityToTestOther" db:"autthority_to_test_other"`
	AuthorityToTestNote                  *string        `json:"authorityToTestNote" db:"authority_to_test_note"`
	WaiversRequired                      TriStateAnswer `json:"waiversRequired" db:"waivers_required"`
	WaiverType                           *string        `json:"waiverType" db:"waiver_type"`
	WaiverNote                           *string        `json:"waiverNote" db:"waiver_note"`
	CreatedBy                            *string        `json:"createdBy" db:"created_by"`
	CreatedDts                           *time.Time     `json:"createdDts" db:"created_dts"`
	ModifiedBy                           *string        `json:"modifiedBy" db:"modified_by"`
	ModifiedDts                          *time.Time     `json:"modifiedDts" db:"modified_dts"`
	Status                               *string        `json:"status" db:"status"`
}
