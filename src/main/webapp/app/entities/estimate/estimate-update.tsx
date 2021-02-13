import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities, getEntity, updateEntity, createEntity, resetEntity, reset } from './estimate.reducer';

export interface IEstimateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EstimateUpdate = (props: IEstimateUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { estimateEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/estimate');
  };

  useEffect(() => {
    if (isNew) {
      props.resetEntity();
    } else {
      props.getEntity(props.match.params.id);
    }
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
    <Modal isOpen size="lg">
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="tec2App.estimate.home.createOrEditLabel">Create or edit a Estimate</Translate>
      </ModalHeader>
      
      <ModalBody>
        {loading ? (<p>Loading...</p>) : (
          <AvForm id="form" model={isNew ? {} : estimateEntity} onSubmit={saveEntity}>
              
              {/* STATUS */}
              <AvGroup>
                <Label id="statusLabel" for="estimate-status">
                  <Translate contentKey="tec2App.estimate.status">Status</Translate>
                </Label>
                <AvInput
                  id="estimate-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && estimateEntity.status) || 'Pending'}>
                  <option value="Pending">{translate('tec2App.EstimateStatus.Pending')}</option>
                  <option value="Accepted">{translate('tec2App.EstimateStatus.Accepted')}</option>
                  <option value="Changed">{translate('tec2App.EstimateStatus.Changed')}</option>
                  <option value="NotAccepted">{translate('tec2App.EstimateStatus.NotAccepted')}</option>
                  <option value="Completed">{translate('tec2App.EstimateStatus.Completed')}</option>
                </AvInput>
              </AvGroup>

              {/* DATE */}
              <AvGroup>
                <Label id="dateLabel" for="estimate-date">
                  <Translate contentKey="tec2App.estimate.date">Date</Translate>
                </Label>
                <AvField id="estimate-date" type="date" className="form-control" name="date" />
              </AvGroup>

              {/* CUSTOMER */}
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

              {/* REFERENCE */}
              <AvGroup>
                <Label id="referenceLabel" for="estimate-reference">
                  <Translate contentKey="tec2App.estimate.reference">Reference</Translate>
                </Label>
                <AvField id="estimate-reference" type="text" name="reference" />
              </AvGroup>

              {/* MATURITY */}
              <AvGroup>
                <Label id="maturityLabel" for="estimate-maturity">
                  <Translate contentKey="tec2App.estimate.maturity">Maturity</Translate>
                </Label>
                <AvField id="estimate-maturity" type="number" className="form-control" name="maturity" />
              </AvGroup>

              {/* EXPIRATION DATE */}
              <AvGroup>
                <Label id="expirationDateLabel" for="estimate-expirationDate">
                  <Translate contentKey="tec2App.estimate.expirationDate">Expiration Date</Translate>
                </Label>
                <AvField id="estimate-expirationDate" type="date" className="form-control" name="expirationDate" />
              </AvGroup>

              {/* DELIVERY DATE */}
              <AvGroup>
                <Label id="deliveryDatetimeLabel" for="estimate-deliveryDatetime">
                  <Translate contentKey="tec2App.estimate.deliveryDatetime">Delivery Datetime</Translate>
                </Label>
                <AvField id="estimate-deliveryDatetime" type="date" className="form-control" name="deliveryDatetime" />
              </AvGroup>

              {/* PROFIT MARGIN */}
              <AvGroup>
                <Label id="profitMarginLabel" for="estimate-profitMargin">
                  <Translate contentKey="tec2App.estimate.profitMargin">Profit Margin</Translate>
                </Label>
                <AvField
                  id="estimate-profitMargin"
                  type="number"
                  name="profitMargin"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    max: { value: 1, errorMessage: translate('entity.validation.max', { max: 1 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>

              {/* COMMISSION */}
              <AvGroup>
                <Label id="commissionLabel" for="estimate-commission">
                  <Translate contentKey="tec2App.estimate.commission">Commission</Translate>
                </Label>
                <AvField
                  id="estimate-commission"
                  type="number"
                  name="commission"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    max: { value: 1, errorMessage: translate('entity.validation.max', { max: 1 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>

              {/* DISCOUNT */}
              <AvGroup>
                <Label id="discountLabel" for="estimate-discount">
                  <Translate contentKey="tec2App.estimate.discount">Discount</Translate>
                </Label>
                <AvField
                  id="estimate-discount"
                  type="number"
                  name="discount"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    max: { value: 1, errorMessage: translate('entity.validation.max', { max: 1 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
          </AvForm>
        )}
      </ModalBody>
      
      <ModalFooter>
        <Button tag={Link} id="cancel-save" to="/estimate" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />
          &nbsp;
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button color="primary" id="save-entity" type="submit" disabled={updating} form="form">
          <FontAwesomeIcon icon="save" />
          &nbsp;
          <Translate contentKey="entity.action.save">Save</Translate>
        </Button>
      </ModalFooter>

    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  estimateEntity: storeState.estimate.entity,
  loading: storeState.estimate.loading,
  updating: storeState.estimate.updating,
  updateSuccess: storeState.estimate.updateSuccess,
});

const mapDispatchToProps = {
  getEntities,
  getEntity,
  updateEntity,
  createEntity,
  resetEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EstimateUpdate);
