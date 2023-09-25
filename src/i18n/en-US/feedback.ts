const reportAProblem = {
  heading: 'Report a problem',
  subheading:
    'Did you notice something wrong with MINT? Let us know using the form below.',
  isAnonymousSubmission: {
    label: 'Would you like your feedback to remain anonymous?',
    sublabel:
      'If you select yes, your name and email will not be recorded with your feedback.',
    options: {
      true: 'Yes',
      false: 'No'
    }
  },
  allowContact: {
    label: 'May the MINT team contact you for additional information?',
    sublabel:
      'If you choose to remain anonymous, we will be unable to contact you.',
    options: {
      true: 'Yes',
      false: 'No'
    }
  },
  section: {
    label: 'Which part of MINT were you using when you encountered an issue?',
    options: {
      READ_VIEW: 'Model Plan Read View',
      TASK_LIST: 'Model Plan Task List',
      IT_SOLUTIONS: 'IT solution and implementation status tracker',
      HELP_CENTER: 'Help Center',
      OTHER: 'Other (please specify)'
    }
  },
  whatDoing: {
    label: 'What were you doing?'
  },
  whatWentWrong: {
    label: 'What went wrong?'
  },
  severity: {
    label: 'How severe was this problem?',
    options: {
      PREVENTED_TASK: 'It prevented me from completing my task',
      DELAYED_TASK: 'It delayed completion of my task',
      MINOR: 'It was a minor annoyance',
      OTHER: 'Other (please specify)'
    }
  },
  sendReport: 'Send report',
  sendAndStartAnother: 'Send and start another report',
  closeTab: 'Close tab without sending report'
};

export default reportAProblem;
