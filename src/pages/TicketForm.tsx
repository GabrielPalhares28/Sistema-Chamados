import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Definição da interface para os tickets
interface Ticket {
  id: number;
  descricao: string;
  tipo: string;
}

const TicketForm: React.FC = () => {
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");

  const handleSave = () => {
    const savedTicketsString = localStorage.getItem("chamados");
    const savedTickets: Ticket[] = savedTicketsString ? JSON.parse(savedTicketsString) : [];

    const newTicket: Ticket = {
      id: savedTickets.length + 1,
      descricao,
      tipo,
    };

    // Adiciona o novo chamado à lista existente
    const updatedTickets = [...savedTickets, newTicket];

    // Salva a lista atualizada no localStorage
    localStorage.setItem("chamados", JSON.stringify(updatedTickets));

    // Redireciona para o dashboard
    navigate("/dashboard");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      height="100vh"
      padding={3}
      bgcolor="#f5f5f5"
    >
      <Box width="100%" maxWidth={500} mt={4}>
        <Paper elevation={3} style={{ padding: 24 }}>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Novo Chamado
          </Typography>
          <Box component="form" display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              fullWidth
              label="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              select
              label="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              variant="outlined"
            >
              <MenuItem value="manutencao">Manutenção</MenuItem>
              <MenuItem value="limpeza">Limpeza</MenuItem>
              <MenuItem value="abastecimento">Abastecimento</MenuItem>
            </TextField>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Salvar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/dashboard")}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Voltar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TicketForm;
