import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProjectDetail = (props: IProjectDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { projectEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tec2App.project.detail.title">Project</Translate> [<b>{projectEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="number">
              <Translate contentKey="tec2App.project.number">Number</Translate>
            </span>
          </dt>
          <dd>{projectEntity.number}</dd>
          <dt>
            <span id="acceptanceDate">
              <Translate contentKey="tec2App.project.acceptanceDate">Acceptance Date</Translate>
            </span>
          </dt>
          <dd>
            {projectEntity.acceptanceDate ? (
              <TextFormat value={projectEntity.acceptanceDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="shippingDate">
              <Translate contentKey="tec2App.project.shippingDate">Shipping Date</Translate>
            </span>
          </dt>
          <dd>
            {projectEntity.shippingDate ? (
              <TextFormat value={projectEntity.shippingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="paidDate">
              <Translate contentKey="tec2App.project.paidDate">Paid Date</Translate>
            </span>
          </dt>
          <dd>
            {projectEntity.paidDate ? <TextFormat value={projectEntity.paidDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="closeDate">
              <Translate contentKey="tec2App.project.closeDate">Close Date</Translate>
            </span>
          </dt>
          <dd>
            {projectEntity.closeDate ? <TextFormat value={projectEntity.closeDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="extraCosts">
              <Translate contentKey="tec2App.project.extraCosts">Extra Costs</Translate>
            </span>
          </dt>
          <dd>{projectEntity.extraCosts}</dd>
          <dt>
            <span id="extraCostsDescription">
              <Translate contentKey="tec2App.project.extraCostsDescription">Extra Costs Description</Translate>
            </span>
          </dt>
          <dd>{projectEntity.extraCostsDescription}</dd>
        </dl>
        <Button tag={Link} to="/project" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/project/${projectEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ project }: IRootState) => ({
  projectEntity: project.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
