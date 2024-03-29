package resolvers

import (
	"context"
	"fmt"

	"golang.org/x/sync/errgroup"
)

func (suite *ResolverSuite) TestPossibleOperationalSolutionContactsGetByPossibleSolutionID() {

	contacts, err := PossibleOperationalSolutionContactsGetByPossibleSolutionID(suite.testConfigs.Context, 1)
	suite.NoError(err)
	suite.NotNil(contacts)
	suite.Len(contacts, 4) //currently there are four solutions for solution 1 ( 4innovation (4i) )

}

func (suite *ResolverSuite) TestPossibleOperationalSolutionContactsDataLoader() {
	possibleSolutions, err := PossibleOperationalSolutionCollectionGetAll(suite.testConfigs.Logger, suite.testConfigs.Store)
	suite.NoError(err)
	suite.NotEmpty(possibleSolutions)

	g, ctx := errgroup.WithContext(suite.testConfigs.Context)

	for _, posSol := range possibleSolutions {
		solID := posSol.ID
		theFunc := func() error {
			return verifySolutionContactLoader(ctx, solID)
		}
		g.Go(theFunc)

	}
	err = g.Wait()
	suite.NoError(err)
}

func verifySolutionContactLoader(ctx context.Context, solutionID int) error {
	contacts, err := PossibleOperationalSolutionContactsGetByPossibleSolutionID(ctx, solutionID)
	if err != nil {
		return err
	}
	if len(contacts) < 1 {
		return nil // Not all possible operational solutions have contacts.
	}
	if solutionID != contacts[0].PossibleOperationalSolutionID {
		return fmt.Errorf("op solution contact returned operational solution ID %d, expected %d", contacts[0].PossibleOperationalSolutionID, solutionID)
	}
	return nil

}
