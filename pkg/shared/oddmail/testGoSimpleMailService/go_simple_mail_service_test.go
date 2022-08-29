package testGoSimpleMailService

import (
	"crypto/tls"
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/cmsgov/mint-app/pkg/shared/oddmail"
)

func TestGoSimpleMailService_MockSend(t *testing.T) {
	emailService := setupGoSimpleMailServiceTest(t)
	fromAddress := "mint-test@cms.gov"
	toAddresses := []string{"user@test.com"}
	var ccAddresses []string
	subject := "Test Subject 2"
	contentType := "text/html"
	body := "Test Email"

	err := emailService.Send(fromAddress, toAddresses, ccAddresses, subject, contentType, body)
	assert.NoError(t, err)
}

func setupGoSimpleMailServiceTest(t *testing.T) *oddmail.GoSimpleMailService {
	//mockController := gomock.NewController(t)

	var mailServiceConfig oddmail.GoSimpleMailServiceConfig
	err := mailServiceConfig.LoadYAML("config/test/emailServiceConfig.yaml")
	assert.NoError(t, err)

	//nolint:gosec
	mailServiceConfig.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	emailService, err := oddmail.NewGoSimpleMailService(mailServiceConfig)
	assert.NoError(t, err)

	return emailService
}
