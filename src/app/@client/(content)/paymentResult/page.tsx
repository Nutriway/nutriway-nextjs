import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { Appointment } from '@/types/Appointment';
import { SingleStrapiResponse, StrapiResponse } from '@/types/StrapiResponse';
import { AppointmentPayment } from '@/types/AppointmentPayment';
import React from 'react';
import Unpaid from '@/app/@client/(content)/paymentResult/Unpaid';
import Paid from '@/app/@client/(content)/paymentResult/Paid';

type PaymentResultPageParams = {
    searchParams: {
        session_id: string;
    };
};

type Metadata = {
    appointmentId: number;
    nutritionistName: string;
    goal: string;
    date: string;
    clientName: string;
};

async function getPaymentStatus(session_id: string) {
    return serverFetcher<{
        payment_status: 'unpaid' | 'paid';
        metadata: Metadata;
    }>({
        url: '/appointment-payment/getPaymentStatus',
        method: 'post',
        body: {
            session_id,
        },
    });
}

async function getUnpaidAppointment(appointmentId: number) {
    return serverFetcher<StrapiResponse<Appointment>>({
        url: `/appointments?populate[appointment_payment][populate]&filters[appointment_payment][status]=unpaid&filters[id]=${appointmentId}`,
        method: 'get',
    });
}

async function updateAppointmentPayment(paymentId: number, payment_status: string) {
    return serverFetcher<SingleStrapiResponse<AppointmentPayment>>({
        url: `/appointment-payments/${paymentId}`,
        method: 'put',
        body: {
            data: {
                status: payment_status,
            },
        },
    });
}

export default async function PaymentResultPage({ searchParams }: PaymentResultPageParams) {
    const { payment_status, metadata } = await getPaymentStatus(searchParams.session_id);
    const appointment = await getUnpaidAppointment(metadata.appointmentId);

    if (
        appointment.data.length > 0 &&
        appointment.data[0].attributes.appointment_payment &&
        payment_status === 'paid'
    ) {
        await updateAppointmentPayment(appointment.data[0].attributes?.appointment_payment?.data.id, payment_status);
    }

    const content = {
        paid: (
            <Paid
                clientName={metadata.clientName}
                nutritionistName={metadata.nutritionistName}
                date={metadata.date}
                goal={metadata.goal}
            />
        ),
        unpaid: <Unpaid />,
    };

    return content[payment_status];
}
