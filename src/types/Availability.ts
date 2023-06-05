import { Client } from './Client';
import { Appointment } from '@/types/Appointment';

export type Availability = {
    id: number;
    attributes: {
        createdAt: string;
        date: string;
        nutritionist?: { data: Client };
        appointment?: { data: Appointment };
        publishedAt: string;
        updatedAt: string;
    };
};
