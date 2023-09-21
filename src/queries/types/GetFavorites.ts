/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ModelPlanFilter, ModelStatus, TeamRole } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: GetFavorites
// ====================================================

export interface GetFavorites_modelPlanCollection_basics {
  __typename: "PlanBasics";
  id: UUID;
  goal: string | null;
  performancePeriodStarts: Time | null;
}

export interface GetFavorites_modelPlanCollection_collaborators_userAccount {
  __typename: "UserAccount";
  id: UUID;
  commonName: string;
}

export interface GetFavorites_modelPlanCollection_collaborators {
  __typename: "PlanCollaborator";
  id: UUID;
  userAccount: GetFavorites_modelPlanCollection_collaborators_userAccount;
  teamRole: TeamRole;
}

export interface GetFavorites_modelPlanCollection_crTdls {
  __typename: "PlanCrTdl";
  idNumber: string;
}

export interface GetFavorites_modelPlanCollection {
  __typename: "ModelPlan";
  id: UUID;
  modelName: string;
  isFavorite: boolean;
  nameHistory: string[];
  isCollaborator: boolean;
  status: ModelStatus;
  basics: GetFavorites_modelPlanCollection_basics;
  collaborators: GetFavorites_modelPlanCollection_collaborators[];
  crTdls: GetFavorites_modelPlanCollection_crTdls[];
}

export interface GetFavorites {
  modelPlanCollection: GetFavorites_modelPlanCollection[];
}

export interface GetFavoritesVariables {
  filter: ModelPlanFilter;
  isMAC: boolean;
}
