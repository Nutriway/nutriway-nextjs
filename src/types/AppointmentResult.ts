export type AppointmentResult = {
    id: number;
    attributes: {
        nutrients: any;
        createdAt: string;
        notes: string;
        breakfastNutrients: any;
        lunchNutrients: any;
        snackNutrients: any;
        dinnerNutrients: any;
        nutritionist_diet_plan: any;
        publishedAt: string;
        updatedAt: string;
        planDurationDays: number;
        planType: string;
    };
};
