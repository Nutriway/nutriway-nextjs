import React from "react";
import { Box, Button, List, ListItem, Typography } from "@mui/material";

const NutritionistClientHistory = () => {
  const renderHistoryItem = () => {
    //Fazer um map com a history de consultas do client (futuras consultas incluidas)
    return (
      <ListItem
        sx={{
          border: "1px solid black",
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ flex: 1 }}>1</Typography>
        <Typography sx={{ flex: 4 }}>Description</Typography>
        <Typography sx={{ flex: 1 }}>Date</Typography>
        <Box sx={{ flex: 1 }}>
          <Button>Details</Button>
          <Button>Delete</Button>
        </Box>
      </ListItem>
    );
  };

  return (
    <Box>
      <Typography sx={{ textAlign: "center" }}>
        Histórico de consultas do nomeDoCliente
      </Typography>
      <List
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderHistoryItem()}
      </List>
    </Box>
  );
};

export default NutritionistClientHistory;
