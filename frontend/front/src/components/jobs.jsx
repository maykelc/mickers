import React, { useState, useEffect } from "react";
import { getTasks } from '../services/api/taskEndPoint.js'; 
import { Container, Grid, Card, CardContent, Typography, Chip, Stack } from "@mui/material";
import { LocationOn, MonetizationOn, CalendarToday } from "@mui/icons-material";

const Jobs = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks(); // Llamada a la API
        console.log("Tareas obtenidas:", response.data); // Verifica qué devuelve la API
        setTasks(response.data); // Guarda las tareas en el estado
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Tareas
      </Typography>

      <Grid>
        <Typography variant= "h3">TAreas </Typography>
        
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card sx={{ maxWidth: 500, m: 2, p: 2, boxShadow: 3 }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="bold">
                      {task.titulo}
                    </Typography>
                    <Chip label={task.estado} color={task.estado === "pendiente" ? "warning" : "success"} />
                  </Stack>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {task.descripcion}
                  </Typography>

                  <Stack spacing={1} mt={2}>
                    <Typography variant="body2" display="flex" alignItems="center">
                      <MonetizationOn sx={{ mr: 1, color: "green" }} />
                      {task.valor.toLocaleString()} CLP
                    </Typography>
                    <Typography variant="body2" display="flex" alignItems="center">
                      <LocationOn sx={{ mr: 1, color: "blue" }} />
                      {task.ubicacion}
                    </Typography>
                    <Typography variant="body2" display="flex" alignItems="center">
                      <CalendarToday sx={{ mr: 1, color: "gray" }} />
                      {new Date(task.fecha_creacion).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No hay tareas disponibles.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Jobs;

