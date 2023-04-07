import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Grid,
  GridContainer,
  IconMail,
  Link,
  Tag
} from '@trussworks/react-uswds';
import classNames from 'classnames';
import { DateTime } from 'luxon';

import UswdsReactLink from 'components/LinkWrapper';
import NDABanner from 'components/NDABanner';
import useCheckResponsiveScreen from 'hooks/useCheckMobile';
import { GetModelPlanDiscussions_modelPlan_discussions as DiscussionType } from 'queries/Discussions/types/GetModelPlanDiscussions';
import { DiscussionStatus } from 'types/graphql-global-types';
import FormatDiscussion from 'views/ModelPlan/Discussions/FormatDiscussion';

import './index.scss';

export type FooterItemType = {
  heading: string;
  description: string;
};

export type TableItemType = {
  need: string;
  solution: string;
  status: string;
};

export const Landing = () => {
  return (
    <div className="display-flex flex-column">
      <LandingHeader />
      <LandingBody />
      <LandingFooter />
    </div>
  );
};

export const LandingHeader = () => {
  const { t } = useTranslation('landing');

  return (
    <div className="landing bg-primary-darker text-white">
      <GridContainer className="padding-top-2">
        <h1 className="landing__heading">{t('heading')}</h1>

        <p className="landing__description">{t('description')}</p>

        <UswdsReactLink
          className="usa-button bg-mint-cool-vivid text-white"
          variant="unstyled"
          to="/signin"
        >
          {t('signIn')}
        </UswdsReactLink>

        <NDABanner
          className="bg-primary-darker text-white padding-x-0 border-top border-primary-dark margin-top-6"
          landing
        />
      </GridContainer>
    </div>
  );
};

export const LandingBody = () => {
  const { t } = useTranslation('landing');

  const isXL = useCheckResponsiveScreen('xl');

  return (
    <GridContainer className="padding-top-2 padding-bottom-8 landing__contain">
      <Grid row gap={isXL ? 6 : 3}>
        <Grid
          desktop={{ col: 12 }}
          className="display-flex flex-justify-center"
        >
          <p className="text-bold landing__description">{t('bodyHeading')}</p>
        </Grid>
      </Grid>
      <Grid row gap={isXL ? 6 : 3} className="margin-bottom-5">
        <Grid
          desktop={{ col: 6 }}
          className="padding-bottom-2 landing__section-1"
        >
          <SolutionTable />
        </Grid>

        <Grid
          desktop={{ col: 6 }}
          className="landing__content flex-align-self-center"
        >
          <h2 className="margin-bottom-0">{t('bodyItem1.heading')}</h2>

          <p>{t('bodyItem1.description')}</p>
        </Grid>
      </Grid>

      <Grid row gap={isXL ? 6 : 3} className="margin-bottom-5 landing__row-2">
        <Grid
          desktop={{ col: 6 }}
          className="landing__content flex-align-self-center landing__section-3"
        >
          <h2 className="margin-bottom-0">{t('bodyItem2.heading')}</h2>

          <p>{t('bodyItem2.description')}</p>
        </Grid>

        <Grid
          desktop={{ col: 6 }}
          className="padding-bottom-2 landing__section-4"
        >
          <DiscussionCard />
        </Grid>
      </Grid>

      <Grid row gap={isXL ? 6 : 3} className="margin-bottom-5">
        <Grid
          desktop={{ col: 6 }}
          className="padding-bottom-2 landing__section-5"
        >
          <EmailCard />
        </Grid>

        <Grid
          desktop={{ col: 6 }}
          className="landing__content flex-align-self-center"
        >
          <h2 className="margin-bottom-0">{t('bodyItem3.heading')}</h2>

          <p>{t('bodyItem3.description')}</p>
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export const LandingFooter = () => {
  const { t } = useTranslation('landing');

  const footerItems: FooterItemType[] = t('footerItems', {
    returnObjects: true
  });

  return (
    <div className="landing bg-mint-cool-5 margin-bottom-neg-7">
      <GridContainer className="padding-top-6 padding-bottom-4">
        <h2 className="margin-bottom-2 margin-top-0">{t('heading')}</h2>

        <Grid row gap>
          {footerItems.map(item => (
            <Grid tablet={{ col: 4 }} key={item.heading}>
              <h3 className="margin-bottom-0">{item.heading}</h3>
              <p className="margin-top-1 line-height-mono-4">
                {item.description}
              </p>
            </Grid>
          ))}
        </Grid>

        <div className="display-flex landing__footer padding-top-2">
          <p className="text-bold margin-right-1">{t('access')}</p>
          <p>
            <Trans i18nKey="landing:email">
              indexOne
              <Link href="mailto:MINTTeam@cms.hhs.gov">helpTextEmail</Link>
              indexTwo
            </Trans>
          </p>
        </div>
      </GridContainer>
    </div>
  );
};

const SolutionTable = () => {
  const { t } = useTranslation('landing');

  const tableHeaders: string[] = t('tableHeaders', {
    returnObjects: true
  });

  const tableItems: TableItemType[] = t('table', {
    returnObjects: true
  });

  const renderStatus = (status: string): string => {
    let statusClass = '';

    switch (status) {
      case tableItems[0].status:
        statusClass = 'bg-base-lighter';
        break;
      case tableItems[1].status:
        statusClass = 'bg-warning';
        break;
      case tableItems[2].status:
        statusClass = 'bg-accent-cool';
        break;
      case tableItems[3].status:
        statusClass = 'transparent border text-base';
        break;
      default:
        break;
    }
    return statusClass;
  };

  return (
    <table className="landing__table radius-md padding-2">
      <thead>
        <tr>
          {tableHeaders.map(header => (
            <th
              key={header}
              className="padding-1 padding-left-0 border-bottom-2px"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {tableItems.map((item, index) => (
          <tr key={item.need}>
            <td className="padding-1 padding-y-2 padding-left-0">
              {item.need}
            </td>
            <td className="padding-1 padding-y-2 padding-left-0">
              {item.solution}
            </td>
            <td
              className={classNames('padding-1 padding-y-2 padding-left-0', {
                'padding-right-0': index === 3
              })}
            >
              <Tag
                className={classNames(
                  'padding-1 line-height-body-1 text-bold',
                  renderStatus(item.status)
                )}
              >
                {item.status}
              </Tag>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const DiscussionCard = () => {
  const justNow = DateTime.local().toISO();

  const hour3ago = DateTime.local().plus({ hours: 3, minutes: 30 }).toISO();

  const discussions: DiscussionType[] = [
    {
      id: 'c5960290-81b2-4303-8249-84d334de56b3',
      content: 'When should we submit an onboarding request to use Salesforce?',
      createdBy: 'd508dcaa-a455-4848-b717-49cbe5e3cf6b',
      createdDts: hour3ago,
      status: DiscussionStatus.ANSWERED,
      isAssessment: false,
      createdByUserAccount: {
        commonName: 'Jane Middleton',
        __typename: 'UserAccount'
      },
      replies: [
        {
          id: 'f2ac7d06-de24-4960-83fe-0dd8ed2b526f',
          discussionID: 'c5960290-81b2-4303-8249-84d334de56b3',
          content:
            'You should submit an onboarding request as soon as your team has a sense of what direction you want for IT support.',
          isAssessment: true,
          createdBy: 'd508dcaa-a455-4848-b717-49cbe5e3cf6b',
          createdDts: justNow,
          resolution: true,
          createdByUserAccount: {
            commonName: 'Zoe Hruban',
            __typename: 'UserAccount'
          },
          __typename: 'DiscussionReply'
        }
      ],
      __typename: 'PlanDiscussion'
    }
  ];

  return (
    <div className="landing__discussions line-height-mono-4 padding-2 radius-md">
      <FormatDiscussion
        discussionsContent={discussions}
        status={DiscussionStatus.ANSWERED}
        hasEditAccess
        setDiscussionStatusMessage={() => null}
        setDiscussionType={() => null}
        setReply={() => null}
      />
    </div>
  );
};

const EmailCard = () => {
  const { t } = useTranslation('landing');

  return (
    <div className="landing__email line-height-mono-4 padding-2 radius-md">
      <h2 className="margin-y-0">{t('emailHeading')}</h2>

      <p className="margin-y-0 text-base">{t('subHeading')}</p>

      <h3 className="margin-y-1 landing__subHeading">{t('dailyUpdates')}</h3>

      <p className="margin-y-0 text-bold font-sans-md">{t('sampleModel')}</p>

      <ul className="margin-top-1">
        <li>{t('bullet1')}</li>
        <li>{t('bullet2')}</li>
      </ul>

      <p className="text-primary text-underline text-bold  margin-bottom-0">
        {t('viewPlan')}
      </p>

      <div className="display-flex flex-justify-end width-full">
        <div className="landing__email-icon-contain display-flex flex-align-center flex-justify-center position-absolute">
          <IconMail size={5} className="landing__email-icon" />

          <div className="bg-red radius-top-pill radius-bottom-pill text-white padding-1 width-3 height-3 display-flex flex-align-center flex-justify-center position-absolute margin-left-8 margin-bottom-8">
            1
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
