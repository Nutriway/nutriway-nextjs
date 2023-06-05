import BlogShowcase from '@/components/Blogs/BlogShowcase';
import React from 'react';
import SimpleCTA from '@/components/CTA/SimpleCTA';
import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { StrapiResponse } from '@/types/StrapiResponse';
import { Availability } from '@/types/Availability';
import ClientScheduleAppointment from '@/components/Calendars/ClientScheduleAppointment';

async function fetchAvailabilities() {
    const today = new Date().toISOString();

    return serverFetcher<StrapiResponse<Availability>>({
        // TODO: this was removed from below... &filters[nutritionist][id]=2
        url: `/nutritionist-availabilities?populate[nutritionist][populate]&populate[appointment][populate][1]=appointment_payment&filters[date][$gte]=${today}`,
        method: 'get',
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
                <ClientScheduleAppointment availabilities={availabilities.data} />
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
