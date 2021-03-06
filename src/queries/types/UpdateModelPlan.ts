/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ModelPlanChanges, ModelCategory, CMSCenter, CMMIGroup, ModelStatus } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateModelPlan
// ====================================================

export interface UpdateModelPlan_updateModelPlan {
  __typename: "ModelPlan";
  id: UUID;
  modelName: string;
  modelCategory: ModelCategory | null;
  cmsCenters: CMSCenter[];
  cmmiGroups: CMMIGroup[];
  cmsOther: string | null;
  createdBy: string;
  modifiedBy: string | null;
  modifiedDts: Time | null;
  archived: boolean;
  status: ModelStatus;
}

export interface UpdateModelPlan {
  updateModelPlan: UpdateModelPlan_updateModelPlan;
}

export interface UpdateModelPlanVariables {
  id: UUID;
  changes: ModelPlanChanges;
}
