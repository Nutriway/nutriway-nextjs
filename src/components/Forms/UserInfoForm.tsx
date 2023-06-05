'use client';
import React, { useState } from 'react';
import { User } from '@/types/User';
import useSWRMutation from 'swr/mutation';
import { clientFetcher } from '@/lib/fetchers/clientFetcher';
import { Availability } from '@/types/Availability';
import Spinner from '@/components/Skeletons/Spinner';
import { useRouter } from 'next/navigation';
import { SingleStrapiResponse } from '@/types/StrapiResponse';
import { Appointment } from '@/types/Appointment';

function getActivityRate(activity: string) {
    switch (activity) {
        case 'low':
            return 1.2;
        case 'medium-low':
            return 1.375;
        case 'medium':
            return 1.55;
        case 'medium-high':
            return 1.725;
        case 'high':
            return 1.9;
    }
    return 1;
}

function calculateMetabolicRate(user: User) {
    if (user.activity && user.weight && user.height && user.age) {
        const activityRate = getActivityRate(user.activity);
        if (user.gender === 'male') {
            return Math.round(activityRate * (66 + (+user.weight * 13.7 + +user.height * 5 - +user.age * 6.8)));
        }
        return Math.round(activityRate * (66.5 + (+user.weight * 9.6 + +user.height * 1.8 - +user.age * 4.7)));
    } else {
        return 0;
    }
}

export type Form = {
    motivation: string;
    condition: string;
};

async function updateUser(url: string, { arg }: { arg: User }) {
    return clientFetcher<User>({
        url,
        method: 'put',
        body: {
            gender: arg.gender,
            age: arg.age,
            weight: arg.weight,
            height: arg.height,
            activity: arg.activity,
            metabolicRate: Math.abs(calculateMetabolicRate(arg)),
        },
    });
}

async function createAppointment(
    url: string,
    {
        arg,
    }: {
        arg: { form: Form; availability: Availability; user: User };
    },
) {
    return clientFetcher<SingleStrapiResponse<Appointment>>({
        url: '/appointments',
        method: 'post',
        body: {
            data: {
                goal: arg.form.motivation,
                nutritionist: arg.availability.attributes.nutritionist?.data.id,
                client: { id: arg.user.id },
                medical_condition: arg.form.condition,
                nutritionist_availability: { id: arg.availability.id },
                date: arg.availability.attributes.date,
                meeting_url: `https://meet.jit.si/${arg.availability.id}-${new Date(
                    arg.availability.attributes.date,
                ).getTime()}`,
            },
        },
    });
}

async function startPayment(
    url: string,
    {
        arg,
    }: {
        arg: {
            appointmentId: number;
        };
    },
) {
    return clientFetcher<{ url: string }>({
        url,
        method: 'post',
        body: {
            ...arg,
        },
    });
}

export default function UserInfoForm({ currentUser, availability }: { currentUser: User; availability: Availability }) {
    // TODO: use the availability to pass to strapi as metadata
    const [user, setUser] = useState<User>(currentUser);
    const [form, setForm] = useState<Form>({ condition: '', motivation: '' });

    const { trigger: userTrigger } = useSWRMutation(`/users/${user.id}`, updateUser);

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { trigger: strapiTrigger } = useSWRMutation(`/appointment-payment/createCheckoutIntent`, startPayment);
    const { trigger: appointmentTrigger } = useSWRMutation(`/appointments`, createAppointment);

    return (
        <div className="py-8 px-6 mx-auto max-w-2xl bg-white rounded-lg border border-gray-200 shadow-sm lg:mb-28 lg:-mt-80">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Informações do cliente</h2>
            <form
                method="POST"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const [updatedUser, appointment] = await Promise.all([
                        userTrigger(user),
                        appointmentTrigger({
                            form,
                            availability,
                            user,
                        }),
                    ]);
                    if (updatedUser && appointment) {
                        setLoading(true);
                        if (availability.attributes.nutritionist) {
                            const stripePayment = await strapiTrigger({
                                appointmentId: appointment.data.id,
                            });
                            if (stripePayment) {
                                router.push(stripePayment.url);
                            }
                        }
                    }
                }}
            >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="my-3 sm:col-span-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="motivation" className="block mb-2 text-sm font-medium text-gray-900">
                                Motivo da consulta
                            </label>
                            <textarea
                                value={form.motivation}
                                onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                                required
                                id="motivation"
                                rows={4}
                                className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Eu desejo levar uma vida mais saudável e perder peso, procuro um plano de treino e alimentar que me ajude a atingir os meus objetivos."
                            ></textarea>
                        </div>
                        <div className="my-3 sm:col-span-2">
                            <label htmlFor="condition" className="block mb-2 text-sm font-medium text-gray-900">
                                Possui alguma condição ou restrição médica? Se sim, preencha-a abaixo
                            </label>
                            <textarea
                                id="condition"
                                value={form.condition}
                                onChange={(e) => setForm({ ...form, condition: e.target.value })}
                                rows={4}
                                className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Sou diabético(a) e tenho Hipotiroidismo."
                            ></textarea>
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
                            Género
                        </label>
                        <select
                            id="gender"
                            value={user.gender || 'N/A'}
                            onChange={(e) => setUser({ ...user, gender: e.target.value })}
                            className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="N/A">Não especificado</option>
                            <option value="male">Masculino</option>
                            <option value="female">Feminino</option>
                            <option value="other">Outro</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">
                            Idade
                        </label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            value={user.age || ''}
                            onChange={(e) => setUser({ ...user, age: +e.target.value })}
                            className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                            placeholder="Idade"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900">
                            Peso
                        </label>
                        <input
                            type="number"
                            name="weight"
                            id="weight"
                            value={user.weight || ''}
                            onChange={(e) => setUser({ ...user, weight: +e.target.value })}
                            className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                            placeholder="Peso (kg)"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900">
                            Altura
                        </label>
                        <input
                            type="number"
                            name="height"
                            id="height"
                            value={user.height || ''}
                            onChange={(e) => setUser({ ...user, height: +e.target.value })}
                            className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                            placeholder="Altura (cm)"
                            required
                        />
                    </div>
                    <div className="my-6 sm:col-span-2">
                        <label htmlFor="activity" className="block mb-2 text-sm font-medium text-gray-900">
                            Atividade física
                        </label>
                        <select
                            id="activity"
                            value={user.activity || 'low'}
                            onChange={(e) => setUser({ ...user, activity: e.target.value })}
                            className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="low">Sedentário (pouco ou nenhum exercício)</option>
                            <option value="medium-low">Levemente ativo (exercício leve 1 a 3 vezes por semana)</option>
                            <option value="medium">
                                Moderadamente ativo (exercício moderado 3 a 5 vezes por semana)
                            </option>
                            <option value="medium-high">
                                Bastante ativo (exercício pesado de 5 a 6 vezes por semana)
                            </option>
                            <option value="high">
                                Extremamente ativo (exercício pesado diariamente ou até 2 vezes por dia)
                            </option>
                        </select>
                    </div>
                </div>
                <button
                    className="inline-flex items-center py-2.5 px-5 mt-4 text-sm font-medium text-center text-white rounded-lg sm:mt-6 focus:ring-4 bg-primary-700 hover:bg-primary-800 focus:ring-primary-200"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? <Spinner /> : 'Seguir para pagamento'}
                </button>
            </form>
        </div>
    );
}
