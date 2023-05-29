import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../providers/useAuth";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styles } from "./styles";
import { useSearchParams } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import { AppointmentType } from "../../../pages/nutritionist/NutritionistAppointments";
import { getNutritionistDietPlanByDietPlanId } from "../../../api/dietPlan";
import ViewDietPlanHorizontal from "../ViewDietPlanHorizontal";
import { DietPlan } from "../../../util/dietPlans";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewDietPlanVertical from "../ViewDietPlanVertical";
import CustomTextField from "../../atoms/CustomTextField";

type DietPlanInfoProps = {
  appointment?: AppointmentType;
};

const DietPlanInfo = ({ appointment }: DietPlanInfoProps) => {
  const { user } = useAuth();
  const [searchparams] = useSearchParams();
  const [display, setDisplay] = React.useState("horizontal");

  const [dietPlan, setDietPlan] = useState<DietPlan>(
    appointment?.attributes?.appointment_result?.data?.attributes
      ?.nutritionist_diet_plan?.data ?? {
      id: -1,
      attributes: {
        name: "",
        goal: "",
        observations: "",
        plan: {},
      },
    }
  );

  const fetchData = useCallback(async () => {
    if (appointment) {
      const dietPlan =
        appointment?.attributes?.appointment_result?.data?.attributes
          ?.nutritionist_diet_plan?.data;

      if (dietPlan !== null) {
        setDietPlan({
          id: dietPlan.id,
          attributes: {
            name: dietPlan.attributes.name,
            plan: dietPlan.attributes.plan,
            goal: dietPlan.attributes.goal,
            observations: dietPlan.attributes.observations,
          },
        });
      }
    }

    const planId = searchparams.get("dietPlan");
    if (planId !== null) {
      const { data } = await getNutritionistDietPlanByDietPlanId(
        planId,
        user!.jwt
      );
      if (data[0]) {
        setDietPlan({
          id: data[0].id,
          attributes: {
            name: data[0].attributes.name,
            plan: data[0].attributes.plan,
            goal: data[0].attributes.goal,
            observations: data[0].attributes.observations,
          },
        });
      }
    }
  }, [searchparams, appointment, user]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newDisplay: string
  ) => {
    setDisplay(newDisplay);
  };

  return (
    <Box>
      {!appointment && <NavigationBar />}
      <Box sx={styles.pageWrapper}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <CustomTextField
              sx={{ width: "350px" }}
              label="Observações"
              placeholder="Observações"
              variant="outlined"
              name="observations"
              multiline
              minRows={2}
              value={dietPlan?.attributes?.observations}
              disabled
            />

            <CustomTextField
              sx={{
                ml: 3,
                mr: 3,
                width: "fit-content",
                alignSelf: "start",
              }}
              label="Nome do plano"
              placeholder="Nome do plano"
              variant="outlined"
              name="name"
              value={dietPlan?.attributes?.name}
              disabled
            />

            <CustomTextField
              sx={{
                mr: 3,
                width: "fit-content",
                alignSelf: "start",
              }}
              label="Objetivo"
              placeholder="objetivo do plano"
              variant="outlined"
              name="goal"
              value={dietPlan?.attributes?.goal}
              disabled
            />

            <CustomTextField
              sx={{
                width: "fit-content",
                alignSelf: "start",
              }}
              label="Duração do plano (semanas)"
              placeholder="Duração do plano (semanas)"
              variant="outlined"
              name="duration"
              value={
                appointment?.attributes?.appointment_result?.data?.attributes
                  ?.planDurationDays
              }
              disabled
            />
          </Box>
        </Box>
        <ToggleButtonGroup
          sx={styles.toogleGroup}
          value={display}
          exclusive
          onChange={handleChange}
          aria-label="display"
        >
          <ToggleButton value="horizontal">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="vertical">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        {dietPlan && (
          <Box sx={styles.plansWrapper}>
            {display === "vertical" ? (
              <ViewDietPlanVertical dietPlan={dietPlan} />
            ) : (
              <ViewDietPlanHorizontal dietPlan={dietPlan} />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DietPlanInfo;
