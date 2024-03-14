const notifications = {
  breadcrumb: 'Notifications',
  index: {
    heading: 'Notifications',
    markAllAsRead: 'Mark all as read',
    notificationSettings: 'Notification settings',
    infoBanner: {
      emptyState:
        'You’re all up-to-date on notifications. Check back later for updates.'
    },
    activityType: {
      addedAsCollaborator: {
        text: ' added you to the team for {{-modelName}}.',
        cta: 'Start collaborating'
      },
      dailyDigestComplete: {
        text: ' sent your daily digest.',
        cta: 'View digest'
      },
      modelPlanShared: {
        text: ' shared {{-modelName}} with you.',
        cta: 'View Model Plan'
      },
      newDiscussionReply: {
        text: ' replied to your discussion for {{-modelName}}.',
        cta: 'View discussion'
      },
      taggedInDiscussion: {
        text: ' tagged you in a discussion for {{-modelName}}.',
        cta: 'View discussion'
      },
      taggedInDiscussionReply: {
        text: ' tagged you in a discussion reply for {{-modelName}}.',
        cta: 'View discussion'
      }
    },
    dailyDigest: {
      heading: 'Your daily updates',
      cta: 'View this Model Plan',
      unsubscribe:
        'To stop receiving notifications for a specific model, unfollow the model at the top of the Model Plan page.'
    }
  },
  settings: {
    heading: 'Notification settings',
    subHeading:
      'You will be notified in-app for the following events and can choose to opt-out of receiving emails below.',
    notification: 'Notification',
    email: 'Email',
    inApp: 'In-app',
    configurations: {
      dailyDigestComplete:
        'Daily digest of the models I’m following when something changes',
      addedAsCollaborator: 'When I’m added as a collaborator to a Model Plan',
      taggedInDiscussion: 'When I’m tagged in a discussion',
      newDiscussionReply: 'When someone replies to a discussion I started',
      modelPlanShared: 'When someone shares a Model Plan with me'
    },
    save: 'Save',
    dontUpdate: 'Don’t update and return to previous page',
    error:
      'An error occurred while saving your notification settings. Please try again.'
  }
};

export default notifications;
