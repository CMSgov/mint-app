const csvFields = [
  {
    label: 'Model ID',
    value: 'id'
  },
  {
    label: 'Model Name',
    value: 'modelName'
  },
  {
    label: 'Status',
    value: 'status'
  },
  {
    label: 'Created By',
    value: 'createdBy'
  },
  {
    label: 'Created At',
    value: 'createdDts'
  },
  {
    label: 'Modified By',
    value: 'modifiedBy'
  },
  {
    label: 'Modified At',
    value: 'modifiedDts'
  },

  // Basics
  'basics.modelCategory',
  'basics.cmsCenters', // array
  'basics.cmmiGroups', // array
  'basics.cmsOther',
  'basics.modelType',
  'basics.problem',
  'basics.goal',
  'basics.testInterventions',
  'basics.note',
  'basics.completeICIP',
  'basics.clearanceStarts',
  'basics.clearanceEnds',
  'basics.announced',
  'basics.applicationsStart',
  'basics.applicationsEnd',
  'basics.performancePeriodStarts',
  'basics.performancePeriodEnds',
  'basics.highLevelNote',
  'basics.wrapUpEnds',
  'basics.phasedIn',
  'basics.phasedInNote',
  'basics.status',
  // 'basics.',

  // Beneficiaries
  'beneficiaries.beneficiaries', // array
  'beneficiaries.beneficiarySelectionMethod', // array
  'beneficiaries.beneficiariesNote',
  'beneficiaries.beneficiariesOther',
  'beneficiaries.beneficiaryOverlap',
  'beneficiaries.beneficiaryOverlapNote',
  'beneficiaries.beneficiarySelectionNote',
  'beneficiaries.beneficiarySelectionOther',
  'beneficiaries.beneficiarySelectionMethod',
  'beneficiaries.treatDualElligibleDifferent',
  'beneficiaries.treatDualElligibleDifferentHow',
  'beneficiaries.treatDualElligibleDifferentNote',
  'beneficiaries.excludeCertainCharacteristics',
  'beneficiaries.excludeCertainCharacteristicsCriteria',
  'beneficiaries.excludeCertainCharacteristicsNote',
  'beneficiaries.beneficiarySelectionFrequency',
  'beneficiaries.beneficiarySelectionFrequencyNote',
  'beneficiaries.beneficiarySelectionFrequencyOther',
  'beneficiaries.precedenceRules',
  'beneficiaries.status',
  'beneficiaries.numberPeopleImpacted',
  'beneficiaries.estimateConfidence',
  'beneficiaries.confidenceNote',

  // Collaborators
  'collaborators.euaUserID',
  'collaborators.fullName',
  'collaborators.teamRole',

  // Discussions
  'discussions.content',
  'discussions.createdBy',
  'discussions.createdDts',
  'discussions.status',

  // Discussion Replies
  'discussions.replies.discussionID',
  'discussions.replies.content',
  'discussions.replies.createdBy',
  'discussions.replies.createdDts',
  'discussions.replies.resolution',

  // General Characteristics
  'generalCharacteristics.rulemakingRequired',
  'generalCharacteristics.rulemakingRequiredDescription',
  'generalCharacteristics.rulemakingRequiredNote',
  'generalCharacteristics.authorityAllowances', // array
  'generalCharacteristics.authorityAllowancesOther',
  'generalCharacteristics.authorityAllowancesNote',
  'generalCharacteristics.waiversRequired',
  'generalCharacteristics.waiversRequiredTypes', // array
  'generalCharacteristics.waiversRequiredNote',
  'generalCharacteristics.readyForReviewBy',
  'generalCharacteristics.readyForReviewDts',
  'generalCharacteristics.status',
  'generalCharacteristics.isNewModel',
  'generalCharacteristics.existingModel',
  'generalCharacteristics.resemblesExistingModel',
  'generalCharacteristics.resemblesExistingModelWhich', // array
  'generalCharacteristics.resemblesExistingModelHow',
  'generalCharacteristics.resemblesExistingModelNote',
  'generalCharacteristics.hasComponentsOrTracks',
  'generalCharacteristics.hasComponentsOrTracksDiffer',
  'generalCharacteristics.hasComponentsOrTracksNote',
  'generalCharacteristics.careCoordinationInvolved',
  'generalCharacteristics.careCoordinationInvolvedDescription',
  'generalCharacteristics.careCoordinationInvolvedNote',
  'generalCharacteristics.additionalServicesInvolved',
  'generalCharacteristics.additionalServicesInvolvedDescription',
  'generalCharacteristics.additionalServicesInvolvedNote',
  'generalCharacteristics.communityPartnersInvolved',
  'generalCharacteristics.communityPartnersInvolvedDescription',
  'generalCharacteristics.communityPartnersInvolvedNote',
  'generalCharacteristics.alternativePaymentModel',
  'generalCharacteristics.alternativePaymentModelTypes', // array
  'generalCharacteristics.alternativePaymentModelNote',
  'generalCharacteristics.keyCharacteristics', // array
  'generalCharacteristics.keyCharacteristicsNote',
  'generalCharacteristics.keyCharacteristicsOther',
  'generalCharacteristics.collectPlanBids',
  'generalCharacteristics.collectPlanBidsNote',
  'generalCharacteristics.managePartCDEnrollment',
  'generalCharacteristics.managePartCDEnrollmentNote',
  'generalCharacteristics.planContractUpdated',
  'generalCharacteristics.planContractUpdatedNote',
  'generalCharacteristics.geographiesTargeted',
  'generalCharacteristics.geographiesTargetedTypes', // array
  'generalCharacteristics.geographiesTargetedTypesOther',
  'generalCharacteristics.geographiesTargetedAppliedTo', // array
  'generalCharacteristics.geographiesTargetedAppliedToOther',
  'generalCharacteristics.geographiesTargetedNote',
  'generalCharacteristics.participationOptions',
  'generalCharacteristics.participationOptionsNote',
  'generalCharacteristics.agreementTypes', // array
  'generalCharacteristics.agreementTypesOther',
  'generalCharacteristics.multiplePatricipationAgreementsNeeded',
  'generalCharacteristics.multiplePatricipationAgreementsNeededNote',

  // IT Tools
  'itTools.gcPartCD', // array
  'itTools.gcPartCDOther',
  'itTools.gcPartCDNote',
  'itTools.gcCollectBids', // array
  'itTools.gcCollectBidsOther',
  'itTools.gcCollectBidsNote',
  'itTools.gcUpdateContract', // array
  'itTools.gcUpdateContractOther',
  'itTools.gcUpdateContractNote',
  'itTools.ppToAdvertise', // array
  'itTools.ppToAdvertiseOther',
  'itTools.ppToAdvertiseNote',
  'itTools.ppCollectScoreReview', // array
  'itTools.ppCollectScoreReviewOther',
  'itTools.ppCollectScoreReviewNote',
  'itTools.ppAppSupportContractor', // array
  'itTools.ppAppSupportContractorOther',
  'itTools.ppAppSupportContractorNote',
  'itTools.ppCommunicateWithParticipant', // array
  'itTools.ppCommunicateWithParticipantOther',
  'itTools.ppCommunicateWithParticipantNote',
  'itTools.ppManageProviderOverlap', // array
  'itTools.ppManageProviderOverlapOther',
  'itTools.ppManageProviderOverlapNote',
  'itTools.bManageBeneficiaryOverlap', // array
  'itTools.bManageBeneficiaryOverlapOther',
  'itTools.bManageBeneficiaryOverlapNote',
  'itTools.oelHelpdeskSupport', // array
  'itTools.oelHelpdeskSupportOther',
  'itTools.oelHelpdeskSupportNote',
  'itTools.oelManageAco', // array
  'itTools.oelManageAcoOther',
  'itTools.oelManageAcoNote',
  'itTools.oelPerformanceBenchmark', // array
  'itTools.oelPerformanceBenchmarkOther',
  'itTools.oelPerformanceBenchmarkNote',
  'itTools.oelProcessAppeals', // array
  'itTools.oelProcessAppealsOther',
  'itTools.oelProcessAppealsNote',
  'itTools.oelEvaluationContractor', // array
  'itTools.oelEvaluationContractorOther',
  'itTools.oelEvaluationContractorNote',
  'itTools.oelCollectData', // array
  'itTools.oelCollectDataOther',
  'itTools.oelCollectDataNote',
  'itTools.oelObtainData', // array
  'itTools.oelObtainDataOther',
  'itTools.oelObtainDataNote',
  'itTools.oelClaimsBasedMeasures', // array
  'itTools.oelClaimsBasedMeasuresOther',
  'itTools.oelClaimsBasedMeasuresNote',
  'itTools.oelQualityScores', // array
  'itTools.oelQualityScoresOther',
  'itTools.oelQualityScoresNote',
  'itTools.oelSendReports', // array
  'itTools.oelSendReportsOther',
  'itTools.oelSendReportsNote',
  'itTools.oelLearningContractor', // array
  'itTools.oelLearningContractorOther',
  'itTools.oelLearningContractorNote',
  'itTools.oelParticipantCollaboration', // array
  'itTools.oelParticipantCollaborationOther',
  'itTools.oelParticipantCollaborationNote',
  'itTools.oelEducateBeneficiaries', // array
  'itTools.oelEducateBeneficiariesOther',
  'itTools.oelEducateBeneficiariesNote',
  'itTools.pMakeClaimsPayments', // array
  'itTools.pMakeClaimsPaymentsOther',
  'itTools.pMakeClaimsPaymentsNote',
  'itTools.pInformFfs', // array
  'itTools.pInformFfsOther',
  'itTools.pInformFfsNote',
  'itTools.pNonClaimsBasedPayments', // array
  'itTools.pNonClaimsBasedPaymentsOther',
  'itTools.pNonClaimsBasedPaymentsNote',
  'itTools.pSharedSavingsPlan', // array
  'itTools.pSharedSavingsPlanOther',
  'itTools.pSharedSavingsPlanNote',
  'itTools.pRecoverPayments', // array
  'itTools.pRecoverPaymentsOther',
  'itTools.pRecoverPaymentsNote',

  // Ops and Eval Learning
  'opsEvalAndLearning.ccmInvolvment', // array
  'opsEvalAndLearning.ccmInvolvmentOther',
  'opsEvalAndLearning.ccmInvolvmentNote',
  'opsEvalAndLearning.iddocSupport',
  'opsEvalAndLearning.iddocSupportNote',
  'opsEvalAndLearning.sendFilesBetweenCcw',
  'opsEvalAndLearning.sendFilesBetweenCcwNote',
  'opsEvalAndLearning.appToSendFilesToKnown',
  'opsEvalAndLearning.appToSendFilesToWhich',
  'opsEvalAndLearning.appToSendFilesToNote',
  'opsEvalAndLearning.useCcwForFileDistribiutionToParticipants',
  'opsEvalAndLearning.useCcwForFileDistribiutionToParticipantsNote',
  'opsEvalAndLearning.developNewQualityMeasures',
  'opsEvalAndLearning.developNewQualityMeasuresNote',
  'opsEvalAndLearning.qualityPerformanceImpactsPayment',
  'opsEvalAndLearning.qualityPerformanceImpactsPaymentNote',
  'opsEvalAndLearning.dataSharingStarts',
  'opsEvalAndLearning.dataSharingStartsOther',
  'opsEvalAndLearning.dataSharingFrequency', // array
  'opsEvalAndLearning.dataSharingFrequencyOther',
  'opsEvalAndLearning.dataSharingStartsNote',
  'opsEvalAndLearning.dataCollectionStarts',
  'opsEvalAndLearning.dataCollectionStartsOther',
  'opsEvalAndLearning.dataCollectionFrequency', // array
  'opsEvalAndLearning.dataCollectionFrequencyOther',
  'opsEvalAndLearning.dataCollectionFrequencyNote',
  'opsEvalAndLearning.qualityReportingStarts',
  'opsEvalAndLearning.qualityReportingStartsOther',
  'opsEvalAndLearning.qualityReportingStartsNote',
  'opsEvalAndLearning.evaluationApproaches', // array
  'opsEvalAndLearning.evaluationApproachOther',
  'opsEvalAndLearning.evalutaionApproachNote',
  'opsEvalAndLearning.dataNeededForMonitoring', // array
  'opsEvalAndLearning.dataNeededForMonitoringOther',
  'opsEvalAndLearning.dataNeededForMonitoringNote',
  'opsEvalAndLearning.dataToSendParticicipants', // array
  'opsEvalAndLearning.dataToSendParticicipantsOther',
  'opsEvalAndLearning.dataToSendParticicipantsNote',
  'opsEvalAndLearning.shareCclfData',
  'opsEvalAndLearning.shareCclfDataNote',
  'opsEvalAndLearning.technicalContactsIdentified',
  'opsEvalAndLearning.technicalContactsIdentifiedDeta',
  'opsEvalAndLearning.technicalContactsIdentifiedNote',
  'opsEvalAndLearning.captureParticipantInfo',
  'opsEvalAndLearning.captureParticipantInfoNote',
  'opsEvalAndLearning.icdOwner',
  'opsEvalAndLearning.draftIcdDueDate',
  'opsEvalAndLearning.icdNote',
  'opsEvalAndLearning.dataFullTimeOrIncremental',
  'opsEvalAndLearning.eftSetUp',
  'opsEvalAndLearning.unsolicitedAdjustmentsIncluded',
  'opsEvalAndLearning.dataFlowDiagramsNeeded',
  'opsEvalAndLearning.produceBenefitEnhancementFiles',
  'opsEvalAndLearning.fileNamingConventions',
  'opsEvalAndLearning.dataMonitoringNote',
  'opsEvalAndLearning.uatNeeds',
  'opsEvalAndLearning.stcNeeds',
  'opsEvalAndLearning.testingTimelines',
  'opsEvalAndLearning.testingNote',
  'opsEvalAndLearning.dataMonitoringFileTypes', // array
  'opsEvalAndLearning.dataMonitoringFileOther',
  'opsEvalAndLearning.dataResponseType',
  'opsEvalAndLearning.dataResponseFileFrequency',
  'opsEvalAndLearning.modelLearningSystems', // array
  'opsEvalAndLearning.modelLearningSystemsOther',
  'opsEvalAndLearning.modelLearningSystemsNote',
  'opsEvalAndLearning.anticipatedChallenges',
  'opsEvalAndLearning.readyForReviewBy',
  'opsEvalAndLearning.readyForReviewDts',
  'opsEvalAndLearning.agencyOrStateHelp', // array
  'opsEvalAndLearning.agencyOrStateHelpOther',
  'opsEvalAndLearning.agencyOrStateHelpNote',
  'opsEvalAndLearning.stakeholders', // array
  'opsEvalAndLearning.stakeholdersOther',
  'opsEvalAndLearning.stakeholdersNote',
  'opsEvalAndLearning.helpdeskUse',
  'opsEvalAndLearning.helpdeskUseNote',
  'opsEvalAndLearning.contractorSupport', // array
  'opsEvalAndLearning.contractorSupportOther',
  'opsEvalAndLearning.contractorSupportHow',
  'opsEvalAndLearning.contractorSupportNote',
  'opsEvalAndLearning.benchmarkForPerformance',
  'opsEvalAndLearning.benchmarkForPerformanceNote',
  'opsEvalAndLearning.computePerformanceScores',
  'opsEvalAndLearning.computePerformanceScoresNote',
  'opsEvalAndLearning.riskAdjustPerformance',
  'opsEvalAndLearning.riskAdjustFeedback',
  'opsEvalAndLearning.riskAdjustPayments',
  'opsEvalAndLearning.riskAdjustOther',
  'opsEvalAndLearning.riskAdjustNote',
  'opsEvalAndLearning.appealPerformance',
  'opsEvalAndLearning.appealFeedback',
  'opsEvalAndLearning.appealPayments',
  'opsEvalAndLearning.appealOther',
  'opsEvalAndLearning.appealNote',
  'opsEvalAndLearning.status',

  // Participants and Providers
  'participantsAndProviders.communicationMethod', // array
  'participantsAndProviders.communicationMethodOther',
  'participantsAndProviders.communicationNote',
  'participantsAndProviders.participantAssumeRisk',
  'participantsAndProviders.riskType',
  'participantsAndProviders.riskOther',
  'participantsAndProviders.riskNote',
  'participantsAndProviders.willRiskChange',
  'participantsAndProviders.willRiskChangeNote',
  'participantsAndProviders.coordinateWork',
  'participantsAndProviders.coordinateWorkNote',
  'participantsAndProviders.gainsharePayments',
  'participantsAndProviders.gainsharePaymentsTrack',
  'participantsAndProviders.gainsharePaymentsNote',
  'participantsAndProviders.participantsIds', // array
  'participantsAndProviders.participantsIdsOther',
  'participantsAndProviders.participantsIDSNote',
  'participantsAndProviders.expectedNumberOfParticipants',
  'participantsAndProviders.estimateConfidence',
  'participantsAndProviders.confidenceNote',
  'participantsAndProviders.recruitmentMethod',
  'participantsAndProviders.recruitmentOther',
  'participantsAndProviders.recruitmentNote',
  'participantsAndProviders.selectionMethod', // array
  'participantsAndProviders.selectionOther',
  'participantsAndProviders.selectionNote',
  'participantsAndProviders.participants', // array
  'participantsAndProviders.medicareProviderType',
  'participantsAndProviders.statesEngagement',
  'participantsAndProviders.participantsOther',
  'participantsAndProviders.participantsNote',
  'participantsAndProviders.participantsCurrentlyInModels',
  'participantsAndProviders.participantsCurrentlyInModelsNote',
  'participantsAndProviders.modelApplicationLevel',
  'participantsAndProviders.providerAdditionFrequency',
  'participantsAndProviders.providerAdditionFrequencyOther',
  'participantsAndProviders.providerAdditionFrequencyNote',
  'participantsAndProviders.providerAddMethod', // array
  'participantsAndProviders.providerAddMethodOther',
  'participantsAndProviders.providerAddMethodNote',
  'participantsAndProviders.providerLeaveMethod', // array
  'participantsAndProviders.providerLeaveMethodOther',
  'participantsAndProviders.providerLeaveMethodNote',
  'participantsAndProviders.providerOverlap',
  'participantsAndProviders.providerOverlapHierarchy',
  'participantsAndProviders.providerOverlapNote',
  'participantsAndProviders.readyForReviewBy',
  'participantsAndProviders.readyForReviewDts',
  'participantsAndProviders.status',

  // Payments
  'payments.payType', // array
  'payments.payTypeNote',
  'payments.payClaims', // array
  'payments.payClaimsNote',
  'payments.payClaimsOther',
  'payments.creatingDependenciesBetweenServices',
  'payments.creatingDependenciesBetweenServicesNote',
  'payments.needsClaimsDataCollection',
  'payments.needsClaimsDataCollectionNote',
  'payments.providingThirdPartyFile',
  'payments.isContractorAwareTestDataRequirements',
  'payments.beneficiaryCostSharingLevelAndHandling',
  'payments.waiveBeneficiaryCostSharingForAnyServices',
  'payments.waiveBeneficiaryCostSharingServiceSpecification',
  'payments.waiverOnlyAppliesPartOfPayment',
  'payments.waiveBeneficiaryCostSharingNote',
  'payments.shouldAnyProvidersExcludedFFSSystems',
  'payments.shouldAnyProviderExcludedFFSSystemsNote',
  'payments.changesMedicarePhysicianFeeSchedule',
  'payments.changesMedicarePhysicianFeeScheduleNote',
  'payments.affectsMedicareSecondaryPayerClaims',
  'payments.affectsMedicareSecondaryPayerClaimsHow',
  'payments.affectsMedicareSecondaryPayerClaimsNote',
  'payments.payModelDifferentiation',
  'payments.expectedCalculationComplexityLevel',
  'payments.expectedCalculationComplexityLevelNote',
  'payments.canParticipantsSelectBetweenPaymentMechanisms',
  'payments.canParticipantsSelectBetweenPaymentMechanismsHow',
  'payments.canParticipantsSelectBetweenPaymentMechanismsNote',
  'payments.anticipatedPaymentFrequency', // array
  'payments.anticipatedPaymentFrequencyOther',
  'payments.anticipatedPaymentFrequencyNote',
  'payments.fundingSource', // array
  'payments.fundingSourceTrustFund',
  'payments.fundingSourceOther',
  'payments.fundingSourceNote',
  'payments.fundingSourceR', // array
  'payments.fundingSourceRTrustFund',
  'payments.fundingSourceROther',
  'payments.fundingSourceRNote',
  'payments.payRecipients', // array
  'payments.payRecipientsOtherSpecification',
  'payments.payRecipientsNote',
  'payments.nonClaimsPayments', // array
  'payments.nonClaimsPaymentOther',
  'payments.paymentCalculationOwner',
  'payments.numberPaymentsPerPayCycle',
  'payments.numberPaymentsPerPayCycleNote',
  'payments.sharedSystemsInvolvedAdditionalClaimPayment',
  'payments.sharedSystemsInvolvedAdditionalClaimPaymentNote',
  'payments.planningToUseInnovationPaymentContractor',
  'payments.planningToUseInnovationPaymentContractorNote',
  'payments.fundingStructure',
  'payments.willRecoverPayments',
  'payments.willRecoverPaymentsNote',
  'payments.anticipateReconcilingPaymentsRetrospectively',
  'payments.anticipateReconcilingPaymentsRetrospectivelyNote',
  'payments.paymentStartDate',
  'payments.paymentStartDateNote',
  'payments.readyForReviewBy',
  'payments.readyForReviewDts',
  'payments.status'
];

const fieldsToUnwind = [
  'collaborators',
  'basics.cmsCenters',
  'basics.cmmiGroups',
  'beneficiaries.beneficiaries',
  'beneficiaries.beneficiarySelectionMethod',
  'discussions',
  'discussions.replies',
  'generalCharacteristics.authorityAllowances',
  'generalCharacteristics.waiversRequiredTypes',
  'generalCharacteristics.resemblesExistingModelWhich',
  'generalCharacteristics.alternativePaymentModelTypes',
  'generalCharacteristics.keyCharacteristics',
  'generalCharacteristics.geographiesTargetedTypes',
  'generalCharacteristics.geographiesTargetedAppliedTo',
  'generalCharacteristics.agreementTypes',
  'itTools.gcPartCD',
  'itTools.gcCollectBids',
  'itTools.gcUpdateContract',
  'itTools.ppToAdvertise',
  'itTools.ppCollectScoreReview',
  'itTools.ppAppSupportContractor',
  'itTools.ppCommunicateWithParticipant',
  'itTools.ppManageProviderOverlap',
  'itTools.bManageBeneficiaryOverlap',
  'itTools.oelHelpdeskSupport',
  'itTools.oelManageAco',
  'itTools.oelPerformanceBenchmark',
  'itTools.oelProcessAppeals',
  'itTools.oelEvaluationContractor',
  'itTools.oelCollectData',
  'itTools.oelObtainData',
  'itTools.oelClaimsBasedMeasures',
  'itTools.oelQualityScores',
  'itTools.oelSendReports',
  'itTools.oelLearningContractor',
  'itTools.oelParticipantCollaboration',
  'itTools.oelEducateBeneficiaries',
  'itTools.pMakeClaimsPayments',
  'itTools.pInformFfs',
  'itTools.pNonClaimsBasedPayments',
  'itTools.pSharedSavingsPlan',
  'itTools.pRecoverPayments',
  'opsEvalAndLearning.agencyOrStateHelp',
  'opsEvalAndLearning.ccmInvolvment',
  'opsEvalAndLearning.contractorSupport',
  'opsEvalAndLearning.dataCollectionFrequency',
  'opsEvalAndLearning.dataMonitoringFileTypes',
  'opsEvalAndLearning.dataNeededForMonitoring',
  'opsEvalAndLearning.dataSharingFrequency',
  'opsEvalAndLearning.dataToSendParticicipants',
  'opsEvalAndLearning.evaluationApproaches',
  'opsEvalAndLearning.modelLearningSystems',
  'opsEvalAndLearning.stakeholders',
  'participantsAndProviders.communicationMethod',
  'participantsAndProviders.participants',
  'participantsAndProviders.participantsIds',
  'participantsAndProviders.providerAddMethod',
  'participantsAndProviders.providerLeaveMethod',
  'participantsAndProviders.selectionMethod',
  'payments.anticipatedPaymentFrequency',
  'payments.fundingSource',
  'payments.fundingSourceR',
  'payments.nonClaimsPayments',
  'payments.payClaims',
  'payments.payRecipients',
  'payments.payType'
];

export { csvFields, fieldsToUnwind };
