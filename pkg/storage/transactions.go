package storage

import (
	"fmt"

	"github.com/jmoiron/sqlx"
)

type Transaction struct {
	store      *Store // TODO: SW
	tx         *sqlx.Tx
	properties TransactionProperties
	results    map[string]interface{}
	errors     []error
}
type TransactionProperties struct {
	commited   bool
	rolledBack bool
}

func NewTransaction(store *Store) *Transaction {
	return &Transaction{
		store:      store,
		tx:         store.db.MustBegin(),
		results:    map[string]interface{}{},
		properties: TransactionProperties{},
		errors:     []error{},
	}

}

// PrepareNamed implements the INamedPreparer interface
func (t *Transaction) PrepareNamed(query string) (*sqlx.NamedStmt, error) {
	return t.tx.PrepareNamed(query)
}

func (t *Transaction) GetResult(resultKey string) (interface{}, error) {

	return t.results[resultKey], nil // TODO: SW make this error if result isn't present
}

func (t *Transaction) SetResult(resultKey string, result interface{}) {
	t.results[resultKey] = result
}

// Next takes a function
func (t *Transaction) Next(tFunc func(t *Transaction) error) *Transaction {
	if t.Errored() { // Skip further execution if something errored earlier on
		return t
	}
	err := tFunc(t)
	if err != nil {
		t.errors = append(t.errors, err)
	}
	// TODO: SW take a chain function and define how the results get stored in the interface

	return t

}

func (t *Transaction) Errored() bool {
	return len(t.errors) >= 1
}

func (t *Transaction) Errors() error {
	if len(t.errors) < 1 {
		return nil
	}
	return fmt.Errorf("issue with making database transaction  %v", t.errors[0]) //TODO how to format more than one error
}

// Commit will attempt to commit a transaction.
// If there is an error, it will attempt to rollback the tx
// Any errors encountered during the attempts will be appeneded to the errors list
func (t *Transaction) Commit() error { //TODO: SW first check if there are errors, if there are, it should be rolled back
	if t.Errored() {
		return t.Errors()
	}
	err := t.tx.Commit()
	if err != nil {
		t.errors = append(t.errors, err)
		rollbackErr := t.tx.Rollback()
		if rollbackErr != nil {
			t.errors = append(t.errors, rollbackErr)
			return rollbackErr
		}
		t.properties.rolledBack = true
		return err
	}
	t.properties.commited = true

	return nil
}

type TransactionFunc[T any] func(*Transaction) (*T, error)

func WithTransaction[T any](s *Store, txFunc TransactionFunc[T]) (*T, error) {
	tx := NewTransaction(s)

	result, errFunc := txFunc(tx)
	if errFunc != nil {
		tx.errors = append(tx.errors, errFunc)
	}

	err := tx.Commit()

	if err != nil {
		return nil, err
	}

	return result, nil
}
