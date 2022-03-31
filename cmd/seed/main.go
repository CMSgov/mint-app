package main

// This program generates seed data for use in end to end tests.
//
// It is designed to be invoked from within Cypress tests using cy.exec.
// Field values are specified by setting the SEED_INPUT environment variable
// to a JSON object compatible with the default JSON serialization defined
// on that model in the Go code.

import (
	"fmt"
	"github.com/cmsgov/mint-app/pkg/shared/storage"
	"github.com/cmsgov/mint-app/pkg/shared/testhelpers"
	"os"

	_ "github.com/lib/pq" // required for postgres driver in sql
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	ld "gopkg.in/launchdarkly/go-server-sdk.v5"

	"github.com/cmsgov/mint-app/pkg/appconfig"
)

var rootCmd = &cobra.Command{
	Use:   "seed",
	Short: "Create seed data",
	Long:  "Generates models for use in Cypress tests",
}

/*var accessibilityRequestCmd = &cobra.Command{
	Use:   "accessibilityRequest",
	Short: "Generate an Accessibility Request",
	Run: func(cmd *cobra.Command, args []string) {
		connect()
		modelData := os.Getenv("SEED_INPUT")
		var accessibilityRequest models.AccessibilityRequest
		if deserializeErr := json.Unmarshal([]byte(modelData), &accessibilityRequest); deserializeErr != nil {
			template, _ := json.MarshalIndent(accessibilityRequest, "", "  ")
			fmt.Printf("Please provide input in the following format:\n %s\n", template)
			log.Fatal(deserializeErr)
		}
		makeAccessibilityRequest(&accessibilityRequest, store)
		serialized, serializeErr := json.MarshalIndent(accessibilityRequest, "", "  ")
		if serializeErr != nil {
			log.Fatal(serializeErr)
		}
		fmt.Printf("%s", serialized)
	},
}*/

func execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	//rootCmd.AddCommand(accessibilityRequestCmd)
}

var store *storage.Store

func connect() {
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

	storeInstance, storeErr := storage.NewStore(logger, dbConfig, ldClient)
	if storeErr != nil {
		panic(storeErr)
	}
	store = storeInstance
}

func main() {
	execute()
}

func must(_ interface{}, err error) {
	if err != nil {
		panic(err)
	}
}
