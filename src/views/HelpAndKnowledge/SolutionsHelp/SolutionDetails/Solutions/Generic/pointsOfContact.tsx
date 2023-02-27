import React from 'react';
import { useTranslation } from 'react-i18next';

import { HelpSolutionType } from 'views/HelpAndKnowledge/SolutionsHelp/solutionsMap';

export const GenericPointsOfContact = ({
  solution
}: {
  solution: HelpSolutionType;
}) => {
  const { t } = useTranslation('helpAndKnowledge');
  return (
    <div>
      <p className="margin-top-0 text-pre-wrap ">
        {t(`solutions.centralizedDataExhange.points-of-contact.description`)}
      </p>
    </div>
  );
};

export default GenericPointsOfContact;
