import { apiRequest } from './endpoint';

// Obtener todas las calificaciones
export const getCalifications = () => apiRequest('get', 'califications/');

// Obtener una calificación por ID
export const getCalificationById = (id) => apiRequest('get', `califications/${id}/`);

// Crear una nueva calificación
export const newCalification = (data) => apiRequest('post', 'califications/', data);

// Actualizar una calificación
export const updateCalification = (id, data) => apiRequest('patch', `califications/${id}/`, data);

// Eliminar una calificación
export const deleteCalification = (id) => apiRequest('delete', `califications/${id}/`);
