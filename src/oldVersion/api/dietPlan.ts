import { toast } from "react-toastify";
import api from ".";
import { getRandomImageUrl } from "../util/dietPlans";

export const createNutritionistDietPlan = async (
  dietPlan: any,
  userId: string,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).post("nutritionist-diet-plans", {
      data: {
        name: dietPlan.attributes.name,
        nutritionist_recipes: dietPlan.attributes.recipes,
        nutritionist: { id: userId },
      },
    });

    toast.success("Diet plan created");
    return data;
  } catch (error) {
    toast.error("Error");
  }
};

export const createDietPlan = async (
  plan: any,
  name: string,
  goal: string,
  observations: string,
  nutritionistId: number,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).post("nutritionist-diet-plans", {
      data: {
        imageUrl: getRandomImageUrl(),
        name,
        goal,
        observations,
        plan,
        nutritionist: { id: nutritionistId },
      },
    });

    return data;
  } catch (error) {
    toast.error("Error");
  }
};

export const updateNutritionistDietPlan = async (
  dietPlanId: number,
  name: string,
  goal: string,
  observations: string,
  plan: any,
  jwt: string
) => {
  try {
    await api(jwt).put(`nutritionist-diet-plans/${dietPlanId}`, {
      data: {
        name,
        goal,
        observations,
        plan,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getNutritionistDietPlans = async (jwt: string) => {
  try {
    const { data } = await api(jwt).get("nutritionist-diet-plans?populate=*");
    return data;
  } catch (error) {
    toast.error("Error fetching diet plans");
  }
};

export const getNutritionistDietPlanByNutritionistId = async (
  nutritionistId: string,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).get(
      `nutritionist-diet-plans?populate=*&pagination[pageSize]=10000&filters[nutritionist][id][$eq]=${nutritionistId}`
    );
    return data;
  } catch (error) {
    toast.error("Erro ao carregar os planos");
  }
};

export const getNutritionistDietPlanByDietPlanId = async (
  id: string,
  jwt: string
) => {
  try {
    const { data } = await api(jwt).get(
      `nutritionist-diet-plans?populate=*&filters[id][$eq]=${id}`
    );

    return data;
  } catch (error) {
    toast.error("Error fetching diet plan");
  }
};

export const updateDietPlan = async (dietPlan: any, jwt: string) => {
  try {
    const { name, recipes } = dietPlan.attributes;
    await api(jwt).put(`nutritionist-diet-plans/${dietPlan.id}`, {
      data: {
        name,
        nutritionist_recipes: recipes,
      },
    });

    toast.success("Receita atualizada");
  } catch (error) {
    toast.error("Erro ao atualizar receita");
  }
};

export const deleteDietPlan = async (id: number, jwt: string) => {
  try {
    await api(jwt).delete(`nutritionist-diet-plans/${id}`);
    toast.success("Plano eliminado");
  } catch (error) {
    toast.error("Erro ao eliminar plano");
  }
};
