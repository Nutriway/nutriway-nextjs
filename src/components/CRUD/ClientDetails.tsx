import Image from 'next/image';
import { Appointment } from '@/types/Appointment';

type ClientDetailsProps = {
    info: Appointment;
};

function mapActivity(activity: string) {
    switch (activity) {
        case 'low':
            return 'Pouco ou nenhum exercício';
        case 'medium-low':
            return 'Exercício leve 1-3 vezes por semana';
        case 'medium':
            return 'Exercício moderado 3 a 5 vezes por semana';
        case 'medium-high':
            return 'Exercício pesado 5 a 6 vezes por semana';
        case 'high':
            return 'Exercício pesado diariamente ou até duas vezes por dia';
        default:
            return 'Não fornecido';
    }
}

export default function ClientDetails({ info }: ClientDetailsProps) {
    return (
        <section className="bg-white light:bg-gray-900">
            <div className="py-8 mx-auto max-w-6xl lg:py-16">
                <div className="grid gap-4 px-4 mb-4 sm:mb-5 sm:grid-cols-3 sm:gap-6 md:gap-12">
                    <div className="sm:col-span-2">
                        <h1 className="text-primary-500 m-0 mb-10 text-3xl font-medium">Detalhes da consulta</h1>
                        <div className="flex items-center space-x-4">
                            <Image className="mb-4 w-16 h-16 rounded-full sm:w-20 sm:h-20" src="/images/avatars/user.png" alt="avatar" width={50} height={50} />
                            <div>
                                <h2 className="flex items-center mb-2 text-xl font-bold leading-none text-gray-900 sm:text-2xl light:text-white">{info.attributes.client.data.attributes.username}</h2>
                            </div>
                        </div>
                        <dl>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 light:text-white">Objetivo da consulta</dt>
                            <dd className="flex items-center mb-4 text-gray-900 sm:mb-5 light:text-white">
                                <svg className="w-4 h-4 mr-1.5 text-primary-800 light:text-primary-800" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                </svg>
                                <span className="font-light text-gray-500 light:text-gray-400">{info.attributes.goal}</span>
                            </dd>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 light:text-white">Condições médicas</dt>
                            <dd className="flex items-center text-gray-900 light:text-white">
                                <svg className="w-4 h-4 mr-1.5 text-primary-800 light:text-primary-800" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                                </svg>
                                <span className="font-light text-gray-500 light:text-gray-400">{info.attributes.medical_condition}</span>
                            </dd>
                        </dl>
                    </div>
                    <dl>
                        <dt className="mb-2 font-semibold leading-none text-gray-900 light:text-white">Idade</dt>
                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 light:text-gray-400">{info.attributes.client.data.attributes.age}</dd>
                        <dt className="mb-2 font-semibold leading-none text-gray-900 light:text-white">Género</dt>
                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 light:text-gray-400">{info.attributes.client.data.attributes.gender}</dd>
                        <dt className="mb-2 font-semibold leading-none text-gray-900 light:text-white">Altura / Peso</dt>
                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 light:text-gray-400">
                            {info.attributes.client.data.attributes.height}cm / {info.attributes.client.data.attributes.weight}kg
                        </dd>
                        <dt className="mb-2 font-semibold leading-none text-gray-900 light:text-white">Atividade Física</dt>
                        <dd className="font-light text-gray-500 light:text-gray-400">{mapActivity(info.attributes.client.data.attributes.activity)}</dd>
                    </dl>
                </div>
            </div>
        </section>
    );
}
