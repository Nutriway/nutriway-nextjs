import {
  Box,
  FormControlLabel,
  InputAdornment,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../../providers/useAuth";
import CustomRadio from "../../atoms/CustomRadio";
import CustomTextField from "../../atoms/CustomTextField";
import { PersonalInformationFormType } from "../../organisms/PersonalInformationForm";
import { styles } from "./styles";

type MedicalStepProps = {
  onChangeMedicalCondition: (condition: string) => void;
  onChangePersonalInformation(
    personalInformation: PersonalInformationFormType
  ): void;
  onChangeAppointmentGoal(newGoal: string): void;
  isUserMetabolicRated: boolean;
  appointmentGoal: string;
};

const MedicalStep = ({
  onChangeMedicalCondition,
  onChangePersonalInformation,
  onChangeAppointmentGoal,
  appointmentGoal,
  isUserMetabolicRated,
}: MedicalStepProps) => {
  const { user } = useAuth();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [condition, setCondition] = useState<string>("");

  const [form, setForm] = useState<PersonalInformationFormType>({
    gender: user?.gender ?? "",
    weight: user?.weight ?? "",
    height: user?.height ?? "",
    age: user?.age ?? "",
    activity: user?.activity ?? "",
    city: user?.city ?? "",
    street: user?.street ?? "",
    zipCode: user?.zipCode ?? "",
    phoneNumber: user?.phoneNumber ?? "",
  });

  const onChangePersonalInformations = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = e.target;

    setForm({ ...form, [name]: value });
    onChangePersonalInformation({ ...form, [name]: value });
  };

  const handleMedicalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChangeMedicalCondition(value);
    setCondition(value);
  };

  const handleGoalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChangeAppointmentGoal(value);
  };

  return (
    <Box sx={styles.pageWrapper}>
      <Box>
        <Typography variant="h6" component="h2" sx={{ mt: 0, mb: 3 }}>
          Informações pessoais
        </Typography>

        <Typography sx={{ mt: 2, mb: 1 }}>
          Qual é o objetivo da consulta?
        </Typography>
        <CustomTextField
          sx={styles.appointmentGoalInput}
          id="outlined-multiline-static"
          label="Objetivo"
          value={appointmentGoal}
          onChange={handleGoalInputChange}
          variant="outlined"
          rows={2}
          multiline
        />

        <Typography sx={{ mt: 2, mb: 1 }}>
          Possui alguma condição ou restrição médica? Se sim, preencha-a abaixo.
        </Typography>

        <CustomTextField
          sx={styles.medicalConditionInput}
          id="outlined-multiline-static"
          label="Condições / Restrições"
          value={condition}
          onChange={handleMedicalInputChange}
          variant="outlined"
          rows={2}
          multiline
        />

        <>
          <Box>
            <Typography sx={{ mb: 0 }} variant="subtitle1" component="h2">
              Género
            </Typography>
            <RadioGroup
              sx={{ mb: 3 }}
              aria-labelledby="gender-radio-buttons-group"
              name="gender-radio-buttons-group"
              value={form.gender}
              onChange={onChangePersonalInformations}
            >
              <FormControlLabel
                name="gender"
                value="male"
                control={<CustomRadio />}
                label="Masculino"
              />
              <FormControlLabel
                name="gender"
                value="female"
                control={<CustomRadio />}
                label="Feminino"
              />
            </RadioGroup>

            <Box sx={styles.nutritionalInputs}>
              <CustomTextField
                sx={styles.input}
                onChange={onChangePersonalInformations}
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
                onChange={onChangePersonalInformations}
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
                onChange={onChangePersonalInformations}
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
              aria-labelledby="activity-radio-buttons-group"
              name="activity-radio-buttons-group"
              value={form.activity}
              onChange={onChangePersonalInformations}
            >
              <FormControlLabel
                name="activity"
                value="low"
                control={<CustomRadio />}
                label="Sedentário (pouco ou nenhum exercício) "
              />
              <FormControlLabel
                name="activity"
                value="medium-low"
                control={<CustomRadio />}
                label="Levemente ativo (exercício leve 1 a 3 vezes por semana)"
              />
              <FormControlLabel
                name="activity"
                value="medium"
                control={<CustomRadio />}
                label="Moderadamente ativo (exercício moderado 3 a 5 vezes por semana)"
              />
              <FormControlLabel
                name="activity"
                value="medium-high"
                control={<CustomRadio />}
                label="Bastante ativo (exercício pesado de 5 a 6 vezes por semana)"
              />
              <FormControlLabel
                name="activity"
                value="high"
                control={<CustomRadio />}
                label="Extremamente ativo (exercício pesado diariamente ou até 2 vezes por dia)"
              />
            </RadioGroup>
          </Box>

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
              value={form.phoneNumber}
              onChange={onChangePersonalInformations}
              variant="outlined"
              type="number"
              required={true}
            />
          </Box>
        </>
      </Box>
    </Box>
  );
};

export default MedicalStep;
