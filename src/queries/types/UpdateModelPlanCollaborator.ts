/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlanCollaboratorInput, TeamRole } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateModelPlanCollaborator
// ====================================================

export interface UpdateModelPlanCollaborator_updatePlanCollaborator {
  __typename: "PlanCollaborator";
  fullName: string;
  teamRole: TeamRole;
  euaUserID: string;
  modelPlanID: UUID;
}

export interface UpdateModelPlanCollaborator {
  updatePlanCollaborator: UpdateModelPlanCollaborator_updatePlanCollaborator | null;
}

export interface UpdateModelPlanCollaboratorVariables {
  input: PlanCollaboratorInput;
}
