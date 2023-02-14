import { gql } from '@apollo/client';

export default gql`
  mutation UpdateCustomOperationalNeedById(
    $id: UUID!
    $customNeedType: String!
    $needed: Boolean!
  ) {
    updateCustomOperationalNeedByID(
      id: $id
      customNeedType: $customNeedType
      needed: $needed
    ) {
      id
      nameOther
      needed
      key
    }
  }
`;
