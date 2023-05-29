import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import NavigationBar from "../../../components/organisms/NavigationBar";

const ConsultantHomePage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NavigationBar />
      <Typography>Consultant Home Page</Typography>;
    </Box>
  );
};

export default ConsultantHomePage;
