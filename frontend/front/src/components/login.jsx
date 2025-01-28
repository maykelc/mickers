import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa el hook
import { login } from '../services/api/endpoint'; // Importa la función login

const Login = ({ open, onClose }) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Crea la instancia de navigate

  const handleSubmit = async () => {
    console.log('Correo:', correo);
    console.log('Password:', password);
  
    if (correo && password) {
      try {
        const response = await login(correo, password); 
        onClose(); 
        navigate('/workerbee'); 
      } catch (error) {
        alert('Correo o contraseña incorrectos.'); 
      }
    } else {
      alert('Por favor, completa ambos campos.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Iniciar sesión</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Correo electrónico"
          type="email"
          fullWidth
          variant="outlined"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Contraseña"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Iniciar sesión
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
