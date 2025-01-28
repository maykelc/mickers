import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { getUserById } from "../services/api/userEndPoint";
import { ButtonBack } from "../components/ButtonBack";

const CardUser = ({ userId }) => {
  const [user, setUser] = useState(null); // Estado para el usuario
  const [loading, setLoading] = useState(true); // Estado para la carga
  const [error, setError] = useState(null); // Estado para errores

  // Función para obtener el usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(userId);
        console.log("Usuario obtenido:", response);
        setUser(response);
      } catch (err) {
        console.error("Error al obtener el usuario:", err);
        setError("No se pudo cargar el usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <ButtonBack />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, textAlign: "center", border: "1px solid #ddd", borderRadius: 4 }}>
      <Typography variant="h5" gutterBottom>
        Detalles del Usuario
      </Typography>
      <Typography variant="body1">
        <strong>Nombre:</strong> {user.nombre} {user.apellidos}
      </Typography>
      <Typography variant="body1">
        <strong>Correo:</strong> {user.correo}
      </Typography>
      <Typography variant="body1">
        <strong>Teléfono:</strong> {user.telefono}
      </Typography>
      <Typography variant="body1">
        <strong>Dirección:</strong> {user.direccion}
      </Typography>
      <Typography variant="body1">
        <strong>Género:</strong> {user.genero}
      </Typography>
      <Typography variant="body1">
        <strong>Tipo de Empleado:</strong> {user.tipo_empleado?.tipo_persona}
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <ButtonBack />
      </Box>
    </Box>
  );
};

export default CardUser;
