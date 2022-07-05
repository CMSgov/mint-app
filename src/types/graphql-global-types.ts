/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AgreementType {
  COOPERATIVE = "COOPERATIVE",
  OTHER = "OTHER",
  PARTICIPATION = "PARTICIPATION",
}

export enum AlternativePaymentModelType {
  ADVANCED = "ADVANCED",
  MIPS = "MIPS",
  REGULAR = "REGULAR",
}

export enum AuthorityAllowance {
  ACA = "ACA",
  CONGRESSIONALLY_MANDATED = "CONGRESSIONALLY_MANDATED",
  OTHER = "OTHER",
  SSA_PART_B = "SSA_PART_B",
}

export enum BeneficiariesType {
  DISEASE_SPECIFIC = "DISEASE_SPECIFIC",
  DUALLY_ELIGIBLE = "DUALLY_ELIGIBLE",
  MEDICAID = "MEDICAID",
  MEDICARE_ADVANTAGE = "MEDICARE_ADVANTAGE",
  MEDICARE_FFS = "MEDICARE_FFS",
  MEDICARE_PART_D = "MEDICARE_PART_D",
  NA = "NA",
  OTHER = "OTHER",
}

export enum CMMIGroup {
  PATIENT_CARE_MODELS_GROUP = "PATIENT_CARE_MODELS_GROUP",
  POLICY_AND_PROGRAMS_GROUP = "POLICY_AND_PROGRAMS_GROUP",
  PREVENTIVE_AND_POPULATION_HEALTH_CARE_MODELS_GROUP = "PREVENTIVE_AND_POPULATION_HEALTH_CARE_MODELS_GROUP",
  SEAMLESS_CARE_MODELS_GROUP = "SEAMLESS_CARE_MODELS_GROUP",
  STATE_INNOVATIONS_GROUP = "STATE_INNOVATIONS_GROUP",
}

export enum CMSCenter {
  CENTER_FOR_CLINICAL_STANDARDS_AND_QUALITY = "CENTER_FOR_CLINICAL_STANDARDS_AND_QUALITY",
  CENTER_FOR_MEDICARE = "CENTER_FOR_MEDICARE",
  CENTER_FOR_PROGRAM_INTEGRITY = "CENTER_FOR_PROGRAM_INTEGRITY",
  CMMI = "CMMI",
  FEDERAL_COORDINATED_HEALTH_CARE_OFFICE = "FEDERAL_COORDINATED_HEALTH_CARE_OFFICE",
  OTHER = "OTHER",
}

export enum ConfidenceType {
  COMPLETELY = "COMPLETELY",
  FAIRLY = "FAIRLY",
  NOT_AT_ALL = "NOT_AT_ALL",
  SLIGHTLY = "SLIGHTLY",
}

export enum DiscussionStatus {
  ANSWERED = "ANSWERED",
  UNANSWERED = "UNANSWERED",
  WAITING_FOR_RESPONSE = "WAITING_FOR_RESPONSE",
}

export enum DocumentType {
  CONCEPT_PAPER = "CONCEPT_PAPER",
  ICIP_DRAFT = "ICIP_DRAFT",
  MARKET_RESEARCH = "MARKET_RESEARCH",
  OTHER = "OTHER",
  POLICY_PAPER = "POLICY_PAPER",
}

export enum FrequencyType {
  ANNUALLY = "ANNUALLY",
  BIANNUALLY = "BIANNUALLY",
  MONTHLY = "MONTHLY",
  OTHER = "OTHER",
  QUARTERLY = "QUARTERLY",
  ROLLING = "ROLLING",
}

export enum GeographyApplication {
  BENEFICIARIES = "BENEFICIARIES",
  OTHER = "OTHER",
  PARTICIPANTS = "PARTICIPANTS",
  PROVIDERS = "PROVIDERS",
}

export enum GeographyType {
  OTHER = "OTHER",
  REGION = "REGION",
  STATE = "STATE",
}

export enum KeyCharacteristic {
  EPISODE_BASED = "EPISODE_BASED",
  OTHER = "OTHER",
  PART_C = "PART_C",
  PART_D = "PART_D",
  PAYMENT = "PAYMENT",
  POPULATION_BASED = "POPULATION_BASED",
  PREVENTATIVE = "PREVENTATIVE",
  SERVICE_DELIVERY = "SERVICE_DELIVERY",
  SHARED_SAVINGS = "SHARED_SAVINGS",
}

export enum ModelCategory {
  ACCOUNTABLE_CARE = "ACCOUNTABLE_CARE",
  DEMONSTRATION = "DEMONSTRATION",
  EPISODE_BASED_PAYMENT_INITIATIVES = "EPISODE_BASED_PAYMENT_INITIATIVES",
  INIT_ACCEL_DEV_AND_TEST = "INIT_ACCEL_DEV_AND_TEST",
  INIT_MEDICAID_CHIP_POP = "INIT_MEDICAID_CHIP_POP",
  INIT_SPEED_ADOPT_BEST_PRACTICE = "INIT_SPEED_ADOPT_BEST_PRACTICE",
  INIT__MEDICARE_MEDICAID_ENROLLEES = "INIT__MEDICARE_MEDICAID_ENROLLEES",
  PRIMARY_CARE_TRANSFORMATION = "PRIMARY_CARE_TRANSFORMATION",
  UNKNOWN = "UNKNOWN",
}

export enum ModelStatus {
  ANNOUNCED = "ANNOUNCED",
  CLEARED = "CLEARED",
  CMS_CLEARANCE = "CMS_CLEARANCE",
  HHS_CLEARANCE = "HHS_CLEARANCE",
  ICIP_COMPLETE = "ICIP_COMPLETE",
  INTERNAL_CMMI_CLEARANCE = "INTERNAL_CMMI_CLEARANCE",
  OMB_ASRF_CLEARANCE = "OMB_ASRF_CLEARANCE",
  PLAN_COMPLETE = "PLAN_COMPLETE",
  PLAN_DRAFT = "PLAN_DRAFT",
}

export enum ModelType {
  MANDATORY = "MANDATORY",
  TBD = "TBD",
  VOLUNTARY = "VOLUNTARY",
}

export enum OverlapType {
  NO = "NO",
  YES_NEED_POLICIES = "YES_NEED_POLICIES",
  YES_NO_ISSUES = "YES_NO_ISSUES",
}

export enum ParticipantCommunicationType {
  IT_TOOL = "IT_TOOL",
  MASS_EMAIL = "MASS_EMAIL",
  NO_COMMUNICATION = "NO_COMMUNICATION",
  OTHER = "OTHER",
}

export enum ParticipantRiskType {
  CAPITATION = "CAPITATION",
  ONE_SIDED = "ONE_SIDED",
  OTHER = "OTHER",
  TWO_SIDED = "TWO_SIDED",
}

export enum ParticipantSelectionType {
  APPLICATION_REVIEW_AND_SCORING_TOOL = "APPLICATION_REVIEW_AND_SCORING_TOOL",
  APPLICATION_SUPPORT_CONTRACTOR = "APPLICATION_SUPPORT_CONTRACTOR",
  BASIC_CRITERIA = "BASIC_CRITERIA",
  CMS_COMPONENT_OR_PROCESS = "CMS_COMPONENT_OR_PROCESS",
  MODEL_TEAM_REVIEW_APPLICATIONS = "MODEL_TEAM_REVIEW_APPLICATIONS",
  NO_SELECTING_PARTICIPANTS = "NO_SELECTING_PARTICIPANTS",
  OTHER = "OTHER",
  SUPPORT_FROM_CMMI = "SUPPORT_FROM_CMMI",
}

export enum ParticipantsIDType {
  CCNS = "CCNS",
  NO_IDENTIFIERS = "NO_IDENTIFIERS",
  NPIS = "NPIS",
  OTHER = "OTHER",
  TINS = "TINS",
}

export enum ParticipantsType {
  COMMERCIAL_PAYERS = "COMMERCIAL_PAYERS",
  COMMUNITY_BASED_ORGANIZATIONS = "COMMUNITY_BASED_ORGANIZATIONS",
  CONVENER = "CONVENER",
  ENTITIES = "ENTITIES",
  MEDICAID_MANAGED_CARE_ORGANIZATIONS = "MEDICAID_MANAGED_CARE_ORGANIZATIONS",
  MEDICAID_PROVIDERS = "MEDICAID_PROVIDERS",
  MEDICARE_ADVANTAGE_PLANS = "MEDICARE_ADVANTAGE_PLANS",
  MEDICARE_ADVANTAGE_PRESCRIPTION_DRUG_PLANS = "MEDICARE_ADVANTAGE_PRESCRIPTION_DRUG_PLANS",
  MEDICARE_PROVIDERS = "MEDICARE_PROVIDERS",
  NON_PROFIT_ORGANIZATIONS = "NON_PROFIT_ORGANIZATIONS",
  OTHER = "OTHER",
  STANDALONE_PART_D_PLANS = "STANDALONE_PART_D_PLANS",
  STATES = "STATES",
  STATE_MEDICAID_AGENCIES = "STATE_MEDICAID_AGENCIES",
}

export enum ProviderAddType {
  MANDATORILY = "MANDATORILY",
  NA = "NA",
  ONLINE_TOOLS = "ONLINE_TOOLS",
  OTHER = "OTHER",
  PROSPECTIVELY = "PROSPECTIVELY",
  RETROSPECTIVELY = "RETROSPECTIVELY",
  VOLUNTARILY = "VOLUNTARILY",
}

export enum ProviderLeaveType {
  AFTER_A_CERTAIN_WITH_IMPLICATIONS = "AFTER_A_CERTAIN_WITH_IMPLICATIONS",
  NOT_ALLOWED_TO_LEAVE = "NOT_ALLOWED_TO_LEAVE",
  NOT_APPLICABLE = "NOT_APPLICABLE",
  OTHER = "OTHER",
  VARIES_BY_TYPE_OF_PROVIDER = "VARIES_BY_TYPE_OF_PROVIDER",
  VOLUNTARILY_WITHOUT_IMPLICATIONS = "VOLUNTARILY_WITHOUT_IMPLICATIONS",
}

export enum RecruitmentType {
  LOI = "LOI",
  NA = "NA",
  NOFO = "NOFO",
  OTHER = "OTHER",
  RFA = "RFA",
}

export enum SelectionMethodType {
  HISTORICAL = "HISTORICAL",
  NA = "NA",
  OTHER = "OTHER",
  PROSPECTIVE = "PROSPECTIVE",
  PROVIDER_SIGN_UP = "PROVIDER_SIGN_UP",
  RETROSPECTIVE = "RETROSPECTIVE",
  VOLUNTARY = "VOLUNTARY",
}

export enum TaskStatus {
  COMPLETE = "COMPLETE",
  IN_PROGRESS = "IN_PROGRESS",
  READY = "READY",
}

export enum TeamRole {
  EVALUATION = "EVALUATION",
  LEADERSHIP = "LEADERSHIP",
  LEARNING = "LEARNING",
  MODEL_LEAD = "MODEL_LEAD",
  MODEL_TEAM = "MODEL_TEAM",
}

export enum TriStateAnswer {
  NO = "NO",
  TBD = "TBD",
  YES = "YES",
}

export enum WaiverType {
  FRAUD_ABUSE = "FRAUD_ABUSE",
  MEDICAID = "MEDICAID",
  PROGRAM_PAYMENT = "PROGRAM_PAYMENT",
}

/**
 * DiscussionReplyCreateInput represents the necessary fields to create a discussion reply
 */
export interface DiscussionReplyCreateInput {
  discussionID: UUID;
  content: string;
  resolution: boolean;
}

/**
 * Input associated with a document to be uploaded
 */
export interface GeneratePresignedUploadURLInput {
  fileName: string;
  mimeType: string;
  size: number;
}

/**
 * ModelPlanChanges represents the possible changes you can make to a model plan when updating it.
 * Fields explicitly set with NULL will be unset, and omitted fields will be left unchanged.
 * https: // gqlgen.com/reference/changesets/
 */
export interface ModelPlanChanges {
  modelName?: string | null;
  modelCategory?: ModelCategory | null;
  cmsCenters?: CMSCenter[] | null;
  cmsOther?: string | null;
  cmmiGroups?: CMMIGroup[] | null;
  someNumbers?: number[] | null;
  archived?: boolean | null;
  status?: ModelStatus | null;
}

/**
 * PlanBasicsChanges represents the possible changes you can make to a Plan Basics object when updating it.
 * Fields explicitly set with NULL will be unset, and omitted fields will be left unchanged.
 * https: // gqlgen.com/reference/changesets/
 */
export interface PlanBasicsChanges {
  modelType?: ModelType | null;
  problem?: string | null;
  goal?: string | null;
  testInterventions?: string | null;
  note?: string | null;
}

export interface PlanBeneficiariesChanges {
  beneficiaries?: BeneficiariesType[] | null;
  beneficiariesOther?: string | null;
  beneficiariesNote?: string | null;
  treatDualElligibleDifferent?: TriStateAnswer | null;
  treatDualElligibleDifferentHow?: string | null;
  treatDualElligibleDifferentNote?: string | null;
  excludeCertainCharacteristics?: TriStateAnswer | null;
  excludeCertainCharacteristicsCriteria?: string | null;
  excludeCertainCharacteristicsNote?: string | null;
  numberPeopleImpacted?: number | null;
  estimateConfidence?: ConfidenceType | null;
  confidenceNote?: string | null;
  beneficiarySelectionMethod?: SelectionMethodType[] | null;
  beneficiarySelectionOther?: string | null;
  beneficiarySelectionNote?: string | null;
  beneficiarySelectionFrequency?: FrequencyType | null;
  beneficiarySelectionFrequencyOther?: string | null;
  beneficiarySelectionFrequencyNote?: string | null;
  beneficiaryOverlap?: OverlapType | null;
  beneficiaryOverlapNote?: string | null;
  precedenceRules?: string | null;
}

/**
 * PlanCollaboratorCreateInput represents the data required to create a collaborator on a plan
 */
export interface PlanCollaboratorCreateInput {
  modelPlanID: UUID;
  euaUserID: string;
  fullName: string;
  teamRole: TeamRole;
}

/**
 * PlanDiscussionChanges represents the possible changes you can make to a plan discussion when updating it.
 * Fields explicitly set with NULL will be unset, and omitted fields will be left unchanged.
 * https: // gqlgen.com/reference/changesets/
 */
export interface PlanDiscussionChanges {
  content?: string | null;
  status?: DiscussionStatus | null;
}

/**
 * PlanDiscussionCreateInput represents the necessary fields to create a plan discussion
 */
export interface PlanDiscussionCreateInput {
  modelPlanID: UUID;
  content: string;
}

/**
 * PlanDocumentInput represents the data required to create, modify, or delete a document on a plan
 */
export interface PlanDocumentInput {
  id?: UUID | null;
  modelPlanID: UUID;
  documentParameters: PlanDocumentParameters;
  url?: string | null;
}

/**
 * PlanDocumentCreateParameters represents the specific data required to create or modify a document on a plan
 */
export interface PlanDocumentParameters {
  fileName?: string | null;
  fileSize: number;
  fileType?: string | null;
  documentType?: DocumentType | null;
  otherTypeDescription?: string | null;
  optionalNotes?: string | null;
}

/**
 * PlanGeneralCharacteristicsChanges represents the possible changes you can make to a
 * general characteristics object when updating it.
 * Fields explicitly set with NULL will be unset, and omitted fields will be left unchanged.
 * https: // gqlgen.com/reference/changesets/
 */
export interface PlanGeneralCharacteristicsChanges {
  isNewModel?: boolean | null;
  existingModel?: string | null;
  resemblesExistingModel?: boolean | null;
  resemblesExistingModelWhich?: string[] | null;
  resemblesExistingModelHow?: string | null;
  resemblesExistingModelNote?: string | null;
  hasComponentsOrTracks?: boolean | null;
  hasComponentsOrTracksDiffer?: string | null;
  hasComponentsOrTracksNote?: string | null;
  alternativePaymentModel?: boolean | null;
  alternativePaymentModelTypes?: AlternativePaymentModelType[] | null;
  alternativePaymentModelNote?: string | null;
  keyCharacteristics?: KeyCharacteristic[] | null;
  keyCharacteristicsOther?: string | null;
  keyCharacteristicsNote?: string | null;
  collectPlanBids?: boolean | null;
  collectPlanBidsNote?: string | null;
  managePartCDEnrollment?: boolean | null;
  managePartCDEnrollmentNote?: string | null;
  planContactUpdated?: boolean | null;
  planContactUpdatedNote?: string | null;
  careCoordinationInvolved?: boolean | null;
  careCoordinationInvolvedDescription?: string | null;
  careCoordinationInvolvedNote?: string | null;
  additionalServicesInvolved?: boolean | null;
  additionalServicesInvolvedDescription?: string | null;
  additionalServicesInvolvedNote?: string | null;
  communityPartnersInvolved?: boolean | null;
  communityPartnersInvolvedDescription?: string | null;
  communityPartnersInvolvedNote?: string | null;
  geographiesTargeted?: boolean | null;
  geographiesTargetedTypes?: GeographyType[] | null;
  geographiesTargetedTypesOther?: string | null;
  geographiesTargetedAppliedTo?: GeographyApplication[] | null;
  geographiesTargetedAppliedToOther?: string | null;
  geographiesTargetedNote?: string | null;
  participationOptions?: boolean | null;
  participationOptionsNote?: string | null;
  agreementTypes?: AgreementType[] | null;
  agreementTypesOther?: string | null;
  multiplePatricipationAgreementsNeeded?: boolean | null;
  multiplePatricipationAgreementsNeededNote?: string | null;
  rulemakingRequired?: boolean | null;
  rulemakingRequiredDescription?: string | null;
  rulemakingRequiredNote?: string | null;
  authorityAllowances?: AuthorityAllowance[] | null;
  authorityAllowancesOther?: string | null;
  authorityAllowancesNote?: string | null;
  waiversRequired?: boolean | null;
  waiversRequiredTypes?: WaiverType[] | null;
  waiversRequiredNote?: string | null;
}

/**
 * PlanMilestoneChanges represents the possible changes you can make to a Plan Milestones object when updating it.
 * Fields explicitly set with NULL will be unset, and omitted fields will be left unchanged.
 * https: // gqlgen.com/reference/changesets/
 */
export interface PlanMilestoneChanges {
  completeICIP?: Time | null;
  clearanceStarts?: Time | null;
  clearanceEnds?: Time | null;
  announced?: Time | null;
  applicationsStart?: Time | null;
  applicationsEnd?: Time | null;
  performancePeriodStarts?: Time | null;
  performancePeriodEnds?: Time | null;
  wrapUpEnds?: Time | null;
  highLevelNote?: string | null;
  phasedIn?: boolean | null;
  phasedInNote?: string | null;
}

/**
 * PlanParticipantsAndProvidersChanges represents the possible changes you can make to a
 * providers and participants object when updating it.
 * Fields explicitly set with NULL will be unset, and omitted fields will be left unchanged.
 * https: // gqlgen.com/reference/changesets/
 */
export interface PlanParticipantsAndProvidersChanges {
  participants?: ParticipantsType[] | null;
  medicareProviderType?: string | null;
  statesEngagement?: string | null;
  participantsOther?: string | null;
  participantsNote?: string | null;
  participantsCurrentlyInModels?: boolean | null;
  participantsCurrentlyInModelsNote?: string | null;
  modelApplicationLevel?: string | null;
  expectedNumberOfParticipants?: number | null;
  estimateConfidence?: ConfidenceType | null;
  confidenceNote?: string | null;
  recruitmentMethod?: RecruitmentType | null;
  recruitmentOther?: string | null;
  recruitmentNote?: string | null;
  selectionMethod?: ParticipantSelectionType[] | null;
  selectionOther?: string | null;
  selectionNote?: string | null;
  communicationMethod?: ParticipantCommunicationType[] | null;
  communicationMethodOther?: string | null;
  communicationNote?: string | null;
  participantAssumeRisk?: boolean | null;
  riskType?: ParticipantRiskType | null;
  riskOther?: string | null;
  riskNote?: string | null;
  willRiskChange?: boolean | null;
  willRiskChangeNote?: string | null;
  coordinateWork?: boolean | null;
  coordinateWorkNote?: string | null;
  gainsharePayments?: boolean | null;
  gainsharePaymentsTrack?: boolean | null;
  gainsharePaymentsNote?: string | null;
  participantsIds?: ParticipantsIDType[] | null;
  participantsIdsOther?: string | null;
  participantsIDSNote?: string | null;
  providerAdditionFrequency?: FrequencyType | null;
  providerAdditionFrequencyOther?: string | null;
  providerAdditionFrequencyNote?: string | null;
  providerAddMethod?: ProviderAddType[] | null;
  providerAddMethodOther?: string | null;
  providerAddMethodNote?: string | null;
  providerLeaveMethod?: ProviderLeaveType[] | null;
  providerLeaveMethodOther?: string | null;
  providerLeaveMethodNote?: string | null;
  providerOverlap?: OverlapType | null;
  providerOverlapHierarchy?: string | null;
  providerOverlapNote?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
