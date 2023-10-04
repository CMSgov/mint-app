package main

import (
	"fmt"
	"time"

	"github.com/google/uuid"

	"github.com/cmsgov/mint-app/pkg/email"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/shared/oddmail"
)

func main() {
	emailService := initializeOddMailService()
	templateService := initializeEmailTemplateService()
	addressBook := initializeAddressBook()

	// Running all test functions
	sendPlanDiscussionCreatedTestEmail(emailService, templateService, addressBook)
	sendModelPlanCreatedEmailTest(emailService, templateService)
	sendModelPlanShareTest(emailService, templateService, addressBook)
	sendDateChangedEmailsTest(emailService, templateService, addressBook)
	sendCollaboratorAddedEmailTest(emailService, templateService, addressBook)
}

func noErr(err error) {
	if err != nil {
		fmt.Println("Error!")
		fmt.Println(err)
		panic("Aborting")
	}
}

func initializeOddMailService() oddmail.EmailService {
	emailServiceConfig := oddmail.GoSimpleMailServiceConfig{
		Enabled:       true,
		Host:          "localhost",
		Port:          1030,
		ClientAddress: "localhost:3005",
	}

	emailService, err := oddmail.NewGoSimpleMailService(emailServiceConfig)
	noErr(err)
	return emailService
}

func initializeEmailTemplateService() email.TemplateService {
	emailTemplateService, err := email.NewTemplateServiceImpl()
	noErr(err)
	return emailTemplateService
}

func initializeAddressBook() email.AddressBook {
	return email.AddressBook{
		DefaultSender: "test@mint.dev.cms.gov",
		MINTTeamEmail: "test.team@mint.dev.cms.gov",
		ModelPlanDateChangedRecipients: []string{
			"test.receiver.1@mint.dev.cms.gov",
			"test.receiver.2@mint.dev.cms.gov",
		},
	}
}

func sendPlanDiscussionCreatedTestEmail(
	emailService oddmail.EmailService,
	templateService email.TemplateService,
	addressBook email.AddressBook,
) {
	discussionUserRole := models.DiscussionRoleMintTeam

	planDiscussion := models.NewPlanDiscussion(
		uuid.Nil,
		false,
		uuid.Nil,
		"Test Content for Plan Discussion",
		&discussionUserRole,
		models.StringPointer("Test User Role Description"),
	)

	err := sendPlanDiscussionCreatedEmail(
		emailService,
		templateService,
		addressBook,
		addressBook.MINTTeamEmail,
		planDiscussion,
		uuid.Nil,
	)
	noErr(err)
}

func sendPlanDiscussionCreatedEmail(
	emailService oddmail.EmailService,
	emailTemplateService email.TemplateService,
	addressBook email.AddressBook,
	receiverEmail string,
	planDiscussion *models.PlanDiscussion,
	modelPlanID uuid.UUID,
) error {
	if emailService == nil || emailTemplateService == nil {
		return nil
	}

	emailTemplate, err := emailTemplateService.GetEmailTemplate(email.PlanDiscussionCreatedTemplateName)
	if err != nil {
		return err
	}

	emailSubject, err := emailTemplate.GetExecutedSubject(email.PlanDiscussionCreatedSubjectContent{
		DiscussionContent: planDiscussion.Content,
	})
	if err != nil {
		return err
	}

	emailBody, err := emailTemplate.GetExecutedBody(email.PlanDiscussionCreatedBodyContent{
		ClientAddress:     emailService.GetConfig().GetClientAddress(),
		DiscussionID:      planDiscussion.ID.String(),
		UserName:          "Test User", // Note: Hardcoded for the test. In real use, it would be dynamic.
		DiscussionContent: planDiscussion.Content,
		ModelID:           modelPlanID.String(),
		ModelName:         "Test Model Plan Name", // Note: Hardcoded for the test. In real use, it would be dynamic.
	})
	if err != nil {
		return err
	}

	err = emailService.Send(
		addressBook.DefaultSender,
		[]string{receiverEmail},
		nil,
		emailSubject,
		"text/html",
		emailBody,
	)

	if err != nil {
		return err
	}

	return nil
}

func sendModelPlanCreatedEmailTest(
	emailService oddmail.EmailService,
	templateService email.TemplateService,
) {
	emailTemplate, err := templateService.GetEmailTemplate(email.ModelPlanCreatedTemplateName)
	noErr(err)

	emailSubject, err := emailTemplate.GetExecutedSubject(email.ModelPlanCreatedSubjectContent{
		ModelName: "Test Model Plan",
	})
	noErr(err)

	emailBody, err := emailTemplate.GetExecutedBody(email.ModelPlanCreatedBodyContent{
		ClientAddress: "localhost:3005",
		ModelName:     "Test Model Plan",
		ModelID:       "00",
		UserName:      "Test User",
	})
	noErr(err)

	err = emailService.Send(
		"test@mint.cms.gov",
		[]string{"test@mint.cms.gov"},
		nil,
		emailSubject,
		"text/html",
		emailBody,
	)
	noErr(err)
}

func sendModelPlanShareTest(
	emailService oddmail.EmailService,
	templateService email.TemplateService,
	addressBook email.AddressBook,
) {
	// Mocked data
	modelPlanID := uuid.New()
	receiverEmails := []string{"test1@example.com", "test2@example.com"}
	optionalMessage := models.StringPointer("This is an optional message.")

	// Mocked model plan and related data
	modelPlan := models.NewModelPlan(
		modelPlanID,
		"Test Model Plan",
	)

	// Get client address
	clientAddress := emailService.GetConfig().GetClientAddress()

	// Get email template
	emailTemplate, err := templateService.GetEmailTemplate(email.ModelPlanShareTemplateName)
	noErr(err)

	username := "Bob Ross"

	// Get email subject
	emailSubject, err := emailTemplate.GetExecutedSubject(email.ModelPlanShareSubjectContent{
		UserName: username,
	})
	noErr(err)

	// Mocking data for AdditionalModelCategories
	modelPlanCategoriesHumanized := []string{
		"Accountable Care",
		"Disease-Specific & Episodic",
		"Health Plan",
		"Prescription Drug",
	}

	humanizedViewFilter := models.StringPointer("Chronic Conditions Warehouse")
	lowercaseViewFilter := models.StringPointer("ccw")

	// Mocking data for modelLeads
	modelLeads := []string{"Lead 1", "Lead 2"}

	// Get email body
	emailBody, err := emailTemplate.GetExecutedBody(email.ModelPlanShareBodyContent{
		UserName:                 username,
		OptionalMessage:          optionalMessage,
		ModelName:                modelPlan.ModelName,
		ModelShortName:           modelPlan.Abbreviation,
		ModelCategories:          modelPlanCategoriesHumanized,
		ModelStatus:              models.ModelStatusHumanized[modelPlan.Status],
		ModelLastUpdated:         modelPlan.CreatedDts,
		ModelLeads:               modelLeads,
		ModelViewFilter:          lowercaseViewFilter,
		HumanizedModelViewFilter: humanizedViewFilter,
		ClientAddress:            clientAddress,
		ModelID:                  modelPlan.ID.String(),
	})
	noErr(err)

	// Send email
	err = emailService.Send(
		addressBook.DefaultSender,
		receiverEmails,
		nil,
		emailSubject,
		"text/html",
		emailBody,
	)
	noErr(err)
}

func sendDateChangedEmailsTest(
	emailService oddmail.EmailService,
	templateService email.TemplateService,
	addressBook email.AddressBook,
) {
	modelPlan := models.NewModelPlan(
		uuid.Nil,
		"Test Model Plan",
	)

	t1, _ := time.Parse(time.RFC3339, "2024-01-01T00:00:00Z")
	dateChangeSlice := []email.DateChange{
		{
			Field:     "Complete ICIP",
			IsChanged: true,
			NewDate:   &t1,
		}, {
			Field:         "Clearance",
			IsRange:       true,
			IsChanged:     true,
			NewRangeStart: &t1,
			NewRangeEnd:   &t1,
		}, {
			Field:     "Announce model",
			IsChanged: true,
			NewDate:   &t1,
		}, {
			Field:         "Application period",
			IsRange:       true,
			IsChanged:     true,
			NewRangeStart: &t1,
			NewRangeEnd:   &t1,
		}, {
			Field:         "Performance period",
			IsChanged:     true,
			IsRange:       true,
			NewRangeStart: &t1,
			NewRangeEnd:   &t1,
		}, {
			Field:     "Model wrap-up end date",
			IsChanged: true,
			NewDate:   &t1,
		},
	}

	emailTemplate, err := templateService.GetEmailTemplate(email.ModelPlanDateChangedTemplateName)
	noErr(err)

	emailSubject, err := emailTemplate.GetExecutedSubject(email.ModelPlanDateChangedSubjectContent{
		ModelName: modelPlan.ModelName,
	})
	noErr(err)

	emailBody, err := emailTemplate.GetExecutedBody(email.ModelPlanDateChangedBodyContent{
		ClientAddress: emailService.GetConfig().GetClientAddress(),
		ModelName:     modelPlan.ModelName,
		ModelID:       modelPlan.GetModelPlanID().String(),
		DateChanges:   dateChangeSlice,
	})
	noErr(err)

	err = emailService.Send(
		addressBook.DefaultSender,
		addressBook.ModelPlanDateChangedRecipients,
		nil,
		emailSubject,
		"text/html",
		emailBody,
	)
	noErr(err)
}

func sendCollaboratorAddedEmailTest(
	emailService oddmail.EmailService,
	templateService email.TemplateService,
	addressBook email.AddressBook,
) {
	receiverEmail := "test@example.com"
	modelPlan := models.NewModelPlan(
		uuid.Nil,
		"Test Model Plan",
	)

	emailTemplate, err := templateService.GetEmailTemplate(email.AddedAsCollaboratorTemplateName)
	noErr(err)

	emailSubject, err := emailTemplate.GetExecutedSubject(email.AddedAsCollaboratorSubjectContent{
		ModelName: modelPlan.ModelName,
	})
	noErr(err)

	emailBody, err := emailTemplate.GetExecutedBody(email.AddedAsCollaboratorBodyContent{
		ClientAddress: emailService.GetConfig().GetClientAddress(),
		ModelName:     modelPlan.ModelName,
		ModelID:       modelPlan.GetModelPlanID().String(),
	})
	noErr(err)

	err = emailService.Send(addressBook.DefaultSender, []string{receiverEmail}, nil, emailSubject, "text/html", emailBody)
	noErr(err)
}
