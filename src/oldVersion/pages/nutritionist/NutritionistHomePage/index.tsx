import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import NavigationBar from "../../../components/organisms/NavigationBar";

const NutritionistHomePage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NavigationBar />
      <Typography>Nutritionist home page</Typography>
    </Box>
  );
};

export default NutritionistHomePage;
