import { Client } from '@/types/Client';
import { Appointment } from '@/types/Appointment';

export type NutritionistAvailability = {
    id: number;
    nutritionist: { data: Client };
    appointment: { data: Appointment };
};
