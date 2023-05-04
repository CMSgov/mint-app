/*
CheckboxCard component for selecting needed IT solutions
Integrated with Formik
*/

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Checkbox,
  Grid,
  IconArrowForward,
  Link
} from '@trussworks/react-uswds';
import classNames from 'classnames';
import { Field } from 'formik';

import UswdsReactLink from 'components/LinkWrapper';
import useModalSolutionState from 'hooks/useModalSolutionState';
import { GetOperationalNeed_operationalNeed_solutions as GetOperationalNeedSolutionsType } from 'queries/ITSolutions/types/GetOperationalNeed';
import { OperationalSolutionKey } from 'types/graphql-global-types';
import { translateOperationalSolutionKey } from 'utils/modelPlan';
import SolutionDetailsModal from 'views/HelpAndKnowledge/SolutionsHelp/SolutionDetails/Modal';
import {
  helpSolutions,
  HelpSolutionType
} from 'views/HelpAndKnowledge/SolutionsHelp/solutionsMap';

import './index.scss';

type CheckboxCardProps = {
  className?: string;
  disabled?: boolean;
  solution: GetOperationalNeedSolutionsType;
  index: number;
};

const CheckboxCard = ({
  className,
  disabled,
  solution,
  index
}: CheckboxCardProps) => {
  const { t } = useTranslation('itSolutions');
  const { t: h } = useTranslation('generalReadOnly');
  const { t: hk } = useTranslation('helpAndKnowledge');
  const { modelID, operationalNeedID } = useParams<{
    modelID: string;
    operationalNeedID: string;
  }>();

  const history = useHistory();

  const location = useLocation();

  const [initLocation] = useState<string>(location.pathname);

  const { prevPathname, selectedSolution, renderModal } = useModalSolutionState(
    solution.key
  );

  // If custom solution, nameOther becoming the identifier
  const id = solution?.nameOther
    ? `it-solutions-${solution?.nameOther?.toLowerCase().replaceAll(' ', '-')}`
    : `it-solutions-${solution?.key?.toLowerCase().replace('_', '-')}`;

  const solutionMap = findSolutionByKey(solution.key, helpSolutions);

  const detailRoute = solutionMap?.route
    ? `${initLocation}${location.search}${
        location.search ? '&' : '?'
      }solution=${solutionMap?.route || ''}&section=about`
    : `${initLocation}${location.search}`;

  const treatAsOtherSolutions = [
    OperationalSolutionKey.CONTRACTOR,
    OperationalSolutionKey.CROSS_MODEL_CONTRACT,
    OperationalSolutionKey.EXISTING_CMS_DATA_AND_PROCESS,
    OperationalSolutionKey.INTERNAL_STAFF
  ];

  const isDefaultSolutionOptions =
    solution.name !== null && solution.pocEmail === null;

  const renderCTALink = () => {
    if (isDefaultSolutionOptions && solution.isOther) {
      return (
        <Button
          type="button"
          className="display-flex flex-align-center usa-button usa-button--unstyled margin-top-2 margin-bottom-0"
          onClick={() =>
            history.push(
              `/models/${modelID}/task-list/it-solutions/${operationalNeedID}/add-custom-solution/${
                solution.id !== '00000000-0000-0000-0000-000000000000'
                  ? solution.id
                  : ''
              }`,
              { selectedSolution: solution.key }
            )
          }
        >
          {t('addDetails')}
          <IconArrowForward className="margin-left-1" />
        </Button>
      );
    }

    if (solution.nameOther || solution.otherHeader) {
      return (
        <Button
          type="button"
          className="display-flex flex-align-center usa-button usa-button--unstyled margin-top-2 margin-bottom-0"
          onClick={() =>
            history.push(
              `/models/${modelID}/task-list/it-solutions/${operationalNeedID}/add-custom-solution/${solution.id}`,
              { selectedSolution: solution.key }
            )
          }
        >
          {t('updateTheseDetails')}
          <IconArrowForward className="margin-left-1" />
        </Button>
      );
    }

    return (
      <UswdsReactLink
        className="display-flex flex-align-center usa-button usa-button--unstyled margin-top-2"
        to={detailRoute}
      >
        {t('aboutSolution')}
        <IconArrowForward className="margin-left-1" />
      </UswdsReactLink>
    );
  };

  return (
    <Grid tablet={{ col: 6 }} className="display-flex">
      {renderModal && selectedSolution && (
        <SolutionDetailsModal
          solution={selectedSolution}
          openedFrom={prevPathname}
          closeRoute={`/models/${modelID}/task-list/it-solutions/${operationalNeedID}/select-solutions`}
        />
      )}

      <Card
        className={classNames('width-full', className)}
        containerProps={{ className: 'padding-3 flex-justify' }}
      >
        <div className="solutions-checkbox__above-the-border">
          <div className="solutions-checkbox__header">
            <Field
              as={Checkbox}
              disabled={disabled}
              id={`${id}-${solution.id}`}
              name={`solutions[${index}].needed`}
              label={t('selectSolution')}
              value={!!solution.needed}
              checked={!!solution.needed}
              className="margin-y-0"
            />

            {/* If solution is one of the treatAsOther, then render the following  */}
            {solution.key &&
              treatAsOtherSolutions.includes(solution.key) &&
              !isDefaultSolutionOptions && (
                <>
                  <h3 className="margin-top-2 margin-bottom-0">
                    {solution.otherHeader}
                  </h3>
                  <h5 className="text-normal margin-top-0 margin-bottom-2">
                    {translateOperationalSolutionKey(solution.key)}
                  </h5>
                </>
              )}

            {/* If solution key is not one of the treatAsOther, then render its name/nameOther */}
            {/* If solution is custom (aka solution key is null), then render its name/nameOther */}
            {(!solution.key ||
              !treatAsOtherSolutions.includes(solution.key) ||
              isDefaultSolutionOptions) && (
              <h3 className="margin-y-2">
                {solution.nameOther || solution.name}
              </h3>
            )}
          </div>

          {(!solution.isOther || isDefaultSolutionOptions) && (
            <div className="margin-bottom-2 solutions-checkbox__body-text">
              {solutionMap &&
                hk(`solutions.${solutionMap.key}.about.description`)}
            </div>
          )}

          {solutionMap?.pointsOfContact[0].name ? (
            <Grid
              tablet={{ col: 12 }}
              className={classNames({ 'margin-bottom-2': solution.name })}
            >
              <p className="text-bold margin-bottom-0">{t('contact')}</p>

              <p className="margin-y-0">
                {solutionMap?.pointsOfContact[0].name}
              </p>

              <Link
                aria-label={h('contactInfo.sendAnEmail')}
                className="line-height-body-5 display-flex flex-align-center"
                href={`mailto:${solutionMap?.pointsOfContact[0].email}`}
                target="_blank"
              >
                <div>{solutionMap?.pointsOfContact[0].email}</div>
              </Link>
            </Grid>
          ) : (
            <Grid
              tablet={{ col: 12 }}
              className={classNames({ 'margin-bottom-2': solution.name })}
            >
              <p className="text-bold margin-bottom-0">{t('contact')}</p>

              <p className="margin-y-0">{solution.pocName}</p>

              <Link
                aria-label={h('contactInfo.sendAnEmail')}
                className="line-height-body-5 display-flex flex-align-center"
                href={`mailto:${solution.pocEmail}`}
                target="_blank"
              >
                <div>{solution.pocEmail}</div>
              </Link>
            </Grid>
          )}
        </div>

        <div className="border-top border-base-light">{renderCTALink()}</div>
      </Card>
    </Grid>
  );
};

export const findSolutionByKey = (
  key: OperationalSolutionKey | null,
  solutions: HelpSolutionType[]
): HelpSolutionType | undefined => {
  if (!key) return undefined;
  return [...solutions].find(solution => solution.enum === key);
};

export default CheckboxCard;
