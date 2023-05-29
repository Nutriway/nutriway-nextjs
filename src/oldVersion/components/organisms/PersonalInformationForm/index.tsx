import React, { useEffect, useState } from "react";
import {
  Box,
  FormControlLabel,
  InputAdornment,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAuth } from "../../../providers/useAuth";
import { styles } from "./styles";
import { updatePersonalInformation } from "../../../api/user";
import CustomTextField from "../../atoms/CustomTextField";
import CustomRadio from "../../atoms/CustomRadio";
import SubmitButton from "../../atoms/PrimaryButton";

export type PersonalInformationFormType = {
  gender: string;
  weight: string;
  height: string;
  age: string;
  activity: string;
  city: string;
  street: string;
  zipCode: string;
  phoneNumber: string;
};

const PersonalInformationForm = () => {
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const { user, setUser } = useAuth();
  const [form, setForm] = useState<PersonalInformationFormType>({
    gender: "",
    weight: "",
    height: "",
    age: "",
    activity: "",
    city: "",
    street: "",
    zipCode: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      const initialForm = {
        gender: user.gender || "",
        weight: user.weight || "",
        height: user.height || "",
        age: user.age || "",
        activity: user.activity || "",
        city: user.city || "",
        street: user.street || "",
        zipCode: user.zipCode || "",
        phoneNumber: user.phoneNumber || "",
      };

      setForm(initialForm);
    }
  }, [user]);

  const onChangeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e: any) => {
    e?.preventDefault();

    const metabolicRate = calculateMetabolicRate();

    const response = await updatePersonalInformation(
      form.gender,
      form.age,
      form.weight,
      form.height,
      form.activity,
      metabolicRate,
      form.city,
      form.street,
      form.zipCode,
      form.phoneNumber,
      user!.id,
      user!.jwt
    );

    if (response) {
      setUser(response);
    }
  };

  const isFormValid = () => {
    return (
      form.age &&
      form.gender &&
      form.height &&
      form.weight &&
      form.activity &&
      form.phoneNumber
    );
  };

  const calculateMetabolicRate = () => {
    const activityRate = getActitityRate();

    if (form.gender === "male") {
      return Math.round(
        activityRate *
          (66 +
            (parseInt(form.weight) * 13.7 +
              parseInt(form.height) * 5 -
              parseInt(form.age) * 6.8))
      );
    }
    return Math.round(
      activityRate *
        (66.5 +
          (parseInt(form.weight) * 9.6 +
            parseInt(form.height) * 1.8 -
            parseInt(form.age) * 4.7))
    );
  };

  const getActitityRate = (): number => {
    switch (form.activity) {
      case "low":
        return 1.2;
      case "medium-low":
        return 1.375;
      case "medium":
        return 1.55;
      case "medium-high":
        return 1.725;
      case "high":
        return 1.9;
    }

    return 1;
  };

  return (
    <Box sx={styles.pageWrapper}>
      <Box sx={styles.formWrapper}>
        <Typography sx={{ mb: 3 }} variant="h6" component="h2">
          Preencha as informações abaixo
        </Typography>

        <Box>
          <Typography sx={{ mb: 0 }} variant="subtitle1" component="h2">
            Género
          </Typography>
          <RadioGroup
            sx={{ mb: 3 }}
            aria-labelledby="gender"
            name="gender"
            value={form.gender}
            onChange={onChangeForm}
          >
            <FormControlLabel
              value="male"
              control={<CustomRadio />}
              label="Masculino"
            />
            <FormControlLabel
              value="female"
              control={<CustomRadio />}
              label="Feminino"
            />
          </RadioGroup>
          <Box>
            <CustomTextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+351</InputAdornment>
                ),
              }}
              sx={isDesktop ? styles.phoneNumber : styles.phoneNumberMobile}
              name="phoneNumber"
              id="outlined-basic"
              label="Número de telemóvel"
              value={form?.phoneNumber}
              onChange={onChangeForm}
              variant="outlined"
              type="number"
              required={true}
            />
          </Box>
          <Box sx={styles.nutritionalInputs}>
            <CustomTextField
              sx={styles.input}
              onChange={onChangeForm}
              label="Idade"
              placeholder="Idade"
              variant="outlined"
              name="age"
              value={form.age}
              type="number"
              required={true}
            ></CustomTextField>
            <CustomTextField
              sx={styles.input}
              onChange={onChangeForm}
              label="Peso (kg)"
              placeholder="Peso (kg)"
              variant="outlined"
              name="weight"
              type="number"
              value={form.weight}
              required
            ></CustomTextField>
            <CustomTextField
              sx={styles.input}
              onChange={onChangeForm}
              label="Altura (cm)"
              placeholder="Altura (cm)"
              variant="outlined"
              name="height"
              type="number"
              value={form.height}
              required
            ></CustomTextField>
          </Box>
        </Box>
        <Box sx={styles.activity}>
          <Typography sx={{ mb: 1 }} variant="subtitle1" component="h2">
            Frequência de atividade fisica
          </Typography>
          <RadioGroup
            aria-labelledby="activity"
            name="activity"
            value={form.activity}
            onChange={onChangeForm}
          >
            <FormControlLabel
              value="low"
              control={<CustomRadio />}
              label="Sedentário (pouco ou nenhum exercício) "
            />
            <FormControlLabel
              value="medium-low"
              control={<CustomRadio />}
              label="Levemente ativo (exercício leve 1 a 3 vezes por semana)"
            />
            <FormControlLabel
              value="medium"
              control={<CustomRadio />}
              label="Moderadamente ativo (exercício moderado 3 a 5 vezes por semana)"
            />
            <FormControlLabel
              value="medium-high"
              control={<CustomRadio />}
              label="Bastante ativo (exercício pesado de 5 a 6 vezes por semana)"
            />
            <FormControlLabel
              value="high"
              control={<CustomRadio />}
              label="Extremamente ativo (exercício pesado diariamente ou até 2 vezes por dia)"
            />
          </RadioGroup>
        </Box>
        <Typography sx={{ mb: 1 }} variant="subtitle1" component="h2">
          Morada (opcional)
        </Typography>
        <Box sx={styles.addressWrapper}>
          <CustomTextField
            sx={styles.input}
            onChange={onChangeForm}
            label="Cidade"
            placeholder="Cidade"
            variant="outlined"
            name="city"
            value={form.city}
          ></CustomTextField>
          <CustomTextField
            sx={styles.input}
            onChange={onChangeForm}
            label="Rua"
            placeholder="Rua"
            variant="outlined"
            name="street"
            value={form?.street}
          ></CustomTextField>
          <CustomTextField
            sx={styles.input}
            onChange={onChangeForm}
            label="Código-postal"
            placeholder="Código-postal"
            variant="outlined"
            name="zipCode"
            value={form?.zipCode}
          ></CustomTextField>
        </Box>
        <SubmitButton
          sx={styles.submitbutton}
          disabled={!isFormValid()}
          onClick={onSubmit}
        >
          submeter
        </SubmitButton>
      </Box>
    </Box>
  );
};
export default PersonalInformationForm;
