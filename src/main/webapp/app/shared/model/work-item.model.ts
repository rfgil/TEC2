import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IEstimate } from 'app/shared/model/estimate.model';
import { IProject } from 'app/shared/model/project.model';
import { WorkItemStatus } from 'app/shared/model/enumerations/work-item-status.model';
import { WorkItemType } from 'app/shared/model/enumerations/work-item-type.model';

export interface IWorkItem {
  id?: number;
  quantity?: number;
  reference?: string;
  deadline?: string;
  status?: WorkItemStatus;
  type?: WorkItemType;
  estimatedEmployeeHours?: number;
  estimatedMachineHours?: number;
  assignedUser?: IUser;
  childWorkItems?: IWorkItem[];
  estimate?: IEstimate;
  project?: IProject;
  parentWorkItem?: IWorkItem;
}

export const defaultValue: Readonly<IWorkItem> = {};
