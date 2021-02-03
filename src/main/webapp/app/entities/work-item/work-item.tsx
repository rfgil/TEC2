import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './work-item.reducer';
import { IWorkItem } from 'app/shared/model/work-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWorkItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const WorkItem = (props: IWorkItemProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { workItemList, match, loading } = props;
  return (
    <div>
      <h2 id="work-item-heading">
        <Translate contentKey="tec2App.workItem.home.title">Work Items</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="tec2App.workItem.home.createLabel">Create new Work Item</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {workItemList && workItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.workItem.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.workItem.reference">Reference</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.workItem.deadline">Deadline</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.workItem.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.workItem.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.workItem.estimatedEmployeeHours">Estimated Employee Hours</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.workItem.estimatedMachineHours">Estimated Machine Hours</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.workItem.assignedUser">Assigned User</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.workItem.estimate">Estimate</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.workItem.project">Project</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {workItemList.map((workItem, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${workItem.id}`} color="link" size="sm">
                      {workItem.id}
                    </Button>
                  </td>
                  <td>{workItem.quantity}</td>
                  <td>{workItem.reference}</td>
                  <td>{workItem.deadline ? <TextFormat type="date" value={workItem.deadline} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>
                    <Translate contentKey={`tec2App.WorkItemStatus.${workItem.status}`} />
                  </td>
                  <td>
                    <Translate contentKey={`tec2App.WorkItemType.${workItem.type}`} />
                  </td>
                  <td>{workItem.estimatedEmployeeHours}</td>
                  <td>{workItem.estimatedMachineHours}</td>
                  <td>{workItem.assignedUser ? workItem.assignedUser.id : ''}</td>
                  <td>{workItem.estimate ? <Link to={`estimate/${workItem.estimate.id}`}>{workItem.estimate.id}</Link> : ''}</td>
                  <td>{workItem.project ? <Link to={`project/${workItem.project.id}`}>{workItem.project.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${workItem.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${workItem.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${workItem.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="tec2App.workItem.home.notFound">No Work Items found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ workItem }: IRootState) => ({
  workItemList: workItem.entities,
  loading: workItem.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WorkItem);
