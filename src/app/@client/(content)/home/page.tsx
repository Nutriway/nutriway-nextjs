import BlogShowcase from '@/components/Blogs/BlogShowcase';
import React from 'react';
import SimpleCTA from '@/components/CTA/SimpleCTA';
import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { StrapiResponse } from '@/types/StrapiResponse';
import { Availability } from '@/types/Availability';
import ClientScheduleAppointment from '@/components/Calendars/ClientScheduleAppointment';
import { Appointment } from '@/types/Appointment';

async function fetchAvailabilities() {
    const today = new Date().toISOString();

    const availabilities = await serverFetcher<StrapiResponse<Availability>>({
        // TODO: this was removed from below... &filters[nutritionist][id]=2
        url: `/nutritionist-availabilities?populate[nutritionist][populate]&populate[appointment][populate]&filters[date][$gte]=${today}`,
        method: 'get',
    });

    const payments = await serverFetcher<StrapiResponse<Appointment>>({
        method: 'get',
        url: `/appointments?populate[appointment_payment][populate]`,
    });

    return availabilities.data.filter((availability) => {
        const appointment = availability.attributes.appointment?.data;
        if (!appointment) return true;

        const payment = payments.data.find(
            (payment) => payment.id === appointment.id && payment.attributes.appointment_payment?.data?.id,
        );

        return !payment;
    });
}

export default async function Home() {
    const availabilities = await fetchAvailabilities();

    return (
        <>
            <SimpleCTA
                title="Parece que ainda não tem nenhuma consulta marcada..."
                description="Reserve agora a sua primeira consulta."
            >
                <ClientScheduleAppointment availabilities={availabilities} />
            </SimpleCTA>

            <section>
                {
                    //@ts-ignore
                    <BlogShowcase />
                }
            </section>
        </>
    );
}
