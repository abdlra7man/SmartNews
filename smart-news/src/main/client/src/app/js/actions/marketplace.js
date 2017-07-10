/**
 * Created by johnny on 21/06/17.
 */
import Promise from 'bluebird';

import { FETCH_CATEGORIES, FETCH_ACTIVITIES, LOADING } from './actionTypes';
import { getAllCategories, getAllActivities } from '../utils/API';

export function fetchMarketplace() {
  return dispatch => {
    dispatch({
      type: LOADING,
      payload: {
        components: [],
        state: 'loading'
      }
    });

    return Promise.all([getAllCategories(), getAllActivities()]).then(resp => {
      const categories = resp[0];
      const activities = resp[1];

      dispatch({
        type: FETCH_CATEGORIES,
        payload: {
          allCategories: categories
        }
      });

      dispatch({
        type: FETCH_ACTIVITIES,
        payload: {
          activitiesToDisplay: activities
        }
      });
    }).then(() => dispatch({
      type: LOADING,
      payload: {
        components: [],
        state: 'finished'
      }
    }))
  };
}