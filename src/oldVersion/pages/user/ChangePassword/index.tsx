import React, { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import NavigationBar from "../../../components/organisms/NavigationBar";
import { changePassword } from "../../../api/user";
import CustomTextField from "../../../components/atoms/CustomTextField";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import { styles } from "./styles";

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState<any>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setPasswordData({ ...passwordData, [name]: value });
  };

  const onChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await changePassword(passwordData);
    } catch (error) {}
  };

  return (
    <Box>
      <NavigationBar />
      <Box sx={styles.pageWrapper}>
        <Box sx={styles.formWrapper}>
          <Box sx={styles.headerWrapper}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Alterar a palavra passe
            </Typography>
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={onChangePassword}
            sx={styles.inputsWrapper}
          >
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="currentPassword"
              onChange={handleChange}
              name="currentPassword"
              placeholder="Palavra-passe atual"
              label="Palavra-passe atual"
            ></CustomTextField>
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="password"
              onChange={handleChange}
              name="password"
              placeholder="Palavra-passe"
              label="Palavra-passe"
            ></CustomTextField>
            <CustomTextField
              onChange={handleChange}
              name="passwordConfirmation"
              placeholder="Confirmação de palavra-passe"
              label="Confirmação de palavra-passe"
              id="passwordConfirmation"
              margin="normal"
              required
              fullWidth
            ></CustomTextField>
            <PrimaryButton
              type="submit"
              variant="contained"
              sx={styles.submitbutton}
            >
              Submeter
            </PrimaryButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePassword;
