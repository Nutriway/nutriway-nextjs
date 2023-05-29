import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { styles } from "./styles";
import "react-toastify/dist/ReactToastify.css";
import { getAppointmentById } from "../../../api/appointment";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../providers/useAuth";
import { AppointmentType } from "../NutritionistAppointments";
import { Recipe } from "../../../util/recipes";
import {
  getNutritionistRecipesByNutritionistId,
  getApiRecipes,
} from "../../../api/recipe";
import { getNutritionistDietPlanByDietPlanId } from "../../../api/dietPlan";
import NutritionistCreateDietPlan from "../../../components/organisms/NutritionistCreateDietPlan";
import { DietPlan } from "../../../util/dietPlans";
import NavigationBar from "../../../components/organisms/NavigationBar";

function NutritionistCreateDietPlanPage() {
  const { user } = useAuth();
  const [searchparams] = useSearchParams();

  const [recipes, setRecipes] = useState<Recipe[]>();
  const [appointment, setAppointment] = useState<AppointmentType>();
  const [dietPlan, setDietPlan] = useState<DietPlan>({
    id: -1,
    attributes: { goal: "", plan: {}, name: "", observations: "" },
  });

  const fetchData = useCallback(async () => {
    const id = searchparams.get("appointment");
    if (id !== null) {
      const { data } = await getAppointmentById(id, user!.jwt);
      if (data) {
        const dietPlan =
          data[0]?.attributes?.appointment_result?.data?.attributes
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
        setAppointment(data[0]);
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

    if (user) {
      try {
        const nutritionistRecipes =
          await getNutritionistRecipesByNutritionistId(
            user!.id.toString(),
            user!.jwt
          );
        const apiRecipes = await getApiRecipes(user!.jwt);

        if (nutritionistRecipes && apiRecipes) {
          setRecipes([...nutritionistRecipes.data, ...apiRecipes.data]);
        }
      } catch (error) {}
    }
  }, [searchparams, user]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  return (
    <Box sx={styles.pageWrapper}>
      <NavigationBar />
      <Box sx={{ width: "100%", padding: "25px 0" }}>
        <NutritionistCreateDietPlan
          appointment={appointment}
          dietPlan={dietPlan}
          onDietPlanChange={(dietPlan) => setDietPlan(dietPlan)}
          recipes={recipes}
        />
      </Box>
    </Box>
  );
}

export default NutritionistCreateDietPlanPage;
