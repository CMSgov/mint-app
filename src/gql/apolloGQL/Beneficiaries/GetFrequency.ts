import { gql } from '@apollo/client';

export default gql(/* GraphQL */ `
  query GetFrequency($id: UUID!) {
    modelPlan(id: $id) {
      id
      modelName
      beneficiaries {
        id
        beneficiarySelectionFrequency
        beneficiarySelectionFrequencyNote
        beneficiarySelectionFrequencyOther
        beneficiaryOverlap
        beneficiaryOverlapNote
        precedenceRules
        precedenceRulesYes
        precedenceRulesNo
        precedenceRulesNote
        readyForReviewByUserAccount {
          id
          commonName
        }
        readyForReviewDts
        status
      }
      operationalNeeds {
        id
        modifiedDts
      }
    }
  }
`);
