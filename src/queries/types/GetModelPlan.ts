/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ModelStatus, TaskStatus, DiscussionStatus } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: GetModelPlan
// ====================================================

export interface GetModelPlan_modelPlan_basics {
  __typename: "PlanBasics";
  id: UUID;
  clearanceStarts: Time | null;
  modifiedDts: Time | null;
  readyForClearanceDts: Time | null;
  status: TaskStatus;
}

export interface GetModelPlan_modelPlan_documents {
  __typename: "PlanDocument";
  id: UUID;
  fileName: string;
}

export interface GetModelPlan_modelPlan_crTdls {
  __typename: "PlanCrTdl";
  id: UUID;
  idNumber: string;
}

export interface GetModelPlan_modelPlan_discussions_replies {
  __typename: "DiscussionReply";
  id: UUID;
  discussionID: UUID;
  content: string | null;
  createdBy: string;
  createdDts: Time;
  resolution: boolean | null;
}

export interface GetModelPlan_modelPlan_discussions {
  __typename: "PlanDiscussion";
  id: UUID;
  content: string | null;
  createdBy: string;
  createdDts: Time;
  status: DiscussionStatus;
  replies: GetModelPlan_modelPlan_discussions_replies[];
}

export interface GetModelPlan_modelPlan_generalCharacteristics {
  __typename: "PlanGeneralCharacteristics";
  id: UUID;
  createdBy: string;
  createdDts: Time;
  modifiedBy: string | null;
  modifiedDts: Time | null;
  readyForClearanceDts: Time | null;
  status: TaskStatus;
}

export interface GetModelPlan_modelPlan_participantsAndProviders {
  __typename: "PlanParticipantsAndProviders";
  id: UUID;
  createdBy: string;
  createdDts: Time;
  modifiedBy: string | null;
  modifiedDts: Time | null;
  readyForClearanceDts: Time | null;
  status: TaskStatus;
}

export interface GetModelPlan_modelPlan_beneficiaries {
  __typename: "PlanBeneficiaries";
  id: UUID;
  createdBy: string;
  createdDts: Time;
  modifiedBy: string | null;
  modifiedDts: Time | null;
  readyForClearanceDts: Time | null;
  status: TaskStatus;
}

export interface GetModelPlan_modelPlan_opsEvalAndLearning {
  __typename: "PlanOpsEvalAndLearning";
  id: UUID;
  createdBy: string;
  createdDts: Time;
  modifiedBy: string | null;
  modifiedDts: Time | null;
  readyForClearanceDts: Time | null;
  status: TaskStatus;
}

export interface GetModelPlan_modelPlan_payments {
  __typename: "PlanPayments";
  id: UUID;
  createdBy: string;
  createdDts: Time;
  modifiedBy: string | null;
  modifiedDts: Time | null;
  readyForClearanceDts: Time | null;
  status: TaskStatus;
}

export interface GetModelPlan_modelPlan_itTools {
  __typename: "PlanITTools";
  id: UUID;
  createdBy: string;
  createdDts: Time;
  modifiedBy: string | null;
  modifiedDts: Time | null;
  status: TaskStatus;
}

export interface GetModelPlan_modelPlan {
  __typename: "ModelPlan";
  id: UUID;
  modelName: string;
  modifiedDts: Time | null;
  archived: boolean;
  status: ModelStatus;
  basics: GetModelPlan_modelPlan_basics;
  documents: GetModelPlan_modelPlan_documents[];
  crTdls: GetModelPlan_modelPlan_crTdls[];
  discussions: GetModelPlan_modelPlan_discussions[];
  generalCharacteristics: GetModelPlan_modelPlan_generalCharacteristics;
  participantsAndProviders: GetModelPlan_modelPlan_participantsAndProviders;
  beneficiaries: GetModelPlan_modelPlan_beneficiaries;
  opsEvalAndLearning: GetModelPlan_modelPlan_opsEvalAndLearning;
  payments: GetModelPlan_modelPlan_payments;
  itTools: GetModelPlan_modelPlan_itTools;
}

export interface GetModelPlan {
  modelPlan: GetModelPlan_modelPlan;
}

export interface GetModelPlanVariables {
  id: UUID;
}
