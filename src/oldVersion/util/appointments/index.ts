import { DietPlanAttributes } from "../dietPlans";

export type AppointmentResult = {
  id: number;
  attributes: {
    nutritionist_diet_plan: AppointmentResultDietPlan;
    appointment: { id: number };
    planDurationDays: number;
    notes: string;
  };
};

export type AppointmentResultDietPlan = {
  data: {
    id: number;
    attributes: DietPlanAttributes;
  };
};

export const getMealType = (label: string): string => {
  switch (label.toLowerCase()) {
    case "breakfast":
      return "Pequeno-almoço";
    case "lunch":
      return "Almoço";
    case "dinner":
      return "Jantar";
    default:
      return `${label[0].toUpperCase()}${label.slice(1, label.length)}`;
  }
};
