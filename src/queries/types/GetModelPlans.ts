/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ModelCategory, CMSCenter, CMMIGroup, ModelStatus, TeamRole, DiscussionStatus } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: GetModelPlans
// ====================================================

export interface GetModelPlans_modelPlanCollection_collaborators {
  __typename: "PlanCollaborator";
  id: UUID;
  fullName: string;
  teamRole: TeamRole;
}

export interface GetModelPlans_modelPlanCollection_discussions_replies {
  __typename: "DiscussionReply";
  resolution: boolean | null;
}

export interface GetModelPlans_modelPlanCollection_discussions {
  __typename: "PlanDiscussion";
  status: DiscussionStatus;
  replies: GetModelPlans_modelPlanCollection_discussions_replies[];
}

export interface GetModelPlans_modelPlanCollection {
  __typename: "ModelPlan";
  id: UUID | null;
  modelName: string;
  modelCategory: ModelCategory | null;
  cmsCenters: CMSCenter[];
  cmmiGroups: CMMIGroup[];
  status: ModelStatus;
  createdBy: string | null;
  createdDts: Time | null;
  modifiedDts: Time | null;
  collaborators: GetModelPlans_modelPlanCollection_collaborators[];
  discussions: GetModelPlans_modelPlanCollection_discussions[];
}

export interface GetModelPlans {
  modelPlanCollection: (GetModelPlans_modelPlanCollection | null)[] | null;
}
