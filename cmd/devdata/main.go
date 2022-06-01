package main

import (
	"github.com/google/uuid"

	"time"

	"github.com/lib/pq"

	// _ "github.com/lib/pq" // required for postgres driver in sql
	"go.uber.org/zap"
	ld "gopkg.in/launchdarkly/go-server-sdk.v5"

	"github.com/cmsgov/mint-app/pkg/appconfig"
	"github.com/cmsgov/mint-app/pkg/graph/model"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/storage"
	"github.com/cmsgov/mint-app/pkg/testhelpers"
)

func main() {
	config := testhelpers.NewConfig()
	logger, loggerErr := zap.NewDevelopment()
	if loggerErr != nil {
		panic(loggerErr)
	}

	dbConfig := storage.DBConfig{
		Host:           config.GetString(appconfig.DBHostConfigKey),
		Port:           config.GetString(appconfig.DBPortConfigKey),
		Database:       config.GetString(appconfig.DBNameConfigKey),
		Username:       config.GetString(appconfig.DBUsernameConfigKey),
		Password:       config.GetString(appconfig.DBPasswordConfigKey),
		SSLMode:        config.GetString(appconfig.DBSSLModeConfigKey),
		MaxConnections: config.GetInt(appconfig.DBMaxConnections),
	}

	ldClient, ldErr := ld.MakeCustomClient("fake", ld.Config{Offline: true}, 0)
	if ldErr != nil {
		panic(ldErr)
	}

	store, storeErr := storage.NewStore(logger, dbConfig, ldClient)
	if storeErr != nil {
		panic(storeErr)
	}

	ac := models.MCAccountableCare
	cms := models.CMSCenterForClinicalStandardsAndQuality

	voluntary := models.MTVoluntary
	mandatory := models.MTMandatory
	cat := models.MCPrimaryCareTransformation
	// models.ModelCategory

	makeModelPlan("Mrs. Mint", logger, store, func(p *models.ModelPlan) {
		p.ID = uuid.MustParse("f11eb129-2c80-4080-9440-439cbe1a286f")
		p.ModelName = "My excellent plan that I just initiated"
		p.Status = models.ModelStatusPlanDraft

		p.ModelCategory = &cat
		p.CMSCenters = pq.StringArray{string(models.CMSCenterForMedicare), string(models.CMSOther)}
		p.CMSOther = models.StringPointer("The Center for Awesomeness ")
		p.CMMIGroups = pq.StringArray{"STATE_INNOVATIONS_GROUP", "POLICY_AND_PROGRAMS_GROUP"}

		p.CreatedBy = "ABCD"
		p.ModifiedBy = nil
	})
	makePlanCollaborator(uuid.MustParse("f11eb129-2c80-4080-9440-439cbe1a286f"), "MINT", logger, store, func(c *models.PlanCollaborator) {
		c.FullName = "Mr. Mint"
		c.TeamRole = models.TeamRoleModelLead
	})

	makePlanCollaborator(uuid.MustParse("f11eb129-2c80-4080-9440-439cbe1a286f"), "WJZZ", logger, store, func(c *models.PlanCollaborator) {
		c.FullName = "Steven Wade"
		c.TeamRole = models.TeamRoleModelTeam
	})

	makePlanCollaborator(uuid.MustParse("f11eb129-2c80-4080-9440-439cbe1a286f"), "ABCD", logger, store, func(c *models.PlanCollaborator) {
		c.FullName = "Betty Alpha"
		c.TeamRole = models.TeamRoleLeadership
	})
	makePlanBeneficiaries(uuid.MustParse("f11eb129-2c80-4080-9440-439cbe1a286f"), logger, store, func(b *models.PlanBeneficiaries) {
		processPlanBeneficiaries(b)
		b.ID = uuid.MustParse("4ba095f6-c209-4b37-9008-c2476d628504")
		b.NumberPeopleImpacted = models.IntPointer(25)
	})
	makePlanParticipantsAndProviders(uuid.MustParse("f11eb129-2c80-4080-9440-439cbe1a286f"), logger, store, func(pp *models.PlanParticipantsAndProviders) {
		processPlanParticipantsAndProviders(pp)
		pp.ID = uuid.MustParse("da79bad2-b4ce-4975-80bf-bd6e71ae300f")
		pp.ExpectedNumberOfParticipants = models.IntPointer(25)
	})

	makeModelPlan("Mr. Mint", logger, store)
	pmGreatPlan := makeModelPlan("Mrs. Mint", logger, store, func(p *models.ModelPlan) {
		p.ID = uuid.MustParse("6e224030-09d5-46f7-ad04-4bb851b36eab")
		p.ModelName = "PM Butler's great plan"
		p.Status = models.ModelStatusPlanDraft

		p.CMMIGroups = pq.StringArray{"POLICY_AND_PROGRAMS_GROUP", "SEAMLESS_CARE_MODELS_GROUP"}

		p.CreatedBy = "MINT"
		p.ModifiedBy = nil
	})
	makePlanCollaborator(pmGreatPlan.ID, "MINT", logger, store, func(c *models.PlanCollaborator) {
		c.FullName = "Mr. Mint"
		c.TeamRole = models.TeamRoleModelLead
	})

	makePlanBasics(pmGreatPlan.ID, logger, store, func(b *models.PlanBasics) {
		b.ModelType = &mandatory

		b.Problem = models.StringPointer("There is not enough candy")
		b.TestInventions = models.StringPointer("The great candy machine")
		b.Note = models.StringPointer("The machine doesn't work yet")
	})

	makePlanMilestones(pmGreatPlan.ID, logger, store, func(m *models.PlanMilestones) {
		now := time.Now()
		phased := false
		m.CompleteICIP = &now
		m.ClearanceStarts = &now
		m.ClearanceEnds = &now
		m.Announced = &now
		m.ApplicationsStart = &now
		m.ApplicationsEnd = &now
		m.PerformancePeriodStarts = &now
		m.PerformancePeriodEnds = &now
		m.WrapUpEnds = &now
		m.HighLevelNote = models.StringPointer("Theses are my  best guess notes")
		m.PhasedIn = &phased
		m.PhasedInNote = models.StringPointer("This can't be phased in")

	})

	pmGreatDiscuss := makePlanDiscussion(pmGreatPlan.ID, logger, store, func(pd *models.PlanDiscussion) {
		pd.Content = "What is the purpose of this plan?"
		pd.Status = models.DiscussionAnswered
		pd.CreatedBy = "JAKE"
		pd.ModifiedBy = nil

	})

	makeDiscussionReply(pmGreatDiscuss.ID, logger, store, func(d *models.DiscussionReply) {
		d.Content = "To make more candy"
		d.Resolution = true
		d.CreatedBy = "FINN"
		d.ModifiedBy = nil

	})

	plan2 := makeModelPlan("Excellent Model", logger, store, func(p *models.ModelPlan) {
		p.ID = uuid.MustParse("18624c5b-4c00-49a7-960f-ac6d8b2c58df")
		p.ModelName = "Platonian ideal"
		p.Status = models.ModelStatusPlanDraft

		p.ModelCategory = &ac
		p.CMSCenters = pq.StringArray{string(cms)}
		// p.CMMIGroups = pq.StringArray{"STATE_INNOVATIONS_GROUP", "POLICY_AND_PROGRAMS_GROUP", "SEAMLESS_CARE_MODELS_GROUP"}

		p.CreatedBy = "MINT"
		p.ModifiedBy = nil
	})

	makePlanBasics(plan2.ID, logger, store, func(b *models.PlanBasics) {
		b.ModelType = &voluntary
		b.Problem = models.StringPointer("There is not enough candy")
		b.TestInventions = models.StringPointer("The great candy machine")
		b.Note = models.StringPointer("The machine doesn't work yet")
	})

	makePlanMilestones(plan2.ID, logger, store, func(m *models.PlanMilestones) {
		now := time.Now()
		phased := true
		m.CompleteICIP = &now
		m.ClearanceStarts = &now
		m.ClearanceEnds = &now
		m.Announced = &now
		m.ApplicationsStart = &now
		m.ApplicationsEnd = &now
		m.PerformancePeriodStarts = &now
		m.PerformancePeriodEnds = &now
		m.WrapUpEnds = &now
		m.HighLevelNote = models.StringPointer("Theses are my  best guess notes")
		m.PhasedIn = &phased
		m.PhasedInNote = models.StringPointer("This will be phased in")
	})

	makePlanGeneralCharacteristics(pmGreatPlan.ID, logger, store, processPlanGeneralCharacteristics)

	makePlanBeneficiaries(pmGreatPlan.ID, logger, store, processPlanBeneficiaries)
	makePlanParticipantsAndProviders(pmGreatPlan.ID, logger, store, processPlanParticipantsAndProviders)

	/*
		s3Config := upload.Config{Bucket: "mint-test-bucket", Region: "us-west", IsLocal: true}
		s3Client := upload.NewS3Client(s3Config)

		documentType := models.DocumentTypeOther
		planDocumentInput := model.PlanDocumentInput{
			ModelPlanID: uuid.MustParse("18624c5b-4c00-49a7-960f-ac6d8b2c58df"),
			DocumentParameters: &model.PlanDocumentParameters{
				FileName:             models.StringPointer("FAKE.pdf"),
				FileSize:             512512,
				FileType:             models.StringPointer("application/pdf"),
				DocumentType:         &documentType,
				OtherTypeDescription: models.StringPointer("A fake document"),
			},
			URL: models.StringPointer("http://minio:9005/mint-app-file-uploads/8bitshades.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=L31LSFLREORA0BKZ704N%2F20220504%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220504T045241Z&X-Amz-Expires=604800&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJMMzFMU0ZMUkVPUkEwQktaNzA0TiIsImV4cCI6MTY1MTY0Mjg2NiwicGFyZW50IjoibWluaW9hZG1pbiJ9.IM5OhdYOz5yqby2aTg4O9aABjlA0hjIIWiZNduDp5eRwqxCnEpf3kf77uLDUFKvebMI01KArTFmHQii8qMjAxQ&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=050aef69d3dab5e4e297ec942d33506a2e890989fc3cc537bae95c99b3297d1a"),
		}

		inputDocument := graph.ConvertToPlanDocumentModel(&planDocumentInput)

		makePlanDocument(logger, store, &s3Client, models.StringPointer("FAKE"), inputDocument, planDocumentInput.URL, func(d *models.PlanDocument) {})
	*/
}

func makeModelPlan(modelName string, logger *zap.Logger, store *storage.Store, callbacks ...func(*models.ModelPlan)) *models.ModelPlan {
	status := models.ModelStatusPlanDraft

	plan := models.ModelPlan{
		ModelName: modelName,
		Archived:  false,
		CreatedBy: "ABCD",
		Status:    status,
	}

	for _, cb := range callbacks {
		cb(&plan)
	}

	dbPlan, _ := store.ModelPlanCreate(logger, &plan)
	return dbPlan
}

func makePlanCollaborator(mpID uuid.UUID, euaID string, logger *zap.Logger, store *storage.Store, callbacks ...func(*models.PlanCollaborator)) *models.PlanCollaborator {

	collab := models.PlanCollaborator{
		EUAUserID:   euaID,
		TeamRole:    models.TeamRoleModelTeam,
		FullName:    euaID,
		ModelPlanID: mpID,

		CreatedBy: "ABCD",
	}
	for _, cb := range callbacks {
		cb(&collab)
	}
	dbCollab, _ := store.PlanCollaboratorCreate(logger, &collab)
	return dbCollab
}

func makePlanBasics(uuid uuid.UUID, logger *zap.Logger, store *storage.Store, callbacks ...func(*models.PlanBasics)) *models.PlanBasics {
	// ctx := appcontext.WithLogger(context.Background(), logger)
	status := models.TaskReady

	basics := models.PlanBasics{
		ModelPlanID: uuid,
		CreatedBy:   "ABCD",
		Status:      status,
	}

	for _, cb := range callbacks {
		cb(&basics)
	}

	err := basics.CalcStatus()
	if err != nil {
		panic(err)
	}
	dbBasics, _ := store.PlanBasicsCreate(logger, &basics)
	return dbBasics
}

/*func makePlanDocument(
	logger *zap.Logger,
	store *storage.Store,
	s3Client *upload.S3Client,
	principal *string,
	inputDocument *models.PlanDocument,
	inputURL *string,
	callbacks ...func(basics *models.PlanDocument)) *model.PlanDocumentPayload {

	document, err := store.PlanDocumentCreate(logger, principal, inputDocument, inputURL, s3Client)
	if err != nil {
		panic(fmt.Sprintf("Error - Could not create plan document: %v", err))
	}

	for _, callback := range callbacks {
		callback(document)
	}

	presignedURL, urlErr := s3Client.NewGetPresignedURL(*document.FileKey)
	if urlErr != nil {
		panic(fmt.Sprintf("Error - Could not create plan document presigned url: %v", urlErr))
	}

	payload := model.PlanDocumentPayload{
		Document:     document,
		PresignedURL: presignedURL,
	}

	return &payload
}*/

func makePlanDiscussion(uuid uuid.UUID, logger *zap.Logger, store *storage.Store, callbacks ...func(*models.PlanDiscussion)) *models.PlanDiscussion {
	discussion := models.PlanDiscussion{
		ModelPlanID: uuid,
		Content:     "This is a test comment",
		Status:      models.DiscussionUnAnswered,
		CreatedBy:   "ABCD",
	}

	for _, cb := range callbacks {
		cb(&discussion)
	}

	dbDiscuss, _ := store.PlanDiscussionCreate(logger, &discussion)
	return dbDiscuss

}

func makeDiscussionReply(uuid uuid.UUID, logger *zap.Logger, store *storage.Store, callbacks ...func(*models.DiscussionReply)) *models.DiscussionReply {

	reply := models.DiscussionReply{
		DiscussionID: uuid,
		Content:      "This is a test reply",
		Resolution:   false,
		CreatedBy:    "ABCD",
	}

	for _, cb := range callbacks {
		cb(&reply)
	}

	dbReply, _ := store.DiscussionReplyCreate(logger, &reply)
	return dbReply

}

func makePlanGeneralCharacteristics(modelPlanID uuid.UUID, logger *zap.Logger, store *storage.Store, callbacks ...func(*models.PlanGeneralCharacteristics)) *models.PlanGeneralCharacteristics {
	gc := models.PlanGeneralCharacteristics{
		ModelPlanID: modelPlanID,
		CreatedBy:   "ABCD",
		ModifiedBy:  models.StringPointer("ABCD"),
		Status:      models.TaskReady,
	}

	for _, cb := range callbacks {
		cb(&gc)
	}

	err := gc.CalcStatus()
	if err != nil {
		panic(err)
	}

	dbGeneralCharacteristics, _ := store.PlanGeneralCharacteristicsCreate(logger, &gc)
	return dbGeneralCharacteristics

}
func makePlanBeneficiaries(modelPlanID uuid.UUID, logger *zap.Logger, store *storage.Store, callbacks ...func(*models.PlanBeneficiaries)) *models.PlanBeneficiaries {
	b := models.PlanBeneficiaries{
		ModelPlanID: modelPlanID,
		CreatedBy:   "ABCD",
		ModifiedBy:  models.StringPointer("ABCD"),
		Status:      models.TaskReady,
	}

	for _, cb := range callbacks {
		cb(&b)
	}

	dbBeneficiaries, _ := store.PlanBeneficiariesCreate(logger, &b)
	return dbBeneficiaries

}

func makePlanParticipantsAndProviders(modelPlanID uuid.UUID, logger *zap.Logger, store *storage.Store, callbacks ...func(*models.PlanParticipantsAndProviders)) *models.PlanParticipantsAndProviders {
	pp := models.PlanParticipantsAndProviders{
		ModelPlanID: modelPlanID,
		CreatedBy:   "ABCD",
		ModifiedBy:  models.StringPointer("ABCD"),
	}

	for _, cb := range callbacks {
		cb(&pp)
	}
	err := pp.CalcStatus()
	if err != nil {
		panic(err)
	}

	dbPP, _ := store.PlanParticipantsAndProvidersCreate(logger, &pp)
	return dbPP

}

func makePlanMilestones(uuid uuid.UUID, logger *zap.Logger, store *storage.Store, callbacks ...func(*models.PlanMilestones)) *models.PlanMilestones {

	milestones := models.PlanMilestones{
		ModelPlanID: uuid,

		CreatedBy: "ABCD",
		Status:    models.TaskReady,
	}

	for _, cb := range callbacks {
		cb(&milestones)
	}

	err := milestones.CalcStatus()
	if err != nil {
		panic(err)
	}

	dbMilestones, _ := store.PlanMilestonesCreate(logger, &milestones)
	return dbMilestones
}

func processPlanGeneralCharacteristics(g *models.PlanGeneralCharacteristics) {
	fBool := false
	g.IsNewModel = models.BoolPointer(true)
	g.ExistingModel = models.StringPointer("My Existing Model")
	g.ResemblesExistingModel = models.BoolPointer(true)
	g.ResemblesExistingModelWhich = []string{"Exist Model 1", "Exist Model 2"}
	g.ResemblesExistingModelHow = models.StringPointer("They both have a similar approach to payment")
	g.ResemblesExistingModelNote = models.StringPointer("Check the payment section of the existing models")
	g.HasComponentsOrTracks = models.BoolPointer(true)
	g.HasComponentsOrTracksDiffer = models.StringPointer("One track does something one way, the other does it another way")
	g.HasComponentsOrTracksNote = models.StringPointer("Look at the tracks carefully")
	g.AlternativePaymentModel = models.BoolPointer(true)
	g.AlternativePaymentModelTypes = []string{model.AlternativePaymentModelTypeMips.String(), model.AlternativePaymentModelTypeAdvanced.String()}
	g.AlternativePaymentModelNote = models.StringPointer("Has 2 APM types!")
	g.KeyCharacteristics = []string{model.KeyCharacteristicPartC.String(), model.KeyCharacteristicPartD.String(), model.KeyCharacteristicOther.String()}
	g.KeyCharacteristicsOther = models.StringPointer("It's got lots of class and character")
	g.CollectPlanBids = models.BoolPointer(true)
	g.CollectPlanBidsNote = models.StringPointer("It collects SOOO many plan bids you wouldn't even get it broh")
	g.ManagePartCDEnrollment = &fBool
	g.ManagePartCDEnrollmentNote = models.StringPointer("It definitely will not manage Part C/D enrollment, are you crazy??")
	g.PlanContactUpdated = &fBool
	g.PlanContactUpdatedNote = models.StringPointer("I forgot to update it, but will soon")
	g.CareCoordinationInvolved = models.BoolPointer(true)
	g.CareCoordinationInvolvedDescription = models.StringPointer("It just is!")
	g.CareCoordinationInvolvedNote = models.StringPointer("Just think about it")
	g.AdditionalServicesInvolved = &fBool
	// g.AdditionalServicesInvolvedDescription = nil
	// g.AdditionalServicesInvolvedNote = nil
	g.CommunityPartnersInvolved = models.BoolPointer(true)
	g.CommunityPartnersInvolvedDescription = models.StringPointer("Very involved in the community")
	g.CommunityPartnersInvolvedNote = models.StringPointer("Check the community partners section")
	g.GeographiesTargeted = models.BoolPointer(true)
	g.GeographiesTargetedTypes = []string{model.GeographyTypeState.String(), model.GeographyTypeOther.String()}
	g.GeographiesTargetedTypesOther = models.StringPointer("The WORLD!")
	g.GeographiesTargetedAppliedTo = []string{model.GeographyApplicationParticipants.String(), model.GeographyApplicationOther.String()}
	g.GeographiesTargetedAppliedToOther = models.StringPointer("All Humans")
	// g.GeographiesTargetedNote = nil
	g.ParticipationOptions = models.BoolPointer(true)
	g.ParticipationOptionsNote = models.StringPointer("Really anyone can participate")
	g.AgreementTypes = []string{model.AgreementTypeOther.String()}
	g.AgreementTypesOther = models.StringPointer("A firm handshake")
	g.MultiplePatricipationAgreementsNeeded = &fBool
	g.MultiplePatricipationAgreementsNeededNote = models.StringPointer("A firm handshake should be more than enough")
	g.RulemakingRequired = models.BoolPointer(true)
	g.RulemakingRequiredDescription = models.StringPointer("The golden rule - target date of 05/08/2023")
	// g.RulemakingRequiredNote = nil
	g.AuthorityAllowances = []string{model.AuthorityAllowanceCongressionallyMandated.String()}
	// g.AuthorityAllowancesOther = nil
	// g.AuthorityAllowancesNote = nil
	g.WaiversRequired = models.BoolPointer(true)
	g.WaiversRequiredTypes = []string{model.WaiverTypeFraudAbuse.String()}
	g.WaiversRequiredNote = models.StringPointer("The vertigo is gonna grow 'cause it's so dangerous, you'll have to sign a waiver")
}

func processPlanBeneficiaries(b *models.PlanBeneficiaries) {

	b.ID = uuid.MustParse("b7aa2c9f-9e38-4e95-92d9-60bd791e8c59")
	// b.ModelPlanID = "Hello"
	var yes = models.TriYes
	var conf = models.ConfidenceSlightly
	var freq = models.SelectionAnnually
	var overlap = models.OverlapYesNeedPolicies

	b.Beneficiaries = pq.StringArray{"MEDICARE_FFS", "DISEASE_SPECIFIC", "OTHER"}
	b.BeneficiariesOther = models.StringPointer("The Gumdrop Kids")
	b.BeneficiariesNote = models.StringPointer("The disease is kidney failure")
	b.TreatDualElligibleDifferent = &yes
	b.TreatDualElligibleDifferentHow = models.StringPointer("Priority given to kidney failure")
	b.TreatDualElligibleDifferentNote = models.StringPointer("Can be overridden by vice-presidential order")
	b.ExcludeCertainCharacteristics = &yes
	b.ExcludeCertainCharacteristicsCriteria = models.StringPointer("Exclude any individuals who qualify for 5 other models")
	b.ExcludeCertainCharacteristicsNote = models.StringPointer("Exceptions can be made by presidential order")
	b.NumberPeopleImpacted = models.IntPointer(25)
	b.EstimateConfidence = &conf
	b.ConfidenceNote = models.StringPointer("This is probably correct")
	b.BeneficiarySelectionMethod = pq.StringArray{"PROVIDER_SIGN_UP", "OTHER"}
	b.BeneficiarySelectionOther = models.StringPointer("Competitive wrestling, elimination style")
	b.BeneficiarySelectionNote = models.StringPointer("Priority given to provider sign up")
	b.BeneficiarySelectionFrequency = &freq
	b.BeneficiarySelectionFrequencyOther = models.StringPointer("On February 29th when it occurs")
	b.BeneficiarySelectionFrequencyNote = models.StringPointer("Also as needed")
	b.BeneficiaryOverlap = &overlap
	b.BeneficiaryOverlapNote = models.StringPointer("This will likely overlap")
	b.PrecedenceRules = models.StringPointer("This takes precendence over all other models")

}

func processPlanParticipantsAndProviders(pp *models.PlanParticipantsAndProviders) {

	pp.ID = uuid.MustParse("b18d2f8c-e77b-4cbb-b992-25b43bec9d4f")

	var conf = models.ConfidenceSlightly
	var freq = models.SelectionAnnually
	var overlap = models.OverlapYesNeedPolicies
	var recruitment = models.RecruitmentOTHER
	var risk = models.RiskOTHER
	pp.Participants = pq.StringArray{"MEDICARE_PROVIDERS", "STATES", "OTHER"}
	pp.MedicareProviderType = models.StringPointer("Oncology Providers")
	pp.StatesEngagement = models.StringPointer("States will determine administration specific to the state")
	pp.ParticipantsOther = models.StringPointer("The candy people")
	pp.ParticipantsNote = models.StringPointer("Additional participants might join at a later date")
	pp.ParticipantsCurrentlyInModels = models.BoolPointer(true)
	pp.ParticipantsCurrentlyInModelsNote = models.StringPointer("A good number of candy people participate in other models")
	pp.ModelApplicationLevel = models.StringPointer(" c92.00 and c92.01")
	pp.ExpectedNumberOfParticipants = models.IntPointer(26)
	pp.EstimateConfidence = &conf
	pp.ConfidenceNote = models.StringPointer("Confidence will increase as the year progresses")
	pp.RecruitmentMethod = &recruitment
	pp.RecruitmentOther = models.StringPointer("We will put up signs throughout the kingdom")
	pp.RecruitmentNote = models.StringPointer("We will hire a contractor to put up the signs")
	pp.SelectionMethod = pq.StringArray{"MODEL_TEAM_REVIEW_APPLICATIONS", "OTHER"}
	pp.SelectionOther = models.StringPointer("Anyone who shows up to the open house on friday will automatically be selected")
	pp.SelectionNote = models.StringPointer("Open houses will be on a by weekly reoccurring basis")
	pp.CommunicationMethod = pq.StringArray{"MASS_EMAIL", "OTHER"}
	pp.CommunicationNote = models.StringPointer("If needed we will send text messages")
	pp.ParticipantAssumeRisk = models.BoolPointer(true)
	pp.RiskType = &risk
	pp.RiskOther = models.StringPointer("Programmatic Risk")
	pp.RiskNote = models.StringPointer("This is specifically dependant on external factors ")
	pp.WillRiskChange = models.BoolPointer(true)
	pp.WillRiskChangeNote = models.StringPointer("Less risky as time goes on")
	pp.CoordinateWork = models.BoolPointer(true)
	pp.CoordinateWorkNote = models.StringPointer("Weekly meetings will be held")
	pp.GainsharePayments = models.BoolPointer(true)
	pp.GainsharePaymentsTrack = models.BoolPointer(true)
	pp.GainsharePaymentsNote = models.StringPointer("This only applies to the first 50 participants")
	pp.ParticipantsIds = pq.StringArray{"TINS", "OTHER"}
	pp.ParticipantsIdsOther = models.StringPointer("Candy Kingdom Operations Number")
	pp.ParticipantsIDSNote = models.StringPointer("SSN can e used if the other ids are not avaialble")
	pp.ProviderAdditionFrequency = &freq
	pp.ProviderAdditionFrequencyOther = models.StringPointer("every other leap year")
	pp.ProviderAdditionFrequencyNote = models.StringPointer("Exceptions can be made")
	pp.ProviderAddMethod = pq.StringArray{"PROSPECTIVELY", "OTHER"}
	pp.ProviderAddMethodOther = models.StringPointer("Competitive ball-room dancing, free for all")
	pp.ProviderAddMethodNote = models.StringPointer("Priority given to prospectively")
	pp.ProviderLeaveMethod = pq.StringArray{"VOLUNTARILY_WITHOUT_IMPLICATIONS", "OTHER"}
	pp.ProviderLeaveMethodOther = models.StringPointer("When demanded by law")
	pp.ProviderLeaveMethodNote = models.StringPointer("We don't expect this to be required by law in very many locations")
	pp.ProviderOverlap = &overlap
	pp.ProviderOverlapHierarchy = models.StringPointer("When overlap occurs, this model will be a secondary model")
	pp.ProviderOverlapNote = models.StringPointer("Extenuating circumstances can allow this model to be the dominate model")

}
