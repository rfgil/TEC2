import { Moment } from 'moment';
import { IProject } from 'app/shared/model/project.model';
import { IWorkItem } from 'app/shared/model/work-item.model';
import { EstimateStatus } from 'app/shared/model/enumerations/estimate-status.model';

export interface IEstimate {
  id?: number;
  number?: number;
  version?: number;
  status?: EstimateStatus;
  customerId?: number;
  reference?: string;
  date?: string;
  maturity?: number;
  expirationDate?: string;
  profitMargin?: number;
  commission?: number;
  discount?: number;
  deliveryMethodId?: number;
  deliveryDatetime?: string;
  notes?: string;
  project?: IProject;
  versions?: IEstimate[];
  workItems?: IWorkItem[];
  rootEstimate?: IEstimate;
}

export const defaultValue: Readonly<IEstimate> = {};
