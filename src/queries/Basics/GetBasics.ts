import { gql } from '@apollo/client';

export default gql`
  query GetBasicsOLD($id: UUID!) {
    modelPlan(id: $id) {
      id
      modelName
      basics {
        id
        modelType
        problem
        goal
        testInterventions
        note
      }
    }
  }
`;
