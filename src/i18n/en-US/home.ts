const home = {
  title: 'Welcome to MINT',
  subheading:
    'The place to collaborate on new CMMI models and demonstrations and access resources to assist with your model plans.',
  signIn: 'Sign in to start',
  mintPurpose: 'You can use MINT to:',
  startNow: 'Start a new Model Plan',
  previously: 'previously ',
  viewMore: 'View {{-number}} more',
  viewLess: 'View less',
  more: 'more',
  mintTasks: [
    'collaborate on requirements for new CMMI models and demonstrations',
    'access resources to help you complete your model plans'
  ],
  newModelSummaryBox: {
    copy: 'Have a new model or demonstration?',
    cta: 'Start a new Model Plan'
  },
  allModels: {
    copy: 'Don’t see the model you’re looking for?',
    cta: 'View all models'
  },
  downloadAllCSV: 'Download all plans as CSV',
  downloadSingleCSV: 'Download this Model Plan (CSV)',
  requestsTable: {
    basic: {
      heading: 'My model plans'
    },
    admin: {
      heading: 'Model plans'
    },
    mac: {
      heading: 'Upcoming models',
      empty: {
        heading: 'There aren’t any model plans with CRs or TDLs.',
        body:
          'Check back later. When CR or TDL is added to a model plan, it will appear here.'
      }
    },
    empty: {
      heading: 'There aren’t any model plans yet.',
      body: 'Once one is added, it will appear here.'
    },
    caption:
      'Below is a list of governance requests that are in draft or submitted.',
    headers: {
      name: 'Model name',
      category: 'Category',
      modelPoc: 'Model lead(s)',
      clearanceDate: 'Anticipated clearance date',
      startDate: 'Model start date',
      paymentDate: 'Payment start date',
      keyCharacteristics: 'Key characteristics',
      crTDLs: 'CRs and TDLs',
      status: 'Status',
      recentActivity: 'Recent activity'
    },
    noneSelectedYet: 'None selected yet',
    tbd: 'TBD',
    updated: 'Updated',
    unansweredQuestion: 'unanswered question',
    answeredQuestion: 'answered question'
  }
};

export default home;
