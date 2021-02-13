import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEstimate, defaultValue } from 'app/shared/model/estimate.model';

export const ACTION_TYPES = {
  FETCH_ESTIMATE_LIST: 'estimate/FETCH_ESTIMATE_LIST',
  FETCH_ESTIMATE: 'estimate/FETCH_ESTIMATE',
  CREATE_ESTIMATE: 'estimate/CREATE_ESTIMATE',
  UPDATE_ESTIMATE: 'estimate/UPDATE_ESTIMATE',
  DELETE_ESTIMATE: 'estimate/DELETE_ESTIMATE',
  RESET_ESTIMATE: 'estimate/RESET_ESTIMATE',
  RESET: 'estimate/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEstimate>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EstimateState = Readonly<typeof initialState>;

// Reducer

export default (state: EstimateState = initialState, action): EstimateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ESTIMATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ESTIMATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ESTIMATE):
    case REQUEST(ACTION_TYPES.UPDATE_ESTIMATE):
    case REQUEST(ACTION_TYPES.DELETE_ESTIMATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ESTIMATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ESTIMATE):
    case FAILURE(ACTION_TYPES.CREATE_ESTIMATE):
    case FAILURE(ACTION_TYPES.UPDATE_ESTIMATE):
    case FAILURE(ACTION_TYPES.DELETE_ESTIMATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESTIMATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESTIMATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ESTIMATE):
    case SUCCESS(ACTION_TYPES.UPDATE_ESTIMATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ESTIMATE):
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
    case ACTION_TYPES.RESET_ESTIMATE:
      return {
        ...state,
        entity: {},
      };

    default:
      return state;
  }
};

const apiUrl = 'api/estimates';

// Actions

export const getEntities: ICrudGetAllAction<IEstimate> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ESTIMATE_LIST,
  payload: axios.get<IEstimate>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEstimate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ESTIMATE,
    payload: axios.get<IEstimate>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEstimate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ESTIMATE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEstimate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ESTIMATE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEstimate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ESTIMATE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

export const resetEntity = () => ({
  type: ACTION_TYPES.RESET_ESTIMATE,
});
