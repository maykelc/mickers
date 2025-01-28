import { apiRequest } from './endpoint';

// Obtener todas las habilidades
export const getSkills = () => apiRequest('get', 'skills/');

// Obtener una habilidad por ID
export const getSkillById = (id) => apiRequest('get', `skills/${id}/`);

// Crear una nueva habilidad
export const newSkill = (data) => apiRequest('post', 'skills/', data);

// Actualizar una habilidad
export const updateSkill = (id, data) => apiRequest('patch', `skills/${id}/`, data);

// Eliminar una habilidad
export const deleteSkill = (id) => apiRequest('delete', `skills/${id}/`);
