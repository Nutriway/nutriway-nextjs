import { NutritionistRecipe } from './NutritionistRecipe';

export type NutritionistRecipeIngredient = {
    name: string;
    quantity: number;
    is_condiment: boolean;
    quantity_metric: string;
    nutritionist_recipe: NutritionistRecipe;
};
