import { gql } from '@apollo/client';

export default gql(/* GraphQL */ `
  query GetCoordination($id: UUID!) {
    modelPlan(id: $id) {
      id
      modelName
      participantsAndProviders {
        id
        coordinateWork
        coordinateWorkNote
        gainsharePayments
        gainsharePaymentsEligibility
        gainsharePaymentsEligibilityOther
        gainsharePaymentsTrack
        gainsharePaymentsNote
        participantsIds
        participantsIdsOther
        participantsIDSNote
      }
      operationalNeeds {
        id
        modifiedDts
      }
    }
  }
`);
