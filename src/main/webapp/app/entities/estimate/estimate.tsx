import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './estimate.reducer';
import { IEstimate } from 'app/shared/model/estimate.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEstimateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Estimate = (props: IEstimateProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { estimateList, match, loading } = props;
  return (
    <div>
      <h2 id="estimate-heading">
        <Translate contentKey="tec2App.estimate.home.title">Estimates</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="tec2App.estimate.home.createLabel">Create new Estimate</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {estimateList && estimateList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.number">Number</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.version">Version</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.customerId">Customer Id</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.reference">Reference</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.maturity">Maturity</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.expirationDate">Expiration Date</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.profitMargin">Profit Margin</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.commission">Commission</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.discount">Discount</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.deliveryMethodId">Delivery Method Id</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.deliveryDatetime">Delivery Datetime</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.notes">Notes</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.project">Project</Translate>
                </th>
                <th>
                  <Translate contentKey="tec2App.estimate.rootEstimate">Root Estimate</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {estimateList.map((estimate, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${estimate.id}`} color="link" size="sm">
                      {estimate.id}
                    </Button>
                  </td>
                  <td>{estimate.number}</td>
                  <td>{estimate.version}</td>
                  <td>
                    <Translate contentKey={`tec2App.EstimateStatus.${estimate.status}`} />
                  </td>
                  <td>{estimate.customerId}</td>
                  <td>{estimate.reference}</td>
                  <td>{estimate.date ? <TextFormat type="date" value={estimate.date} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{estimate.maturity}</td>
                  <td>
                    {estimate.expirationDate ? (
                      <TextFormat type="date" value={estimate.expirationDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{estimate.profitMargin}</td>
                  <td>{estimate.commission}</td>
                  <td>{estimate.discount}</td>
                  <td>{estimate.deliveryMethodId}</td>
                  <td>
                    {estimate.deliveryDatetime ? (
                      <TextFormat type="date" value={estimate.deliveryDatetime} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{estimate.notes}</td>
                  <td>{estimate.project ? <Link to={`project/${estimate.project.id}`}>{estimate.project.id}</Link> : ''}</td>
                  <td>
                    {estimate.rootEstimate ? <Link to={`estimate/${estimate.rootEstimate.id}`}>{estimate.rootEstimate.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${estimate.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${estimate.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${estimate.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="tec2App.estimate.home.notFound">No Estimates found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ estimate }: IRootState) => ({
  estimateList: estimate.entities,
  loading: estimate.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Estimate);
