package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen

import (
	"context"

	"github.com/cmsgov/mint-app/pkg/appconfig"
	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/flags"
	"github.com/cmsgov/mint-app/pkg/models"
)

// EchimpCr is the resolver for the echimpCR field.
func (r *queryResolver) EchimpCr(ctx context.Context) ([]*models.EChimpCR, error) {
	principal := appcontext.Principal(ctx)

	enabled, err := flags.GetBool(principal, r.ldClient, appconfig.LDEChimpEnabledKey, false)
	if err != nil {
		return nil, err
	}
	if enabled {
		return GetEChimpCRs(r.echimpS3Client)
	}

	return nil, nil
}

// EchimpTdl is the resolver for the echimpTDL field.
func (r *queryResolver) EchimpTdl(ctx context.Context) ([]*models.EChimpTDL, error) {
	principal := appcontext.Principal(ctx)
	enabled, err := flags.GetBool(principal, r.ldClient, appconfig.LDEChimpEnabledKey, false)
	if err != nil {
		return nil, err
	}
	if enabled {
		return GetEChimpTDLS(r.echimpS3Client)
	}

	return nil, nil
}

// EchimpCRAndTdls is the resolver for the echimpCRAndTDLS field.
func (r *queryResolver) EchimpCRAndTdls(ctx context.Context) ([]models.EChimpCRAndTDLS, error) {
	principal := appcontext.Principal(ctx)
	enabled, err := flags.GetBool(principal, r.ldClient, appconfig.LDEChimpEnabledKey, false)
	if err != nil {
		return nil, err
	}
	if enabled {
		return GetEchimpCRAndTdls(r.echimpS3Client)
	}

	return nil, nil
}
