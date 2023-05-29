import React from "react";
import { TextField, styled, TextFieldProps } from "@mui/material";
import { pallete } from "../../../util/styles/pallete";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: pallete.colors.primaryColor,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: pallete.colors.primaryColor,
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: pallete.colors.primaryColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: pallete.colors.primaryColor,
    },
  },
});

const CustomTextField = (props: TextFieldProps) => <CssTextField {...props} />;
export default CustomTextField;
