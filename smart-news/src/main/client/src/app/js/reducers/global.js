/**
 * Created by johnny on 29/06/17.
 */
import { createReducer } from 'redux-create-reducer';

import {
  LOADING,
  ERROR
} from '../actions/actionTypes';

export const globalReducer = createReducer({
  loading: {
    components: [],
    state: 'finished'
  }
}, {
  [LOADING](state, action) {
    let global = state;

    return Object.assign({}, global, { loading: action.payload });
  },
  [ERROR](state) {
    return state;
  }
});