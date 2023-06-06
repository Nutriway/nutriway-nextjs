import BlogShowcase from '@/components/Blogs/BlogShowcase';
import React from 'react';
import SimpleCTA from '@/components/CTA/SimpleCTA';
import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { StrapiResponse } from '@/types/StrapiResponse';
import { Availability } from '@/types/Availability';
import ClientScheduleAppointment from '@/components/Calendars/ClientScheduleAppointment';
import { Appointment } from '@/types/Appointment';
import { User } from '@/types/User';
import ComingAppointmentCTA from '@/components/CTA/ComingAppointmentCTA';

async function fetchAvailabilities() {
    const today = new Date().toISOString();

    return serverFetcher<StrapiResponse<Availability>>({
        // TODO: this was removed from below... &filters[nutritionist][id]=2
        url: `/nutritionist-availabilities?populate[nutritionist][populate]&populate[appointment][populate][1]=appointment_payment&filters[date][$gte]=${today}`,
        method: 'get',
    });
}

async function fetchAppointmentsFromUser(userId: number) {
    return serverFetcher<StrapiResponse<Appointment>>({
        url: `/appointments?populate[0]=appointment_payment&populate[1]=user&filters[client][id]=${userId}`,
        method: 'get',
    });
}

async function fetchUser() {
    return serverFetcher<User>({
        url: '/users/me',
        method: 'get',
    });
}

export default async function Home() {
    const availabilities = await fetchAvailabilities();

    availabilities.data = availabilities.data.filter(
        (a) =>
            !a.attributes.appointment ||
            (a.attributes.appointment && !a.attributes.appointment?.data?.attributes.appointment_payment),
    );

    const user = await fetchUser();
    const appointments = await fetchAppointmentsFromUser(user.id);

    return (
        <>
            {appointments.data.length > 0 ? (
                <ComingAppointmentCTA appointments={appointments.data} />
            ) : (
                <SimpleCTA
                    title="Parece que ainda não tem nenhuma consulta marcada..."
                    description="Reserve agora a sua primeira consulta."
                >
                    <ClientScheduleAppointment availabilities={availabilities.data} />
                </SimpleCTA>
            )}

            <section>
                {
                    //@ts-ignore
                    <BlogShowcase />
                }
            </section>
        </>
    );
}
