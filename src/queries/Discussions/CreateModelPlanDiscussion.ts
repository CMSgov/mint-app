import { gql } from '@apollo/client';

export default gql`
  mutation CreateModelPlanDiscussion($input: PlanDiscussionCreateInput!) {
    createPlanDiscussion(input: $input) {
      id
      content
      status
      createdBy
      createdDts
    }
  }
`;
