import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IWorkItem, defaultValue } from 'app/shared/model/work-item.model';

export const ACTION_TYPES = {
  FETCH_WORKITEM_LIST: 'workItem/FETCH_WORKITEM_LIST',
  FETCH_WORKITEM: 'workItem/FETCH_WORKITEM',
  CREATE_WORKITEM: 'workItem/CREATE_WORKITEM',
  UPDATE_WORKITEM: 'workItem/UPDATE_WORKITEM',
  DELETE_WORKITEM: 'workItem/DELETE_WORKITEM',
  RESET: 'workItem/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IWorkItem>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type WorkItemState = Readonly<typeof initialState>;

// Reducer

export default (state: WorkItemState = initialState, action): WorkItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_WORKITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_WORKITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_WORKITEM):
    case REQUEST(ACTION_TYPES.UPDATE_WORKITEM):
    case REQUEST(ACTION_TYPES.DELETE_WORKITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_WORKITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_WORKITEM):
    case FAILURE(ACTION_TYPES.CREATE_WORKITEM):
    case FAILURE(ACTION_TYPES.UPDATE_WORKITEM):
    case FAILURE(ACTION_TYPES.DELETE_WORKITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WORKITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WORKITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_WORKITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_WORKITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_WORKITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/work-items';

// Actions

export const getEntities: ICrudGetAllAction<IWorkItem> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_WORKITEM_LIST,
  payload: axios.get<IWorkItem>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IWorkItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WORKITEM,
    payload: axios.get<IWorkItem>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IWorkItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_WORKITEM,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IWorkItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WORKITEM,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IWorkItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WORKITEM,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
