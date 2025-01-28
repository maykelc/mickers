import { apiRequest } from './endpoint';

// Obtener todas las chambas
export const getChambas = () => apiRequest('get', 'chamba/');

// Obtener una chamba por ID
export const getChambaById = (id) => apiRequest('get', `chamba/${id}/`);

// Crear una nueva chamba
export const newChamba = (data) => apiRequest('post', 'chamba/', data);

// Actualizar una chamba
export const updateChamba = (id, data) => apiRequest('patch', `chamba/${id}/`, data);

// Eliminar una chamba
export const deleteChamba = (id) => apiRequest('delete', `chamba/${id}/`);
