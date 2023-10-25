import { gql } from '@apollo/client';

export default gql`
  query GetModelPlans($filter: ModelPlanFilter!, $isMAC: Boolean!) {
    modelPlanCollection(filter: $filter) {
      id
      modelName
      status
      abbreviation
      nameHistory(sort: DESC)
      createdBy
      createdDts
      modifiedDts
      isFavorite
      isCollaborator
      basics {
        id
        demoCode
        amsModelID
        modelCategory
        clearanceStarts
        performancePeriodStarts
        additionalModelCategories
        applicationsStart @include(if: $isMAC)
      }
      generalCharacteristics @include(if: $isMAC) {
        id
        keyCharacteristics
      }
      payments @include(if: $isMAC) {
        id
        paymentStartDate
      }
      collaborators {
        id
        userID
        userAccount {
          id
          commonName
          email
          username
        }
        teamRole
      }
      discussions {
        id
        replies {
          id
        }
      }
      crTdls @include(if: $isMAC) {
        idNumber
      }
    }
  }
`;
