package main

import (
	"context"
	"log"

	"github.com/spf13/cobra"

	worker "github.com/contribsys/faktory_worker_go"
)

// Worker functions that execute jobs
func sendTestEmail(ctx context.Context, args ...interface{}) error {
	help := worker.HelperFor(ctx)
	log.Printf("Working on job %s\n", help.Jid())
	return nil
}

var workerCmd = &cobra.Command{
	Use:   "worker",
	Short: "Set up the Faktory worker",
	Long:  "Set up the Faktory worker",
	Run: func(cmd *cobra.Command, args []string) {
		mgr := worker.NewManager()

		// register job types and the function to execute them
		mgr.Register("TestEmailJob", sendTestEmail)
		//mgr.Register("AnotherJob", anotherFunc)

		// use up to N goroutines to execute jobs
		mgr.Concurrency = 20

		// pull jobs from these queues, in this order of precedence
		mgr.ProcessStrictPriorityQueues("critical", "default", "email")

		// Start processing jobs, this method does not return.
		mgr.Run()
	},
}
