const operationsEvaluationAndLearning = {
  heading: 'Operations, evaluation, and learning',
  anotherAgency:
    'Will another Agency or State help design/operate the model? Select all that apply.',
  anotherAgencyOptions: {
    withState: 'Yes, we will partner with states',
    getIdeas: 'Yes, we will get ideas from another agency',
    getSupport: 'Yes, we will get support from another agenct through IAA'
  },
  creatingDependencies:
    'Are you anticipating creating dependencies between services?',
  creatingDependenciesInfo:
    'Examples: Service B cannot be paid until Service A has been paid; Service A cannot be paid without Diagnosis 1; If a certain service or diagnosis exists in history, then Service A cannot be paid.',
  stakeholders: 'What stakeholders do you plan to communicate with?',
  stakeholdersOptions: {
    beneficiaries: 'Beneficiaries',
    communityOrganizations: 'Community organizations',
    participants: 'Participants',
    professionalOrganizations: 'Professional organizations',
    providers: 'Providers',
    states: 'States'
  },
  helpDesk: 'Do you plan to use a helpdesk?',
  helpDeskOptions: {
    cbosc: 'Through OBOSC',
    contractor: 'Through a contractor'
  },
  whatContractors: 'What contractors will support your model?',
  whatContractorsOptions: {
    one: 'One contractor to support implementation',
    separate:
      'May have separate contractors for different implementation functions',
    noContractor: 'Do not plan to use an implemenation contractor'
  },
  paymentContractor: 'Is a payment contractor required?',
  paymentContractorInfo:
    'Note: If there will be 30+ payees we recomment a contractor.',
  thirdPartyContractor:
    'Will you use a contractor other than the Shared Systems to collect or analyze data from the model? (Third Party Contractor)',
  contractorSelected:
    'Has this contractor been selected, and available to participate in the technical design and development model?',
  providingData:
    'Will the contractorbe providing data (a Third Party File) that will be used in claims processing?',
  bdc:
    'Is the contractor connected to the Balitmore Data Center (BDC) and are they aware of the Electronic Files Transfer process needed?',
  testData:
    'Is the contractor aware that test data will be needed, and when that test data must be available?',
  acoSupport: 'Are you planning to use ASO-OS support?',
  acoQuestions: 'ACO-OS operations specific questions',
  acoOperations: 'What operations will ACO-OS support?',
  acoOperationsOptions: {
    os: 'ACO-OS',
    ui: 'ACO-IO',
    innovation: '4innovation (4i)'
  },
  technicalContacts: 'Are technical contacts identified?',
  entityInformation: 'Will you capture entity information?',
  interfaceControl: 'ACO-OS interface control questions',
  icdOwner: 'ICD owner',
  draftIDC: 'Draft ICD required by',
  testingQuestions: 'ACO-OS testing specific questions',
  ssmRequest:
    'SSM request to begin analysis at least 1 year before implementation',
  uatNeeds: 'UAT-test data needs',
  stcNeeds: 'STC-test needs',
  testingTimelines: 'Define the testing timelines',
  dataMonitoring: 'ACO-OS data monitoring specific questions',
  fileTypes: 'What types of files? Select all that apply.',
  responseTypes: 'What types of responses? Select all that apply.',
  fileFrequency: 'Frequency of files?',
  timeFrequency: 'Full time or incremental?',
  fullTime: 'Full time',
  incremental: 'Incremental',
  eftAndConnectivity: 'Are EFT and connectivity set up?',
  adjustments: 'Will unsolicited adjustments be included?',
  diagrams: 'Are data flow diagrams needed?',
  benefitEnhancement: 'Will you produce Benefit Enhancement Files?',
  namingConventions: 'File naming conventions',
  establishBenchmark: 'Will you establish a benchmark to capture performance?',
  establishBenchmarkOptions: {
    reconcile: 'Yes, and we will reconcile actual performance against it',
    notReconcile: 'Yes, but we will not reconcile actual performance against it'
  },
  computeScores: 'Will you compute performance scores?',
  riskAdjustments: 'Will you make risk adjustments?',
  performanceScores: 'Performance Scores',
  feedbackResults: 'Feedback Results',
  payments: 'Payments',
  others: 'Others',
  scoreCalculation:
    'Will risk scores be calculated to adjust performance scores and/or calculate payments?',
  provideSpecifics:
    'Could you provide specific information regarding the statistical methodology for risk adjustment or target prices?',
  provideSpecificsInfo: {
    forExample: 'For example:',
    num1: '1. Definition of the techniques used (OLS, MLE, etc..)',
    num2:
      'Covariate lists from regression mapped to English description of these factors',
    num3: 'Definition of cohort of providers used for rate setting',
    num4:
      'Timing of forecasts and rate offering relative to when underlying FFS rates are set.',
    num5:
      'Description of credibility, smoothing, or blending adjustments made to rating cells'
  },
  participantAppeal: 'Will participants be able to appeal?',
  evaluationApproach:
    'What type of evaluation approach are tou considering? Select all that apply.',
  approachOptions: {
    establish: 'Establish control and intervention groups',
    identify: 'Identify a comparison/match group',
    interrupted: 'Interrupted time series',
    leverage:
      'Leverage non-Medicare data (such as Medicaid data, external data sets)'
  },
  dataNeeded:
    'What data do you need to monitor the model? Select all that apply.',
  validatedQuality:
    'Do you plan to develop a new validated quality measure for your model?',
  impactPayment: 'Does quality performance impact payment?',
  addtionalData: 'Will any additional data need to be collected?',
  additionalDataInfo:
    'Note: If you are not sure what current data is collected via provider billing, please ask Provider Billing Group (PBG)',
  dataToSend: 'What data will you send to participants? Select all that apply.',
  claimLineFeed:
    'Does the model require that identifiable Claim and Claim Line Feed (CCLFs) data need to be shared with participants?',
  reportingTiming: 'Data and reporting timing',
  dataSharing: 'Data sharing starts',
  dataSharingInfo:
    'If using ACO-OS support, SSM request to begin analysis at least 1 year before implementation',
  dataCollection: 'Data collection starts',
  dataReporting: 'Data reporting starts',
  reportingFrequency:
    'What is the frequency of reporting either to you or from participants under the model?',
  ccw: 'Is Chronic Conditions Warehouse (CCW) involved in the model?',
  ccwSpecific: 'CCW specific questions',
  ccwSendFiles:
    'Will you need to send files between the CCW and other applications?',
  fileTransfers:
    'Do you know which applications will be on the other sides of the file transfers?',
  distributeFiles:
    'Will you use the CCW to distribute files to and from model participants?',
  includedPayment:
    'Data sources included payment (FFS A,B,D claims... Standardized payment tables...)',
  learningSystem: 'Will the model have a learning system?',
  learningSystemOptions: {
    connector: 'We plan to have a learning connector',
    connect: 'We plan to use CONNECT',
    collaboration: 'We plan to enable participant-to-participant collaboration',
    educate: 'We plan to educate beneficiaries',
    no: 'No, we will not have a learning system'
  },
  obstacles:
    'What obstacles do you anticipate during Model design and implementation?',
  obstaclesInfo:
    'Please list and known ’unknowns,’ that is, are there policy decisions that you are aware of that aew still pending or are subject to change? If so, please list to the best of your ability.',
  identifyAlternative: 'Identify and alternative iterations of the model.',
  episodeInitiation: 'Episode initiation and termination criteria',
  episodeInitiationInfo:
    '(In ZZZZ this was the receipt of chemo and specific diagnostic codes)'
};

export default operationsEvaluationAndLearning;
