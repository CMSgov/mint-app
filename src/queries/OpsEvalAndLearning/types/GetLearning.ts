/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CcmInvolvmentType, ModelLearningSystemType } from "./../../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: GetLearning
// ====================================================

export interface GetLearning_modelPlan_opsEvalAndLearning {
  __typename: "PlanOpsEvalAndLearning";
  id: UUID;
  ccmInvolvment: CcmInvolvmentType[];
  iddocSupport: boolean | null;
  modelLearningSystems: ModelLearningSystemType[];
  modelLearningSystemsOther: string | null;
  modelLearningSystemsNote: string | null;
  anticipatedChallenges: string | null;
}

export interface GetLearning_modelPlan {
  __typename: "ModelPlan";
  id: UUID;
  modelName: string;
  opsEvalAndLearning: GetLearning_modelPlan_opsEvalAndLearning;
}

export interface GetLearning {
  modelPlan: GetLearning_modelPlan;
}

export interface GetLearningVariables {
  id: UUID;
}
