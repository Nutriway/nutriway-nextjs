import NutritionistCalendar from '@/components/Calendars/NutritionistCalendar';
import React from 'react';
import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { Appointment } from '@/types/Appointment';
import { User } from '@/types/User';
import { StrapiResponse } from '@/types/StrapiResponse';

async function getNutritionistAppointments() {
    const user = await serverFetcher<User>({
        url: '/users/me',
        method: 'get',
        revalidate: 500,
    });

    const response = await serverFetcher<StrapiResponse<Appointment>>({
        url: `/appointments?populate[appointment_payment][populate]&populate[client][populate]&filter[appointment_payment.nutritionist]=${user?.id}`,
        method: 'get',
    });

    return response?.data;
}

export default async function Home() {
    const nutritionistAppointments = (await getNutritionistAppointments()) || [];
    return (
        <section className="bg-white lightbg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 rounded-2xl bg-gray-50">
                <div className="mx-auto max-w-screen-lg text-center">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 lighttext-white">As minhas Consultas</h2>
                    <p className="mb-6 font-light text-gray-500 lighttext-gray-400 md:text-lg">Verifique as suas consultas, e os detalhes dos seus clientes.</p>
                    <div className="my-10 pb-5 lg:px-6 rounded-2xl bg-gray-100">
                        <NutritionistCalendar appointments={nutritionistAppointments} />
                    </div>
                </div>
            </div>
        </section>
    );
}
