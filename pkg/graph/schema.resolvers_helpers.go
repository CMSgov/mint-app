package graph

import (
	"github.com/cmsgov/mint-app/pkg/graph/model"
	"github.com/cmsgov/mint-app/pkg/models"
)

func ConvertToModelPlan(mpi *model.ModelPlanInput) *models.ModelPlan {
	// TODO: We should probably have a better way to handle enum arrays
	var cmmiGroup []string
	for _, item := range mpi.CmmiGroups {
		cmmiGroup = append(cmmiGroup, string(item))
	}

	plan := models.ModelPlan{
		ModelName:     mpi.ModelName,
		ModelCategory: mpi.ModelCategory,
		CMSCenter:     mpi.CmsCenter,
		CMMIGroup:     cmmiGroup,
		CreatedBy:     mpi.CreatedBy,
		CreatedDts:    mpi.CreatedDts,
		ModifiedBy:    mpi.ModifiedBy,
		ModifiedDts:   mpi.ModifiedDts,
	}

	if mpi.ID != nil {
		plan.ID = *mpi.ID
	}
	return &plan

}

func ConvertToPlanBasics(mpi *model.PlanBasicsInput) *models.PlanBasics {
	basics := models.PlanBasics{
		ModelPlanID:    *mpi.ModelPlanID,
		ModelType:      mpi.ModelType,
		Problem:        mpi.Problem,
		Goal:           mpi.Goal,
		TestInventions: mpi.TestInventions,
		Note:           mpi.Note,
		CreatedBy:      mpi.CreatedBy,
		CreatedDts:     mpi.CreatedDts,
		ModifiedBy:     mpi.ModifiedBy,
		ModifiedDts:    mpi.ModifiedDts,
	}

	if mpi.ID != nil {
		basics.ID = *mpi.ID
	}
	if mpi.Status != nil {
		basics.Status = *mpi.Status
	}

	return &basics
}

func ConvertToPlanMilestonesModel(input *model.PlanMilestonesInput) *models.PlanMilestones {
	model := models.PlanMilestones{
		ModelPlanID:             *input.ModelPlanID,
		EnterCMSClearance:       input.EnterCMSClearance,
		EnterHMSOMBClearance:    input.EnterHMSOMBClearance,
		Cleared:                 input.Cleared,
		Announced:               input.Announced,
		ApplicationsDue:         input.ApplicationsDue,
		ParticipantsAnnounced:   input.ParticipantsAnnounced,
		PerformancePeriodStarts: input.PerformancePeriodStarts,
		PerformancePeriodEnds:   input.PerformancePeriodEnds,
		CreatedBy:               input.CreatedBy,
		CreatedDts:              input.CreatedDts,
		ModifiedBy:              input.ModifiedBy,
		ModifiedDts:             input.ModifiedDts,
	}

	if input.ID != nil {
		model.ID = *input.ID
	}

	return &model
}

func ConvertToPlanCollaborator(pci *model.PlanCollaboratorInput) *models.PlanCollaborator {
	collaborator := models.PlanCollaborator{
		ModelPlanID: pci.ModelPlanID,
		EUAUserID:   pci.EuaUserID,
		FullName:    pci.FullName,
		CMSCenter:   pci.CmsCenter,
		TeamRole:    pci.TeamRole,
		CreatedBy:   pci.CreatedBy,
		CreatedDts:  pci.CreatedDts,
		ModifiedBy:  pci.ModifiedBy,
		ModifiedDts: pci.ModifiedDts,
	}

	if pci.ID != nil {
		collaborator.ID = *pci.ID
	}
	return &collaborator

}
