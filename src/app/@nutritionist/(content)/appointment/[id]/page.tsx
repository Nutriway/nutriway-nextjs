import ClientDetails from '@/components/CRUD/ClientDetails';
import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { SingleStrapiResponse } from '@/types/StrapiResponse';
import { Appointment } from '@/types/Appointment';
import React from 'react';
import NotFound from '@/components/Errors/404';

type AppointmentDetailsParams = {
    params: { id: string };
};

async function getInfo(id: string) {
    return serverFetcher<SingleStrapiResponse<Appointment>>({
        url: `/appointments/${id}?populate[client][populate]`,
        method: 'get',
    });
}

export default async function AppointmentDetails({ params }: AppointmentDetailsParams) {
    const info = await getInfo(params.id);

    if (!info?.data) {
        return <NotFound />;
    }

    return <ClientDetails info={info?.data} />;
}
