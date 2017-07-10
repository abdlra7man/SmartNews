/**
 * Created by johnny on 29/06/17.
 */
import store from '../../../store';

import { LOADING } from './actionTypes';

export const startLoading = components => {
  store.dispatch({
    type: LOADING,
    payload: {
      components,
      state: 'loading'
    }
  });
};

export const finishLoading = components => {
  store.dispatch({
    type: LOADING,
    payload: {
      components,
      state: 'finished'
    }
  });
};