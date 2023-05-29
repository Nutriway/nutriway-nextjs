import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../../providers/useAuth";
import { styles } from "./styles";
import BackButton from "../../atoms/BackButton";
import RecipeDetails from "../../molecules/RecipeDetails";
import RecipeCard from "../../molecules/RecipeCard";
import {
  DietPlanAttributes,
  getWeekDay,
  Plan,
  planKeys,
} from "../../../util/dietPlans";
import { Recipe } from "../../../util/recipes";

type ViewDietPlanDayHorizontalProps = {
  dietPlan?: DietPlanAttributes;
  weekDay: string;
};

function ViewDietPlanDayHorizontal({
  dietPlan,
  weekDay,
}: ViewDietPlanDayHorizontalProps) {
  const { user } = useAuth();
  const [meals, setMeals] = useState<Recipe[]>([]);

  const fetchMeals = useCallback(async () => {
    const meals = (dietPlan?.plan as Plan)[weekDay as keyof planKeys];

    if (meals) setMeals(meals);
  }, [dietPlan?.plan, weekDay]);

  useEffect(() => {
    if (user && (dietPlan?.plan as Plan)[weekDay as keyof planKeys]) {
      fetchMeals();
    }
  }, [user, dietPlan, fetchMeals, weekDay]);

  const [details, setDetails] = useState(null);

  const viewDetails = (recipe: any) => {
    setDetails(recipe);
  };
  const hideDetails = () => setDetails(null);

  type MealContainerProps = { recipe: Recipe };

  const MealContainer = ({ recipe }: MealContainerProps) => {
    return (
      <Box sx={styles.mealContainer}>
        <Typography
          variant="body1"
          sx={{ mb: 1, ml: 1, fontWeight: "bold", fontSize: "16px" }}
        >
          {recipe.attributes.TypeOfmealOnPlan}
        </Typography>

        <RecipeCard recipe={recipe} setDetails={viewDetails} />
      </Box>
    );
  };

  const ShowDetails = () => {
    return (
      <Box>
        <BackButton onClick={hideDetails}>Voltar</BackButton>
        {details && <RecipeDetails recipe={details} />}
      </Box>
    );
  };

  const getTotalCalories = () => {
    if (meals.length) {
      return Math.round(
        meals
          .map((m: Recipe) => {
            if (m?.attributes?.nutritional_values?.["energy"]?.portion)
              return parseInt(
                m?.attributes?.nutritional_values?.["energy"]?.portion?.split(
                  " "
                )[0]
              );
            return 0;
          })
          .reduce((a: number, b: number) => a + b)
      );
    }

    return 0;
  };

  const getTotalProtein = () => {
    if (meals.length) {
      return Math.round(
        meals
          .map((m: Recipe) => {
            if (m?.attributes?.nutritional_values?.["protein"]?.portion)
              return parseInt(
                m?.attributes?.nutritional_values?.["protein"]?.portion?.split(
                  " "
                )[0]
              );
            return 0;
          })
          .reduce((a: number, b: number) => a + b)
      );
    }

    return 0;
  };

  const getTotalFat = () => {
    if (meals.length) {
      return Math.round(
        meals
          .map((m: Recipe) => {
            if (m?.attributes?.nutritional_values?.["fat"]?.portion)
              return parseInt(
                m?.attributes?.nutritional_values?.["fat"]?.portion?.split(
                  " "
                )[0]
              );
            return 0;
          })
          .reduce((a: number, b: number) => a + b)
      );
    }

    return 0;
  };

  const getTotalCarbs = () => {
    if (meals.length) {
      return Math.round(
        meals
          .map((m: Recipe) => {
            if (m?.attributes?.nutritional_values?.["carbohydrate"]?.portion)
              return parseInt(
                m?.attributes?.nutritional_values?.[
                  "carbohydrate"
                ]?.portion?.split(" ")[0]
              );
            return 0;
          })
          .reduce((a: number, b: number) => a + b)
      );
    }

    return 0;
  };

  return (
    <Box>
      <Box sx={styles.wrapper}>
        <Box sx={styles.header}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            {getWeekDay(weekDay)}
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mr: 3 }}
            >
              {`${getTotalCalories()} kcal`}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mr: 3 }}
            >
              {`${getTotalCarbs()}g carboidratos`}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mr: 3 }}
            >
              {`${getTotalProtein()}g proteína`}
            </Typography>

            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mr: 0 }}
            >
              {`${getTotalFat()}g gordura`}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={styles.mealsWrapper}>
            {meals.map((r: Recipe, index: number) => (
              <MealContainer key={index + "meal"} recipe={r} />
            ))}
          </Box>
          {details !== null && <ShowDetails></ShowDetails>}
        </Box>
      </Box>
    </Box>
  );
}

export default ViewDietPlanDayHorizontal;
