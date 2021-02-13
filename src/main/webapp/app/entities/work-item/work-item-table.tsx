import React, { useState } from 'react'
import { Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { IWorkItem } from 'app/shared/model/work-item.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

export default function WorkItemTable(props) {
    const workItems : IWorkItem[] = props.workItems

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th></th>
                    <th><Translate contentKey="tec2App.workItem.reference">Reference</Translate></th>
                    <th><Translate contentKey="tec2App.workItem.quantity">Quantity</Translate></th>
                    <th><Translate contentKey="tec2App.workItem.type">type</Translate></th>
                    <th><Translate contentKey="tec2App.workItem.estimatedEmployeeHours">estimatedEmployeeHours</Translate></th>
                    <th><Translate contentKey="tec2App.workItem.estimatedMachineHours">estimatedMachineHours</Translate></th>
                    <th><Translate contentKey="tec2App.workItem.assignedUser">assignedUser</Translate></th>
                </tr>
            </thead>
            <tbody>
                {workItems && workItems.length > 0 && workItems.map((workItem, i) => (
                    <WorkItemColapsableRow key={`workItem-${i}`} workItem={workItem}/>
                ))}
            </tbody>
        </Table>
    )
}

WorkItemTable.propTypes = {
    workItems: PropTypes.array,
    save: PropTypes.func
}

function WorkItemColapsableRow(props) {
    const [isVisible, setIsVisible] = useState(false);

    const workItem : IWorkItem = props.workItem;
    const depth : number = props.depth ? props.depth : 0;

    const createColorHex = (r, g, b) => {
        const addLeadingZero = (str : string) => str.length < 2 ? "0" + str : str
        const getHex = (num : number) => addLeadingZero(num.toString(16))
        return "#" + getHex(r) + getHex(g) + getHex(b)
    }

    const canToggle = workItem.childWorkItems.length > 0
    const marginStyle = {marginLeft: (depth * 24) + "px"}
    const backgroundColor = {backgroundColor: createColorHex(255 - (depth * 10), 255 - (depth * 10), 255 - (depth * 10)) }

    return workItem && (
        <>
            <tr style={backgroundColor} onClick={(e) => setIsVisible(canToggle && !isVisible)}>
                <td>
                    {canToggle && <FontAwesomeIcon style={marginStyle} icon={ isVisible ? "caret-down" : "caret-right" }/>}
                </td>
                <td><span style={marginStyle}>{ workItem.reference }</span></td>
                <td>{ workItem.quantity }</td>
                <td>{ workItem.type }</td>
                <td>{ workItem.estimatedEmployeeHours }</td>
                <td>{ workItem.estimatedMachineHours }</td>
                <td>{ workItem.assignedUser }</td>
            </tr>
            {isVisible && workItem.childWorkItems.map((item, i) => (
                <WorkItemColapsableRow key={`workItemChild-${i}`} workItem={ item } depth={ depth + 1 }/>
            ))}
        </>
    );
}