/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TeamRole } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: GetModelCollaborators
// ====================================================

export interface GetModelCollaborators_modelPlan_collaborators {
  __typename: "PlanCollaborator";
  id: UUID;
  fullName: string;
  teamRole: TeamRole;
  createdDts: Time | null;
}

export interface GetModelCollaborators_modelPlan {
  __typename: "ModelPlan";
  collaborators: GetModelCollaborators_modelPlan_collaborators[];
}

export interface GetModelCollaborators {
  modelPlan: GetModelCollaborators_modelPlan | null;
}

export interface GetModelCollaboratorsVariables {
  id: UUID;
}
