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

// Importe sua logo (altere o caminho para o correto)
import Logo from "../assets/cerne-logo.png";

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
      sx={{
        background: "linear-gradient(180deg, #ffffff, #f0f4ff)", // Fundo gradiente
        padding: 2,
      }}
    >
      {/* Card principal */}
      <Box
        width="100%"
        maxWidth={700}
        padding={4}
        bgcolor="white"
        borderRadius={3}
        boxShadow={3}
      >
        {/* Cabeçalho com logo, título e subtítulo */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={2} // Espaçamento entre a logo e o texto
          mb={3}
        >
          <Box
            component="img"
            src={Logo}
            alt="Logo CERNE"
            sx={{ width: 80 }} // Tamanho da logo ajustado
          />
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: "#071a5f",
                fontSize: "1.8rem",
              }}
            >
              CERNE
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#000000",
                fontSize: "1rem",
              }}
            >
              Dashboard
            </Typography>
          </Box>
        </Box>

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
                  primaryTypographyProps={{
                    style: { color: "#000", fontWeight: "bold" },
                  }}
                  secondaryTypographyProps={{
                    style: { color: "#555" },
                  }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="textSecondary" align="center">
            Nenhum chamado encontrado.
          </Typography>
        )}
        <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: "0.85rem", // Reduzi o tamanho da fonte
              padding: "8px 0", // Ajustei o padding para um design mais compacto
              bgcolor: "#2F54EB",
              ":hover": {
                bgcolor: "#1d3bc2",
              },
            }}
            onClick={() => navigate("/new-ticket")}
          >
            Novo Chamado
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: "0.85rem", // Mesma redução aqui
              padding: "8px 0",
              color: "#2F54EB",
              borderColor: "#2F54EB",
              ":hover": {
                bgcolor: "#f0f4ff",
              },
            }}
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
