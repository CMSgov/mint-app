package storage

import (
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/facebookgo/clock"
	"github.com/jmoiron/sqlx"
	ld "github.com/launchdarkly/go-server-sdk/v6"
	_ "github.com/lib/pq" // required for postgres driver in sql
)

// Store performs database operations for MINT
type Store struct {
	db        *sqlx.DB
	clock     clock.Clock
	easternTZ *time.Location
	ldClient  *ld.LDClient
}

// DBConfig holds the configurations for a database connection
type DBConfig struct {
	Host           string
	Port           string
	Database       string
	Username       string
	Password       string
	SSLMode        string
	UseIAM         bool
	MaxConnections int
}

// PrepareNamed implements the INamedPreparer interface
// Implementing the  sqlutils.NamedPreparer interface allows us to use a sqlx.Tx or a storage.Store as a parameter in our DB calls
// (the former for when we want to implement transactions, the latter for when we don't)
func (s *Store) PrepareNamed(query string) (*sqlx.NamedStmt, error) {
	return s.db.PrepareNamed(query)
}

// Beginx implements the TransactionPreparer interface
// Implementing the sqlutils.TransactionPreparer interfaces allows us to use a sqlx.DB or a storage.Store to create a transaction
func (s *Store) Beginx() (*sqlx.Tx, error) {
	return s.db.Beginx()
}

// NewStore creates a new Store struct
// The `db` property on the Store will always be a *sqlx.DB, but a notable difference in the DB is that if
// config.UseIAM is true, that DB instance will be backed by a custom connector in iam_db.go that generates
// IAM auth tokens when making new connections to the database.
// If config.UseIAM is false, it will connect using the "postgres" driver that SQLx registers in its init() function
// https://github.com/jmoiron/sqlx/blob/75a7ebf246fd757c9c7742da7dc4d26c6fdb6b5b/bind.go#L33-L40
func NewStore(
	config DBConfig,
	ldClient *ld.LDClient,
) (*Store, error) {
	// LifecycleIDs are generated based on Eastern Time
	tz, err := time.LoadLocation("America/New_York")
	if err != nil {
		return nil, err
	}

	var db *sqlx.DB
	if config.UseIAM {
		// Connect using the IAM DB package
		sess := session.Must(session.NewSession())
		db = newConnectionPoolWithIam(sess, config)
		err = db.Ping()
		if err != nil {
			return nil, err
		}
	} else {
		// Connect via normal user/pass
		dataSourceName := fmt.Sprintf(
			"host=%s port=%s user=%s "+
				"password=%s dbname=%s sslmode=%s",
			config.Host,
			config.Port,
			config.Username,
			config.Password,
			config.Database,
			config.SSLMode,
		)

		db, err = sqlx.Connect("postgres", dataSourceName)
		if err != nil {
			return nil, err
		}
	}

	db.SetMaxOpenConns(config.MaxConnections)

	return &Store{
		db:        db,
		clock:     clock.New(),
		easternTZ: tz,
		ldClient:  ldClient,
	}, nil
}
