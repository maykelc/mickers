import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid, Snackbar, Alert, MenuItem } from "@mui/material";
import { newUser } from "../services/api/userEndPoint"; // Importar la función newUser

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    tipo_usuario: "",
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    direccion: "",
    genero: "",
    password: "",
  });

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");

  // Manejador de cambios para actualizar el estado de los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validación del formulario
  const validateForm = () => {
    const { tipo_usuario, nombre, apellidos, correo, telefono, direccion, genero, password } = formData;
    if (!tipo_usuario || !nombre || !apellidos || !correo || !telefono || !direccion || !genero || !password) {
      setSnackBarSeverity("error");
      setSnackBarMessage("Todos los campos son obligatorios.");
      setSnackBarOpen(true);
      return false;
    }
    return true;
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const payload = {
        tipo_usuario:formData.tipo_usuario,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        correo: formData.correo,
        telefono: formData.telefono,
        direccion: formData.direccion,
        genero: formData.genero,
        password: formData.password,
      };

      const response = await newUser(payload);

      console.log("Respuesta del servidor:", response);

      if (response.status === 201) {
        setSnackBarMessage("Registro exitoso");
        setSnackBarSeverity("success");

        // Reiniciar el formulario
        setFormData({
          tipo_usuario: "",
          nombre: "",
          apellidos: "",
          correo: "",
          telefono: "",
          direccion: "",
          genero: "",
          password: "",
        });
      } else {
        setSnackBarMessage("Hubo un error al registrar el usuario");
        setSnackBarSeverity("error");
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setSnackBarMessage("Error al conectar con el servidor");
      setSnackBarSeverity("error");
    }

    setSnackBarOpen(true);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Formulario de Registro
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Tipo de Empleado"
              variant="outlined"
              select
              fullWidth
              name="tipo_usuario"
              value={formData.tipo_usuario}
              onChange={handleChange}
              required
            >
              <MenuItem value="empleado">Empleado</MenuItem>
              <MenuItem value="empleador">Empleador</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellidos"
              variant="outlined"
              fullWidth
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              type="email"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              type="tel"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Dirección"
              variant="outlined"
              fullWidth
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Género"
              variant="outlined"
              select
              fullWidth
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Femenino">Femenino</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              variant="outlined"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Registrarse
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert onClose={() => setSnackBarOpen(false)} severity={snackBarSeverity} sx={{ width: "100%" }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegistrationForm;
