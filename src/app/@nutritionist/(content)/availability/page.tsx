import NutritionistSetAvailabilityCalendar from '@/components/Calendars/NutritionistSetAvailabilityCalendar';
import React from 'react';
import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { StrapiResponse } from '@/types/StrapiResponse';
import { Availability } from '@/types/Availability';
import { User } from '@/types/User';

async function getUser() {
    return serverFetcher<User>({
        url: '/users/me',
        method: 'get',
        revalidate: 500,
    });
}

async function fetchAvailabilities(id: number) {
    return serverFetcher<StrapiResponse<Availability>>({
        url: `/nutritionist-availabilities&filters[nutritionist][id]=${id}`,
        method: 'get',
    });
}

export default async function Availability() {
    const user = await getUser();
    const availabilities = await fetchAvailabilities(user.id);

    console.log(availabilities.data);

    return (
        <div className="flex justify-center items-center py-8 mx-auto max-w-6xl rounded-2xl bg-gray-50">
            <NutritionistSetAvailabilityCalendar availabilities={availabilities.data} />
        </div>
    );
}
