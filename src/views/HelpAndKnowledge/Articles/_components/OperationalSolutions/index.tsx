import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, CardGroup, GridContainer } from '@trussworks/react-uswds';
import classNames from 'classnames';

import { operationalSolutionCategories } from '../..';
import CategoryCard from '../CategoryCard';

type OperationalSolutionsHelpProps = {
  className?: string;
};

const OperationalSolutionsHelp = ({
  className
}: OperationalSolutionsHelpProps) => {
  const { t } = useTranslation('helpAndKnowledge');

  return (
    <div
      className={classNames(
        className,
        'padding-y-4 padding-bottom-6 bg-primary-darker text-white margin-bottom-neg-7'
      )}
    >
      <GridContainer>
        <h2 className="margin-0">{t('operationalSolutions')}</h2>

        <p>{t('operationalSolutionsInfo')}</p>

        <CardGroup className={className}>
          {operationalSolutionCategories.map(category => (
            <CategoryCard
              key={category.key}
              category={t(`categories.${category.key}`)}
              route={category.route}
            />
          ))}
        </CardGroup>

        <Button type="button">{t('viewAllButton')}</Button>
      </GridContainer>
    </div>
  );
};

export default OperationalSolutionsHelp;
