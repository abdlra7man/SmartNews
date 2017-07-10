import uniqid from 'uniqid';
import Promise from 'bluebird';

import {
  ERROR,
  CREATE_CATEGORY,
  REMOVE_CATEGROY,
  UPDATE_CATEGORY
} from './actionTypes';
import { createCategory as create,
  updateCategory as update,
  removeCategory as remove
} from '../utils/API';
import { startLoading, finishLoading } from './helper';

export function createCategory(category) {
  return dispatch => {
    const allowed = category.title.toLowerCase() !== 'all' & category.title.toLowerCase() !== 'uncategorised' && !!category.title;

    if (allowed) {
      startLoading([])

      return Promise.resolve(create(category))
        .then(resp => dispatch({type: CREATE_CATEGORY, payload: resp}))
        .catch(e => dispatch({
          type: ERROR,
          payload: e
        }))
        .finally(()=> finishLoading([]));
    } else {
       dispatch({
        type: ERROR,
        payload: {
         id: uniqid('error-'),
         message: 'Duplicated category title is not allowed.'
        }
      });
    }
  };
}

export function updateCategory(category) {
  return dispatch => {
    startLoading();

    return Promise.resolve(update(category))
      .then(resp => dispatch({
        type: UPDATE_CATEGORY,
        payload: resp
      }))
      .catch(e => dispatch({
        type: ERROR,
        payload: e
      }))
      .finally(() => finishLoading())
    ;
  };
}

export function removeCategory(id) {
  return dispatch => {
    startLoading();

    return Promise.resolve(remove(id))
      .then(dispatch({
        type: REMOVE_CATEGROY,
        payload: id
      }))
      .catch(e => dispatch({
        type: ERROR,
        payload: e
      }))
      .finally(() => finishLoading())
    ;
  }
}

