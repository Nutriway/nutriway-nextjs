import { Box, Divider, IconButton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState, memo } from "react";
import { useAuth } from "../../../providers/useAuth";
import { getWeekDay } from "../../../util/dietPlans";
import DeleteIcon from "@mui/icons-material/Delete";
import { Recipe } from "../../../util/recipes";
import PlanRecipeCard from "../../molecules/PlanRecipeCard";
import RecipeSelector from "../RecipeSelector";
import { styles } from "./styles";

export type QueuedMeal = {
  meal: Recipe;
  unusedServings: number;
  total: number;
};

type NutritionistCreateDietPlanDayProps = {
  dietPlan?: any;
  weekDay: string;
  queuedMeal: QueuedMeal | undefined;
  recipes: Recipe[] | undefined;
  onDaySubmission(plan: any): void;
  queueMeal(meal: QueuedMeal | undefined): void;
  changeMainCourses(value: number): void;
  mainCourses: number;
};

function NutritionistCreateDietPlanDay({
  dietPlan,
  weekDay,
  queuedMeal,
  recipes,
  mainCourses,
  onDaySubmission,
  queueMeal,
  changeMainCourses,
}: NutritionistCreateDietPlanDayProps) {
  const { user } = useAuth();
  const [meals, setMeals] = useState<any>([]);

  const fetchMeals = useCallback(async () => {
    const meals = dietPlan?.plan[weekDay];

    if (meals) {
      setMeals(meals);
    }
  }, [dietPlan?.plan, weekDay]);

  useEffect(() => {
    if (user && dietPlan?.plan[weekDay]) {
      fetchMeals();
    }
  }, [user, dietPlan, fetchMeals, weekDay]);

  const handleNewMeal = (newMeal: Recipe, index: number) => {
    const newMeals = [...meals];
    newMeals.splice(index, 0, newMeal);

    if (newMeal) {
      onDaySubmission({
        [weekDay]: newMeals,
      });
    }
  };

  const deleteMeal = (recipe: Recipe, recipeIndex: number) => {
    const newMeals = meals.filter(
      (m: any, index: number) => index !== recipeIndex
    );

    onDaySubmission({
      [weekDay]: [...newMeals],
    });

    if (!queuedMeal) {
      if (
        recipe.attributes.servings > 1 &&
        recipe.attributes.meal_type.includes("Prato Principal")
      ) {
        queueMeal({
          meal: recipe,
          unusedServings: 1,
          total: recipe.attributes.servings,
        });
      }
    }

    if (
      queuedMeal &&
      queuedMeal.unusedServings + 1 === queuedMeal.meal.attributes.servings
    ) {
      queueMeal(undefined);
      if (recipe.attributes.meal_type.includes("Prato Principal"))
        changeMainCourses(-1);
    } else if (queuedMeal) {
      queueMeal({
        ...queuedMeal,
        meal: queuedMeal.meal,
        unusedServings: queuedMeal.unusedServings + 1,
      });
    }
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
            return null;
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
            return null;
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
            if (m?.attributes.nutritional_values["fat"]?.portion)
              return parseInt(
                m?.attributes?.nutritional_values?.["fat"]?.portion?.split(
                  " "
                )[0]
              );
            return null;
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
                m?.attributes.nutritional_values?.[
                  "carbohydrate"
                ]?.portion?.split(" ")[0]
              );
            return null;
          })
          .reduce((a: number, b: number) => a + b)
      );
    }

    return 0;
  };

  /*  const onSubmit = async () => {
    const mealsIds = meals.map((r: any) => r.id);
    onDaySubmission({
      [weekDay]: mealsIds,
    });
  }; */

  const MealContainer = ({ recipe, recipeIndex }: any) => {
    const ableToDelete = () => {
      if (queuedMeal) {
        return queuedMeal.meal.attributes.title !== recipe.attributes.title;
      } else {
        return false;
      }
    };

    return (
      <Box
        sx={ableToDelete() ? styles.fadedMealContainer : styles.mealContainer}
      >
        <Typography
          variant="subtitle2"
          sx={{ mb: 0.8, ml: 1, fontWeight: "bold" }}
        >
          {recipe.attributes.TypeOfmealOnPlan}
        </Typography>

        <PlanRecipeCard recipe={recipe} />

        <IconButton
          sx={styles.deleteButton}
          aria-label="delete"
          onClick={() => deleteMeal(recipe, recipeIndex)}
          size="small"
          disabled={ableToDelete()}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={styles.wrapper}>
        <Box sx={styles.header}>
          <Typography
            id="modal-modal-title"
            variant="subtitle1"
            component="h2"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            {getWeekDay(weekDay)}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
            <Typography
              id="modal-modal-title"
              variant="subtitle2"
              component="h2"
              sx={{ mr: 2 }}
            >
              {`${getTotalCalories()} kcal`}
            </Typography>

            <Typography
              id="modal-modal-title"
              variant="subtitle2"
              component="h2"
              sx={{ mr: 2 }}
            >
              {`${getTotalProtein()}g proteína`}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="subtitle2"
              component="h2"
              sx={{ mr: 2 }}
            >
              {`${getTotalCarbs()}g carboidratos`}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="subtitle2"
              component="h2"
              sx={{ mr: 0 }}
            >
              {`${getTotalFat()}g gordura`}
            </Typography>
          </Box>

          <Divider />
        </Box>

        <Box>
          <Box sx={{ mt: 1, mb: 1, display: "flex", justifyContent: "center" }}>
            {
              <RecipeSelector
                key={weekDay + "selector"}
                index={0}
                recipes={recipes}
                queueMeal={queueMeal}
                changeMainCourses={changeMainCourses}
                queuedMeal={queuedMeal}
                onSelectRecipe={handleNewMeal}
                mainCourses={mainCourses}
              />
            }
          </Box>

          {meals.map((r: Recipe, index: number) => (
            <Box
              sx={styles.mealsWrapper}
              key={"mealsWrapper" + weekDay + index}
            >
              <MealContainer
                key={index + weekDay + r.id}
                recipe={r}
                recipeIndex={index}
              />

              <Box sx={{ mb: 1 }}>
                <RecipeSelector
                  key={"selector" + index + 1 + weekDay}
                  index={index + 1}
                  recipes={recipes}
                  changeMainCourses={changeMainCourses}
                  queueMeal={queueMeal}
                  queuedMeal={queuedMeal}
                  onSelectRecipe={handleNewMeal}
                  mainCourses={mainCourses}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default memo(NutritionistCreateDietPlanDay);
