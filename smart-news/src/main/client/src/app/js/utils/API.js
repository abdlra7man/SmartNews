//@todo restructure api

import axios from 'axios';
const API_BASE = '/api/v1/marketplace';

import { normalizeCategory, normalizeUnit } from './normalize';

//Units
export const searchUnitsByKeywords = keyword => axios.get(`${API_BASE}/units/search/${keyword}`).then(resp => resp.data.map(
  item => normalizeUnit(item)
));

//Categories
export const getAllCategories = () => axios.get(`${API_BASE}/categories?withCount=true`).then(resp => resp.data.map(
  item => normalizeCategory(item)
));
export const getActivitiesUnderCategory = id => axios.get(`${API_BASE}/categories/${id}/mpunits`).then(resp => resp.data.map(item => normalizeUnit(item)));
export const createCategory = category => axios.post(`${API_BASE}/categories`, category).then(resp => normalizeCategory(resp.data));
export const updateCategory = category => axios.put(`${API_BASE}/categories/${category.id}`, category).then(resp => normalizeCategory(resp.data));
export const removeCategory = id => axios.delete(`${API_BASE}/categories/${id}`);

//Activities
export const getAllActivities = () => axios.get(`${API_BASE}/mpunits`).then(resp => resp.data.map(
  item => normalizeUnit(item)
));
export const getUncategorised = () => axios.get(`${API_BASE}/mpunits?uncategorised=true`).then(resp => resp.data.map(
  item => normalizeUnit(item)
));
export const getActivity = id => axios.get(`${API_BASE}/mpunits/${id}`).then(resp => normalizeUnit(resp.data));
export const addUnitToMarket = (unit, categories) => {
  return axios.post(`${API_BASE}/mpunits`, Object.assign({}, unit, { mpCategorySet: categories, unitid: unit.id}))
    .then(resp => normalizeUnit(resp.data));
};
export const updateActivity = (unit, categories) => {
  return axios.put(`${API_BASE}/mpunits/${unit.id}`,  Object.assign({}, unit, { mpCategorySet: categories, unitid: unit.id}))
    .then(resp => normalizeUnit(resp.data));
};