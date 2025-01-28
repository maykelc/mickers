import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Modal, Fade, Backdrop } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Login from "../components/login"; // Asegúrate de que la ruta sea correcta

const HomePage = () => {
    const navigate = useNavigate();
    const [openLoginModal, setOpenLoginModal] = useState(false); // Estado para abrir/cerrar el modal

    // Funciones para manejar la apertura y cierre del modal
    const handleOpenLogin = () => {
        setOpenLoginModal(true); // Abrir el modal
    };
    const handleCloseLogin = () => {
        setOpenLoginModal(false); // Cerrar el modal
    };

    return (
        <Box sx={{ padding: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <Box sx={{ padding: 2, backgroundColor: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <img src="logo.png" alt="Logo" style={{ height: '50px' }} />
                </Box>

                <Box>
                    <Button
                        variant="outlined"
                        sx={{ margin: "0 10px", color: 'white', borderColor: 'white' }}
                        onClick={() => navigate("/register")}>
                        Registrarse
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ margin: '0 10px', color: 'white', borderColor: 'white' }}
                        onClick={handleOpenLogin}>
                        Iniciar sesión
                    </Button>
                </Box>
            </Box>

            {/* Main Container */}
            <Box sx={{ flex: 1, padding: 2 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4 }}>Bienvenido a la Página Principal</Typography>

                <Grid container spacing={2}>
                    {[...Array(7)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box sx={{ border: '1px solid #ccc', padding: 2, textAlign: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                                <Typography variant="h6">Div {index + 1}</Typography>
                                <Typography variant="body2">Contenido de la sección {index + 1}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Footer */}
            <Box sx={{ padding: 2, backgroundColor: '#f4f4f4', textAlign: 'center' }}>
                <Typography variant="h6">Sobre nosotros</Typography>
                <Box>
                    <Button variant="text" sx={{ color: 'black' }} onClick={() => navigate("/quienes-somos")}>Quiénes somos</Button>
                    <Button variant="text" sx={{ color: 'black' }} onClick={() => navigate("/mision")}>Misión</Button>
                    <Button variant="text" sx={{ color: 'black' }} onClick={() => navigate("/vision")}>Visión</Button>
                    <Button variant="text" sx={{ color: 'black' }} onClick={() => navigate("/redes-sociales")}>Redes Sociales</Button>
                </Box>
                <Box>
                    <Typography variant="body1">Categorías</Typography>
                    <ul>
                        <li><Button variant="text" sx={{ color: 'black' }} onClick={() => navigate("/categoria1")}>Categoría 1</Button></li>
                        <li><Button variant="text" sx={{ color: 'black' }} onClick={() => navigate("/categoria2")}>Categoría 2</Button></li>
                        <li><Button variant="text" sx={{ color: 'black' }} onClick={() => navigate("/categoria3")}>Categoría 3</Button></li>
                    </ul>
                </Box>
            </Box>

            {/* Login Modal */}
            <Modal
                open={openLoginModal}
                onClose={handleCloseLogin}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={openLoginModal}>
                    <Box sx={{ width: 400, padding: 4, backgroundColor: 'white', margin: 'auto', borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Iniciar Sesión</Typography>
                        <Login open={openLoginModal} onClose={handleCloseLogin} />
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default HomePage;
