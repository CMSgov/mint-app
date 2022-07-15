import { gql } from '@apollo/client';

export default gql`
  query GetAnticipateDependencies($id: UUID!) {
    modelPlan(id: $id) {
      id
      modelName
      payments {
        id
        payType
        creatingDependenciesBetweenServices
        creatingDependenciesBetweenServicesNote
        needsClaimsDataCollection
        needsClaimsDataCollectionNote
        providingThirdPartyFile
        isContractorAwareTestDataRequirements
      }
    }
  }
`;
