import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainContent from 'components/MainContent';
import NotFound, { NotFoundPartial } from 'views/NotFound';

export const Population = () => {
  return (
    <MainContent className="grid-container" data-testid="model-population">
      <Switch>
        <Route
          path="/models/:modelID/task-list/population/page-1" // page-* may change pending UX clarifcation
          render={() => <NotFound />}
        />
        <Route path="*" render={() => <NotFoundPartial />} />
      </Switch>
    </MainContent>
  );
};

export default Population;
