import React from "react";
import { Box, Typography } from "@mui/material";
import NavigationBar from "../../../components/organisms/NavigationBar";
import { styles } from "./styles";

const ConfirmedUser = () => {
  return (
    <>
      <NavigationBar />
      <Typography variant="h1" textAlign={"center"}>
        User Confirmado
      </Typography>
      <Box style={styles.imgContainer}>
        <img
          alt="celebration"
          src="https://cutewallpaper.org/24/party-icon-png/bottle-champagne-celebration-celebrate-festival-open-bottles-party-png-transparentparty-icon-png-free-transparent-png-images-pngaaacom.png"
        />
      </Box>
    </>
  );
};

export default ConfirmedUser;
