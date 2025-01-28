import { apiRequest } from './endpoint';

export const getDocuments = () => apiRequest('get', 'documents/');
export const getDocumentById = (id) => apiRequest('get', `documents/${id}/`);
export const newDocument = (data) => apiRequest('post', 'documents/', data);
export const updateDocument = (id, data) => apiRequest('patch', `documents/${id}/`, data);
export const deleteDocument = (id) => apiRequest('delete', `documents/${id}/`);


export const uploadDocument = async (data) => {
    const formData = new FormData();
    formData.append('user', data.user); // ID del usuario asociado
    formData.append('ftoCarnetFront', data.ftoCarnetFront); // Archivo de imagen
    formData.append('ftoCarnetBack', data.ftoCarnetBack);
    formData.append('certAntecedentes', data.certAntecedentes);
    formData.append('ftoPersonal', data.ftoPersonal);

    return await apiRequest('post', 'documents/', formData);
};