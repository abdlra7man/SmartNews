/**
 * Created by johnny on 29/06/17.
 */
import { createSelector } from 'reselect';
import without from 'lodash/without';
import filter from 'lodash/filter';
import find from 'lodash/find';
import sortBy from 'lodash/sortBy';

export const allCategories = createSelector(
  state => state.category,
  category => {
    let categories = category.allCategories;
    let all = find(categories, { title: 'All'});
    let uncategorised = find(categories, { title: 'Uncategorised'});
    let rest = without(categories, all, uncategorised);

    return [all].concat(sortBy(rest, 'title')).concat([uncategorised]);
  }
);

export const allNamedCategories = createSelector(
  state => state.category,
  category => filter(category.allCategories, item => Number.isInteger(item.id))
);

export const currentCategory = createSelector(
  state => state.category,
  (_, ownProps) => ownProps.match.params.categoryId,
  (category, id) => {
    if(!id || id === 'All' || id === 'Uncategorised') {
      return {}
    } else {
      return find(category.allCategories, { id: parseInt(id)}) || {};
    }
  }
);