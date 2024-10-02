package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"

	"github.com/cms-enterprise/mint-app/pkg/appcontext"
	"github.com/cms-enterprise/mint-app/pkg/flags"
	"github.com/cms-enterprise/mint-app/pkg/models"
)

// EchimpCr is the resolver for the echimpCR field.
func (r *queryResolver) EchimpCr(ctx context.Context, id string) (*models.EChimpCR, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	enabled, err := flags.GetBool(r.ldClient, principal, flags.LDEChimpEnabledKey, false)
	if err != nil {
		return nil, err
	}
	if enabled {
		return GetEChimpCRByID(r.echimpS3Client, r.viperConfig, logger, id)
	}

	return nil, nil
}

// EchimpCRs is the resolver for the echimpCRs field.
func (r *queryResolver) EchimpCRs(ctx context.Context) ([]*models.EChimpCR, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	enabled, err := flags.GetBool(r.ldClient, principal, flags.LDEChimpEnabledKey, false)
	if err != nil {
		return nil, err
	}
	if enabled {
		return GetEChimpCRs(r.echimpS3Client, r.viperConfig, logger)
	}

	return nil, nil
}

// EchimpTDLs is the resolver for the echimpTDLs field.
func (r *queryResolver) EchimpTDLs(ctx context.Context) ([]*models.EChimpTDL, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	enabled, err := flags.GetBool(r.ldClient, principal, flags.LDEChimpEnabledKey, false)
	if err != nil {
		return nil, err
	}
	if enabled {
		return GetEChimpTDLS(r.echimpS3Client, r.viperConfig, logger)
	}

	return nil, nil
}

// EchimpTdl is the resolver for the echimpTDL field.
func (r *queryResolver) EchimpTdl(ctx context.Context, id string) (*models.EChimpTDL, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	enabled, err := flags.GetBool(r.ldClient, principal, flags.LDEChimpEnabledKey, false)
	if err != nil {
		return nil, err
	}
	if enabled {
		return GetEChimpTDLByID(r.echimpS3Client, r.viperConfig, logger, id)
	}

	return nil, nil
}

// EchimpCRAndTdls is the resolver for the echimpCRAndTDLS field.
func (r *queryResolver) EchimpCRAndTdls(ctx context.Context) ([]models.EChimpCRAndTDLS, error) {
	principal := appcontext.Principal(ctx)
	logger := appcontext.ZLogger(ctx)

	enabled, err := flags.GetBool(r.ldClient, principal, flags.LDEChimpEnabledKey, false)
	if err != nil {
		return nil, err
	}
	if enabled {
		return GetEchimpCRAndTdls(r.echimpS3Client, r.viperConfig, logger)
	}

	return nil, nil
}
