import uniqid from 'uniqid';
import Promise from 'bluebird';
import { push } from 'react-router-redux';

import {
  CREATE_ACTIVITY,
  UPDATE_ACTIVITY,
  GET_ACTIVITY,
  GET_ACTIVITIES_UNDER_CATEGORY,
  ERROR
} from './actionTypes';
import {
  addUnitToMarket,
  updateActivity as updateUnit,
  getActivity as getUnit,
  getUncategorised,
  getAllActivities,
  getActivitiesUnderCategory } from '../utils/API';
import { startLoading, finishLoading } from './helper';

export function gotoActivities(id) {
  return (dispatch) => {
    let promise;
    startLoading([]);
    if(id === 'All') {
      promise = Promise.resolve(getAllActivities());
    } else if (id === 'Uncategorised') {
      promise = Promise.resolve(getUncategorised());
    } else {
      promise = Promise.resolve(getActivitiesUnderCategory(id));
    }

    return promise
      .then(resp => dispatch({
        type: GET_ACTIVITIES_UNDER_CATEGORY,
        payload: {
          currentActivities: resp,
          categoryId: id
        }
      }))
      .then(() => dispatch(push(`/category/${id}`)))
      .catch(e => dispatch({
        type: ERROR,
        payload: e
      }))
      .finally(() => finishLoading());
  };
}

export function gotoActivity(id) {
  return dispatch => {
    startLoading([]);

    return Promise.resolve(getUnit(id))
      .then(resp => dispatch({
        type: GET_ACTIVITY,
        payload: { activity: resp }
      }))
      .then(() => dispatch(push(`/category/activity/${id}`)))
      .catch(e => dispatch({
        type: ERROR,
        payload: e
      }))
      .finally(() => finishLoading())
      ;
  };
}

export function createActivity(activity, categories) {
  return dispatch => {
    if (!activity || categories.length === 0) {
      dispatch({
        type: ERROR,
        payload: {
          id: uniqid('error-'),
          message: 'non valid activity or categories'
        }
      });
    } else {
      startLoading([]);

      return Promise.resolve(addUnitToMarket(activity, categories)).then(resp => dispatch({
        type: CREATE_ACTIVITY,
        payload: {
          activity: resp,
          categories: resp.categories
        }
      }))
        .catch(e => dispatch({
          type: ERROR,
          payload: e
        }))
        .finally(() => finishLoading());
    }
  };
}

export function updateActivity(activity, categories) {
  return dispatch => {
    if (!activity || categories.length === 0) {
      dispatch({
        type: ERROR,
        payload: {
          id: uniqid('error-'),
          message: 'non valid activity or categories'
        }
      });
    } else {
      startLoading([]);

      return Promise.resolve(updateUnit(activity, categories))
        .then(resp => dispatch({
          type: UPDATE_ACTIVITY,
          payload: {
            activity: resp,
            categories: resp.categories
          }
        }))
        .catch(e => dispatch({
          type: ERROR,
          payload: e
        }))
        .finally(() => finishLoading());
    }
  };
}