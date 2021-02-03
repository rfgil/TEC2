import { Moment } from 'moment';
import { IWorkItem } from 'app/shared/model/work-item.model';
import { IEstimate } from 'app/shared/model/estimate.model';

export interface IProject {
  id?: number;
  number?: number;
  acceptanceDate?: string;
  shippingDate?: string;
  paidDate?: string;
  closeDate?: string;
  extraCosts?: number;
  extraCostsDescription?: string;
  workItems?: IWorkItem[];
  estimate?: IEstimate;
}

export const defaultValue: Readonly<IProject> = {};
