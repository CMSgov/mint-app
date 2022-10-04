// Code generated by MockGen. DO NOT EDIT.
// Source: email_service.go

// Package oddmail is a generated GoMock package.
package oddmail

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
)

// MockEmailService is a mock of EmailService interface.
type MockEmailService struct {
	ctrl     *gomock.Controller
	recorder *MockEmailServiceMockRecorder
}

// MockEmailServiceMockRecorder is the mock recorder for MockEmailService.
type MockEmailServiceMockRecorder struct {
	mock *MockEmailService
}

// NewMockEmailService creates a new mock instance.
func NewMockEmailService(ctrl *gomock.Controller) *MockEmailService {
	mock := &MockEmailService{ctrl: ctrl}
	mock.recorder = &MockEmailServiceMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockEmailService) EXPECT() *MockEmailServiceMockRecorder {
	return m.recorder
}

// Send mocks base method.
func (m *MockEmailService) Send(from string, toAddresses, ccAddresses []string, subject, contentType, body string) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Send", from, toAddresses, ccAddresses, subject, contentType, body)
	ret0, _ := ret[0].(error)
	return ret0
}

// Send indicates an expected call of Send.
func (mr *MockEmailServiceMockRecorder) Send(from, toAddresses, ccAddresses, subject, contentType, body interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Send", reflect.TypeOf((*MockEmailService)(nil).Send), from, toAddresses, ccAddresses, subject, contentType, body)
}
