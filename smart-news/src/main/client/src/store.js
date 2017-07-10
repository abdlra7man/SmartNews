/**
 * Created by johnny on 19/06/17.
 */
import createHistory from 'history/createHashHistory';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';

import reducer from './app/js/reducers';

export const history = createHistory();

const middlewares = [thunkMiddleware, routerMiddleware(history)];
const createStoreFn = applyMiddleware(...middlewares)(createStore);

const store = createStoreFn(reducer);

export default store;