package models

import (
	"github.com/lib/pq"
)

// PlanParticipantsAndProviders represents the tasks list section that handles information around participants and providers
type PlanParticipantsAndProviders struct {
	baseTaskListSectionUserTable

	//page 1
	Participants                      pq.StringArray `json:"participants" db:"participants"`
	MedicareProviderType              *string        `json:"medicareProviderType" db:"medicare_provider_type"`
	StatesEngagement                  *string        `json:"statesEngagement" db:"states_engagement"`
	ParticipantsOther                 *string        `json:"participantsOther" db:"participants_other"`
	ParticipantsNote                  *string        `json:"participantsNote" db:"participants_note"`
	ParticipantsCurrentlyInModels     *bool          `json:"participantsCurrentlyInModels" db:"participants_currently_in_models" statusWeight:"1"`
	ParticipantsCurrentlyInModelsNote *string        `json:"participantsCurrentlyInModelsNote" db:"participants_currently_in_models_note"`
	ModelApplicationLevel             *string        `json:"modelApplicationLevel" db:"model_application_level"`

	//page 2
	ExpectedNumberOfParticipants *int             `json:"expectedNumberOfParticipants" db:"expected_number_of_participants" statusWeight:"1"`
	EstimateConfidence           *ConfidenceType  `json:"estimateConfidence" db:"estimate_confidence" statusWeight:"1"`
	ConfidenceNote               *string          `json:"confidenceNote" db:"confidence_note"`
	RecruitmentMethod            *RecruitmentType `json:"recruitmentMethod" db:"recruitment_method" statusWeight:"1"`
	RecruitmentOther             *string          `json:"recruitmentOther" db:"recruitment_other"`
	RecruitmentNote              *string          `json:"recruitmentNote" db:"recruitment_note"`
	SelectionMethod              pq.StringArray   `json:"selectionMethod" db:"selection_method"`
	SelectionOther               *string          `json:"selectionOther" db:"selection_other"`
	SelectionNote                *string          `json:"selectionNote" db:"selection_note"`

	//page 3
	CommunicationMethod      pq.StringArray       `json:"communicationMethod" db:"communication_method"`
	CommunicationMethodOther *string              `json:"communicationMethodOther" db:"communication_method_other"`
	CommunicationNote        *string              `json:"communicationNote" db:"communication_note"`
	ParticipantAssumeRisk    *bool                `json:"participantAssumeRisk" db:"participant_assume_risk" statusWeight:"1"`
	RiskType                 *ParticipantRiskType `json:"riskType" db:"risk_type"`
	RiskOther                *string              `json:"riskOther" db:"risk_other"`
	RiskNote                 *string              `json:"riskNote" db:"risk_note"`
	WillRiskChange           *bool                `json:"willRiskChange" db:"will_risk_change" statusWeight:"1"`
	WillRiskChangeNote       *string              `json:"willRiskChangeNote" db:"will_risk_change_note"`

	//page 4
	CoordinateWork         *bool          `json:"coordinateWork" db:"coordinate_work" statusWeight:"1"`
	CoordinateWorkNote     *string        `json:"coordinateWorkNote" db:"coordinate_work_note"`
	GainsharePayments      *bool          `json:"gainsharePayments" db:"gainshare_payments" statusWeight:"1"`
	GainsharePaymentsTrack *bool          `json:"gainsharePaymentsTrack" db:"gainshare_payments_track"`
	GainsharePaymentsNote  *string        `json:"gainsharePaymentsNote" db:"gainshare_payments_note"`
	ParticipantsIds        pq.StringArray `json:"participantsIds" db:"participants_ids"`
	ParticipantsIdsOther   *string        `json:"participantsIdsOther" db:"participants_ids_other"`
	ParticipantsIDSNote    *string        `json:"participantsIDSNote" db:"participants_ids_note"`

	//page 5
	ProviderAdditionFrequency      *FrequencyType `json:"providerAdditionFrequency" db:"provider_addition_frequency" statusWeight:"1"`
	ProviderAdditionFrequencyOther *string        `json:"providerAdditionFrequencyOther" db:"provider_addition_frequency_other"`
	ProviderAdditionFrequencyNote  *string        `json:"providerAdditionFrequencyNote" db:"provider_addition_frequency_note"`
	ProviderAddMethod              pq.StringArray `json:"providerAddMethod" db:"provider_add_method"`
	ProviderAddMethodOther         *string        `json:"providerAddMethodOther" db:"provider_add_method_other"`
	ProviderAddMethodNote          *string        `json:"providerAddMethodNote" db:"provider_add_method_note"`
	ProviderLeaveMethod            pq.StringArray `json:"providerLeaveMethod" db:"provider_leave_method"`
	ProviderLeaveMethodOther       *string        `json:"providerLeaveMethodOther" db:"provider_leave_method_other"`
	ProviderLeaveMethodNote        *string        `json:"providerLeaveMethodNote" db:"provider_leave_method_note"`
	ProviderOverlap                *OverlapType   `json:"providerOverlap" db:"provider_overlap" statusWeight:"1"`
	ProviderOverlapHierarchy       *string        `json:"providerOverlapHierarchy" db:"provider_overlap_hierarchy"`
	ProviderOverlapNote            *string        `json:"providerOverlapNote" db:"provider_overlap_note"`
}

// RecruitmentType represents the possible RecruitmentType options
type RecruitmentType string

// These constants represent the choices for Recruitment Type
const (
	RecruitmentLOI           RecruitmentType = "LOI"
	RecruitmentAPPCOLLECTION RecruitmentType = "APPLICATION_COLLECTION_TOOL"
	RecruitmentNOFO          RecruitmentType = "NOFO"
	RecruitmentOTHER         RecruitmentType = "OTHER"
	RecruitmentNA            RecruitmentType = "NA"
)

// ParticipantRiskType represents the possible RiskType values
type ParticipantRiskType string

// These constants represent the choices for Participant Risk Type
const (
	RiskTWOSIDED   ParticipantRiskType = "TWO_SIDED"
	RiskONESIDED   ParticipantRiskType = "ONE_SIDED"
	RiskCAPITATION ParticipantRiskType = "CAPITATION"
	RiskOTHER      ParticipantRiskType = "OTHER"
)

// NewPlanParticipantsAndProviders returns a new plan Beneficiaries
func NewPlanParticipantsAndProviders(tls baseTaskListSectionUserTable) *PlanParticipantsAndProviders {
	return &PlanParticipantsAndProviders{
		baseTaskListSectionUserTable: tls,
	}
}
