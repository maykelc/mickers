import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/'; // Define una base URL fija

export const apiRequest = async (method, endpoint, data = null) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`, // Combina la base URL con el endpoint recibido
      data,
      headers: { 'Content-Type': 'application/json' }, // Configura los encabezados
    });
    return response;
  } catch (error) {
    console.error(`Error en ${method.toUpperCase()} ${BASE_URL}${endpoint}:`, error);
    throw error; // Re-lanza el error para manejarlo externamente
  }
};

// Función específica para el login
export const login = async (correo, password) => {
  try {
    const response = await apiRequest('POST', 'login/', { correo, password });
    return response;
  } catch (error) {
    if (error.response) {
      console.error('Error en el inicio de sesión:', error.response.data);
    } else {
      console.error('Error en el inicio de sesión:', error.message);
    }
    throw error;
  }
};

// Función para el logout
export const logout = async () => {
  try {
    // Aquí no enviamos datos ya que no estamos esperando un cuerpo en la respuesta
    const response = await apiRequest('POST', 'logout/');
    return response;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};



