import React from "react";
import { Box } from "@mui/material";
import RegistrationForm from "../components/formRegister";
import { ButtonBack } from "../components/ButtonBack";

const RegistrationPage = () => {
  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <RegistrationForm />
      <ButtonBack/>
    </Box>
  );
};

export default RegistrationPage;
