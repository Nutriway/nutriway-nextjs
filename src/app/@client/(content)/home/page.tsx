import BlogShowcase from '@/components/Blogs/BlogShowcase';
import React from 'react';
import SimpleCTA from '@/components/CTA/SimpleCTA';
import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { StrapiResponse } from '@/types/StrapiResponse';
import { Availability } from '@/types/Availability';
import ClientScheduleAppointment from '@/components/Calendars/ClientScheduleAppointment';

const fetchAvailabilities = async () => {
    const today = new Date().toISOString();

    return serverFetcher<StrapiResponse<Availability>>({
        url: `/nutritionist-availabilities?populate[nutritionist][populate]&filters[nutritionist][id]=2&filters[date][$gte]=${today}&filters[appointment]`,
        method: 'get',
    });
};

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
