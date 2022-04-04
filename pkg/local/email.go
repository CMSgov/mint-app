package local

import (
	"context"
	"github.com/cmsgov/mint-app/pkg/shared/logging"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/models"
)

// NewSender returns a fake email sender
func NewSender() Sender {
	return Sender{}
}

// Sender is a mock email sender for local environments
type Sender struct {
}

// Send logs an email
func (s Sender) Send(ctx context.Context, toAddress models.EmailAddress, ccAddress *models.EmailAddress, subject string, body string) error {
	ccAddresses := ""
	if ccAddress != nil {
		ccAddresses = ccAddress.String()
	}

	logging.ProvideLogger(ctx).Info("Mock sending email",
		zap.String("To", toAddress.String()),
		zap.String("CC", ccAddresses),
		zap.String("Subject", subject),
		zap.String("Body", body),
	)
	return nil
}
