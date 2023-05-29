import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { styles } from "./styles";

const StartButton = (props: ButtonProps) => {
  //@ts-ignore
  return <Button {...props} sx={[props.sx, styles.button]} />;
};

export default StartButton;
