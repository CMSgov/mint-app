import { gql } from '@apollo/client';

export default gql`
  query GetModelCollaborators($id: UUID!) {
    modelPlan(id: $id) {
      collaborators {
        id
        fullName
        teamRole
        createdDts
      }
    }
  }
`;
