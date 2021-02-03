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
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EstimateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EstimateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EstimateDetail} />
      <ErrorBoundaryRoute path={match.url} component={Estimate} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EstimateDeleteDialog} />
  </>
);

export default Routes;
