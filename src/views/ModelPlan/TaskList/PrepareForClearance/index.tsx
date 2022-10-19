import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { Grid, GridContainer } from '@trussworks/react-uswds';

import MainContent from 'components/MainContent';
import { NotFoundPartial } from 'views/NotFound';

import PrepareForClearanceCheckList from './Checklist';
// import {
//   findLockedSection,
//   taskListSectionMap
// } from 'views/SubscriptionHandler';
// import { SubscriptionContext } from 'views/SubscriptionWrapper';
import ClearanceReview from './ClearanceReview';

export const PrepareForClearance = () => {
  const { modelID } = useParams<{ modelID: string }>();
  //   const { taskListSectionLocks } = useContext(SubscriptionContext);

  return (
    <MainContent data-testid="model-it-tools">
      <GridContainer>
        <Grid desktop={{ col: 12 }}>
          <Switch>
            {/* Model Plan Prepare for clearance Pages */}
            <Route
              path="/models/:modelID/task-list/prepare-for-clearance"
              exact
              render={() => <PrepareForClearanceCheckList modelID={modelID} />}
            />

            <Route
              path="/models/:modelID/task-list/prepare-for-clearance/:section/:sectionID"
              exact
              render={() => <ClearanceReview modelID={modelID} />}
            />

            {/* 404 */}
            <Route path="*" render={() => <NotFoundPartial />} />
          </Switch>
        </Grid>
      </GridContainer>
    </MainContent>
  );
};

export default PrepareForClearance;
