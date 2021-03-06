import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainContent from 'components/MainContent';
import NotFound, { NotFoundPartial } from 'views/NotFound';

export const CostEstimate = () => {
  return (
    <MainContent className="grid-container" data-testid="model-cost-estimate">
      <Switch>
        <Route
          path="/models/:modelID/task-list/cost-estimate/page-1" // page-* may change pending UX clarifcation
          render={() => <NotFound />}
        />
        <Route path="*" render={() => <NotFoundPartial />} />
      </Switch>
    </MainContent>
  );
};

export default CostEstimate;
