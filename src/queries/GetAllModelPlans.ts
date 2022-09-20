import { gql } from '@apollo/client';
// This is a query to get ALL data for ALL models, used for exporting/reporting features
export default gql`
  query GetAllModelPlans {
    modelPlanCollection {
      id
      modelName
      archived
      createdBy
      createdDts
      modifiedBy
      modifiedDts
      basics {
        id
        modelCategory
        cmsCenters
        cmsOther
        cmmiGroups
        modelType
        problem
        goal
        testInterventions
        note
        completeICIP
        clearanceStarts
        clearanceEnds
        announced
        applicationsStart
        applicationsEnd
        performancePeriodStarts
        performancePeriodEnds
        highLevelNote
        wrapUpEnds
        phasedIn
        phasedInNote
        readyForReviewBy
        readyForReviewDts
        createdBy
        createdDts
        modifiedBy
        modifiedDts
        status
      }
      beneficiaries {
        id
        beneficiaries
        beneficiariesOther
        beneficiariesNote
        treatDualElligibleDifferent
        treatDualElligibleDifferentHow
        treatDualElligibleDifferentNote
        excludeCertainCharacteristics
        excludeCertainCharacteristicsCriteria
        excludeCertainCharacteristicsNote
        beneficiarySelectionFrequency
        beneficiarySelectionFrequencyNote
        beneficiarySelectionFrequencyOther
        beneficiaryOverlap
        beneficiaryOverlapNote
        precedenceRules
        readyForReviewBy
        readyForReviewDts
        status
        numberPeopleImpacted
        estimateConfidence
        confidenceNote
        beneficiarySelectionNote
        beneficiarySelectionOther
        beneficiarySelectionMethod
      }
      discussions {
        id
        content
        createdBy
        createdDts
        status
        replies {
          id
          discussionID
          content
          createdBy
          createdDts
          resolution
        }
      }
      collaborators {
        id
        fullName
        euaUserID
        email
        teamRole
        modelPlanID
        createdDts
      }
      generalCharacteristics {
        id
        rulemakingRequired
        rulemakingRequiredDescription
        rulemakingRequiredNote
        authorityAllowances
        authorityAllowancesOther
        authorityAllowancesNote
        waiversRequired
        waiversRequiredTypes
        waiversRequiredNote
        readyForReviewBy
        readyForReviewDts
        status
        isNewModel
        existingModel
        resemblesExistingModel
        resemblesExistingModelWhich
        resemblesExistingModelHow
        resemblesExistingModelNote
        hasComponentsOrTracks
        hasComponentsOrTracksDiffer
        hasComponentsOrTracksNote
        careCoordinationInvolved
        careCoordinationInvolvedDescription
        careCoordinationInvolvedNote
        additionalServicesInvolved
        additionalServicesInvolvedDescription
        additionalServicesInvolvedNote
        communityPartnersInvolved
        communityPartnersInvolvedDescription
        communityPartnersInvolvedNote
        alternativePaymentModel
        alternativePaymentModelTypes
        alternativePaymentModelNote
        keyCharacteristics
        keyCharacteristicsNote
        keyCharacteristicsOther
        collectPlanBids
        collectPlanBidsNote
        managePartCDEnrollment
        managePartCDEnrollmentNote
        planContactUpdated
        planContactUpdatedNote
        geographiesTargeted
        geographiesTargetedTypes
        geographiesTargetedTypesOther
        geographiesTargetedAppliedTo
        geographiesTargetedAppliedToOther
        geographiesTargetedNote
        participationOptions
        participationOptionsNote
        agreementTypes
        agreementTypesOther
        multiplePatricipationAgreementsNeeded
        multiplePatricipationAgreementsNeededNote
      }
      itTools {
        id
        gcPartCD
        gcPartCDOther
        gcPartCDNote
        gcCollectBids
        gcCollectBidsOther
        gcCollectBidsNote
        gcUpdateContract
        gcUpdateContractOther
        gcUpdateContractNote
        ppToAdvertise
        ppToAdvertiseOther
        ppToAdvertiseNote
        ppCollectScoreReview
        ppCollectScoreReviewOther
        ppCollectScoreReviewNote
        ppAppSupportContractor
        ppAppSupportContractorOther
        ppAppSupportContractorNote
        ppCommunicateWithParticipant
        ppCommunicateWithParticipantOther
        ppCommunicateWithParticipantNote
        ppManageProviderOverlap
        ppManageProviderOverlapOther
        ppManageProviderOverlapNote
        bManageBeneficiaryOverlap
        bManageBeneficiaryOverlapOther
        bManageBeneficiaryOverlapNote
        oelHelpdeskSupport
        oelHelpdeskSupportOther
        oelHelpdeskSupportNote
        oelManageAco
        oelManageAcoOther
        oelManageAcoNote
        oelPerformanceBenchmark
        oelPerformanceBenchmarkOther
        oelPerformanceBenchmarkNote
        oelProcessAppeals
        oelProcessAppealsOther
        oelProcessAppealsNote
        oelEvaluationContractor
        oelEvaluationContractorOther
        oelEvaluationContractorNote
        oelCollectData
        oelCollectDataOther
        oelCollectDataNote
        oelObtainData
        oelObtainDataOther
        oelObtainDataNote
        oelClaimsBasedMeasures
        oelClaimsBasedMeasuresOther
        oelClaimsBasedMeasuresNote
        oelQualityScores
        oelQualityScoresOther
        oelQualityScoresNote
        oelSendReports
        oelSendReportsOther
        oelSendReportsNote
        oelLearningContractor
        oelLearningContractorOther
        oelLearningContractorNote
        oelParticipantCollaboration
        oelParticipantCollaborationOther
        oelParticipantCollaborationNote
        oelEducateBeneficiaries
        oelEducateBeneficiariesOther
        oelEducateBeneficiariesNote
        pMakeClaimsPayments
        pMakeClaimsPaymentsOther
        pMakeClaimsPaymentsNote
        pInformFfs
        pInformFfsOther
        pInformFfsNote
        pNonClaimsBasedPayments
        pNonClaimsBasedPaymentsOther
        pNonClaimsBasedPaymentsNote
        pSharedSavingsPlan
        pSharedSavingsPlanOther
        pSharedSavingsPlanNote
        pRecoverPayments
        pRecoverPaymentsOther
        pRecoverPaymentsNote
      }
      opsEvalAndLearning {
        id
        ccmInvolvment
        iddocSupport
        sendFilesBetweenCcw
        sendFilesBetweenCcwNote
        appToSendFilesToKnown
        appToSendFilesToWhich
        appToSendFilesToNote
        useCcwForFileDistribiutionToParticipants
        useCcwForFileDistribiutionToParticipantsNote
        developNewQualityMeasures
        developNewQualityMeasuresNote
        qualityPerformanceImpactsPayment
        qualityPerformanceImpactsPaymentNote
        dataSharingStarts
        dataSharingStartsOther
        dataSharingFrequency
        dataSharingFrequencyOther
        dataSharingStartsNote
        dataCollectionStarts
        dataCollectionStartsOther
        dataCollectionFrequency
        dataCollectionFrequencyOther
        dataCollectionFrequencyNote
        qualityReportingStarts
        qualityReportingStartsOther
        qualityReportingStartsNote
        evaluationApproaches
        evaluationApproachOther
        evalutaionApproachNote
        ccmInvolvmentOther
        ccmInvolvmentNote
        dataNeededForMonitoring
        dataNeededForMonitoringOther
        dataNeededForMonitoringNote
        dataToSendParticicipants
        dataToSendParticicipantsOther
        dataToSendParticicipantsNote
        shareCclfData
        shareCclfDataNote
        technicalContactsIdentified
        technicalContactsIdentifiedDetail
        technicalContactsIdentifiedNote
        captureParticipantInfo
        captureParticipantInfoNote
        icdOwner
        draftIcdDueDate
        icdNote
        dataFullTimeOrIncremental
        eftSetUp
        unsolicitedAdjustmentsIncluded
        dataFlowDiagramsNeeded
        produceBenefitEnhancementFiles
        fileNamingConventions
        dataMonitoringNote
        uatNeeds
        stcNeeds
        testingTimelines
        testingNote
        dataMonitoringFileTypes
        dataMonitoringFileOther
        dataResponseType
        dataResponseFileFrequency
        modelLearningSystems
        modelLearningSystemsOther
        modelLearningSystemsNote
        anticipatedChallenges
        readyForReviewBy
        readyForReviewDts
        status
        agencyOrStateHelp
        agencyOrStateHelpOther
        agencyOrStateHelpNote
        stakeholders
        stakeholdersOther
        stakeholdersNote
        helpdeskUse
        helpdeskUseNote
        contractorSupport
        contractorSupportOther
        contractorSupportHow
        contractorSupportNote
        iddocSupportNote
        benchmarkForPerformance
        benchmarkForPerformanceNote
        computePerformanceScores
        computePerformanceScoresNote
        riskAdjustPerformance
        riskAdjustFeedback
        riskAdjustPayments
        riskAdjustOther
        riskAdjustNote
        appealPerformance
        appealFeedback
        appealPayments
        appealOther
        appealNote
      }
      participantsAndProviders {
        id
        communicationMethod
        communicationMethodOther
        communicationNote
        participantAssumeRisk
        riskType
        riskOther
        riskNote
        willRiskChange
        willRiskChangeNote
        coordinateWork
        coordinateWorkNote
        gainsharePayments
        gainsharePaymentsTrack
        gainsharePaymentsNote
        participantsIds
        participantsIdsOther
        participantsIDSNote
        expectedNumberOfParticipants
        estimateConfidence
        confidenceNote
        recruitmentMethod
        recruitmentOther
        recruitmentNote
        selectionMethod
        selectionOther
        selectionNote
        participants
        medicareProviderType
        statesEngagement
        participantsOther
        participantsNote
        participantsCurrentlyInModels
        participantsCurrentlyInModelsNote
        modelApplicationLevel
        providerAdditionFrequency
        providerAdditionFrequencyOther
        providerAdditionFrequencyNote
        providerAddMethod
        providerAddMethodOther
        providerAddMethodNote
        providerLeaveMethod
        providerLeaveMethodOther
        providerLeaveMethodNote
        providerOverlap
        providerOverlapHierarchy
        providerOverlapNote
        readyForReviewBy
        readyForReviewDts
        status
      }
      payments {
        id
        payType
        payClaims
        creatingDependenciesBetweenServices
        creatingDependenciesBetweenServicesNote
        needsClaimsDataCollection
        needsClaimsDataCollectionNote
        providingThirdPartyFile
        isContractorAwareTestDataRequirements
        beneficiaryCostSharingLevelAndHandling
        waiveBeneficiaryCostSharingForAnyServices
        waiveBeneficiaryCostSharingServiceSpecification
        waiverOnlyAppliesPartOfPayment
        waiveBeneficiaryCostSharingNote
        payClaimsNote
        payClaimsOther
        shouldAnyProvidersExcludedFFSSystems
        shouldAnyProviderExcludedFFSSystemsNote
        changesMedicarePhysicianFeeSchedule
        changesMedicarePhysicianFeeScheduleNote
        affectsMedicareSecondaryPayerClaims
        affectsMedicareSecondaryPayerClaimsHow
        affectsMedicareSecondaryPayerClaimsNote
        payModelDifferentiation
        expectedCalculationComplexityLevel
        expectedCalculationComplexityLevelNote
        canParticipantsSelectBetweenPaymentMechanisms
        canParticipantsSelectBetweenPaymentMechanismsHow
        canParticipantsSelectBetweenPaymentMechanismsNote
        anticipatedPaymentFrequency
        anticipatedPaymentFrequencyOther
        anticipatedPaymentFrequencyNote
        fundingSource
        fundingSourceTrustFund
        fundingSourceOther
        fundingSourceNote
        fundingSourceR
        fundingSourceRTrustFund
        fundingSourceROther
        fundingSourceRNote
        payRecipients
        payRecipientsOtherSpecification
        payRecipientsNote
        payTypeNote
        nonClaimsPayments
        nonClaimsPaymentOther
        paymentCalculationOwner
        numberPaymentsPerPayCycle
        numberPaymentsPerPayCycleNote
        sharedSystemsInvolvedAdditionalClaimPayment
        sharedSystemsInvolvedAdditionalClaimPaymentNote
        planningToUseInnovationPaymentContractor
        planningToUseInnovationPaymentContractorNote
        fundingStructure
        willRecoverPayments
        willRecoverPaymentsNote
        anticipateReconcilingPaymentsRetrospectively
        anticipateReconcilingPaymentsRetrospectivelyNote
        paymentStartDate
        paymentStartDateNote
        readyForReviewBy
        readyForReviewDts
        status
      }
      status
    }
  }
`;
