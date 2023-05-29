import React from "react";
import { Box, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Copyright from "../Copyright";

const styles = {
  footer: {
    width: "100%",
    backgroundColor: "black",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
};

const Footer = () => {
  return (
    <Box sx={styles.footer}>
      <Box>
        <InstagramIcon
          sx={{ color: "#f7f7f7", marginRight: "8px", fontSize: "48px" }}
        />
        <FacebookIcon
          sx={{ color: "#f7f7f7", marginLeft: "8px", fontSize: "48px" }}
        />
      </Box>
      <Typography sx={{ color: "#F7F7F7" }}>
        Contacto: info@nutriway.pt
      </Typography>
      <Box>
        <Copyright color={"#808080"} />
      </Box>
    </Box>
  );
};

export default Footer;
