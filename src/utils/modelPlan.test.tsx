import { TeamRole } from 'gql/gen/graphql';

import { GetModelCollaborators_modelPlan_collaborators as CollaboratorType } from 'queries/Collaborators/types/GetModelCollaborators';

import {
  collaboratorsOrderedByModelLeads,
  getUserInitials,
  returnValidLetter
} from './modelPlan';

describe('model plan util', () => {
  it('return valid user initials', () => {
    expect(getUserInitials('John Doe')).toEqual('JD');
    expect(getUserInitials('John Doe (He/They)')).toEqual('JD');
    expect(getUserInitials('John Jane Doe (He/They) 4 ## ')).toEqual('JJD');
  });

  it('return a single valid letter', () => {
    expect(returnValidLetter('D')).toEqual('D');
    expect(returnValidLetter('a')).toEqual('a');
    expect(returnValidLetter('@')).toEqual('');
    expect(returnValidLetter('}')).toEqual('');
  });

  it('returns array ordered by last name', () => {
    const normalPerson: CollaboratorType = {
      __typename: 'PlanCollaborator',
      id: '123',
      userID: '123',
      modelPlanID: '123',
      createdDts: '2022-05-12T15:01:39.190679Z',
      userAccount: {
        __typename: 'UserAccount',
        id: '123',
        commonName: 'Norm Nobody',
        email: 'email',
        username: 'not used here'
      },
      teamRoles: [TeamRole.IT_LEAD]
    };
    const steveRogers: CollaboratorType = {
      __typename: 'PlanCollaborator',
      id: '123',
      userID: '123',
      modelPlanID: '123',
      createdDts: '2022-05-12T15:01:39.190679Z',
      userAccount: {
        __typename: 'UserAccount',
        id: '123',
        commonName: 'Steve Rogers',
        email: 'email',
        username: 'not used here'
      },
      teamRoles: [TeamRole.MODEL_LEAD]
    };
    const peterParker: CollaboratorType = {
      __typename: 'PlanCollaborator',
      id: '123',
      userID: '123',
      modelPlanID: '123',
      createdDts: '2022-05-12T15:01:39.190679Z',
      userAccount: {
        __typename: 'UserAccount',
        id: '123',
        commonName: 'Peter Parker',
        email: 'email',
        username: 'not used here'
      },
      teamRoles: [TeamRole.MODEL_LEAD]
    };

    expect(
      collaboratorsOrderedByModelLeads([normalPerson, steveRogers, peterParker])
    ).toEqual([peterParker, steveRogers, normalPerson]);
  });
});
