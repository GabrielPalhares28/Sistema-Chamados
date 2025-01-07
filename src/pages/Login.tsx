import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        background: "linear-gradient(180deg, #ffffff, #f0f4ff)", // Fundo gradiente
        padding: 2, // Ajuste para dispositivos menores
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "1F41BB" }} // Estilização do título
      >
        Sistema de Chamados
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        maxWidth={360} // Limita a largura máxima
        bgcolor="white" // Fundo branco para contraste
        borderRadius={3}
        boxShadow={3}
        padding={3}
        gap={2}
      >
        <TextField
          fullWidth
          label="Usuário"
          variant="outlined"
          InputProps={{
            style: { borderRadius: 8 },
          }}
        />
        <TextField
          fullWidth
          label="Senha"
          type="password"
          variant="outlined"
          InputProps={{
            style: { borderRadius: 8 },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleLogin}
          sx={{
            borderRadius: 8,
            padding: "10px 0",
            fontWeight: "bold",
            bgcolor: "#2F54EB",
            ":hover": {
              bgcolor: "#1d3bc2",
            },
          }}
        >
          Entrar
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
