import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { IconArrowForward, IconLaunch, Link } from '@trussworks/react-uswds';

import UswdsReactLink from 'components/LinkWrapper';
import GetModelPlanCollaborators from 'queries/Collaborators/GetModelCollaborators';
import {
  GetModelCollaborators,
  GetModelCollaborators_modelPlan_collaborators as GetCollaboratorsType
} from 'queries/Collaborators/types/GetModelCollaborators';

const ContactInfo = ({ modelID }: { modelID: string }) => {
  const { t: h } = useTranslation('generalReadOnly');

  const { data } = useQuery<GetModelCollaborators>(GetModelPlanCollaborators, {
    variables: {
      id: modelID
    }
  });

  const collaborators = (data?.modelPlan?.collaborators ??
    []) as GetCollaboratorsType[];

  return (
    <div className="model-plan__model-leads__wrapper model-leads padding-y-1">
      <p className="font-body-xs margin-top-0 margin-bottom-3">
        {h('contactInfo.modelLeads')}
      </p>

      {collaborators.map(collaborator => {
        return (
          <div
            key={collaborator.euaUserID}
            className="model-lead__member margin-bottom-3"
          >
            <h3 className="system-profile__subheader margin-bottom-1">
              {collaborator.fullName}
            </h3>
            <Link
              aria-label={h('contactInfo.sendAnEmail')}
              className="line-height-body-5 e"
              // TODO Once BE has email, change below
              href="mailto:fakeemail@asdf.com"
              target="_blank"
            >
              {h('contactInfo.sendAnEmail')}
              <IconLaunch className="margin-left-05 margin-bottom-2px text-tbottom" />
            </Link>
          </div>
        );
      })}

      <UswdsReactLink
        aria-label={h('contactInfo.moreTeamMembers')}
        className="line-height-body-5 display-flex flex-align-center "
        to="/"
      >
        {h('contactInfo.moreTeamMembers')}
        <IconArrowForward className="margin-left-1" />
      </UswdsReactLink>
    </div>
  );
};

export default ContactInfo;
