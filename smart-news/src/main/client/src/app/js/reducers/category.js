/**
 * Created by johnny on 29/06/17.
 */
import { createReducer } from 'redux-create-reducer';
import differenceBy from 'lodash/differenceBy';

import {
  FETCH_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGROY,
  GET_ACTIVITIES_UNDER_CATEGORY
} from '../actions/actionTypes';

/**
 * state: {
 *   ...rest,
 *   category: {
 *     allCategories: [...]
 *   }
 * }*/

export const categoryReducer = createReducer({
  allCategories: []
}, {
  [FETCH_CATEGORIES](state, action) {
    let { allCategories } = action.payload;
    let category = state;

    return Object.assign({}, category, { allCategories });
  },
  [GET_ACTIVITIES_UNDER_CATEGORY](state, action) {
    let { currentActivities, categoryId  } = action.payload;
    let category = state;

    let updatedCategories = category.allCategories.map(item => {
      return item.id === categoryId? Object.assign({}, item, { unitCount: currentActivities.length }):item;
    });

    return Object.assign({}, category, { allCategories: updatedCategories });
  },
  [CREATE_CATEGORY](state, action) {
    let newCategory = action.payload;
    let category = state;

    return Object.assign({}, category, { allCategories: category.allCategories.concat([newCategory])});
  },
  [UPDATE_CATEGORY](state, action) {
    let updatedCategory = action.payload;
    let updatedCategories = state.allCategories.map( item => {
      return item.id === updatedCategory.id ? Object.assign({}, item, updatedCategory) : item;
    });

    return Object.assign({}, state, { allCategories: updatedCategories });
  },
  [REMOVE_CATEGROY](state, action) {
    let removeId = action.payload;
    let allCategories = state.allCategories;

    return Object.assign({}, state, { allCategories: differenceBy(allCategories, [{id: removeId}], 'id')});
  }
});