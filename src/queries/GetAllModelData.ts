import { gql } from '@apollo/client';

// This is a query to get ALL data for ALL models, used for exporting/reporting features
export default gql`
  query GetAllModelData {
    modelPlanCollection(filter: INCLUDE_ALL) {
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
        beneficiarySelectionFrequencyNote
        beneficiarySelectionFrequencyOther
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
        canParticipantsSelectBetweenPaymentMechanisms
        canParticipantsSelectBetweenPaymentMechanismsHow
        canParticipantsSelectBetweenPaymentMechanismsNote
        anticipatedPaymentFrequency
        anticipatedPaymentFrequencyOther
        anticipatedPaymentFrequencyNote
        fundingSource
        fundingSourceOther
        fundingSourceNote
        fundingSourceR
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
