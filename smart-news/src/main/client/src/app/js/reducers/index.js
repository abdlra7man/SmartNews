import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { globalReducer as global } from './global';
import { activityReducer as activity } from './activity';
import { categoryReducer as category} from './category';

const reducer = combineReducers({
  router: routerReducer,
  activity,
  category,
  global
});

export default reducer;
