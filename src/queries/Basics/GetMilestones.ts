import { gql } from '@apollo/client';

export default gql`
  query GetMilestones($id: UUID!) {
    modelPlan(id: $id) {
      id
      modelName
      basics {
        completeICIP
        clearanceStarts
        clearanceEnds
        announced
        applicationsStart
        applicationsEnd
        performancePeriodStarts
        performancePeriodEnds
        highLevelNote
        wrapUpEnds
        phasedIn
        phasedInNote
        readyForReviewBy
        readyForReviewDts
        status
      }
    }
  }
`;
