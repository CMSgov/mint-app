import React from 'react';
import { useTranslation } from 'react-i18next';

import { SolutionDetailProps } from '..';

export const Innovation4 = ({ type }: SolutionDetailProps) => {
  const { t } = useTranslation('helpAndKnowledge');
  return (
    <div>
      <p className="margin-top-0 text-pre-wrap ">
        {t(`solutions.innovation.${type}.description`)}
      </p>
    </div>
  );
};

export default Innovation4;
