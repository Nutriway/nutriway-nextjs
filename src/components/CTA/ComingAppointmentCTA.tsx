import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Appointment } from '@/types/Appointment';
import { differenceInMinutes, format, intervalToDuration, startOfToday } from 'date-fns';

type ComingAppointmentCTAProps = {
    appointments: Appointment[];
};

function sortedAppointmentsAfterToday(appointments: Appointment[]) {
    return appointments
        .filter((a) => new Date(a.attributes.date) > startOfToday())
        .sort((a, b) => new Date(a.attributes.date).getTime() - new Date(b.attributes.date).getTime());
}

function timeToAppointment(appointment: Appointment) {
    const duration = intervalToDuration({
        start: new Date(),
        end: new Date(appointment.attributes.date),
    });
    return `${duration.days} dias ${duration.hours}h ${duration.minutes}m`;
}

function distanceToAppointment(appointment: Appointment) {
    const distanceFromCreation = differenceInMinutes(
        new Date(appointment.attributes.date),
        new Date(appointment.attributes.createdAt),
    );
    const distanceFromNow = differenceInMinutes(new Date(appointment.attributes.date), new Date());

    const distance = ((distanceFromCreation - distanceFromNow) / distanceFromCreation) * 100;

    return Math.ceil(distance / 5) * 5;
}

function minutesToAppointment(appointment: Appointment) {
    return differenceInMinutes(new Date(appointment.attributes.date), new Date());
}

export default function ComingAppointmentCTA({ appointments }: ComingAppointmentCTAProps) {
    const sortedAppointments = sortedAppointmentsAfterToday(appointments);
    const nextAppointment = sortedAppointments.length > 0 ? sortedAppointments[0] : null;

    // TODO: for the current use case, there is no chance of having less than one appointment, but if want to use this component in other places, we need to handle this case
    if (!nextAppointment) {
        return null;
    }

    console.log(minutesToAppointment(nextAppointment));

    return (
        <section className="bg-white">
            <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-12">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                        A sua consulta está a chegar!
                    </h2>
                    <p className="mt-4 text-base font-normal text-gray-500 sm:text-xl">
                        Poderá entrar na consulta através do botão abaixo.
                    </p>
                </div>

                <div className=" mt-8 xl:gap-12">
                    <div className="p-5 space-y-4 bg-white border border-gray-200 rounded-lg shadow-md">
                        <Image
                            className="object-cover rounded-lg shadow-lg w-full h-64"
                            src="/images/hero/consultation.jpg"
                            alt="Consultation"
                            width={2000}
                            height={500}
                        />

                        <div>
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-gray-900">
                                        Faltam {timeToAppointment(nextAppointment)}
                                    </span>
                                    <span className="text-sm font-normal text-gray-500">para a sua consulta</span>
                                </div>
                                <span className="text-xs font-normal text-right text-gray-500">
                                    {format(new Date(nextAppointment.attributes.date), 'PPPp')}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                <div
                                    className={`bg-primary-600 h-2.5 rounded-full`}
                                    // we are using style because we need to set the width dynamically
                                    // tailwind doesn't seem to support this as I cannot make it work - @Andree37
                                    style={{ width: `${distanceToAppointment(nextAppointment)}%` }}
                                ></div>
                            </div>
                        </div>

                        <p className="text-base font-normal text-gray-500">
                            Apenas é possível entrar na reunião 15 minutos antes da hora marcada. Entretanto, poderá ver
                            os detalhes da sua consulta.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row md:flex-col lg:flex-row lg:items-center">
                            {minutesToAppointment(nextAppointment) <= 15 ? (
                                <Link
                                    href="#"
                                    title=""
                                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    role="button"
                                >
                                    Entre agora
                                </Link>
                            ) : (
                                <button
                                    className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    disabled
                                >
                                    Entre agora
                                </button>
                            )}

                            <Link
                                href={`/appointment/${1}`}
                                title=""
                                className="px-5 py-2.5 text-sm justify-center font-medium text-gray-900 inline-flex items-center focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                                role="button"
                            >
                                Detalhes da consulta
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <a
                        href="#"
                        title=""
                        className="inline-flex items-center text-lg font-medium text-primary-600 hover:underline"
                    >
                        Veja todas as suas consultas anteriores
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
