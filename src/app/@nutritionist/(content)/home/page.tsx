import NutritionistCalendar from '@/components/Calendars/NutritionistCalendar';
import React from 'react';
import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { Appointment } from '@/types/Appointment';
import { User } from '@/types/User';
import { StrapiResponse } from '@/types/StrapiResponse';
import SimpleCTA from '@/components/CTA/SimpleCTA';
import NutritionistSetAvailabilityCalendar from '@/components/Calendars/NutritionistSetAvailabilityCalendar';
import { Availability } from '@/types/Availability';

async function getUser() {
    return serverFetcher<User>({
        url: '/users/me',
        method: 'get',
        revalidate: 500,
    });
}

async function getNutritionistAppointments(user: User | undefined) {
    const response = await serverFetcher<StrapiResponse<Appointment>>({
        url: `/appointments?populate[appointment_payment][populate]&populate[client][populate]&filter[appointment_payment.nutritionist]=${user?.id}&sort=date:asc`,
        method: 'get',
    });

    return response.data;
}

async function getNutritionistAvailability(user: User | undefined) {
    const response = await serverFetcher<StrapiResponse<Availability>>({
        url: `/nutritionist-availabilities?populate[nutritionist][populate]&filters[nutritionist][id]=${
            user?.id
        }&filters[date][$gte]=${new Date().toISOString()}`,
        method: 'get',
    });

    return response.data;
}

export default async function Home() {
    const user = await getUser();
    const nutritionistAppointments = (await getNutritionistAppointments(user)) || [];
    const futureNutritionistAvailability = (await getNutritionistAvailability(user)) || [];

    return (
        <div className="flex space-x-5 justify-center">
            <SimpleCTA
                title="Ainda não marcou a sua disponibilidade..."
                description="Sem a sua disponibilidade os cliente não conseguem marcar consultas consigo."
            >
                <NutritionistSetAvailabilityCalendar availabilities={futureNutritionistAvailability} />
            </SimpleCTA>
            <section className="bg-white">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 rounded-2xl bg-gray-50">
                    <div className="mx-auto max-w-screen-lg text-center">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 lighttext-white">
                            As minhas Consultas
                        </h2>
                        <p className="mb-6 font-light text-gray-500 lighttext-gray-400 md:text-lg">
                            Verifique as suas consultas, e os detalhes dos seus clientes.
                        </p>
                        <div className="my-10 pb-5 lg:px-6 rounded-2xl bg-gray-100">
                            <NutritionistCalendar appointments={nutritionistAppointments} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
