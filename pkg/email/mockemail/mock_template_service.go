// Code generated by MockGen. DO NOT EDIT.
// Source: pkg/email/template_service.go

// Package mockemail is a generated GoMock package.
package mockemail

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"

	emailTemplates "github.com/cmsgov/mint-app/pkg/shared/emailTemplates"
)

// MockTemplateService is a mock of TemplateService interface.
type MockTemplateService struct {
	ctrl     *gomock.Controller
	recorder *MockTemplateServiceMockRecorder
}

// MockTemplateServiceMockRecorder is the mock recorder for MockTemplateService.
type MockTemplateServiceMockRecorder struct {
	mock *MockTemplateService
}

// NewMockTemplateService creates a new mock instance.
func NewMockTemplateService(ctrl *gomock.Controller) *MockTemplateService {
	mock := &MockTemplateService{ctrl: ctrl}
	mock.recorder = &MockTemplateServiceMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockTemplateService) EXPECT() *MockTemplateServiceMockRecorder {
	return m.recorder
}

// GetEmailTemplate mocks base method.
func (m *MockTemplateService) GetEmailTemplate(emailTemplateName string) (*emailTemplates.EmailTemplate, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetEmailTemplate", emailTemplateName)
	ret0, _ := ret[0].(*emailTemplates.EmailTemplate)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetEmailTemplate indicates an expected call of GetEmailTemplate.
func (mr *MockTemplateServiceMockRecorder) GetEmailTemplate(emailTemplateName interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetEmailTemplate", reflect.TypeOf((*MockTemplateService)(nil).GetEmailTemplate), emailTemplateName)
}

// Load mocks base method.
func (m *MockTemplateService) Load() error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Load")
	ret0, _ := ret[0].(error)
	return ret0
}

// Load indicates an expected call of Load.
func (mr *MockTemplateServiceMockRecorder) Load() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Load", reflect.TypeOf((*MockTemplateService)(nil).Load))
}
