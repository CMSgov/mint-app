import { gql } from '@apollo/client';

export default gql`
  mutation UpdateModelPlan($id: UUID!, $changes: ModelPlanChanges!) {
    updateModelPlan(id: $id, changes: $changes) {
      id
      modelName
      modelCategory
      cmsCenters
      cmmiGroups
      cmsOther
      createdBy
      modifiedBy
      modifiedDts
      archived
      status
    }
  }
`;
