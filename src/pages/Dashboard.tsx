import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/cerne-logo.png";
import axios from "axios";

interface Ticket {
  id: number;
  descricao: string;
  tipo: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");

  // Carregar os tickets do backend ao montar o componente
  useEffect(() => {
    axios
      .get("http://localhost:3000/chamados") // A URL da sua API backend
      .then((response) => {
        console.log("Dados recebidos:", response.data); // Log para depuração
        const formattedData = response.data.map((ticket: any) => ({
          id: ticket.id,
          descricao: ticket.descricao,
          tipo: ticket.tipo,
        })); // Formatação dos dados, se necessário
        setTickets(formattedData);
      })
      .catch((error) => {
        console.error("Erro ao carregar os chamados:", error);
      });
  }, []);

  // Função para excluir um ticket
  const handleDelete = (id: number) => {
    // Filtra a lista para remover o ticket excluído
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets(updatedTickets); // Atualiza a lista no estado

    // Exclui o ticket no backend
    axios
      .delete(`http://localhost:3000/chamados/${id}`)
      .then(() => {
        console.log("Chamado excluído com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao excluir chamado:", error);
      });
  };

  // Contar chamados por tipo
  const ticketCounts = tickets.reduce(
    (acc, ticket) => {
      acc[ticket.tipo] = (acc[ticket.tipo] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Filtrar chamados com base no tipo selecionado
  const filteredTickets =
    selectedType === "all"
      ? tickets
      : tickets.filter((ticket) => ticket.tipo === selectedType);

  console.log("Tickets filtrados:", filteredTickets); // Log para depuração

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        background: "linear-gradient(180deg, #ffffff, #f0f4ff)",
        padding: 2,
      }}
    >
      <Box
        width="100%"
        maxWidth={700}
        padding={4}
        bgcolor="white"
        borderRadius={3}
        boxShadow={3}
      >
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Box component="img" src={Logo} alt="Logo CERNE" sx={{ width: 80 }} />
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

        {/* Contador de chamados */}
        <Box mb={3} p={2} borderRadius={2} bgcolor="#f0f4ff" boxShadow={1}>
          <Typography variant="h6" fontWeight="bold" color="#2F54EB">
            Resumo dos Chamados
          </Typography>
          <Typography color="#555">
            {Object.entries(ticketCounts).map(([tipo, count]) => (
              <div key={tipo}>
                {`${tipo.charAt(0).toUpperCase() + tipo.slice(1)}: ${count}`}
              </div>
            ))}
            {tickets.length === 0 && <div>Nenhum chamado registrado.</div>}
          </Typography>
        </Box>

        {/* Filtro por tipo */}
        <Box mb={3}>
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="all">Todos os Tipos</MenuItem>
            <MenuItem value="manutencao">Manutenção</MenuItem>
            <MenuItem value="limpeza">Limpeza</MenuItem>
            <MenuItem value="abastecimento">Abastecimento</MenuItem>
          </Select>
        </Box>

        {filteredTickets.length > 0 ? (
          <List>
            {filteredTickets.map((ticket) => (
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

        {/* Botão de novo chamado */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            background: "#071a5f",
            color: "#fff",
            "&:hover": {
              background: "#2F54EB",
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
            marginTop: 2,
            color: "#071a5f",
            borderColor: "#071a5f",
            "&:hover": {
              background: "#f0f4ff",
            },
          }}
          onClick={() => navigate("/")}
        >
          Voltar
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;