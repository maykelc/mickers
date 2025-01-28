import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ButtonBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);  // El -1 hace que navegue a la página anterior
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleGoBack}>
        <Typography variant="button" color="primary">
          Volver Atrás
        </Typography>
      </Button>
    </Box>
  );
};

export { ButtonBack };;
