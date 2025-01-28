import { apiRequest } from './endpoint';

// Obtener todos los usuarios
export const getUsers = () => apiRequest('get', 'personal/');

// Obtener un usuario por ID
export const getUserById = (id) => apiRequest('get', `personal/${id}/`);

// Crear un nuevo usuario
export const newUser = (data) => apiRequest('post', 'personal/', data); // Llama a apiRequest directamente

// Actualizar un usuario
export const updateUser = (id, data) => apiRequest('patch', `personal/${id}/`, data);

// Eliminar un usuario
export const deleteUser = (id) => apiRequest('delete', `personal/${id}/`);
