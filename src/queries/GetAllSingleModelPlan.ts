import { gql } from '@apollo/client';
// This is a query to get ALL data for a single model, used for exporting/reporting features
export default gql`
  query GetAllSingleModelData($id: UUID!) {
    modelPlan(id: $id) {
      id
      modelName
      nameHistory(sort: DESC)
      abbreviation
      archived
      createdByUserAccount {
        commonName
      }
      createdDts
      status
      basics {
        id
        modelCategory
        amsModelID
        demoCode
        cmsCenters
        cmmiGroups
        modelType
        modelTypeOther
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
        readyForReviewByUserAccount {
          commonName
        }
        readyForReviewDts
        status
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
        isNewModel
        existingModel
        resemblesExistingModel
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
        agencyOrStateHelp
        agencyOrStateHelpOther
        agencyOrStateHelpNote
        alternativePaymentModelTypes
        alternativePaymentModelNote
        keyCharacteristics
        keyCharacteristicsNote
        keyCharacteristicsOther
        collectPlanBids
        collectPlanBidsNote
        managePartCDEnrollment
        managePartCDEnrollmentNote
        planContractUpdated
        planContractUpdatedNote
        geographiesTargeted
        geographiesTargetedTypes
        geographiesStatesAndTerritories
        geographiesRegionTypes
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
        readyForReviewByUserAccount {
          commonName
        }
        readyForReviewDts
        status
      }
      participantsAndProviders {
        id
        participantAddedFrequency
        participantAddedFrequencyContinually
        participantAddedFrequencyOther
        participantAddedFrequencyNote
        participantRemovedFrequency
        participantRemovedFrequencyContinually
        participantRemovedFrequencyOther
        participantRemovedFrequencyNote
        communicationMethod
        communicationMethodOther
        communicationNote
        riskType
        riskOther
        riskNote
        willRiskChange
        willRiskChangeNote
        coordinateWork
        coordinateWorkNote
        gainsharePayments
        gainsharePaymentsTrack
        gainsharePaymentsEligibility
        gainsharePaymentsEligibilityOther
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
        providerAdditionFrequencyContinually
        providerAdditionFrequencyOther
        providerAdditionFrequencyNote
        providerAddMethod
        providerAddMethodOther
        providerAddMethodNote
        providerLeaveMethod
        providerLeaveMethodOther
        providerLeaveMethodNote
        providerRemovalFrequency
        providerRemovalFrequencyContinually
        providerRemovalFrequencyOther
        providerRemovalFrequencyNote
        providerOverlap
        providerOverlapHierarchy
        providerOverlapNote
        readyForReviewByUserAccount {
          commonName
        }
        readyForReviewDts
        status
      }
      beneficiaries {
        id
        beneficiaries
        beneficiariesNote
        beneficiariesOther
        beneficiaryOverlap
        beneficiaryOverlapNote
        beneficiarySelectionNote
        beneficiarySelectionOther
        beneficiarySelectionMethod
        treatDualElligibleDifferent
        treatDualElligibleDifferentHow
        treatDualElligibleDifferentNote
        excludeCertainCharacteristics
        excludeCertainCharacteristicsCriteria
        excludeCertainCharacteristicsNote
        beneficiarySelectionFrequency
        beneficiarySelectionFrequencyContinually
        beneficiarySelectionFrequencyNote
        beneficiarySelectionFrequencyOther
        beneficiaryRemovalFrequency
        beneficiaryRemovalFrequencyContinually
        beneficiaryRemovalFrequencyNote
        beneficiaryRemovalFrequencyOther
        precedenceRules
        precedenceRulesYes
        precedenceRulesNo
        precedenceRulesNote
        numberPeopleImpacted
        estimateConfidence
        confidenceNote
        readyForReviewByUserAccount {
          commonName
        }
        readyForReviewDts
        status
      }
      opsEvalAndLearning {
        id
        ccmInvolvment
        ccmInvolvmentOther
        ccmInvolvmentNote
        iddocSupport
        iddocSupportNote
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
        qualityPerformanceImpactsPaymentOther
        qualityPerformanceImpactsPaymentNote
        dataSharingStarts
        dataSharingStartsOther
        dataSharingFrequency
        dataSharingFrequencyContinually
        dataSharingFrequencyOther
        dataSharingStartsNote
        dataCollectionStarts
        dataCollectionStartsOther
        dataCollectionFrequency
        dataCollectionFrequencyContinually
        dataCollectionFrequencyOther
        dataCollectionFrequencyNote
        qualityReportingStarts
        qualityReportingStartsOther
        qualityReportingStartsNote
        qualityReportingFrequency
        qualityReportingFrequencyContinually
        qualityReportingFrequencyOther
        evaluationApproaches
        evaluationApproachOther
        evalutaionApproachNote
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
        stakeholders
        stakeholdersOther
        stakeholdersNote
        helpdeskUse
        helpdeskUseNote
        contractorSupport
        contractorSupportOther
        contractorSupportHow
        contractorSupportNote
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
        readyForReviewByUserAccount {
          commonName
        }
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
        claimsProcessingPrecedence
        claimsProcessingPrecedenceOther
        claimsProcessingPrecedenceNote
        canParticipantsSelectBetweenPaymentMechanisms
        canParticipantsSelectBetweenPaymentMechanismsHow
        canParticipantsSelectBetweenPaymentMechanismsNote
        anticipatedPaymentFrequency
        anticipatedPaymentFrequencyContinually
        anticipatedPaymentFrequencyOther
        anticipatedPaymentFrequencyNote
        fundingSource
        fundingSourceMedicareAInfo
        fundingSourceMedicareBInfo
        fundingSourceOther
        fundingSourceNote
        fundingSourceR
        fundingSourceRMedicareAInfo
        fundingSourceRMedicareBInfo
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
        willRecoverPayments
        willRecoverPaymentsNote
        anticipateReconcilingPaymentsRetrospectively
        anticipateReconcilingPaymentsRetrospectivelyNote
        paymentReconciliationFrequency
        paymentReconciliationFrequencyContinually
        paymentReconciliationFrequencyOther
        paymentReconciliationFrequencyNote
        paymentStartDate
        paymentStartDateNote
        readyForReviewByUserAccount {
          commonName
        }
        readyForReviewDts
        status
      }
      collaborators {
        id
        userAccount {
          id
          commonName
          email
          username
        }
        userID
        teamRoles
        modelPlanID
        createdDts
      }
      discussions {
        id
        content {
          rawContent
        }
        createdByUserAccount {
          commonName
        }
        userRole
        userRoleDescription
        createdDts
        replies {
          id
          discussionID
          content {
            rawContent
          }
          createdByUserAccount {
            commonName
          }
          userRole
          userRoleDescription
          createdDts
        }
      }
    }
  }
`;
