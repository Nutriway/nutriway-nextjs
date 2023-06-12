import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { SingleStrapiResponse } from '@/types/StrapiResponse';
import { Appointment } from '@/types/Appointment';
import React from 'react';
import NotFound from '@/components/Errors/404';
import DietPlanInfo from '@/oldVersion/components/organisms/DietPlanInfo';
import { NutritionalSummaryItem } from '@/oldVersion/util/recipes';
import { NutritionalValues } from '@/oldVersion/util/recipes';
import { RecipeIngredients } from '@/oldVersion/util/recipes';
import { NutritionistType } from '@/oldVersion/pages/client/ClientScheduleAppointment';

export type DietPlan = {
    id: number;
    attributes: DietPlanAttributes;
};

export type DietPlanAttributes = {
    plan: Plan | {};
    name: string;
    goal: string;
    observations: string;
};

export type Plan = {
    segunda: Recipe[];
    terça: Recipe[];
    quarta: Recipe[];
    quinta: Recipe[];
    sexta: Recipe[];
    sábado: Recipe[];
    domingo: Recipe[];
};

export type PlanDay = {
    weekday: Recipe[];
};

export interface planKeys {
    segunda: string;
    terça: string;
    quarta: string;
    quinta: string;
    sexta: string;
    sábado: string;
    domingo: string;
}

export type PlanSources = {
    genericPlans: boolean;
    appointmentPlans: boolean;
};

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

type DietPlanDetailsParams = {
    params: { id: string };
};

async function getInfo(id: string) {
    console.log('ENTER here');

    return serverFetcher<SingleStrapiResponse<DietPlan>>({
        url: `/nutritionist-diet-plans?populate=*&filters[id][$eq]=${id}`,
        method: 'get',
    });
}

export default async function DietPlanDetails({ params }: DietPlanDetailsParams) {
    const info = await getInfo(params.id);
    console.log('ENTER info', info);

    if (!info?.data) {
        return <NotFound />;
    }

    return <DietPlanInfo dietPlan={info.data} />;
}
