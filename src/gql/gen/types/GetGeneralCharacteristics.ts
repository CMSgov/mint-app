/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { YesNoOtherType } from "./../../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: GetGeneralCharacteristics
// ====================================================

export interface GetGeneralCharacteristics_modelPlan_generalCharacteristics_resemblesExistingModelWhich_links {
  __typename: "ExistingModelLink";
  id: UUID | null;
  existingModelID: number | null;
  currentModelPlanID: UUID | null;
}

export interface GetGeneralCharacteristics_modelPlan_generalCharacteristics_resemblesExistingModelWhich {
  __typename: "ExistingModelLinks";
  links: GetGeneralCharacteristics_modelPlan_generalCharacteristics_resemblesExistingModelWhich_links[];
}

export interface GetGeneralCharacteristics_modelPlan_generalCharacteristics_participationInModelPreconditionWhich_links {
  __typename: "ExistingModelLink";
  id: UUID | null;
  existingModelID: number | null;
  currentModelPlanID: UUID | null;
}

export interface GetGeneralCharacteristics_modelPlan_generalCharacteristics_participationInModelPreconditionWhich {
  __typename: "ExistingModelLinks";
  links: GetGeneralCharacteristics_modelPlan_generalCharacteristics_participationInModelPreconditionWhich_links[];
}

export interface GetGeneralCharacteristics_modelPlan_generalCharacteristics {
  __typename: "PlanGeneralCharacteristics";
  id: UUID;
  isNewModel: boolean | null;
  currentModelPlanID: UUID | null;
  existingModelID: number | null;
  resemblesExistingModel: YesNoOtherType | null;
  /**
   * For providing clarifying comments if Yes or No is selected for resemblesExistingModel
   */
  resemblesExistingModelWhyHow: string | null;
  resemblesExistingModelHow: string | null;
  resemblesExistingModelNote: string | null;
  resemblesExistingModelWhich: GetGeneralCharacteristics_modelPlan_generalCharacteristics_resemblesExistingModelWhich | null;
  /**
   * For providing clarifying comments if Other is selected for resemblesExistingModel
   */
  resemblesExistingModelOtherSpecify: string | null;
  /**
   * For denoting if there is an other model that this model resembles if it's true that it resembles existing models.
   */
  resemblesExistingModelOtherSelected: boolean | null;
  /**
   * For denoting the name of the other existing model that this model resembles
   */
  resemblesExistingModelOtherOption: string | null;
  /**
   * For answering if participation in other models is a precondition for participating in this model
   */
  participationInModelPrecondition: YesNoOtherType | null;
  /**
   * The collection of existing model links relevant to the participationInModelPrecondition question
   */
  participationInModelPreconditionWhich: GetGeneralCharacteristics_modelPlan_generalCharacteristics_participationInModelPreconditionWhich | null;
  /**
   * For providing clarifying comments if Other is selected for participationInModelPrecondition
   */
  participationInModelPreconditionOtherSpecify: string | null;
  /**
   * For denoting if there is an other model that this model refers to.
   */
  participationInModelPreconditionOtherSelected: boolean | null;
  /**
   * For denoting the name of the other existing model
   */
  participationInModelPreconditionOtherOption: string | null;
  /**
   * For providing clarifying comments if Yes or No is selected for participationInModelPrecondition
   */
  participationInModelPreconditionWhyHow: string | null;
  /**
   * A note field for participationInModelPrecondition
   */
  participationInModelPreconditionNote: string | null;
  hasComponentsOrTracks: boolean | null;
  hasComponentsOrTracksDiffer: string | null;
  hasComponentsOrTracksNote: string | null;
}

export interface GetGeneralCharacteristics_modelPlan {
  __typename: "ModelPlan";
  id: UUID;
  modelName: string;
  generalCharacteristics: GetGeneralCharacteristics_modelPlan_generalCharacteristics;
}

export interface GetGeneralCharacteristics {
  modelPlan: GetGeneralCharacteristics_modelPlan;
}

export interface GetGeneralCharacteristicsVariables {
  id: UUID;
}
