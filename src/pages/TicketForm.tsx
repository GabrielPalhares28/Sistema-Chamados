import React from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

const TicketForm = () => {
  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Novo Chamado
      </Typography>
      <Box component="form">
        <TextField fullWidth label="Descrição" margin="normal" />
        <TextField
          fullWidth
          select
          label="Tipo"
          margin="normal"
          defaultValue=""
        >
          <MenuItem value="manutencao">Manutenção</MenuItem>
          <MenuItem value="limpeza">Limpeza</MenuItem>
          <MenuItem value="abastecimento">Abastecimento</MenuItem>
        </TextField>
        <Button variant="contained" color="primary">
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default TicketForm;
