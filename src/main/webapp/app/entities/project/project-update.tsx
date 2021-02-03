import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEstimate } from 'app/shared/model/estimate.model';
import { getEntities as getEstimates } from 'app/entities/estimate/estimate.reducer';
import { getEntity, updateEntity, createEntity, reset } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProjectUpdate = (props: IProjectUpdateProps) => {
  const [estimateId, setEstimateId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { projectEntity, estimates, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/project');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...projectEntity,
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
          <h2 id="tec2App.project.home.createOrEditLabel">
            <Translate contentKey="tec2App.project.home.createOrEditLabel">Create or edit a Project</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : projectEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="project-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="project-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="numberLabel" for="project-number">
                  <Translate contentKey="tec2App.project.number">Number</Translate>
                </Label>
                <AvField
                  id="project-number"
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
                <Label id="acceptanceDateLabel" for="project-acceptanceDate">
                  <Translate contentKey="tec2App.project.acceptanceDate">Acceptance Date</Translate>
                </Label>
                <AvField id="project-acceptanceDate" type="date" className="form-control" name="acceptanceDate" />
              </AvGroup>
              <AvGroup>
                <Label id="shippingDateLabel" for="project-shippingDate">
                  <Translate contentKey="tec2App.project.shippingDate">Shipping Date</Translate>
                </Label>
                <AvField id="project-shippingDate" type="date" className="form-control" name="shippingDate" />
              </AvGroup>
              <AvGroup>
                <Label id="paidDateLabel" for="project-paidDate">
                  <Translate contentKey="tec2App.project.paidDate">Paid Date</Translate>
                </Label>
                <AvField id="project-paidDate" type="date" className="form-control" name="paidDate" />
              </AvGroup>
              <AvGroup>
                <Label id="closeDateLabel" for="project-closeDate">
                  <Translate contentKey="tec2App.project.closeDate">Close Date</Translate>
                </Label>
                <AvField id="project-closeDate" type="date" className="form-control" name="closeDate" />
              </AvGroup>
              <AvGroup>
                <Label id="extraCostsLabel" for="project-extraCosts">
                  <Translate contentKey="tec2App.project.extraCosts">Extra Costs</Translate>
                </Label>
                <AvField id="project-extraCosts" type="text" name="extraCosts" />
              </AvGroup>
              <AvGroup>
                <Label id="extraCostsDescriptionLabel" for="project-extraCostsDescription">
                  <Translate contentKey="tec2App.project.extraCostsDescription">Extra Costs Description</Translate>
                </Label>
                <AvField id="project-extraCostsDescription" type="text" name="extraCostsDescription" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/project" replace color="info">
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
  estimates: storeState.estimate.entities,
  projectEntity: storeState.project.entity,
  loading: storeState.project.loading,
  updating: storeState.project.updating,
  updateSuccess: storeState.project.updateSuccess,
});

const mapDispatchToProps = {
  getEstimates,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUpdate);
