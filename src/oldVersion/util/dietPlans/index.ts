import { StrapiResponse } from '@/types/StrapiResponse';
import { Recipe } from '../recipes';
import { NutritionistDietPlan } from '@/types/NutritionistDietPlan';

export const getWeekDay = (label: string): string => {
    switch (label.toLowerCase()) {
        case 'segunda':
            return 'Segunda-feira';
        case 'terça':
            return 'Terça-feira';
        case 'quarta':
            return 'Quarta-feira';
        case 'quinta':
            return 'Quinta-feira';
        case 'sexta':
            return 'Sexta-feira';
        case 'sábado':
            return 'Sábado';
        case 'domingo':
            return 'Domingo';
        default:
            return 'Dia';
    }
};

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

export const filterPlans = (
    plans: StrapiResponse<NutritionistDietPlan>,
    planSources: PlanSources,
    appointmentPlans: number[],
    searchInput: string,
) => {
    let filteredPlans = [...plans.data];

    filteredPlans = filterByPlanSources(filteredPlans, planSources, appointmentPlans);
    filteredPlans = filterBySearchInput(filteredPlans, searchInput);

    return filteredPlans;
};

export const filterByPlanSources = (
    plans: NutritionistDietPlan[],
    planSources: PlanSources,
    appointmentPlans: number[],
) => {
    if (planSources.genericPlans || planSources.appointmentPlans) {
        plans = plans.filter((d: DietPlan) => {
            let show = false;
            if (planSources.genericPlans && !appointmentPlans.includes(d?.id)) {
                show = true;
            }
            if (planSources.appointmentPlans && appointmentPlans.includes(d?.id)) {
                show = true;
            }
            return show;
        });
    }

    return plans;
};

export const filterBySearchInput = (plans: NutritionistDietPlan[], searchInput: string) => {
    const keyword = searchInput.trim().toLocaleLowerCase();
    if (keyword) {
        plans = plans.filter((d: DietPlan) => {
            return (
                d.attributes.name.toLowerCase().includes(keyword) || d.attributes.goal.toLowerCase().includes(keyword)
            );
        });
    }

    return plans;
};

export const isPlanFinished = (dietPlan: DietPlanAttributes | undefined): boolean => {
    let allDaysHaveMeals = false;
    const plan = dietPlan?.plan;

    if (plan) {
        const planLength = Object.keys(plan).length;
        if (planLength === 7) {
            for (let k in plan) {
                if (!(plan as Plan)[k as keyof planKeys].length) {
                    allDaysHaveMeals = false;
                    break;
                } else {
                    allDaysHaveMeals = true;
                }
            }
        }
    }

    return allDaysHaveMeals && !!dietPlan?.name && !!dietPlan?.goal;
};

export const getRandomImageUrl = (): string => {
    const image1 = 'https://images.pexels.com/photos/1788912/pexels-photo-1788912.jpeg';
    const image2 = 'https://images.pexels.com/photos/1788912/pexels-photo-1788912.jpeg';
    const image3 = 'https://images.pexels.com/photos/1788912/pexels-photo-1788912.jpeg';
    const image4 = 'https://images.pexels.com/photos/1788912/pexels-photo-1788912.jpeg';
    const image5 = 'https://images.pexels.com/photos/1788912/pexels-photo-1788912.jpeg';
    const imagesList = [image1, image2, image3, image4, image5];

    const imageUrl = imagesList[Math.floor(Math.random() * imagesList.length)];

    return imageUrl;
};
