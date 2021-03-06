import { gql } from '@apollo/client';

export default gql`
  query GetModelPlanInfo($id: UUID!) {
    modelPlan(id: $id) {
      id
      modelName
      modelCategory
      cmsCenters
      cmsOther
      cmmiGroups
    }
  }
`;
