import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

// Definição da interface para os tickets
interface Ticket {
  id: number;
  descricao: string;
  tipo: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Carregar os tickets do localStorage ao montar o componente
  useEffect(() => {
    const savedTicketsString = localStorage.getItem("chamados");
    const savedTickets: Ticket[] = savedTicketsString ? JSON.parse(savedTicketsString) : [];
    setTickets(savedTickets);
  }, []);

  // Função para excluir um ticket
  const handleDelete = (id: number) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets(updatedTickets);
    localStorage.setItem("chamados", JSON.stringify(updatedTickets));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding={3}
    >
      <Box width="100%" maxWidth={600}>
        <Typography variant="h4" gutterBottom align="center">
          Dashboard
        </Typography>
        {tickets.length > 0 ? (
          <List>
            {tickets.map((ticket) => (
              <ListItem
                key={ticket.id}
                divider
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(ticket.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={ticket.descricao}
                  secondary={`Tipo: ${ticket.tipo}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="textSecondary" align="center">
            Nenhum chamado encontrado.
          </Typography>
        )}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/new-ticket")}
          >
            Novo Chamado
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Sair
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
