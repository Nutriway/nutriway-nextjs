import React, { useState } from "react";
import { Box, Modal, IconButton } from "@mui/material";
import { styles } from "./styles";
import RecipesList from "../RecipesList";
import { Recipe } from "../../../util/recipes";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MealTypeButton from "../../atoms/MealTypeButton";
import { QueuedMeal } from "../NutritionistCreateDietPlanDay";

type RecipeSelectorProps = {
  onSelectRecipe: (recipe: Recipe, index: number) => void;
  queueMeal(meal: QueuedMeal | undefined): void;
  queuedMeal?: QueuedMeal;
  recipes: Recipe[] | undefined;
  index: number;
  changeMainCourses(value: number): void;
  mainCourses: number;
};

const RecipeSelector = ({
  onSelectRecipe,
  queueMeal,
  queuedMeal,
  recipes,
  index,
  mainCourses,
  changeMainCourses,
}: RecipeSelectorProps) => {
  const [meal, setMeal] = useState("");
  const [mealSelectorVisible, setMealSelectorVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSelectedRecipe = (recipe: Recipe) => {
    if (
      recipe.attributes.servings > 1 &&
      recipe.attributes.meal_type.includes("Prato Principal")
    ) {
      queueMeal({
        meal: recipe,
        unusedServings: recipe.attributes.servings - 1,
        total: recipe.attributes.servings,
      });
    }

    if (recipe.attributes.meal_type.includes("Prato Principal"))
      changeMainCourses(1);

    const newRecipe = {
      ...recipe,
      attributes: { ...recipe.attributes, TypeOfmealOnPlan: meal },
    };
    onSelectRecipe(newRecipe, index);

    setMeal("");
    setMealSelectorVisible(false);
    handleCloseModal();
  };

  const handleChange = (value: string) => {
    setMeal(value);

    if (queuedMeal && queuedMeal.unusedServings > 0) {
      const newMeal = {
        ...queuedMeal.meal,
        attributes: { ...queuedMeal.meal.attributes, TypeOfmealOnPlan: value },
      };

      onSelectRecipe(newMeal, index);

      if (queuedMeal.unusedServings === 1) {
        queueMeal(undefined);
      } else {
        queueMeal({
          ...queuedMeal,
          meal: queuedMeal.meal,
          unusedServings: queuedMeal.unusedServings - 1,
        });
      }
      setMeal("");
      setMealSelectorVisible(false);
    } else {
      handleOpenModal();
    }
  };

  const RecipesModal = () => {
    return (
      <Box>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles.modal}>
            <Box sx={styles.modalHeader}></Box>
            <Box sx={styles.recipesWrapper}>
              <Box>
                {recipes && (
                  <RecipesList
                    mainCourses={mainCourses}
                    recipes={recipes}
                    handleSelectedRecipe={handleSelectedRecipe}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  };

  return (
    <Box>
      <Box>
        <RecipesModal />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {mealSelectorVisible && (
            <MealTypeButton
              variant="text"
              size="small"
              onClick={() => handleChange("Pequeno-almoço")}
            >
              Pequeno-almoço
            </MealTypeButton>
          )}
          <Box>
            {mealSelectorVisible && (
              <MealTypeButton
                variant="text"
                size="small"
                onClick={() => handleChange("Outro")}
              >
                Outro
              </MealTypeButton>
            )}
            <IconButton
              sx={styles.addMealButton}
              onClick={() => setMealSelectorVisible(!mealSelectorVisible)}
              disabled={!recipes}
              aria-label="add"
              size="large"
            >
              {!mealSelectorVisible && <AddIcon />}
              {mealSelectorVisible && <RemoveIcon />}
            </IconButton>
            {mealSelectorVisible && (
              <MealTypeButton
                variant="text"
                size="small"
                onClick={() => handleChange("Snack")}
              >
                Snack
              </MealTypeButton>
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {mealSelectorVisible && (
              <MealTypeButton
                variant="text"
                size="small"
                onClick={() => handleChange("Almoço")}
              >
                Almoço
              </MealTypeButton>
            )}
            {mealSelectorVisible && (
              <MealTypeButton
                variant="text"
                size="small"
                onClick={() => handleChange("Jantar")}
              >
                Jantar
              </MealTypeButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RecipeSelector;
