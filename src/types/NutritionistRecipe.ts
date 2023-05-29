import { Nutritionist } from './Nutritionist';
import { NutritionistRecipeIngredient } from './NutritionistRecipeIngredient';

export type NutritionistRecipe = {
    id: string;
    attributes: {
        title: string;
        image: string;
        valid: boolean;
        servings: number;
        diets: object;
        cookInstructions: object;
        nutritional_summary: object;
        nutritional_values: object;
        difficulty: object;
        preparationTime: string;
        nutritionist_recipe_ingredients: NutritionistRecipeIngredient;
        nutritionist: { data: Nutritionist };
        meal_type: object;
    };
};
