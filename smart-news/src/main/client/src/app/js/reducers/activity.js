/**
 * Created by johnny on 29/06/17.
 */
import { createReducer } from 'redux-create-reducer';

import {
  FETCH_ACTIVITIES,
  CREATE_ACTIVITY,
  UPDATE_ACTIVITY,
  GET_ACTIVITY,
  GET_ACTIVITIES_UNDER_CATEGORY
} from '../actions/actionTypes';

/**
 * state: {
 *  ...rest,
 *  activity: {
 *    activitiesToDisplay: [...],
 *    currentActivity: {}
 *  }
 * }*/

export const activityReducer = createReducer({
  activitiesToDisplay: [],
  currentActivity: {}
}, {
  [FETCH_ACTIVITIES](state, action) {
    let { activitiesToDisplay } = action.payload;
    let activity = state;

    return Object.assign({}, activity, { activitiesToDisplay });
  },
  [GET_ACTIVITIES_UNDER_CATEGORY](state, action) {
    let { currentActivities } = action.payload;
    let activity = state;

    return Object.assign({}, activity, { activitiesToDisplay: currentActivities });
  },
  [GET_ACTIVITY](state, action) {
    let currentActivity = action.payload.activity;
    let activity = state;

    return Object.assign({}, activity, { currentActivity });
  },
  [CREATE_ACTIVITY](state, action) {
    let newActivity = action.payload.activity;
    let activity = state;

    return Object.assign({}, activity, { activitiesToDisplay: activity.activitiesToDisplay.concat([newActivity])});
  },
  [UPDATE_ACTIVITY](state, action) {
    let updatedActivity = action.payload.activity;
    let activity = state;

    return Object.assign ({}, activity, {currentActivity: updatedActivity});
  }
});