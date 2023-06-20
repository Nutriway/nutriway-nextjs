import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { SingleStrapiResponse } from '@/types/StrapiResponse';
import React from 'react';
import NotFound from '@/components/Errors/404';
import { NutritionalSummaryItem } from '@/oldVersion/util/recipes';
import { NutritionalValues } from '@/oldVersion/util/recipes';
import { RecipeIngredients } from '@/oldVersion/util/recipes';
import { NutritionistType } from '@/oldVersion/pages/client/ClientScheduleAppointment';
import UserRecipeDetails from '@/oldVersion/pages/user/UserRecipeDetails';

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

type RecipeDetailsParams = {
    params: { id: string };
    searchParams: { nutritionist: string };
};

async function getInfo(id: string, nutritionist: string) {
    if (nutritionist === 'false') {
        return serverFetcher<SingleStrapiResponse<Recipe>>({
            url: `/api-recipes/${id}`,
            method: 'get',
        });
    }

    return serverFetcher<SingleStrapiResponse<Recipe>>({
        url: `/nutritionist-recipes/${id}`,
        method: 'get',
    });
}

export default async function RecipeDetails({ params, searchParams }: RecipeDetailsParams) {
    console.log('entrei');
    console.log(searchParams);

    const info = await getInfo(params.id, searchParams.nutritionist);
    console.log('receita -> ', info?.data);

    if (!info?.data) {
        return <NotFound />;
    }

    return <UserRecipeDetails recipe={info.data} />;
}
