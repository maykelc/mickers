import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, TextField, Button } from '@mui/material';
import { getCategories, newCategory } from '../services/api/categoriaEndpoint';

const Employer = () => {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newCategory({ nombre: newName });
      setNewName(''); // Limpiar el campo después de agregar la categoría
      const updatedCategories = await getCategories();
      setCategories(updatedCategories); // Actualizar la lista de categorías
    } catch (error) {
      console.error('Error al agregar la categoría:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Categorías
      </Typography>
      <Grid container spacing={3}>
        {categories.map(category => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {category.nombre}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Agregar Nueva Categoría
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre de la Categoría"
            value={newName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Agregar Categoría
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Employer;
