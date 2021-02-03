import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import WorkItem from './work-item';
import WorkItemDetail from './work-item-detail';
import WorkItemUpdate from './work-item-update';
import WorkItemDeleteDialog from './work-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WorkItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WorkItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WorkItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={WorkItem} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={WorkItemDeleteDialog} />
  </>
);

export default Routes;
