import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import ExternalLink from 'components/shared/ExternalLink';
import { HelpSolutionType } from 'views/HelpAndKnowledge/SolutionsHelp/solutionsMap';

import '../index.scss';

const HIGLASTimeline = ({ solution }: { solution: HelpSolutionType }) => {
  const { t } = useTranslation('helpAndKnowledge');

  return (
    <div className="line-height-body-5 font-body-md">
      <Trans
        i18nKey={`solutions.${solution.key}.timeline.description`}
        t={t}
        components={{
          email: (
            <ExternalLink href="mailto:donna.schmidt@cms.hhs.gov">
              {' '}
            </ExternalLink>
          )
        }}
      />
    </div>
  );
};

export default HIGLASTimeline;
