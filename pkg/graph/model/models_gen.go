// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"fmt"
	"io"
	"strconv"

	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/google/uuid"
)

// The current user of the application
type CurrentUser struct {
	LaunchDarkly *LaunchDarklySettings `json:"launchDarkly"`
}

// DiscussionReplyCreateInput represents the necessary fields to create a discussion reply
type DiscussionReplyCreateInput struct {
	DiscussionID uuid.UUID `json:"discussionID"`
	Content      string    `json:"content"`
	Resolution   bool      `json:"resolution"`
}

// Input associated with a document to be uploaded
type GeneratePresignedUploadURLInput struct {
	FileName string `json:"fileName"`
	MimeType string `json:"mimeType"`
	Size     int    `json:"size"`
}

// URL generated for a document to be uploaded
type GeneratePresignedUploadURLPayload struct {
	URL *string `json:"url"`
}

// The current user's Launch Darkly key
type LaunchDarklySettings struct {
	UserKey    string `json:"userKey"`
	SignedHash string `json:"signedHash"`
}

// PlanCollaboratorCreateInput represents the data required to create a collaborator on a plan
type PlanCollaboratorCreateInput struct {
	ModelPlanID uuid.UUID       `json:"modelPlanID"`
	EuaUserID   string          `json:"euaUserID"`
	FullName    string          `json:"fullName"`
	TeamRole    models.TeamRole `json:"teamRole"`
}

// PlanDiscussionCreateInput represents the necessary fields to create a plan discussion
type PlanDiscussionCreateInput struct {
	ModelPlanID uuid.UUID `json:"modelPlanID"`
	Content     string    `json:"content"`
}

// PlanDocumentInput represents the data required to create, modify, or delete a document on a plan
type PlanDocumentInput struct {
	ID                 *uuid.UUID              `json:"id"`
	ModelPlanID        uuid.UUID               `json:"modelPlanID"`
	DocumentParameters *PlanDocumentParameters `json:"documentParameters"`
	URL                *string                 `json:"url"`
}

// PlanDocumentCreateParameters represents the specific data required to create or modify a document on a plan
type PlanDocumentParameters struct {
	FileName             *string              `json:"fileName"`
	FileSize             int                  `json:"fileSize"`
	FileType             *string              `json:"fileType"`
	DocumentType         *models.DocumentType `json:"documentType"`
	OtherTypeDescription *string              `json:"otherTypeDescription"`
	OptionalNotes        *string              `json:"optionalNotes"`
}

// PlanDocumentPayload represents the response to a document request
type PlanDocumentPayload struct {
	Document     *models.PlanDocument `json:"document"`
	PresignedURL *string              `json:"presignedURL"`
}

type AgreementType string

const (
	AgreementTypeParticipation AgreementType = "PARTICIPATION"
	AgreementTypeCooperative   AgreementType = "COOPERATIVE"
	AgreementTypeOther         AgreementType = "OTHER"
)

var AllAgreementType = []AgreementType{
	AgreementTypeParticipation,
	AgreementTypeCooperative,
	AgreementTypeOther,
}

func (e AgreementType) IsValid() bool {
	switch e {
	case AgreementTypeParticipation, AgreementTypeCooperative, AgreementTypeOther:
		return true
	}
	return false
}

func (e AgreementType) String() string {
	return string(e)
}

func (e *AgreementType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AgreementType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AgreementType", str)
	}
	return nil
}

func (e AgreementType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type AlternativePaymentModelType string

const (
	AlternativePaymentModelTypeRegular  AlternativePaymentModelType = "REGULAR"
	AlternativePaymentModelTypeMips     AlternativePaymentModelType = "MIPS"
	AlternativePaymentModelTypeAdvanced AlternativePaymentModelType = "ADVANCED"
)

var AllAlternativePaymentModelType = []AlternativePaymentModelType{
	AlternativePaymentModelTypeRegular,
	AlternativePaymentModelTypeMips,
	AlternativePaymentModelTypeAdvanced,
}

func (e AlternativePaymentModelType) IsValid() bool {
	switch e {
	case AlternativePaymentModelTypeRegular, AlternativePaymentModelTypeMips, AlternativePaymentModelTypeAdvanced:
		return true
	}
	return false
}

func (e AlternativePaymentModelType) String() string {
	return string(e)
}

func (e *AlternativePaymentModelType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AlternativePaymentModelType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AlternativePaymentModelType", str)
	}
	return nil
}

func (e AlternativePaymentModelType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type AuthorityAllowance string

const (
	AuthorityAllowanceAca                     AuthorityAllowance = "ACA"
	AuthorityAllowanceCongressionallyMandated AuthorityAllowance = "CONGRESSIONALLY_MANDATED"
	AuthorityAllowanceSsaPartB                AuthorityAllowance = "SSA_PART_B"
	AuthorityAllowanceOther                   AuthorityAllowance = "OTHER"
)

var AllAuthorityAllowance = []AuthorityAllowance{
	AuthorityAllowanceAca,
	AuthorityAllowanceCongressionallyMandated,
	AuthorityAllowanceSsaPartB,
	AuthorityAllowanceOther,
}

func (e AuthorityAllowance) IsValid() bool {
	switch e {
	case AuthorityAllowanceAca, AuthorityAllowanceCongressionallyMandated, AuthorityAllowanceSsaPartB, AuthorityAllowanceOther:
		return true
	}
	return false
}

func (e AuthorityAllowance) String() string {
	return string(e)
}

func (e *AuthorityAllowance) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AuthorityAllowance(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AuthorityAllowance", str)
	}
	return nil
}

func (e AuthorityAllowance) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type CMMIGroup string

const (
	CMMIGroupPatientCareModelsGroup                       CMMIGroup = "PATIENT_CARE_MODELS_GROUP"
	CMMIGroupPolicyAndProgramsGroup                       CMMIGroup = "POLICY_AND_PROGRAMS_GROUP"
	CMMIGroupPreventiveAndPopulationHealthCareModelsGroup CMMIGroup = "PREVENTIVE_AND_POPULATION_HEALTH_CARE_MODELS_GROUP"
	CMMIGroupSeamlessCareModelsGroup                      CMMIGroup = "SEAMLESS_CARE_MODELS_GROUP"
	CMMIGroupStateInnovationsGroup                        CMMIGroup = "STATE_INNOVATIONS_GROUP"
)

var AllCMMIGroup = []CMMIGroup{
	CMMIGroupPatientCareModelsGroup,
	CMMIGroupPolicyAndProgramsGroup,
	CMMIGroupPreventiveAndPopulationHealthCareModelsGroup,
	CMMIGroupSeamlessCareModelsGroup,
	CMMIGroupStateInnovationsGroup,
}

func (e CMMIGroup) IsValid() bool {
	switch e {
	case CMMIGroupPatientCareModelsGroup, CMMIGroupPolicyAndProgramsGroup, CMMIGroupPreventiveAndPopulationHealthCareModelsGroup, CMMIGroupSeamlessCareModelsGroup, CMMIGroupStateInnovationsGroup:
		return true
	}
	return false
}

func (e CMMIGroup) String() string {
	return string(e)
}

func (e *CMMIGroup) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CMMIGroup(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CMMIGroup", str)
	}
	return nil
}

func (e CMMIGroup) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type GeographyApplication string

const (
	GeographyApplicationParticipants  GeographyApplication = "PARTICIPANTS"
	GeographyApplicationProviders     GeographyApplication = "PROVIDERS"
	GeographyApplicationBeneficiaries GeographyApplication = "BENEFICIARIES"
	GeographyApplicationOther         GeographyApplication = "OTHER"
)

var AllGeographyApplication = []GeographyApplication{
	GeographyApplicationParticipants,
	GeographyApplicationProviders,
	GeographyApplicationBeneficiaries,
	GeographyApplicationOther,
}

func (e GeographyApplication) IsValid() bool {
	switch e {
	case GeographyApplicationParticipants, GeographyApplicationProviders, GeographyApplicationBeneficiaries, GeographyApplicationOther:
		return true
	}
	return false
}

func (e GeographyApplication) String() string {
	return string(e)
}

func (e *GeographyApplication) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = GeographyApplication(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid GeographyApplication", str)
	}
	return nil
}

func (e GeographyApplication) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type GeographyType string

const (
	GeographyTypeState  GeographyType = "STATE"
	GeographyTypeRegion GeographyType = "REGION"
	GeographyTypeOther  GeographyType = "OTHER"
)

var AllGeographyType = []GeographyType{
	GeographyTypeState,
	GeographyTypeRegion,
	GeographyTypeOther,
}

func (e GeographyType) IsValid() bool {
	switch e {
	case GeographyTypeState, GeographyTypeRegion, GeographyTypeOther:
		return true
	}
	return false
}

func (e GeographyType) String() string {
	return string(e)
}

func (e *GeographyType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = GeographyType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid GeographyType", str)
	}
	return nil
}

func (e GeographyType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type KeyCharacteristic string

const (
	KeyCharacteristicEpisodeBased    KeyCharacteristic = "EPISODE_BASED"
	KeyCharacteristicPartC           KeyCharacteristic = "PART_C"
	KeyCharacteristicPartD           KeyCharacteristic = "PART_D"
	KeyCharacteristicPayment         KeyCharacteristic = "PAYMENT"
	KeyCharacteristicPopulationBased KeyCharacteristic = "POPULATION_BASED"
	KeyCharacteristicPreventative    KeyCharacteristic = "PREVENTATIVE"
	KeyCharacteristicServiceDelivery KeyCharacteristic = "SERVICE_DELIVERY"
	KeyCharacteristicSharedSavings   KeyCharacteristic = "SHARED_SAVINGS"
	KeyCharacteristicOther           KeyCharacteristic = "OTHER"
)

var AllKeyCharacteristic = []KeyCharacteristic{
	KeyCharacteristicEpisodeBased,
	KeyCharacteristicPartC,
	KeyCharacteristicPartD,
	KeyCharacteristicPayment,
	KeyCharacteristicPopulationBased,
	KeyCharacteristicPreventative,
	KeyCharacteristicServiceDelivery,
	KeyCharacteristicSharedSavings,
	KeyCharacteristicOther,
}

func (e KeyCharacteristic) IsValid() bool {
	switch e {
	case KeyCharacteristicEpisodeBased, KeyCharacteristicPartC, KeyCharacteristicPartD, KeyCharacteristicPayment, KeyCharacteristicPopulationBased, KeyCharacteristicPreventative, KeyCharacteristicServiceDelivery, KeyCharacteristicSharedSavings, KeyCharacteristicOther:
		return true
	}
	return false
}

func (e KeyCharacteristic) String() string {
	return string(e)
}

func (e *KeyCharacteristic) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = KeyCharacteristic(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid KeyCharacteristic", str)
	}
	return nil
}

func (e KeyCharacteristic) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// A user role associated with a job code
type Role string

const (
	// A basic MINT user
	RoleMintBaseUser Role = "MINT_BASE_USER"
	// A MINT admin user
	RoleMintAdminUser Role = "MINT_ADMIN_USER"
)

var AllRole = []Role{
	RoleMintBaseUser,
	RoleMintAdminUser,
}

func (e Role) IsValid() bool {
	switch e {
	case RoleMintBaseUser, RoleMintAdminUser:
		return true
	}
	return false
}

func (e Role) String() string {
	return string(e)
}

func (e *Role) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = Role(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid Role", str)
	}
	return nil
}

func (e Role) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type WaiverType string

const (
	WaiverTypeFraudAbuse     WaiverType = "FRAUD_ABUSE"
	WaiverTypeProgramPayment WaiverType = "PROGRAM_PAYMENT"
	WaiverTypeMedicaid       WaiverType = "MEDICAID"
)

var AllWaiverType = []WaiverType{
	WaiverTypeFraudAbuse,
	WaiverTypeProgramPayment,
	WaiverTypeMedicaid,
}

func (e WaiverType) IsValid() bool {
	switch e {
	case WaiverTypeFraudAbuse, WaiverTypeProgramPayment, WaiverTypeMedicaid:
		return true
	}
	return false
}

func (e WaiverType) String() string {
	return string(e)
}

func (e *WaiverType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = WaiverType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid WaiverType", str)
	}
	return nil
}

func (e WaiverType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
