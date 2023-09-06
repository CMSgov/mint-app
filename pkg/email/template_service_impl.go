package email

import (
	_ "embed"
	"fmt"

	"github.com/cmsgov/mint-app/pkg/shared/emailTemplates"
)

// AddedAsCollaboratorTemplateName is the template name definition for the corresponding email template
const AddedAsCollaboratorTemplateName string = "added_as_collaborator"

//go:embed templates/added_as_collaborator_subject.html
var addedAsCollaboratorSubjectTemplate string

//go:embed templates/added_as_collaborator_body.html
var addedAsCollaboratorBodyTemplate string

// DailyDigetsTemplateName is the template name definition for the corresponding email template
const DailyDigetsTemplateName string = "daily_digest"

//go:embed templates/daily_digest_subject.html
var dailyDigestSubjectTemplate string

//go:embed templates/daily_digest_body.html
var dailyDigestBodyTemplate string

// AggregatedDailyDigestTemplateName is the template name definition for the corresponding email template
const AggregatedDailyDigestTemplateName string = "aggregated_daily_digest"

//go:embed templates/aggregated_daily_digest_subject.html
var aggregatedDailyDigestSubjectTemplate string

//go:embed templates/aggregated_daily_digest_body.html
var aggregatedDailyDigestBodyTemplate string

// ModelPlanCreatedTemplateName is the template name definition for the corresponding email template
const ModelPlanCreatedTemplateName string = "model_plan_created"

//go:embed templates/model_plan_created_subject.html
var modelPlanCreatedSubjectTemplate string

//go:embed templates/model_plan_created_body.html
var modelPlanCreatedBodyTemplate string

// PlanDiscussionCreatedTemplateName is the template name definition for the corresponding email template
const PlanDiscussionCreatedTemplateName string = "plan_discussion_created"

//go:embed templates/plan_discussion_created_subject.html
var planDiscussionCreatedSubjectTemplate string

//go:embed templates/plan_discussion_created_body.html
var planDiscussionCreatedBodyTemplate string

// ModelPlanDateChangedTemplateName is the template name definition for the corresponding email template
const ModelPlanDateChangedTemplateName string = "model_plan_date_changed"

//go:embed templates/model_plan_date_changed_subject.html
var modelPlanDateChangedSubjectTemplate string

//go:embed templates/model_plan_date_changed_body.html
var modelPlanDateChangedBodyTemplate string

// ModelPlanShareTemplateName is the template name definition for the corresponding email template
const ModelPlanShareTemplateName string = "model_plan_share"

//go:embed templates/model_plan_share_subject.html
var modelPlanShareSubjectTemplate string

//go:embed templates/model_plan_share_body.html
var modelPlanShareBodyTemplate string

// TemplateServiceImpl is an implementation-specific structure loading all resources necessary for server execution
type TemplateServiceImpl struct {
	templateCache  *emailTemplates.TemplateCache
	emailTemplates map[string]*emailTemplates.EmailTemplate
}

// NewTemplateServiceImpl is a constructor for TemplateServiceImpl
func NewTemplateServiceImpl() (*TemplateServiceImpl, error) {
	service := &TemplateServiceImpl{templateCache: emailTemplates.NewTemplateCache()}

	err := service.Load()
	if err != nil {
		return nil, err
	}

	return service, nil
}

// Load caches all email templates which will be used by the template service
func (t *TemplateServiceImpl) Load() error {
	t.emailTemplates = make(map[string]*emailTemplates.EmailTemplate)

	err := t.loadEmailTemplate(AddedAsCollaboratorTemplateName, addedAsCollaboratorSubjectTemplate, addedAsCollaboratorBodyTemplate)
	if err != nil {
		return err
	}

	err = t.loadEmailTemplate(DailyDigetsTemplateName, dailyDigestSubjectTemplate, dailyDigestBodyTemplate)
	if err != nil {
		return err
	}

	err = t.loadEmailTemplate(AggregatedDailyDigestTemplateName, aggregatedDailyDigestSubjectTemplate, aggregatedDailyDigestBodyTemplate)
	if err != nil {
		return err
	}

	err = t.loadEmailTemplate(ModelPlanCreatedTemplateName, modelPlanCreatedSubjectTemplate, modelPlanCreatedBodyTemplate)
	if err != nil {
		return err
	}

	err = t.loadEmailTemplate(PlanDiscussionCreatedTemplateName, planDiscussionCreatedSubjectTemplate, planDiscussionCreatedBodyTemplate)
	if err != nil {
		return err
	}

	err = t.loadEmailTemplate(ModelPlanDateChangedTemplateName, modelPlanDateChangedSubjectTemplate, modelPlanDateChangedBodyTemplate)
	if err != nil {
		return err
	}

	err = t.loadEmailTemplate(ModelPlanShareTemplateName, modelPlanShareSubjectTemplate, modelPlanShareBodyTemplate)
	if err != nil {
		return err
	}

	return nil
}

func (t *TemplateServiceImpl) loadEmailTemplate(emailTemplateName string, subjectTemplate string, bodyTemplate string) error {
	_, emailTemplateExists := t.emailTemplates[emailTemplateName]
	if emailTemplateExists {
		return fmt.Errorf("email template %s already exists", emailTemplateName)
	}

	subjectEmailTemplateName := emailTemplateName + "_subject"
	bodyEmailTemplateName := emailTemplateName + "_body"

	err := t.templateCache.LoadTextTemplateFromString(subjectEmailTemplateName, subjectTemplate)
	if err != nil {
		return err
	}

	err = t.templateCache.LoadHTMLTemplateFromString(bodyEmailTemplateName, bodyTemplate)
	if err != nil {
		return err
	}

	t.emailTemplates[emailTemplateName] = emailTemplates.NewEmailTemplate(t.templateCache, subjectEmailTemplateName, bodyEmailTemplateName)

	return nil
}

// GetEmailTemplate fetches an emailTemplates.EmailTemplate by name from the emailTemplates.TemplateCache
func (t *TemplateServiceImpl) GetEmailTemplate(emailTemplateName string) (*emailTemplates.EmailTemplate, error) {
	emailTemplate, emailTemplateExists := t.emailTemplates[emailTemplateName]

	if !emailTemplateExists {
		return nil, fmt.Errorf("email template %s not found", emailTemplateName)
	}

	return emailTemplate, nil
}
