import React from 'react';
import { Icon } from '@trussworks/react-uswds';

export enum ArticleCategories {
  GETTING_STARTED = 'getting-started',
  IT_IMPLEMENTATION = 'it-implementation'
}

export const articleCategories: ArticleCategories[] = [
  ArticleCategories.GETTING_STARTED,
  ArticleCategories.IT_IMPLEMENTATION
];

export enum HelpArticle {
  MODEL_PLAN_OVERVIEW = 'MODEL_PLAN_OVERVIEW',
  SAMPLE_MODEL_PLAN = 'SAMPLE_MODEL_PLAN',
  TWO_PAGER_MEETING = 'TWO_PAGER_MEETING',
  SIX_PAGER_MEETING = 'SIX_PAGER_MEETING',
  HIGH_LEVEL_PROJECT_PLAN = 'HIGH_LEVEL_PROJECT_PLAN',
  UTILIZING_SOLUTIONS = 'UTILIZING_SOLUTIONS',
  MODEL_SOLUTION_IMPLEMENTATION = 'MODEL_SOLUTION_IMPLEMENTATION',
  MODEL_SOLUTION_DESIGN = 'MODEL_SOLUTION_DESIGN',
  PHASES_INVOLVED = 'PHASES_INVOLVED'
}

export type ArticleProps = {
  key: HelpArticle;
  route: string;
  translation: string;
  type: ArticleCategories;
  order: number;
};

// Help and Knowledge Articles
const helpAndKnowledgeArticles: ArticleProps[] = [
  {
    key: HelpArticle.MODEL_PLAN_OVERVIEW,
    route: '/model-plan-overview', // route for hitting rendered article component
    translation: 'modelPlanOverview', // Should reference the translation used to index the title and description for cards
    type: ArticleCategories.GETTING_STARTED,
    order: 6
  },
  {
    key: HelpArticle.SAMPLE_MODEL_PLAN,
    route: '/sample-model-plan',
    translation: 'sampleModelPlan',
    type: ArticleCategories.GETTING_STARTED,
    order: 8
  },
  {
    key: HelpArticle.TWO_PAGER_MEETING,
    route: '/how-to-have-a-successful-2-pager-meeting',
    translation: 'twoPageMeeting',
    type: ArticleCategories.GETTING_STARTED,
    order: 2
  },
  {
    key: HelpArticle.SIX_PAGER_MEETING,
    route: '/how-to-have-a-successful-6-pager-meeting',
    translation: 'sixPageMeeting',
    type: ArticleCategories.GETTING_STARTED,
    order: 3
  },
  {
    key: HelpArticle.HIGH_LEVEL_PROJECT_PLAN,
    route: '/high-level-project-plan',
    translation: 'highLevelProjectPlans',
    type: ArticleCategories.GETTING_STARTED,
    order: 1
  },
  {
    key: HelpArticle.UTILIZING_SOLUTIONS,
    route: '/utilizing-solutions',
    translation: 'utilizingSolutions',
    type: ArticleCategories.IT_IMPLEMENTATION,
    order: 9
  },
  {
    key: HelpArticle.MODEL_SOLUTION_IMPLEMENTATION,
    route: '/model-and-solution-implementation',
    translation: 'modelSolutionImplementation',
    type: ArticleCategories.IT_IMPLEMENTATION,
    order: 5
  },
  {
    key: HelpArticle.MODEL_SOLUTION_DESIGN,
    route: '/model-and-solution-design',
    translation: 'modelSolutionDesign',
    type: ArticleCategories.IT_IMPLEMENTATION,
    order: 4
  },
  {
    key: HelpArticle.PHASES_INVOLVED,
    route: '/phases-involved',
    translation: 'phasesInvolved',
    type: ArticleCategories.IT_IMPLEMENTATION,
    order: 7
  }
];

export const covertToLowercaseAndDashes = (string: string) =>
  string.toLowerCase().replace(/\s+/g, '-');

export const ScrollLink = ({ scrollTo }: { scrollTo: string }) => {
  return (
    <a
      href={`#${covertToLowercaseAndDashes(scrollTo)}`}
      className="display-flex flex-align-center"
    >
      {scrollTo}
      <Icon.ArrowForward />
    </a>
  );
};

export default helpAndKnowledgeArticles;
