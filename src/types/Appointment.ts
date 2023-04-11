import { AppointmentResult } from "@/types/AppointmentResult";
import { Client } from "@/types/Client";
import { Availability } from "@/types/Availability";
import { AppointmentPayment } from "@/types/AppointmentPayment";

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
