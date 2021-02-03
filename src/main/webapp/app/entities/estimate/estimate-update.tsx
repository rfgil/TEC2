import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { getEntities as getEstimates } from 'app/entities/estimate/estimate.reducer';
import { getEntity, updateEntity, createEntity, reset } from './estimate.reducer';
import { IEstimate } from 'app/shared/model/estimate.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEstimateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EstimateUpdate = (props: IEstimateUpdateProps) => {
  const [projectId, setProjectId] = useState('0');
  const [versionsId, setVersionsId] = useState('0');
  const [rootEstimateId, setRootEstimateId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { estimateEntity, projects, estimates, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/estimate');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProjects();
    props.getEstimates();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...estimateEntity,
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
          <h2 id="tec2App.estimate.home.createOrEditLabel">
            <Translate contentKey="tec2App.estimate.home.createOrEditLabel">Create or edit a Estimate</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : estimateEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="estimate-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="estimate-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="numberLabel" for="estimate-number">
                  <Translate contentKey="tec2App.estimate.number">Number</Translate>
                </Label>
                <AvField
                  id="estimate-number"
                  type="string"
                  className="form-control"
                  name="number"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="versionLabel" for="estimate-version">
                  <Translate contentKey="tec2App.estimate.version">Version</Translate>
                </Label>
                <AvField
                  id="estimate-version"
                  type="string"
                  className="form-control"
                  name="version"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="estimate-status">
                  <Translate contentKey="tec2App.estimate.status">Status</Translate>
                </Label>
                <AvInput
                  id="estimate-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && estimateEntity.status) || 'Pending'}
                >
                  <option value="Pending">{translate('tec2App.EstimateStatus.Pending')}</option>
                  <option value="Accepted">{translate('tec2App.EstimateStatus.Accepted')}</option>
                  <option value="Changed">{translate('tec2App.EstimateStatus.Changed')}</option>
                  <option value="NotAccepted">{translate('tec2App.EstimateStatus.NotAccepted')}</option>
                  <option value="Completed">{translate('tec2App.EstimateStatus.Completed')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="customerIdLabel" for="estimate-customerId">
                  <Translate contentKey="tec2App.estimate.customerId">Customer Id</Translate>
                </Label>
                <AvField
                  id="estimate-customerId"
                  type="string"
                  className="form-control"
                  name="customerId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="referenceLabel" for="estimate-reference">
                  <Translate contentKey="tec2App.estimate.reference">Reference</Translate>
                </Label>
                <AvField id="estimate-reference" type="text" name="reference" />
              </AvGroup>
              <AvGroup>
                <Label id="dateLabel" for="estimate-date">
                  <Translate contentKey="tec2App.estimate.date">Date</Translate>
                </Label>
                <AvField id="estimate-date" type="date" className="form-control" name="date" />
              </AvGroup>
              <AvGroup>
                <Label id="maturityLabel" for="estimate-maturity">
                  <Translate contentKey="tec2App.estimate.maturity">Maturity</Translate>
                </Label>
                <AvField id="estimate-maturity" type="string" className="form-control" name="maturity" />
              </AvGroup>
              <AvGroup>
                <Label id="expirationDateLabel" for="estimate-expirationDate">
                  <Translate contentKey="tec2App.estimate.expirationDate">Expiration Date</Translate>
                </Label>
                <AvField id="estimate-expirationDate" type="date" className="form-control" name="expirationDate" />
              </AvGroup>
              <AvGroup>
                <Label id="profitMarginLabel" for="estimate-profitMargin">
                  <Translate contentKey="tec2App.estimate.profitMargin">Profit Margin</Translate>
                </Label>
                <AvField
                  id="estimate-profitMargin"
                  type="text"
                  name="profitMargin"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    max: { value: 1, errorMessage: translate('entity.validation.max', { max: 1 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="commissionLabel" for="estimate-commission">
                  <Translate contentKey="tec2App.estimate.commission">Commission</Translate>
                </Label>
                <AvField
                  id="estimate-commission"
                  type="text"
                  name="commission"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    max: { value: 1, errorMessage: translate('entity.validation.max', { max: 1 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="discountLabel" for="estimate-discount">
                  <Translate contentKey="tec2App.estimate.discount">Discount</Translate>
                </Label>
                <AvField
                  id="estimate-discount"
                  type="text"
                  name="discount"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    max: { value: 1, errorMessage: translate('entity.validation.max', { max: 1 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="deliveryMethodIdLabel" for="estimate-deliveryMethodId">
                  <Translate contentKey="tec2App.estimate.deliveryMethodId">Delivery Method Id</Translate>
                </Label>
                <AvField id="estimate-deliveryMethodId" type="string" className="form-control" name="deliveryMethodId" />
              </AvGroup>
              <AvGroup>
                <Label id="deliveryDatetimeLabel" for="estimate-deliveryDatetime">
                  <Translate contentKey="tec2App.estimate.deliveryDatetime">Delivery Datetime</Translate>
                </Label>
                <AvField id="estimate-deliveryDatetime" type="date" className="form-control" name="deliveryDatetime" />
              </AvGroup>
              <AvGroup>
                <Label id="notesLabel" for="estimate-notes">
                  <Translate contentKey="tec2App.estimate.notes">Notes</Translate>
                </Label>
                <AvField id="estimate-notes" type="text" name="notes" />
              </AvGroup>
              <AvGroup>
                <Label for="estimate-project">
                  <Translate contentKey="tec2App.estimate.project">Project</Translate>
                </Label>
                <AvInput id="estimate-project" type="select" className="form-control" name="project.id">
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
              <AvGroup>
                <Label for="estimate-rootEstimate">
                  <Translate contentKey="tec2App.estimate.rootEstimate">Root Estimate</Translate>
                </Label>
                <AvInput id="estimate-rootEstimate" type="select" className="form-control" name="rootEstimate.id">
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
              <Button tag={Link} id="cancel-save" to="/estimate" replace color="info">
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
  projects: storeState.project.entities,
  estimates: storeState.estimate.entities,
  estimateEntity: storeState.estimate.entity,
  loading: storeState.estimate.loading,
  updating: storeState.estimate.updating,
  updateSuccess: storeState.estimate.updateSuccess,
});

const mapDispatchToProps = {
  getProjects,
  getEstimates,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EstimateUpdate);
