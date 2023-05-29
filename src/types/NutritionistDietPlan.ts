import { Nutritionist } from './Nutritionist';
import { NutritionistRecipe } from './NutritionistRecipe';

export type NutritionistDietPlan = {
    id: number;
    attributes: {
        name: string;
        nutritionist_recipes: { data: NutritionistRecipe };
        nutritionist: { data: Nutritionist };
        plan: object;
        goal: string;
        imageUrl: string;
        observations: string;
    };
};
