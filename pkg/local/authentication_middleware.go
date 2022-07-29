package local

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/go-openapi/swag"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/appcontext"
	"github.com/cmsgov/mint-app/pkg/authentication"
)

// DevUserConfig is the set of values that can be passed in a request header
type DevUserConfig struct {
	EUA      string   `json:"euaId"`
	JobCodes []string `json:"jobCodes"`
}

func authenticateMiddleware(logger *zap.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logger.Info("Using local authorization middleware")

		if len(r.Header["Authorization"]) == 0 {
			logger.Info("No local auth header present")
			next.ServeHTTP(w, r)
			return
		}

		authHeader := r.Header["Authorization"][0]
		ctx, err := devUserContext(r.Context(), authHeader)
		if err != nil {
			logger.Error("Empty dev user config JSON")
			w.WriteHeader(http.StatusBadRequest)
			next.ServeHTTP(w, r)
			return
		}
		if ctx == nil {
			logger.Info("No local auth header present")
			next.ServeHTTP(w, r)
			return
		}

		logger.Info("Using local authorization middleware and populating EUA ID and job codes")
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func devUserContext(ctx context.Context, authHeader string) (context.Context, error) {
	// don't attempt to handle local auth if the Authorization Header doesn't start with "Local"
	if !strings.HasPrefix(authHeader, "Local") {
		return ctx, nil
	}

	tokenParts := strings.Split(authHeader, "Local ")
	if len(tokenParts) < 2 {
		return nil, errors.New("invalid local auth header")
	}

	devUserConfigJSON := tokenParts[1]
	if devUserConfigJSON == "" {
		return nil, errors.New("empty dev user config JSON")
	}

	config := DevUserConfig{}

	if parseErr := json.Unmarshal([]byte(devUserConfigJSON), &config); parseErr != nil {
		return nil, errors.New("could not parse local auth JSON")
	}

	return appcontext.WithPrincipal(ctx, &authentication.EUAPrincipal{
		EUAID:        config.EUA,
		JobCodeMINT:  true,
		JobCodeADMIN: swag.ContainsStrings(config.JobCodes, "MINT_D_ADMIN_USER"),
	}), nil
}

// NewLocalWebSocketAuthenticationMiddleware returns a transport.WebsocketInitFunc that uses the `authToken` in
// the websocket connection payload to authenticate a local user.
func NewLocalWebSocketAuthenticationMiddleware(logger *zap.Logger) transport.WebsocketInitFunc {
	return func(ctx context.Context, initPayload transport.InitPayload) (context.Context, error) {
		// Get the token from payload
		all := initPayload
		fmt.Println("ALL OF EM BABY", all)
		any := initPayload["authToken"]
		token, ok := any.(string)
		if !ok || token == "" {
			return nil, errors.New("authToken not found in transport payload")
		}

		devCtx, err := devUserContext(ctx, token)
		if err != nil {
			logger.Error("could not set context for local dev auth", zap.Error(err))
			return nil, err
		}

		return devCtx, nil
	}
}

// NewLocalAuthenticationMiddleware stubs out context info for local (non-Okta) authentication
func NewLocalAuthenticationMiddleware(logger *zap.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return authenticateMiddleware(logger, next)
	}
}
