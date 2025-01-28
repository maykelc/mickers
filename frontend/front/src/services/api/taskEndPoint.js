import { apiRequest } from './endpoint';

// Obtener todas las tareas
export const getTasks = () => apiRequest('get', 'tasks/');

// Obtener una tarea por ID
export const getTaskById = (id) => apiRequest('get', `tasks/${id}/`);

// Crear una nueva tarea
export const newTask = (data) => apiRequest('post', 'tasks/', data);

// Actualizar una tarea
export const updateTask = (id, data) => apiRequest('patch', `tasks/${id}/`, data);

// Eliminar una tarea
export const deleteTask = (id) => apiRequest('delete', `tasks/${id}/`);
