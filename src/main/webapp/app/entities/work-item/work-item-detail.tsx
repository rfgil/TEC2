import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './work-item.reducer';
import { IWorkItem } from 'app/shared/model/work-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWorkItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WorkItemDetail = (props: IWorkItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { workItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="tec2App.workItem.detail.title">WorkItem</Translate> [<b>{workItemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantity">
              <Translate contentKey="tec2App.workItem.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{workItemEntity.quantity}</dd>
          <dt>
            <span id="reference">
              <Translate contentKey="tec2App.workItem.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{workItemEntity.reference}</dd>
          <dt>
            <span id="deadline">
              <Translate contentKey="tec2App.workItem.deadline">Deadline</Translate>
            </span>
          </dt>
          <dd>
            {workItemEntity.deadline ? <TextFormat value={workItemEntity.deadline} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="tec2App.workItem.status">Status</Translate>
            </span>
          </dt>
          <dd>{workItemEntity.status}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="tec2App.workItem.type">Type</Translate>
            </span>
          </dt>
          <dd>{workItemEntity.type}</dd>
          <dt>
            <span id="estimatedEmployeeHours">
              <Translate contentKey="tec2App.workItem.estimatedEmployeeHours">Estimated Employee Hours</Translate>
            </span>
          </dt>
          <dd>{workItemEntity.estimatedEmployeeHours}</dd>
          <dt>
            <span id="estimatedMachineHours">
              <Translate contentKey="tec2App.workItem.estimatedMachineHours">Estimated Machine Hours</Translate>
            </span>
          </dt>
          <dd>{workItemEntity.estimatedMachineHours}</dd>
          <dt>
            <Translate contentKey="tec2App.workItem.assignedUser">Assigned User</Translate>
          </dt>
          <dd>{workItemEntity.assignedUser ? workItemEntity.assignedUser.id : ''}</dd>
          <dt>
            <Translate contentKey="tec2App.workItem.estimate">Estimate</Translate>
          </dt>
          <dd>{workItemEntity.estimate ? workItemEntity.estimate.id : ''}</dd>
          <dt>
            <Translate contentKey="tec2App.workItem.project">Project</Translate>
          </dt>
          <dd>{workItemEntity.project ? workItemEntity.project.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/work-item" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/work-item/${workItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ workItem }: IRootState) => ({
  workItemEntity: workItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WorkItemDetail);
