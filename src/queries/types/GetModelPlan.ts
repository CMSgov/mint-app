/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ModelCategory, CMSCenter, CMMIGroup, ModelStatus, ModelType, TaskStatus } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: GetModelPlan
// ====================================================

export interface GetModelPlan_modelPlan_basics {
  __typename: "PlanBasics";
  id: UUID | null;
  modelPlanID: UUID | null;
  modelType: ModelType | null;
  problem: string | null;
  goal: string | null;
  testInventions: string | null;
  note: string | null;
  status: TaskStatus;
}

export interface GetModelPlan_modelPlan_milestones {
  __typename: "PlanMilestones";
  id: UUID | null;
  modelPlanID: UUID | null;
  completeICIP: Time | null;
  clearanceStarts: Time | null;
  clearanceEnds: Time | null;
  announced: Time | null;
  applicationsStart: Time | null;
  applicationsEnd: Time | null;
  performancePeriodStarts: Time | null;
  performancePeriodEnds: Time | null;
  highLevelNote: string | null;
  wrapUpEnds: Time | null;
  phasedIn: boolean | null;
  phasedInNote: string | null;
  status: TaskStatus | null;
}

export interface GetModelPlan_modelPlan_discussions_replies {
  __typename: "DiscussionReply";
  id: UUID | null;
  content: string | null;
  discussionID: UUID;
  resolution: boolean | null;
  createdBy: string | null;
  createdDts: Time | null;
}

export interface GetModelPlan_modelPlan_discussions {
  __typename: "PlanDiscussion";
  id: UUID | null;
  content: string | null;
  status: DiscussionStatus;
  createdBy: string | null;
  createdDts: Time | null;
  replies: GetModelPlan_modelPlan_discussions_replies[];
}

export interface GetModelPlan_modelPlan_documents {
  __typename: "PlanDocument";
  id: UUID;
  fileName: string | null;
}

export interface GetModelPlan_modelPlan {
  __typename: "ModelPlan";
  id: UUID | null;
  modelName: string;
  modelCategory: ModelCategory | null;
  cmsCenters: CMSCenter[];
  cmsOther: string | null;
  cmmiGroups: CMMIGroup[];
  modifiedDts: Time | null;
  archived: boolean;
  status: ModelStatus;
  basics: GetModelPlan_modelPlan_basics | null;
  milestones: GetModelPlan_modelPlan_milestones | null;
  documents: GetModelPlan_modelPlan_documents[];
}

export interface GetModelPlan {
  modelPlan: GetModelPlan_modelPlan | null;
}

export interface GetModelPlanVariables {
  id: UUID;
}
