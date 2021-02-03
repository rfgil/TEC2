import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IEstimate } from 'app/shared/model/estimate.model';
import { getEntities as getEstimates } from 'app/entities/estimate/estimate.reducer';
import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { getEntity, updateEntity, createEntity, reset } from './work-item.reducer';
import { IWorkItem } from 'app/shared/model/work-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IWorkItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WorkItemUpdate = (props: IWorkItemUpdateProps) => {
  const [assignedUserId, setAssignedUserId] = useState('0');
  const [estimateId, setEstimateId] = useState('0');
  const [projectId, setProjectId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { workItemEntity, users, estimates, projects, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/work-item');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getEstimates();
    props.getProjects();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...workItemEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="tec2App.workItem.home.createOrEditLabel">
            <Translate contentKey="tec2App.workItem.home.createOrEditLabel">Create or edit a WorkItem</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : workItemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="work-item-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="work-item-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="quantityLabel" for="work-item-quantity">
                  <Translate contentKey="tec2App.workItem.quantity">Quantity</Translate>
                </Label>
                <AvField
                  id="work-item-quantity"
                  type="string"
                  className="form-control"
                  name="quantity"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="referenceLabel" for="work-item-reference">
                  <Translate contentKey="tec2App.workItem.reference">Reference</Translate>
                </Label>
                <AvField id="work-item-reference" type="text" name="reference" />
              </AvGroup>
              <AvGroup>
                <Label id="deadlineLabel" for="work-item-deadline">
                  <Translate contentKey="tec2App.workItem.deadline">Deadline</Translate>
                </Label>
                <AvField id="work-item-deadline" type="date" className="form-control" name="deadline" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="work-item-status">
                  <Translate contentKey="tec2App.workItem.status">Status</Translate>
                </Label>
                <AvInput
                  id="work-item-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && workItemEntity.status) || 'ToDo'}
                >
                  <option value="ToDo">{translate('tec2App.WorkItemStatus.ToDo')}</option>
                  <option value="InProgress">{translate('tec2App.WorkItemStatus.InProgress')}</option>
                  <option value="Done">{translate('tec2App.WorkItemStatus.Done')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="work-item-type">
                  <Translate contentKey="tec2App.workItem.type">Type</Translate>
                </Label>
                <AvInput
                  id="work-item-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && workItemEntity.type) || 'Task'}
                >
                  <option value="Task">{translate('tec2App.WorkItemType.Task')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="estimatedEmployeeHoursLabel" for="work-item-estimatedEmployeeHours">
                  <Translate contentKey="tec2App.workItem.estimatedEmployeeHours">Estimated Employee Hours</Translate>
                </Label>
                <AvField
                  id="work-item-estimatedEmployeeHours"
                  type="string"
                  className="form-control"
                  name="estimatedEmployeeHours"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="estimatedMachineHoursLabel" for="work-item-estimatedMachineHours">
                  <Translate contentKey="tec2App.workItem.estimatedMachineHours">Estimated Machine Hours</Translate>
                </Label>
                <AvField
                  id="work-item-estimatedMachineHours"
                  type="string"
                  className="form-control"
                  name="estimatedMachineHours"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="work-item-assignedUser">
                  <Translate contentKey="tec2App.workItem.assignedUser">Assigned User</Translate>
                </Label>
                <AvInput id="work-item-assignedUser" type="select" className="form-control" name="assignedUser.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="work-item-estimate">
                  <Translate contentKey="tec2App.workItem.estimate">Estimate</Translate>
                </Label>
                <AvInput id="work-item-estimate" type="select" className="form-control" name="estimate.id">
                  <option value="" key="0" />
                  {estimates
                    ? estimates.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="work-item-project">
                  <Translate contentKey="tec2App.workItem.project">Project</Translate>
                </Label>
                <AvInput id="work-item-project" type="select" className="form-control" name="project.id">
                  <option value="" key="0" />
                  {projects
                    ? projects.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/work-item" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  estimates: storeState.estimate.entities,
  projects: storeState.project.entities,
  workItemEntity: storeState.workItem.entity,
  loading: storeState.workItem.loading,
  updating: storeState.workItem.updating,
  updateSuccess: storeState.workItem.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getEstimates,
  getProjects,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WorkItemUpdate);
