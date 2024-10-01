import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Icon
} from '@trussworks/react-uswds';

import ExternalLink from 'components/ExternalLink';

import './index.scss';

type EChimpCardProps = {
  id: string;
  title?: string | null;
  emergencyCrFlag?: boolean | null;
  sensitiveFlag?: boolean | null;
  crStatus?: string | null;
  implementationDate?: string | null;
  issuedDate?: string | null;
};

const EChimpCard = ({
  id,
  title,
  emergencyCrFlag,
  sensitiveFlag,
  crStatus,
  implementationDate,
  issuedDate
}: EChimpCardProps) => {
  const { t: crtdlsT } = useTranslation('crtdlsMisc');

  return (
    <Card gridLayout={{ desktop: { col: 4 } }} className="echimp-card">
      <CardHeader className="echimp-card__header">
        <h4 className="text-base">{id}</h4>
        <h3 className="echimp-card__header">{title?.replace(/&amp;/g, '&')}</h3>
      </CardHeader>

      <CardBody>
        {(emergencyCrFlag || sensitiveFlag) && (
          <div className="echimp-card__cr-tags">
            {emergencyCrFlag && (
              <div className="echimp-card__cr-tag echimp-card__cr-tag--emergency">
                <Icon.LocalFireDepartment />
                {crtdlsT('echimpCard.crTag.emergency')}
              </div>
            )}
            {sensitiveFlag && (
              <div className="echimp-card__cr-tag echimp-card__cr-tag--sensitive">
                <Icon.Flag />
                {crtdlsT('echimpCard.crTag.sensitive')}
              </div>
            )}
          </div>
        )}

        <div className="echimp-card__cr-status">
          <p className="text-bold">{crtdlsT('echimpCard.crStatus')}</p>
          <p>{crStatus}</p>
        </div>
        <div className="echimp-card__date">
          <p className="text-bold">
            {implementationDate && crtdlsT('echimpCard.implementationDate')}
            {issuedDate && crtdlsT('echimpCard.initiatedDate')}
          </p>
          <p>{implementationDate ?? issuedDate}</p>
        </div>
      </CardBody>

      <CardFooter>
        <Button type="button" className="usa-button">
          {crtdlsT('echimpCard.viewMore')}
        </Button>
        <ExternalLink href="https://echimp.cmsnet/" className="margin-right-0">
          {crtdlsT('echimpCard.viewThisInECHIMP')}
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

export default EChimpCard;
