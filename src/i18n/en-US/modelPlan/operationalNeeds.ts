import { TranslationOperationalNeeds } from 'types/translation';

import {
  TranslationDataType,
  TranslationFormType
} from '../../../gql/generated/graphql';

const operationalNeeds: TranslationOperationalNeeds = {
  name: {
    gqlField: 'name',
    goField: 'Name',
    dbField: 'name',
    label: 'Operational need',
    dataType: TranslationDataType.STRING,
    formType: TranslationFormType.TEXT,
    order: 1.01
  },
  nameOther: {
    gqlField: 'nameOther',
    goField: 'NameOther',
    dbField: 'name_other',
    label: 'What operational need are you solving?',
    exportLabel: 'Custom operational need',
    dataType: TranslationDataType.STRING,
    formType: TranslationFormType.TEXT,
    order: 1.02
  },
  key: {
    gqlField: 'key',
    goField: 'Key',
    dbField: 'key',
    label: 'The key representing the type of operational need.',
    dataType: TranslationDataType.ENUM,
    formType: TranslationFormType.CHECKBOX,
    order: 1.03,
    options: {
      MANAGE_CD: 'Manage Part C/D enrollment',
      REV_COL_BIDS: 'Review and collect plan bids',
      UPDATE_CONTRACT: 'Update the plan’s contract',
      RECRUIT_PARTICIPANTS: 'Recruit participants',
      REV_SCORE_APP: 'Review and score applications',
      APP_SUPPORT_CON: 'Obtain an application support contractor',
      COMM_W_PART: 'Communicate with participants',
      MANAGE_PROV_OVERLAP: 'Manage provider overlaps',
      MANAGE_BEN_OVERLAP: 'Manage beneficiary overlaps',
      HELPDESK_SUPPORT: 'Helpdesk support',
      IDDOC_SUPPORT: 'IDDOC support',
      ESTABLISH_BENCH: 'Establish a benchmark with participants',
      PROCESS_PART_APPEALS: 'Process participant appeals',
      ACQUIRE_AN_EVAL_CONT: 'Acquire an evaluation contractor',
      DATA_TO_MONITOR: 'Data to monitor the model',
      DATA_TO_SUPPORT_EVAL: 'Data to support model evaluation',
      CLAIMS_BASED_MEASURES: 'Claims-based measures',
      QUALITY_PERFORMANCE_SCORES: 'Quality performance scores',
      SEND_REPDATA_TO_PART: 'Send reports/data to participants',
      ACQUIRE_A_LEARN_CONT: 'Acquire a learning contractor',
      PART_TO_PART_COLLAB: 'Participant-to-participant collaboration',
      EDUCATE_BENEF: 'Educate beneficiaries',
      ADJUST_FFS_CLAIMS: 'Adjust how FFS claims are paid',
      MANAGE_FFS_EXCL_PAYMENTS: 'Manage FFS excluded payments',
      MAKE_NON_CLAIMS_BASED_PAYMENTS: 'Make non-claims based payments',
      COMPUTE_SHARED_SAVINGS_PAYMENT: 'Compute shared savings payment',
      RECOVER_PAYMENTS: 'Recover payments',
      SIGN_PARTICIPATION_AGREEMENTS: 'Sign Participation Agreements',
      VET_PROVIDERS_FOR_PROGRAM_INTEGRITY:
        'Vet providers for program integrity',
      UTILIZE_QUALITY_MEASURES_DEVELOPMENT_CONTRACTOR:
        'Utilize quality measures development contractor',
      IT_PLATFORM_FOR_LEARNING: 'IT platform for learning'
    }
  },
  needed: {
    gqlField: 'needed',
    goField: 'Needed',
    dbField: 'needed',
    label: 'Status',
    dataType: TranslationDataType.BOOLEAN,
    formType: TranslationFormType.CHECKBOX,
    order: 1.04,
    options: {
      true: 'Needed',
      false: 'Not needed'
    }
  },
  section: {
    gqlField: 'section',
    goField: 'section',
    dbField: 'section',
    label: '	Model Plan section',
    dataType: TranslationDataType.STRING,
    formType: TranslationFormType.TEXT,
    order: 1.05,
    options: {
      BASICS: 'Model Basics',
      GENERAL_CHARACTERISTICS: 'General characteristics',
      PARTICIPANTS_AND_PROVIDERS: 'Participants and providers',
      BENEFICIARIES: 'Beneficiaries',
      OPERATIONS_EVALUATION_AND_LEARNING:
        'Operations, evaluation, and learning',
      PAYMENT: 'Payment',
      PREPARE_FOR_CLEARANCE: 'Prepare for clearance'
    }
  }
};

export default operationalNeeds;
