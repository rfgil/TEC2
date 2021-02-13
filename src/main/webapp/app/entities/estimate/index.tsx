import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Estimate from './estimate';
import EstimateDetail from './estimate-detail';
import EstimateUpdate from './estimate-update';
import EstimateDeleteDialog from './estimate-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id([0-9]+)`} component={EstimateDetail} />
      <ErrorBoundaryRoute path={match.url} component={Estimate} />
    </Switch>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/new`} component={EstimateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id([0-9]+)/delete`} component={EstimateDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id([0-9]+)/edit`} component={EstimateUpdate} />
    </Switch>
  </>
);

export default Routes;
