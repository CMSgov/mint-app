import { gql } from '@apollo/client';

export default gql`
  query GetAllGeneralCharacteristics($id: UUID!) {
    modelPlan(id: $id) {
      generalCharacteristics {
        isNewModel
        existingModel
        resemblesExistingModel
        resemblesExistingModelWhich
        resemblesExistingModelHow
        resemblesExistingModelNote
        hasComponentsOrTracks
        hasComponentsOrTracksDiffer
        hasComponentsOrTracksNote
        alternativePaymentModel
        alternativePaymentModelTypes
        alternativePaymentModelNote
        keyCharacteristics
        keyCharacteristicsOther
        keyCharacteristicsNote
        collectPlanBids
        collectPlanBidsNote
        managePartCDEnrollment
        managePartCDEnrollmentNote
        planContactUpdated
        planContactUpdatedNote
        careCoordinationInvolved
        careCoordinationInvolvedDescription
        careCoordinationInvolvedNote
        additionalServicesInvolved
        additionalServicesInvolvedDescription
        additionalServicesInvolvedNote
        communityPartnersInvolved
        communityPartnersInvolvedDescription
        communityPartnersInvolvedNote
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
        rulemakingRequired
        rulemakingRequiredDescription
        rulemakingRequiredNote
        authorityAllowances
        authorityAllowancesOther
        authorityAllowancesNote
        waiversRequired
        waiversRequiredTypes
        waiversRequiredNote
        status
      }
    }
  }
`;
