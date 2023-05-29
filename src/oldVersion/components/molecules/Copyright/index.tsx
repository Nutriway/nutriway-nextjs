import React from "react";
import { Typography, Link } from "@mui/material";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color={props.color ? props.color : "text.secondary"}
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.nutriway.pt/">
        Nutriway
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
