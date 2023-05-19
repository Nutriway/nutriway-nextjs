import NutritionistCalendar from '@/components/Calendars/NutritionistCalendar';
import React from 'react';
import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { Appointment } from '@/types/Appointment';
import { User } from '@/types/User';
import { StrapiResponse } from '@/types/StrapiResponse';
import { NutritionistAvailability } from '@/types/NutritionistAvailability';
import SimpleCTA from '@/components/CTA/SimpleCTA';
import NutritionistAvailabilityOverview from '@/components/Calendars/NutritionistAvaliabilityOverview';

async function getUser() {
    return serverFetcher<User>({
        url: '/users/me',
        method: 'get',
        revalidate: 500,
    });
}

async function getNutritionistAppointments(user: User | undefined) {
    const response = await serverFetcher<StrapiResponse<Appointment>>({
        url: `/appointments?populate[appointment_payment][populate]&populate[client][populate]&filter[appointment_payment.nutritionist]=${user?.id}`,
        method: 'get',
    });

    return response?.data;
}

async function getNutritionistAvailability(user: User | undefined) {
    const response = await serverFetcher<StrapiResponse<NutritionistAvailability>>({
        url: `/nutritionist-availabilities?populate[nutritionist][populate]&filters[nutritionist][id]=${user?.id}`,
        method: 'get',
    });

    return response?.data;
}

export default async function Home() {
    const user = await getUser();
    const nutritionistAppointments = (await getNutritionistAppointments(user)) || [];
    const nutritionistAvailability = (await getNutritionistAvailability(user)) || [];

    const hasAvailability = nutritionistAvailability.length > 0;
    const availabilityComponent = !hasAvailability ? (
        <SimpleCTA
            title="Ainda não marcou a sua disponibilidade..."
            description="Sem a sua disponibilidade os cliente não conseguem marcar consultas consigo."
            buttonText="Marcar Disponibilidade"
        />
    ) : (
        <div className="py-8 px-8 max-w-screen-xl sm:py-16 rounded-2xl bg-gray-50">
            <NutritionistAvailabilityOverview />
        </div>
    );

    return (
        <div className="flex space-x-5 justify-center">
            {availabilityComponent}
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
