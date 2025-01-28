import { apiRequest } from './endpoint';

export const getCategories = () => apiRequest('get', 'categories/');
export const getCategoryById = (id) => apiRequest('get', `categories/${id}/`);
export const newCategory = (data) => apiRequest('post', 'categories/', data);
export const updateCategory = (id, data) => apiRequest('patch', `categories/${id}/`, data);
export const deleteCategory = (id) => apiRequest('delete', `categories/${id}/`);