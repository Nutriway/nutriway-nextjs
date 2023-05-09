import NutritionistCalendar from '@/components/Calendars/NutritionistCalendar';
import React from 'react';

export default function Home() {
    return (
        <section className="bg-white lightbg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 rounded-2xl bg-gray-50">
                <div className="mx-auto max-w-screen-lg text-center">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 lighttext-white">Próximas Consultas</h2>
                    <p className="mb-6 font-light text-gray-500 lighttext-gray-400 md:text-lg">Verifique as suas consultas, e os detalhes dos seus clientes.</p>
                    <div className="my-10 pb-5 lg:px-6 rounded-2xl bg-gray-100">
                        <NutritionistCalendar />
                    </div>
                </div>
            </div>
        </section>
    );
}
