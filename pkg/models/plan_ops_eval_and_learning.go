package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

//PlanOpsEvalAndLearning represents the tasks list section that handles information around operations, evaluation, and learning
type PlanOpsEvalAndLearning struct {
	ID          uuid.UUID `json:"id" db:"id"`
	ModelPlanID uuid.UUID `json:"modelPlanID" db:"model_plan_id"`

	//Page 1
	AgencyOrStateHelp      pq.StringArray `json:"agencyOrStateHelp" db:"agency_or_state_help"`
	AgencyOrStateHelpNote  *string        `json:"agencyOrStateHelpNote" db:"agency_or_state_help_note"`
	Stakeholders           pq.StringArray `json:"stakeholders" db:"stakeholders"`
	StakeholdersOther      *string        `json:"stakeholdersOther" db:"stakeholders_other"`
	StakeholdersNote       *string        `json:"stakeholdersNote" db:"stakeholders_note"`
	HelpdeskUse            pq.StringArray `json:"helpdeskUse" db:"helpdesk_use"`
	HelpdeskUseOther       *string        `json:"helpdeskUseOther" db:"helpdesk_use_other"`
	HelpdeskUseNote        *string        `json:"helpdeskUseNote" db:"helpdesk_use_note"`
	ContractorSupport      pq.StringArray `json:"contractorSupport" db:"contractor_support"`
	ContractorSupportOther *string        `json:"contractorSupportOther" db:"contractor_support_other"`
	ContractorSupportHow   *string        `json:"contractorSupportHow" db:"contractor_support_how"`
	ContractorSupportNote  *string        `json:"contractorSupportNote" db:"contractor_support_note"`
	IddocSupport           *bool          `json:"iddocSupport" db:"iddoc_support"`
	IddocSupportNote       *string        `json:"iddocSupportNote" db:"iddoc_support_note"`

	//Page 2
	IddocOperations                   IddocOperationsType `json:"iddocOperations" db:"iddoc_operations"`
	IddocOperationsOther              *string             `json:"iddocOperationsOther" db:"iddoc_operations_other"`
	IddocOperationsNote               *string             `json:"iddocOperationsNote" db:"iddoc_operations_note"`
	TechnicalContactsIdentified       *bool               `json:"technicalContactsIdentified" db:"technical_contacts_identified"`
	TechnicalContactsIdentifiedDetail *string             `json:"technicalContactsIdentifiedDetail" db:"technical_contacts_identified_detail"`
	TechnicalContactsIdentifiedNote   *string             `json:"technicalContactsIdentifiedNote" db:"technical_contacts_identified_note"`
	CaptureParticipantInfo            *string             `json:"captureParticipantInfo" db:"capture_participant_info"`
	CaptureParticipantInfoNote        *string             `json:"captureParticipantInfoNote" db:"capture_participant_info_note"`
	IcdOwner                          *string             `json:"icdOwner" db:"icd_owner"`
	DraftIcdDueDate                   *time.Time          `json:"draftIcdDueDate" db:"draft_icd_due_date"`
	IcdNote                           *string             `json:"icdNote" db:"icd_note"`

	//Page 3
	UatNeeds                  *string        `json:"uatNeeds" db:"uat_needs"`
	StcNeeds                  *string        `json:"stcNeeds" db:"stc_needs"`
	TestingTimelines          *string        `json:"testingTimelines" db:"testing_timelines"`
	TestingNote               *string        `json:"testingNote" db:"testing_note"`
	DataMonitoringFileTypes   pq.StringArray `json:"dataMonitoringFileTypes" db:"data_monitoring_file_types"`
	DataMonitoringFileOther   *string        `json:"dataMonitoringFileOther" db:"data_monitoring_file_other"`
	DataResponseType          *string        `json:"dataResponseType" db:"data_response_type"`
	DataResponseFileFrequency *string        `json:"dataResponseFileFrequency" db:"data_response_file_frequency"`

	//Page 4
	DataFullTimeOrIncremental      DataFullTimeOrIncrementalType `json:"dataFullTimeOrIncremental" db:"data_full_time_or_incremental"`
	EftSetUp                       *bool                         `json:"eftSetUp" db:"eft_set_up"`
	UnsolicitedAdjustmentsIncluded *bool                         `json:"unsolicitedAdjustmentsIncluded" db:"unsolicited_adjustments_included"`
	DataFlowDiagramsNeeded         *bool                         `json:"dataFlowDiagramsNeeded" db:"data_flow_diagrams_needed"`
	ProduceBenefitEnhancementFiles *bool                         `json:"produceBenefitEnhancementFiles" db:"produce_benefit_enhancement_files"`
	FileNamingConventions          *string                       `json:"fileNamingConventions" db:"file_naming_conventions"`
	DataMonitoringNote             *string                       `json:"dataMonitoringNote" db:"data_monitoring_note"`

	//Page 5
	BenchmarkForPerformance      BenchmarkForPerformanceType `json:"benchmarkForPerformance" db:"benchmark_for_performance"`
	BenchmarkForPerformanceNote  *string                     `json:"benchmarkForPerformanceNote" db:"benchmark_for_performance_note"`
	ComputePerformanceScores     *bool                       `json:"computePerformanceScores" db:"compute_performance_scores"`
	ComputePerformanceScoresNote *string                     `json:"computePerformanceScoresNote" db:"compute_performance_scores_note"`
	RiskAdjustPerformance        *bool                       `json:"riskAdjustPerformance" db:"risk_adjust_performance"`
	RiskAdjustFeedback           *bool                       `json:"riskAdjustFeedback" db:"risk_adjust_feedback"`
	RiskAdjustPayments           *bool                       `json:"riskAdjustPayments" db:"risk_adjust_payments"`
	RiskAdjustOther              *bool                       `json:"riskAdjustOther" db:"risk_adjust_other"`
	RiskAdjustNote               *string                     `json:"riskAdjustNote" db:"risk_adjust_note"`
	AppealPerformance            *bool                       `json:"appealPerformance" db:"appeal_performance"`
	AppealFeedback               *bool                       `json:"appealFeedback" db:"appeal_feedback"`
	AppealPayments               *bool                       `json:"appealPayments" db:"appeal_payments"`
	AppealOther                  *bool                       `json:"appealOther" db:"appeal_other"`
	AppealNote                   *string                     `json:"appealNote" db:"appeal_note"`

	//Page 6
	EvaluationApproaches          pq.StringArray `json:"evaluationApproaches" db:"evaluation_approaches"`
	EvaluationApproachOther       *string        `json:"evaluationApproachOther" db:"evaluation_approach_other"`
	EvalutaionApproachNote        *string        `json:"evalutaionApproachNote" db:"evalutaion_approach_note"`
	CcmInvolvment                 pq.StringArray `json:"ccmInvolvment" db:"ccm_involvment"`
	CcmInvolvmentOther            *string        `json:"ccmInvolvmentOther" db:"ccm_involvment_other"`
	CcmInvolvmentNote             *string        `json:"ccmInvolvmentNote" db:"ccm_involvment_note"`
	DataNeededForMonitoring       pq.StringArray `json:"dataNeededForMonitoring" db:"data_needed_for_monitoring"`
	DataNeededForMonitoringOther  *string        `json:"dataNeededForMonitoringOther" db:"data_needed_for_monitoring_other"`
	DataNeededForMonitoringNote   *string        `json:"dataNeededForMonitoringNote" db:"data_needed_for_monitoring_note"`
	DataToSendParticicipants      pq.StringArray `json:"dataToSendParticicipants" db:"data_to_send_particicipants"`
	DataToSendParticicipantsOther *string        `json:"dataToSendParticicipantsOther" db:"data_to_send_particicipants_other"`
	DataToSendParticicipantsNote  *string        `json:"dataToSendParticicipantsNote" db:"data_to_send_particicipants_note"`
	ShareCclfData                 *bool          `json:"shareCclfData" db:"share_cclf_data"`
	ShareCclfDataNote             *string        `json:"shareCclfDataNote" db:"share_cclf_data_note"`

	//Page 7
	SendFilesBetweenCcw                          *bool   `json:"sendFilesBetweenCcw" db:"send_files_between_ccw"`
	SendFilesBetweenCcwNote                      *string `json:"sendFilesBetweenCcwNote" db:"send_files_between_ccw_note"`
	AppToSendFilesToKnown                        *bool   `json:"appToSendFilesToKnown" db:"app_to_send_files_to_known"`
	AppToSendFilesToWhich                        *string `json:"appToSendFilesToWhich" db:"app_to_send_files_to_which"`
	AppToSendFilesToNote                         *bool   `json:"appToSendFilesToNote" db:"app_to_send_files_to_note"`
	UseCcwForFileDistribiutionToParticipants     *bool   `json:"useCcwForFileDistribiutionToParticipants" db:"use_ccw_for_file_distribiution_to_participants"`
	UseCcwForFileDistribiutionToParticipantsNote *string `json:"useCcwForFileDistribiutionToParticipantsNote" db:"use_ccw_for_file_distribiution_to_participants_note"`
	DevelopNewQualityMeasures                    *bool   `json:"developNewQualityMeasures" db:"develop_new_quality_measures"`
	DevelopNewQualityMeasuresNote                *string `json:"developNewQualityMeasuresNote" db:"develop_new_quality_measures_note"`
	QualityPerformanceImpactsPayment             *bool   `json:"qualityPerformanceImpactsPayment" db:"quality_performance_impacts_payment"`
	QualityPerformanceImpactsPaymentNote         *string `json:"qualityPerformanceImpactsPaymentNote" db:"quality_performance_impacts_payment_note"`

	//Page 8
	DataSharingStarts            DataStartsType `json:"dataSharingStarts" db:"data_sharing_starts"`
	DataSharingStartsOther       *string        `json:"dataSharingStartsOther" db:"data_sharing_starts_other"`
	DataSharingFrequency         pq.StringArray `json:"dataSharingFrequency" db:"data_sharing_frequency"`
	DataSharingFrequencyOther    *string        `json:"dataSharingFrequencyOther" db:"data_sharing_frequency_other"`
	DataSharingStartsNote        *string        `json:"dataSharingStartsNote" db:"data_sharing_starts_note"`
	DataCollectionStarts         DataStartsType `json:"dataCollectionStarts" db:"data_collection_starts"`
	DataCollectionStartsOther    *string        `json:"dataCollectionStartsOther" db:"data_collection_starts_other"`
	DataCollectionFrequency      pq.StringArray `json:"dataCollectionFrequency" db:"data_collection_frequency"`
	DataCollectionFrequencyOther *string        `json:"dataCollectionFrequencyOther" db:"data_collection_frequency_other"`
	DataCollectionFrequencyNote  *string        `json:"dataCollectionFrequencyNote" db:"data_collection_frequency_note"`
	QualityReportingStarts       DataStartsType `json:"qualityReportingStarts" db:"quality_reporting_starts"`
	QualityReportingStartsOther  *string        `json:"qualityReportingStartsOther" db:"quality_reporting_starts_other"`
	QualityReportingStartsNote   *string        `json:"qualityReportingStartsNote" db:"quality_reporting_starts_note"`

	//Page 9
	ModelLearningSystems      pq.StringArray `json:"modelLearningSystems" db:"model_learning_systems"`
	ModelLearningSystemsOther *string        `json:"modelLearningSystemsOther" db:"model_learning_systems_other"`
	ModelLearningSystemsNote  *string        `json:"modelLearningSystemsNote" db:"model_learning_systems_note"`
	AnticipatedChallenges     *string        `json:"anticipatedChallenges" db:"anticipated_challenges"`

	// Meta
	CreatedBy   string     `json:"createdBy" db:"created_by"`
	CreatedDts  time.Time  `json:"createdDts" db:"created_dts"`
	ModifiedBy  *string    `json:"modifiedBy" db:"modified_by"`
	ModifiedDts *time.Time `json:"modifiedDts" db:"modified_dts"`
	Status      TaskStatus `json:"status" db:"status"`
}

//IddocOperationsType represents the possible IDDOCOPERATIONSTYPE options
type IddocOperationsType string

//These constants represent the choices for IDDOCOPERATIONSTYPE
const (
	IDDACOOS      IddocOperationsType = "ACO_OS"
	IDDACOUI      IddocOperationsType = "ACO_UI"
	IDDINNOVATION IddocOperationsType = "INNOVATION"
	IDDOTHER      IddocOperationsType = "OTHER"
)

//DataStartsType represents the possible DATASTARTSTYPE options
type DataStartsType string

//These constants represent the choices for DATASTARTSTYPE
const (
	DataStartsApplication DataStartsType = "DURING_APPLICATION_PERIOD"
	DataStartsShort       DataStartsType = "SHORTLY_BEFORE_THE_START_DATE"
	DataStartsEarly       DataStartsType = "EARLY_IN_THE_FIRST_PERFORMANCE_YEAR"
	DataStartsLater       DataStartsType = "LATER_IN_THE_FIRST_PERFORMANCE_YEAR"
	DataStartsSubsequent  DataStartsType = "IN_THE_SUBSEQUENT_PERFORMANCE_YEAR"
	DataStartsAtSome      DataStartsType = "AT_SOME_OTHER_POINT_IN_TIME"
	DataStartsNot         DataStartsType = "NOT_PLANNING_TO_DO_THIS"
	DataStartsOther       DataStartsType = "OTHER"
)

//BenchmarkForPerformanceType represents the possible BENCHMARKFORPERFORMANCETYPE options
type BenchmarkForPerformanceType string

//These constants represent the choices for BENCHMARKFORPERFORMANCETYPE
const (
	BenchmarkReconcile   BenchmarkForPerformanceType = "YES_RECONCILE"
	BenchmarkReconcileNo BenchmarkForPerformanceType = "YES_NO_RECONCILE"
	BenchmarkNo          BenchmarkForPerformanceType = "NO"
)

//DataFullTimeOrIncrementalType represents the possible DATAFULLTIMEORINCREMENTALTYPE options
type DataFullTimeOrIncrementalType string

//These constants represent the choices for DATAFULLTIMEORINCREMENTALTYPE
const (
	DataFullTime    DataFullTimeOrIncrementalType = "FULL_TIME"
	DataIncremental DataFullTimeOrIncrementalType = "INCREMENTAL"
)
