import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './estimate.reducer';
import { IEstimate } from 'app/shared/model/estimate.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import WorkItemTable from 'app/entities/work-item/work-item-table'

export interface IEstimateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EstimateDetail = (props: IEstimateDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { estimateEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tec2App.estimate.detail.title">Estimate</Translate> [<b>{estimateEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="number">
              <Translate contentKey="tec2App.estimate.number">Number</Translate>
            </span>
          </dt>
          <dd>{estimateEntity.number}</dd>
          <dt>
            <span id="version">
              <Translate contentKey="tec2App.estimate.version">Version</Translate>
            </span>
          </dt>
          <dd>{estimateEntity.version}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="tec2App.estimate.status">Status</Translate>
            </span>
          </dt>
          <dd>{estimateEntity.status}</dd>
          <dt>
            <span id="customerId">
              <Translate contentKey="tec2App.estimate.customerId">Customer Id</Translate>
            </span>
          </dt>
          <dd>{estimateEntity.customerId}</dd>
          <dt>
            <span id="reference">
              <Translate contentKey="tec2App.estimate.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{estimateEntity.reference}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="tec2App.estimate.date">Date</Translate>
            </span>
          </dt>
          <dd>{estimateEntity.date ? <TextFormat value={estimateEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="maturity">
              <Translate contentKey="tec2App.estimate.maturity">Maturity</Translate>
            </span>
          </dt>
          <dd>{estimateEntity.maturity}</dd>
          <dt>
            <span id="expirationDate">
              <Translate contentKey="tec2App.estimate.expirationDate">Expiration Date</Translate>
            </span>
          </dt>
          <dd>
            {estimateEntity.expirationDate ? (
              <TextFormat value={estimateEntity.expirationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="profitMargin">
              <Translate contentKey="tec2App.estimate.profitMargin">Profit Margin</Translate>
            </span>
          </dt>
          <dd>{estimateEntity.profitMargin}</dd>
          <dt>
            <span id="commission">
              <Translate contentKey="tec2App.estimate.commission">Commission</Translate>
            </span>
          </dt>
          <dd>{estimateEntity.commission}</dd>
          <dt>
            <span id="discount">
              <Translate contentKey="tec2App.estimate.discount">Discount</Translate>
            </span>
          </dt>
          <dd>{estimateEntity.discount}</dd>
          <dt>
            <span id="deliveryMethodId">
              <Translate contentKey="tec2App.estimate.deliveryMethodId">Delivery Method Id</Translate>
            </span>
          </dt>
          <dd>{estimateEntity.deliveryMethodId}</dd>
          <dt>
            <span id="deliveryDatetime">
              <Translate contentKey="tec2App.estimate.deliveryDatetime">Delivery Datetime</Translate>
            </span>
          </dt>
          <dd>
            {estimateEntity.deliveryDatetime ? (
              <TextFormat value={estimateEntity.deliveryDatetime} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="notes">
              <Translate contentKey="tec2App.estimate.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{estimateEntity.notes}</dd>
          <dt>
            <Translate contentKey="tec2App.estimate.project">Project</Translate>
          </dt>
          <dd>{estimateEntity.project ? estimateEntity.project.id : ''}</dd>
          <dt>
            <Translate contentKey="tec2App.estimate.rootEstimate">Root Estimate</Translate>
          </dt>
          <dd>{estimateEntity.rootEstimate ? estimateEntity.rootEstimate.id : ''}</dd>
        </dl>

        <WorkItemTable workItems={estimateEntity.workItems} save={() => console.log("save")}></WorkItemTable>

        <Button tag={Link} to="/estimate" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/estimate/${estimateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ estimate }: IRootState) => ({
  estimateEntity: estimate.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EstimateDetail);
