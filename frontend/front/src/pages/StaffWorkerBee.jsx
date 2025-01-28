import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Typography, Backdrop, CircularProgress } from '@mui/material';
import { Home, Assignment, CalendarToday } from '@mui/icons-material';

const StaffWorkerbee = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga
    setTimeout(() => setLoading(false), 1500); // 1.5 segundos de carga
  }, []);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 60,
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            width: open ? 240 : 60,
            transition: 'width 0.3s ease',
            backgroundColor: '#333',
            color: 'white',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            style={{
              width: open ? '40px' : '30px',
              height: open ? '40px' : '30px',
              transition: 'width 0.3s ease, height 0.3s ease',
            }}
          />
        </Box>

        <List>
          <ListItem button onClick={handleDrawerToggle}>
            <Home />
            {open && <ListItemText primary="Home" />}
          </ListItem>
          <ListItem button onClick={handleDrawerToggle}>
            <Assignment />
            {open && <ListItemText primary="Detalles Tarea" />}
          </ListItem>
          <ListItem button onClick={handleDrawerToggle}>
            <CalendarToday />
            {open && <ListItemText primary="Mi Pefil" />}
          </ListItem>
        </List>
      </Drawer>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default StaffWorkerbee;
