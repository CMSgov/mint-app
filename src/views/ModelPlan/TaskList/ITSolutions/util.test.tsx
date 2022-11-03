import React from 'react';
import i18next from 'i18next';

import UswdsReactLink from 'components/LinkWrapper';
import { GetOperationalNeeds_modelPlan_operationalNeeds as GetOperationalNeedsOperationalNeedsType } from 'queries/ITSolutions/types/GetOperationalNeeds';
import { OpSolutionStatus } from 'types/graphql-global-types';

import { OperationalNeedStatus } from './_components/NeedsStatus';
import {
  filterNeedsFormatSolutions,
  filterPossibleNeeds,
  returnActionLinks
} from './util';

describe('IT Solutions Util', () => {
  it('returns formatted needed solutions', async () => {
    expect(
      filterNeedsFormatSolutions([
        {
          name: 'Advertise the model',
          needed: true,
          solutions: {
            solutions: [
              {
                name: 'Salesforce'
              }
            ],
            possibleSolutions: [
              {
                name: 'Grant Solutions'
              }
            ]
          }
        }
      ] as GetOperationalNeedsOperationalNeedsType[])
    ).toEqual([
      {
        name: 'Salesforce',
        needName: 'Advertise the model'
      }
    ]);
  });

  it('returns formatted possible', async () => {
    const possibleNeed = {
      name: 'Advertise the model',
      needed: false,
      solutions: {
        solutions: [
          {
            name: 'Salesforce'
          }
        ],
        possibleSolutions: [
          {
            name: 'Grant Solutions'
          }
        ]
      }
    } as GetOperationalNeedsOperationalNeedsType;
    expect(filterPossibleNeeds([possibleNeed])).toEqual([
      { ...possibleNeed, status: OperationalNeedStatus.NOT_NEEDED }
    ]);
  });

  it('returns Action link per status value', async () => {
    expect(returnActionLinks(OpSolutionStatus.NOT_STARTED)).toEqual(
      <UswdsReactLink to="/">
        {i18next.t('itSolutions:itSolutionsTable.changePlanAnswer')}
      </UswdsReactLink>
    );

    expect(returnActionLinks(OpSolutionStatus.AT_RISK)).toEqual(
      <>
        <UswdsReactLink to="/" className="margin-right-2">
          {i18next.t('itSolutions:itSolutionsTable.updateStatus')}
        </UswdsReactLink>
        <UswdsReactLink to="/">
          {i18next.t('itSolutions:itSolutionsTable.viewDetails')}
        </UswdsReactLink>
      </>
    );

    expect(returnActionLinks(OperationalNeedStatus.NOT_ANSWERED)).toEqual(
      <UswdsReactLink to="/">
        {i18next.t('itSolutions:itSolutionsTable.answer')}
      </UswdsReactLink>
    );
  });
});
