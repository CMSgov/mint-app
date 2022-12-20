package services

import (
	"context"
	"fmt"

	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/graph/model"
)

// HasRole authorizes a user as having a given role
func HasRole(ctx context.Context, role model.Role) (bool, error) {
	fmt.Println("APP CONTEXT PRINCIPAL", appcontext.Principal(ctx))
	fmt.Println("APP CONTEXT PRINCIPAL", appcontext.Principal(ctx))
	fmt.Println("APP CONTEXT PRINCIPAL", appcontext.Principal(ctx))
	fmt.Println("APP CONTEXT PRINCIPAL", appcontext.Principal(ctx))
	fmt.Println("APP CONTEXT PRINCIPAL", appcontext.Principal(ctx))
	fmt.Println("APP CONTEXT PRINCIPAL", appcontext.Principal(ctx))
	fmt.Println("APP CONTEXT PRINCIPAL", appcontext.Principal(ctx))
	fmt.Println("APP CONTEXT PRINCIPAL", appcontext.Principal(ctx))
	logger := appcontext.ZLogger(ctx)
	principal := appcontext.Principal(ctx)
	switch role {
	case model.RoleMintUser:
		if !principal.AllowUSER() {
			logger.Info("does not have MINT job code")
			return false, nil
		}
		logger.Info("user authorized as MINT user", zap.Bool("Authorized", true))
		return true, nil
	case model.RoleMintAssessment:
		if !principal.AllowASSESSMENT() {
			logger.Info("does not have ADMIN job code")
			return false, nil
		}
		logger.Info("user authorized as ADMIN member", zap.Bool("Authorized", true))
		return true, nil
	case model.RoleMintMac:
		if !principal.AllowMAC() {
			logger.Info("does not have MAC job code")
			return false, nil
		}
		logger.Info("user authorized as MAC member", zap.Bool("Authorized", true))
		return true, nil
	default:
		logger.With(zap.String("Role", role.String())).Info("Unrecognized user role")
		return false, nil
	}
}
