import { NutritionistType } from "../../pages/client/ClientScheduleAppointment";

export type Recipe = {
  id: number;
  attributes: {
    title: string;
    image: string;
    valid: boolean;
    servings: number;
    diets: string[];
    cookInstructions: { step: number; description: string }[];
    nutritional_summary: NutritionalSummaryItem[];
    nutritional_values: NutritionalValues;
    meal_type: string[];
    difficulty: string;
    preparationTime: string;

    TypeOfmealOnPlan?: string;
    nutritionist?: NutritionistType;
    nutritionist_recipe_ingredients?: RecipeIngredients;
    api_recipe_ingredients?: RecipeIngredients;
  };
};

export type RecipeIngredients = {
  data: Ingredient[];
};

export type Ingredient = {
  id: number;
  attributes: {
    is_condiment: boolean;
    name: string;
    quantity: number;
    quantity_metric: string;
  };
};

export type NutritionalValues = {
  energy: NutritionalValue;
  carbohydrate: NutritionalValue;
  protein: NutritionalValue;
  fat: NutritionalValue;
};

export type NutritionalValue = {
  portion: string;
  percentage: string;
};

export type NutritionalSummaryItem = {
  label: string;
  value: string;
  percentage: string;
};

export type RecipeSources = {
  nutritionistRecipes: boolean;
  suggestedRecipes: boolean;
};

export type MealTypes = {
  breakfast: boolean;
  mainCourse: boolean;
  others: boolean;
  snack: boolean;
  entreesAndAccompaniments: boolean;
  drinks: boolean;
  soup: boolean;
};

export type Diets = {
  vegetarian: boolean;
  vegan: boolean;
  dairyFree: boolean;
  glutenFree: boolean;
};

export type Nutrients = {
  energy: nutrient;
  carbohydrate: nutrient;
  protein: nutrient;
  fat: nutrient;
};

export type nutrient = {
  min: number;
  max: number;
};

export const filterRecipes = (
  recipes: Recipe[],
  recipeSources: RecipeSources,
  mealTypes: MealTypes,
  diets: Diets,
  searchInput: string,
  nutrients: Nutrients | undefined
) => {
  let filteredRecipes = [...recipes];

  filteredRecipes = filterByRecipeSources(filteredRecipes, recipeSources);
  filteredRecipes = filterByMealTypes(filteredRecipes, mealTypes);
  filteredRecipes = filterByDiets(filteredRecipes, diets);
  filteredRecipes = filterBySearchInput(filteredRecipes, searchInput);
  filteredRecipes = filterByNutrients(filteredRecipes, nutrients);

  return filteredRecipes;
};

export const filterByRecipeSources = (
  recipes: Recipe[],
  recipeSources: RecipeSources
) => {
  if (recipeSources.nutritionistRecipes || recipeSources.suggestedRecipes) {
    recipes = recipes.filter((r: Recipe) => {
      let show = false;
      if (recipeSources.nutritionistRecipes && r?.attributes.nutritionist) {
        show = true;
      }
      if (recipeSources.suggestedRecipes && !r?.attributes.nutritionist) {
        show = true;
      }
      return show;
    });
  }

  return recipes;
};

const pingodoceToMealTypes = (pdMeals: string[]): string[] => {
  const pdToOurs = {
    Bebidas: ["drinks"],
    Sobremesa: ["others"],
    Crianças: ["mainCourse", "snack"],
    "Pequeno-almoço e lanches": ["breakfast"],
    "Prato Principal": ["mainCourse"],
    Entradas: ["entreesAndAccompaniments"],
    Petiscos: ["snack"],
    Acompanhamento: ["entreesAndAccompaniments"],
    Sopa: ["soup"],
  };

  return pdMeals.flatMap((pdMeal: string) => {
    return pdToOurs[pdMeal as keyof typeof pdToOurs];
  });
};

export const filterByMealTypes = (recipes: Recipe[], mealTypes: MealTypes) => {
  let activeMealTypes = Object.keys(mealTypes).filter(
    (mealType: string) => mealTypes[mealType as keyof MealTypes]
  );

  if (activeMealTypes.length) {
    recipes = recipes.filter((r: Recipe) => {
      const filterMealTypes = pingodoceToMealTypes(r.attributes.meal_type);
      return filterMealTypes.some((mt: string) => {
        return mealTypes[mt as keyof MealTypes];
      });
    });
  }

  return recipes;
};

export const filterByDiets = (recipes: Recipe[], diets: Diets) => {
  if (diets.vegan || diets.vegetarian || diets.dairyFree || diets.glutenFree) {
    recipes = recipes.filter((r: Recipe) => {
      return (
        (diets.vegan && r.attributes.diets.includes("Vegan")) ||
        (diets.vegetarian && r.attributes.diets.includes("Vegetariana")) ||
        (diets.dairyFree && r.attributes.diets.includes("Sem leite")) ||
        (diets.glutenFree && r.attributes.diets.includes("Sem glúten"))
      );
    });
  }

  return recipes;
};

export const filterBySearchInput = (recipes: Recipe[], searchInput: string) => {
  const keyword = searchInput.trim().toLocaleLowerCase();
  if (keyword) {
    recipes = recipes.filter((r: Recipe) => {
      return r.attributes.title.toLowerCase().includes(keyword);
    });
  }

  return recipes;
};

export const filterByNutrients = (
  recipes: Recipe[],
  nutrients: Nutrients | undefined
) => {
  if (nutrients) {
    Object.keys(nutrients).forEach((nutrient: string) => {
      recipes = recipes.filter((r: Recipe) => {
        const foundRecipeNutrient: NutritionalValue =
          r?.attributes?.nutritional_values[
            nutrient as keyof NutritionalValues
          ];

        if (
          parseInt(foundRecipeNutrient?.portion.split(" ")[0]) >=
            nutrients[nutrient as keyof Nutrients].min &&
          parseInt(foundRecipeNutrient?.portion.split(" ")[0]) <=
            nutrients[nutrient as keyof Nutrients].max
        ) {
          return r;
        } else {
          return null;
        }
      });
    });
  }

  return recipes;
};

export const getRecipeNutritionalValue = (
  recipe: Recipe,
  macronutrient: keyof NutritionalValues
) => {
  let nutrientValue = parseInt(
    recipe?.attributes?.nutritional_values?.[macronutrient]?.portion?.split(
      " "
    )[0]
  );

  return !isNaN(nutrientValue) ? Math.round(nutrientValue) : "?";
};

export const renderQuantityMetric = (metric: string) => {
  if (metric === "unit") return "unidade(s)";
  if (metric === "yourTaste") return "a gosto";
  if (metric === "clove") return "dente(s) de alho";
  if (metric === "teaspoon") return "colher(es) de chá";
  if (metric === "tablespoon") return "colher(es) de sopa";
  if (metric === "coffeespoon") return "colher(es) de café";
  return metric;
};

export const renderMealType = (mealTypes: string[]): string => {
  // as some meal types were introduced with the string for the mealtypes, this needs to be here, sadly
  // remove as soon as we are sure its safe aka -> server stops caching stuff
  if (typeof mealTypes === "string") {
    mealTypes = JSON.parse(mealTypes);
  }
  return mealTypes.join("\n");
};
