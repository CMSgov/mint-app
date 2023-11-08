import { gql } from '@apollo/client';

export default gql(/* GraphQL */ `
  query GetFunding($id: UUID!) {
    modelPlan(id: $id) {
      id
      modelName
      payments {
        id
        fundingSource
        fundingSourceTrustFundType
        fundingSourceOther
        fundingSourceNote
        fundingSourceR
        fundingSourceRTrustFundType
        fundingSourceROther
        fundingSourceRNote
        payRecipients
        payRecipientsOtherSpecification
        payRecipientsNote
        payType
        payTypeNote
        payClaims
      }
      operationalNeeds {
        modifiedDts
      }
    }
  }
`);
