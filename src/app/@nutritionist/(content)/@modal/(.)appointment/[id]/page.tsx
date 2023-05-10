import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { SingleStrapiResponse } from '@/types/StrapiResponse';
import { Appointment } from '@/types/Appointment';
import React from 'react';
import ClientDetailsDialog from '@/components/Dialogs/ClientDetailsDialog';

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
        return <div>404</div>;
    }

    // @ts-ignore this is a hack around the fact that typescript doesnt allow async componenets yet
    return <ClientDetailsDialog info={info.data} />;
}
