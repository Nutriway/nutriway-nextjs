import React, { useCallback, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { getNutritionistDietPlanByNutritionistId } from "../../../api/dietPlan";
import { useAuth } from "../../../providers/useAuth";
import { styles } from "./styles";
import PrimaryButton from "../../atoms/PrimaryButton";
import PlansList from "../PlansList";
import { getAppointmentResults } from "../../../api/appointment";
import { AppointmentResult } from "../../../util/appointments";
import { DietPlan } from "../../../util/dietPlans";

type PlanSelectorProps = {
  selectedPlanId: number;
  onPlanSelection(dietPlan: DietPlan): void;
};

const PlanSelector = ({
  selectedPlanId,
  onPlanSelection,
}: PlanSelectorProps) => {
  const { user } = useAuth();
  const [nutritionistDietPlans, setNutritionistDietPlans] = useState([]);
  const [appointmentPlans, setAppointmentPlans] = useState([]);

  const [open, setOpen] = useState(false);

  const fetchNutritionistDietPlans = useCallback(async () => {
    if (user) {
      const { data } = await getNutritionistDietPlanByNutritionistId(
        user.id.toString(),
        user!.jwt
      );

      const appointmentResultsWithDietPlan = await getAppointmentResults(
        user!.jwt
      );

      setNutritionistDietPlans(data.reverse());
      setAppointmentPlans(
        appointmentResultsWithDietPlan.data.map(
          (ap: AppointmentResult) =>
            ap?.attributes?.nutritionist_diet_plan?.data?.id
        )
      );
    }
  }, [user]);

  useEffect(() => {
    fetchNutritionistDietPlans();
  }, [fetchNutritionistDietPlans]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={styles.pageWrapper}>
      <PrimaryButton onClick={handleOpen}>
        Selecionar plano existente
      </PrimaryButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modal}>
          <Box sx={styles.listWrapper}>
            <PlansList
              selectedPlanId={selectedPlanId}
              plans={nutritionistDietPlans}
              appointmentPlans={appointmentPlans}
              onPlanSelection={(dietPlan: DietPlan) => {
                onPlanSelection(dietPlan);
                handleClose();
              }}
              plansAreDeletable={false}
              plansAreEditable={false}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default PlanSelector;
