import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const Login = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Sistema de Chamados
      </Typography>
      <Box component="form" width={300}>
        <TextField fullWidth label="Usuário" margin="normal" />
        <TextField fullWidth label="Senha" type="password" margin="normal" />
        <Button variant="contained" fullWidth color="primary">
          Entrar
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
