import { AppointmentResult } from "./AppointmentResult";
import { Client } from "./Client";
import { Availability } from "./Availability";
import { AppointmentPayment } from "./AppointmentPayment";

export type Appointment = {
    id: number;
    attributes: {
        date?: string;
        appointment_result: { data: AppointmentResult };
        client: { data: Client };
        createdAt: string;
        medical_condition: string;
        meeting_url: string;
        nutritionist_availability: { data: Availability };
        publishedAt: string;
        updatedAt: string;
        appointment_payment: { data: AppointmentPayment };
        goal: string;
    };
};
