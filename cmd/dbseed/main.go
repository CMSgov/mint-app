package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"go.uber.org/zap"

	"github.com/cmsgov/mint-app/pkg/appconfig"
	"github.com/cmsgov/mint-app/pkg/graph/model"
	"github.com/cmsgov/mint-app/pkg/models"
	"github.com/cmsgov/mint-app/pkg/storage"

	ld "gopkg.in/launchdarkly/go-server-sdk.v5"
)

var rootCmd = &cobra.Command{
	Use:   "dbseed",
	Short: "Seed the DB",
	Long:  "Seeds the Database with Model Plans and associated data",
	Run: func(cmd *cobra.Command, args []string) {
		config := viper.New()
		config.AutomaticEnv()
		seedData(config)
	},
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func getResolverDependencies(config *viper.Viper) (*storage.Store, *zap.Logger) {
	logger, err := zap.NewProduction()
	if err != nil {
		panic(err)
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
	ldClient, err := ld.MakeCustomClient("fake", ld.Config{Offline: true}, 0)
	if err != nil {
		panic(err)
	}

	store, err := storage.NewStore(logger, dbConfig, ldClient)
	if err != nil {
		fmt.Printf("Failed to get new database: %v", err)
		panic(err)
	}

	return store, logger

}

func seedData(config *viper.Viper) {
	// Get dependencies for resolvers (store and logger)
	store, logger := getResolverDependencies(config)

	// Seed an empty plan
	createModelPlan(store, logger, "Empty Plan", "MINT")

	// Seed a plan with some information already in it
	planWithBasics := createModelPlan(store, logger, "Plan with Basics", "MINT")
	updatePlanBasics(store, logger, planWithBasics, map[string]interface{}{
		"modelType":     models.MTVoluntary,
		"goal":          "Some goal",
		"cmsCenters":    []string{"CMMI", "OTHER"},
		"cmsOther":      "SOME OTHER CMS CENTER",
		"cmmiGroups":    []string{"PATIENT_CARE_MODELS_GROUP", "SEAMLESS_CARE_MODELS_GROUP"},
		"completeICIP":  "2020-05-13T20:47:50.12Z",
		"phasedIn":      true,
		"highLevelNote": "Some high level note",
	})

	// Seed a plan with collaborators
	planWithCollaborators := createModelPlan(store, logger, "Plan With Collaborators", "MINT")
	addPlanCollaborator(store, logger, planWithCollaborators, &model.PlanCollaboratorCreateInput{
		ModelPlanID: planWithCollaborators.ID,
		EuaUserID:   "BTAL",
		FullName:    "Betty Alpha",
		TeamRole:    models.TeamRoleLeadership,
		Email:       "bAlpha@local.fake",
	})

	// Seed a plan that is already archived
	archivedPlan := createModelPlan(store, logger, "Archived Plan", "MINT")
	updateModelPlan(store, logger, archivedPlan, map[string]interface{}{
		"archived": true,
	})
}
