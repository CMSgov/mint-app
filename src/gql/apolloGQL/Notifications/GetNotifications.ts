import { gql } from '@apollo/client';

export default gql(/* GraphQL */ `
  query GetNotifications {
    currentUser {
      notifications {
        numUnreadNotifications
        notifications {
          __typename
          id
          isRead
          inAppSent
          emailSent
          createdDts
          activity {
            activityType
            entityID
            actorID
            actorUserAccount {
              commonName
            }
            metaData {
              __typename
              ... on TaggedInPlanDiscussionActivityMeta {
                version
                type
                modelPlanID
                modelPlan {
                  modelName
                }
                discussionID
                content
              }
              ... on TaggedInDiscussionReplyActivityMeta {
                version
                type
                modelPlanID
                modelPlan {
                  modelName
                }
                discussionID
                replyID
                content
              }
              ... on DailyDigestCompleteActivityMeta {
                version
                type
                modelPlanIDs
                date
                analyzedAudits {
                  id
                  modelPlanID
                  modelName
                  date
                  changes {
                    modelPlan {
                      oldName
                      statusChanges
                    }
                    documents {
                      count
                    }
                    crTdls {
                      activity
                    }
                    planSections {
                      updated
                      readyForReview
                      readyForClearance
                    }
                    modelLeads {
                      added {
                        id
                        commonName
                      }
                    }
                    planDiscussions {
                      activity
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);
