import { TranslationReplies } from 'types/translation';

import {
  TranslationDataType,
  TranslationFormType
} from '../../../gql/generated/graphql';

export const replies: TranslationReplies = {
  userRole: {
    gqlField: 'userRole',
    goField: 'UserRole',
    dbField: 'user_role',
    label: 'Your role',
    sublabel: 'This will display with your name to help others identify you.',
    dataType: TranslationDataType.ENUM,
    formType: TranslationFormType.SELECT,
    order: 1.01,
    options: {
      CMS_SYSTEM_SERVICE_TEAM: 'CMS System/Service Team',
      IT_LEAD: 'IT Lead',
      LEADERSHIP: 'Leadership',
      MEDICARE_ADMINISTRATIVE_CONTRACTOR: 'Medicare Administrative Contractor',
      MINT_TEAM: 'MINT Team',
      MODEL_LEAD: 'Model Lead',
      MODEL_TEAM: 'Model Team',
      SHARED_SYSTEM_MAINTAINER: 'Shared System Maintainer',
      SOLUTION_ARCHITECT: 'Solution Architect',
      NONE_OF_THE_ABOVE: 'None of the above'
    }
  },
  userRoleDescription: {
    gqlField: 'userRoleDescription',
    goField: 'UserRoleDescription',
    dbField: 'user_role_description',
    label: 'Enter a short description for your role',
    dataType: TranslationDataType.STRING,
    formType: TranslationFormType.TEXT,
    order: 1.02
  },
  content: {
    gqlField: 'content',
    goField: 'content',
    dbField: 'content',
    label: 'Type your reply',
    sublabel:
      'To tag a solution team or individual, type "@" and begin typing the name. Then, select the team or individual from the list you wish to notify.',
    dataType: TranslationDataType.STRING,
    formType: TranslationFormType.TEXTAREA,
    order: 1.03
  },
  isAssessment: {
    gqlField: 'isAssessment',
    goField: 'IsAssessment',
    dbField: 'is_assessment',
    label: 'Is the user an assessment user?',
    dataType: TranslationDataType.BOOLEAN,
    formType: TranslationFormType.BOOLEAN,
    order: 1.04,
    options: {
      true: 'Yes',
      false: 'No'
    }
  }
};

export default replies;
