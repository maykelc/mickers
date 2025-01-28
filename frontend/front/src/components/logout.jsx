import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Si estás usando React Router
import { logout } from '../services/api/endpoint'; // Importar la función logout

const Logout = () => {
  const navigate = useNavigate(); // Usamos useNavigate para redirigir después de logout

  const handleLogout = async () => {
    try {
      // Llamamos a la función logout para hacer la solicitud de logout al backend
      await logout();

      // Eliminar el token del almacenamiento local
      localStorage.removeItem("token");

      // Redirigir al usuario a la página de login después de cerrar sesión
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejo de errores (puedes mostrar un mensaje si lo deseas)
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  );
};

export default Logout;
