import { gql } from '@apollo/client';

export default gql(/* GraphQL */ `
  query GetAllOpsEvalAndLearning($id: UUID!) {
    modelPlan(id: $id) {
      id
      opsEvalAndLearning {
        id
        modelPlanID
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
        iddocSupport
        iddocSupportNote
        technicalContactsIdentified
        technicalContactsIdentifiedDetail
        technicalContactsIdentifiedNote
        captureParticipantInfo
        captureParticipantInfoNote
        icdOwner
        draftIcdDueDate
        icdNote
        uatNeeds
        stcNeeds
        testingTimelines
        testingNote
        dataMonitoringFileTypes
        dataMonitoringFileOther
        dataResponseType
        dataResponseFileFrequency
        dataFullTimeOrIncremental
        eftSetUp
        unsolicitedAdjustmentsIncluded
        dataFlowDiagramsNeeded
        produceBenefitEnhancementFiles
        fileNamingConventions
        dataMonitoringNote
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
        evaluationApproaches
        evaluationApproachOther
        evalutaionApproachNote
        ccmInvolvment
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
        modelLearningSystems
        modelLearningSystemsOther
        modelLearningSystemsNote
        anticipatedChallenges
        status
      }
    }
  }
`);
