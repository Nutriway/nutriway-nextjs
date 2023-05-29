import React from "react";
import { Button, ButtonProps, styled } from "@mui/material";
import { pallete } from "../../../util/styles/pallete";

const CssButton = styled(Button)({
  "&.MuiButtonBase-root": {
    color: pallete.colors.textColor,

    "&:hover": {
      backgroundColor: pallete.colors.primaryColor,
      color: "white",
    },
  },
});

const NoBackgroundButton = (props: ButtonProps) => <CssButton {...props} />;
export default NoBackgroundButton;
