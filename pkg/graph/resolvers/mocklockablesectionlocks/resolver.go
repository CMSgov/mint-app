// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/cms-enterprise/mint-app/pkg/graph/resolvers (interfaces: LockableSectionLocks)

// Package mocklockablesectionlocks is a generated GoMock package.
package mocklockablesectionlocks

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	uuid "github.com/google/uuid"

	model "github.com/cms-enterprise/mint-app/pkg/graph/model"
	pubsub "github.com/cms-enterprise/mint-app/pkg/shared/pubsub"
)

// MockLockableSectionLocks is a mock of LockableSectionLocks interface.
type MockLockableSectionLocks struct {
	ctrl     *gomock.Controller
	recorder *MockLockableSectionLocksMockRecorder
}

// MockLockableSectionLocksMockRecorder is the mock recorder for MockLockableSectionLocks.
type MockLockableSectionLocksMockRecorder struct {
	mock *MockLockableSectionLocks
}

// NewMockLockableSectionLocks creates a new mock instance.
func NewMockLockableSectionLocks(ctrl *gomock.Controller) *MockLockableSectionLocks {
	mock := &MockLockableSectionLocks{ctrl: ctrl}
	mock.recorder = &MockLockableSectionLocksMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockLockableSectionLocks) EXPECT() *MockLockableSectionLocksMockRecorder {
	return m.recorder
}

// GetLockableSectionLocks mocks base method.
func (m *MockLockableSectionLocks) GetLockableSectionLocks(arg0 uuid.UUID) ([]*model.LockableSectionLockStatus, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetLockableSectionLocks", arg0)
	ret0, _ := ret[0].([]*model.LockableSectionLockStatus)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetLockableSectionLocks indicates an expected call of GetLockableSectionLocks.
func (mr *MockLockableSectionLocksMockRecorder) GetLockableSectionLocks(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetLockableSectionLocks", reflect.TypeOf((*MockLockableSectionLocks)(nil).GetLockableSectionLocks), arg0)
}

// LockLockableSection mocks base method.
func (m *MockLockableSectionLocks) LockLockableSection(arg0 pubsub.PubSub, arg1 uuid.UUID, arg2, arg3 string) (bool, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "LockLockableSection", arg0, arg1, arg2, arg3)
	ret0, _ := ret[0].(bool)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// LockLockableSection indicates an expected call of LockLockableSection.
func (mr *MockLockableSectionLocksMockRecorder) LockLockableSection(arg0, arg1, arg2, arg3 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "LockLockableSection", reflect.TypeOf((*MockLockableSectionLocks)(nil).LockLockableSection), arg0, arg1, arg2, arg3)
}

// SubscribeLockableSectionLockChanges mocks base method.
func (m *MockLockableSectionLocks) SubscribeLockableSectionLockChanges(arg0 pubsub.PubSub, arg1 uuid.UUID, arg2 string, arg3 <-chan struct{}) (<-chan *model.LockableSectionLockStatusChanged, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "SubscribeLockableSectionLockChanges", arg0, arg1, arg2, arg3)
	ret0, _ := ret[0].(<-chan *model.LockableSectionLockStatusChanged)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SubscribeLockableSectionLockChanges indicates an expected call of SubscribeLockableSectionLockChanges.
func (mr *MockLockableSectionLocksMockRecorder) SubscribeLockableSectionLockChanges(arg0, arg1, arg2, arg3 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SubscribeLockableSectionLockChanges", reflect.TypeOf((*MockLockableSectionLocks)(nil).SubscribeLockableSectionLockChanges), arg0, arg1, arg2, arg3)
}

// UnlockAllLockableSections mocks base method.
func (m *MockLockableSectionLocks) UnlockAllLockableSections(arg0 pubsub.PubSub, arg1 uuid.UUID) []model.LockableSectionLockStatus {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UnlockAllLockableSections", arg0, arg1)
	ret0, _ := ret[0].([]model.LockableSectionLockStatus)
	return ret0
}

// UnlockAllLockableSections indicates an expected call of UnlockAllLockableSections.
func (mr *MockLockableSectionLocksMockRecorder) UnlockAllLockableSections(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UnlockAllLockableSections", reflect.TypeOf((*MockLockableSectionLocks)(nil).UnlockAllLockableSections), arg0, arg1)
}

// UnlockLockableSection mocks base method.
func (m *MockLockableSectionLocks) UnlockLockableSection(arg0 pubsub.PubSub, arg1 uuid.UUID, arg2, arg3 string) (bool, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UnlockLockableSection", arg0, arg1, arg2, arg3)
	ret0, _ := ret[0].(bool)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UnlockLockableSection indicates an expected call of UnlockLockableSection.
func (mr *MockLockableSectionLocksMockRecorder) UnlockLockableSection(arg0, arg1, arg2, arg3 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UnlockLockableSection", reflect.TypeOf((*MockLockableSectionLocks)(nil).UnlockLockableSection), arg0, arg1, arg2, arg3)
}
