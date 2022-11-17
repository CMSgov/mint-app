/*
SolutionCard component for rendering custom solution details
Contains links to edit solution details or remove details
*/

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Card, CardGroup, Grid, Link } from '@trussworks/react-uswds';
import classNames from 'classnames';

import UswdsReactLink from 'components/LinkWrapper';
import { GetOperationalNeed_operationalNeed_solutions as GetOperationalNeedSolutionsType } from 'queries/ITSolutions/types/GetOperationalNeed';

type SolutionCardProps = {
  className?: string;
  solution: GetOperationalNeedSolutionsType;
};

const SolutionCard = ({ className, solution }: SolutionCardProps) => {
  const { modelID, operationalNeedID } = useParams<{
    modelID: string;
    operationalNeedID: string;
  }>();

  const { t } = useTranslation('itSolutions');
  const { t: h } = useTranslation('generalReadOnly');

  return (
    <CardGroup className="flex-column">
      <Card className={classNames(className)}>
        <div className="padding-3">
          <h3 className="margin-bottom-2 margin-top-0 solutions-checkbox__header ">
            {solution.nameOther || solution.name}
          </h3>

          {solution.pocName && (
            <Grid tablet={{ col: 6 }}>
              <p className="text-bold margin-bottom-0">{t('contact')}</p>

              <p className="margin-y-0">{solution.pocName}</p>

              <Link
                aria-label={h('contactInfo.sendAnEmail')}
                className="line-height-body-5"
                href={`mailto:${solution.pocEmail}`}
                target="_blank"
              >
                <div className="margin-bottom-2">{solution.pocEmail}</div>
              </Link>
            </Grid>
          )}

          {solution.nameOther && (
            <div className="display-flex">
              <UswdsReactLink
                className="margin-right-2"
                to={`/models/${modelID}/task-list/it-solutions/${operationalNeedID}/add-custom-solution/${solution.id}`}
              >
                {t('updateTheseDetails')}
              </UswdsReactLink>

              {(solution.pocName || solution.pocEmail) && (
                <UswdsReactLink
                  className="text-red"
                  to={`/models/${modelID}/task-list/it-solutions/${operationalNeedID}/add-custom-solution/${solution.id}#remove-details`}
                >
                  {t('removeTheseDetails')}
                </UswdsReactLink>
              )}
            </div>
          )}
        </div>
      </Card>
    </CardGroup>
  );
};

export default SolutionCard;
