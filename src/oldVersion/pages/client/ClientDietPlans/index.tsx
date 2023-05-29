import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getClientAppointmentsWithPlan } from "../../../api/appointment";
import DietPlanInfo from "../../../components/organisms/DietPlanInfo";
import NavigationBar from "../../../components/organisms/NavigationBar";
import { useAuth } from "../../../providers/useAuth";
import { isPlanFinished } from "../../../util/dietPlans";
import { AppointmentType } from "../../nutritionist/NutritionistAppointments";

const ClientDietPlans = () => {
  const { user } = useAuth();

  const [appointment, setAppointment] = useState<AppointmentType>();

  const fetchData = useCallback(async () => {
    const { data } = await getClientAppointmentsWithPlan(user!.id, user!.jwt);

    const orderedAppointments = data.sort((a: any, b: any) => {
      return a.attributes.nutritionist_availability.data.attributes.date >
        b.attributes.nutritionist_availability.data.attributes.date
        ? -1
        : a.attributes.nutritionist_availability.data.attributes.date <
          b.attributes.nutritionist_availability.data.attributes.date
        ? 1
        : 0;
    });

    setAppointment(orderedAppointments[0]);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  return (
    <Box>
      <NavigationBar />

      {appointment && (
        <Box>
          {isPlanFinished(
            appointment.attributes?.appointment_result?.data?.attributes
              ?.nutritionist_diet_plan?.data?.attributes
          ) ? (
            <DietPlanInfo appointment={appointment} />
          ) : (
            <Typography sx={{ textAlign: "center", mt: 4 }} variant="h6">
              Não existe nenhum plano ativo
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
export default ClientDietPlans;
