import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";

const Dashboard = () => {
  const tickets = [
    { id: 1, description: "Manutenção do ar-condicionado", status: "Aberto" },
    { id: 2, description: "Limpeza da copa", status: "Concluído" },
  ];

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <List>
        {tickets.map((ticket) => (
          <ListItem key={ticket.id} divider>
            <ListItemText
              primary={ticket.description}
              secondary={`Status: ${ticket.status}`}
            />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary">
        Novo Chamado
      </Button>
    </Box>
  );
};

export default Dashboard;
