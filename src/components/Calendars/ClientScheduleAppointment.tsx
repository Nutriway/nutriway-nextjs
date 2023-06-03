'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { format, getDaysInMonth, isSameDay, isToday, parseISO } from 'date-fns';
import { Availability } from '@/types/Availability';
import Link from 'next/link';

type ClientScheduleAppointmentProps = {
    availabilities: Availability[];
};

const MONTH_NAMES = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const DATE_SELECTION = 0;
const HOUR_SELECTION = 1;

const getNoOfDays = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const dayOfWeek = date.getDay();

    const blankdaysArray: number[] = [];
    for (let i = 1; i <= dayOfWeek; i++) {
        blankdaysArray.push(i);
    }

    const daysArray: number[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
    }

    return { blankDays: blankdaysArray, numDays: daysArray };
};

const submitDate = (selectedAvailability: Availability) => {
    if (selectedAvailability) {
        //send the availability object
    }
};

export default function ClientScheduleAppointment({ availabilities }: ClientScheduleAppointmentProps) {
    const [month, setMonth] = useState(new Date().getMonth());
    const year = new Date().getFullYear();
    const [selectedAvailability, setSelectedAvailability] = useState<Availability>();
    const [selectedHour, setSelectedHour] = useState<string | undefined>();
    const [selectedDate, setSelectedDate] = useState<Date>();

    const [step, setStep] = useState(DATE_SELECTION);

    const selectDateValue = useCallback(
        (day: number) => {
            const selectedDate = new Date(year, month, day);
            setSelectedDate(selectedDate);
            setSelectedHour(undefined);
            setStep(HOUR_SELECTION);
        },
        [month, year],
    );

    const hasNoAvailability = useCallback(
        (day: number): boolean => {
            return !availabilities.find((a: Availability) =>
                isSameDay(parseISO(a.attributes.date), new Date(year, month, day)),
            );
        },
        [availabilities, month, year],
    );

    const content = useMemo(() => {
        if (step === DATE_SELECTION)
            return (
                <div className="bg-white mt-1 rounded-lg shadow p-4 w-full">
                    <div className="flex justify-between items-center mb-3">
                        <div>
                            <span className="text-xl font-bold text-gray-800 font-skylight"> {MONTH_NAMES[month]}</span>
                            <span className="ml-1 text-xl text-gray-600 font-normal font-skylight"> {year}</span>
                        </div>{' '}
                        <div>
                            <button
                                type="button"
                                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                                disabled={month == 0}
                                onClick={() => {
                                    setMonth((prev) => prev - 1);
                                    getNoOfDays(new Date(year, month - 1));
                                }}
                            >
                                <svg
                                    className="h-6 w-6 text-gray-500 inline-flex"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-700 p-1 rounded-full"
                                disabled={month == 11}
                                onClick={() => {
                                    setMonth((prev) => prev + 1);
                                    getNoOfDays(new Date(year, month + 1));
                                }}
                            >
                                <svg
                                    className="h-6 w-6 text-gray-500 inline-flex"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-3 mx-1 justify-center">
                        {DAYS.map((day, index) => {
                            return (
                                <div className="px-1" key={index}>
                                    <div
                                        key={index}
                                        className="text-gray-800 font-medium text-center text-sm w-8 font-skylight"
                                    >
                                        {day}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap mx-1">
                        {getNoOfDays(new Date(year, month)).blankDays.map((day, index) => {
                            return (
                                <div className="px-0.5 mb-2" key={index}>
                                    <div
                                        key={index}
                                        className="cursor-pointer text-center text-base rounded-lg leading-loose font-skylight w-9 h-9 text-gray-700"
                                    >
                                        {}
                                    </div>
                                </div>
                            );
                        })}
                        {getNoOfDays(new Date(year, month)).numDays.map((day, index) => {
                            return (
                                <div className="px-0.5 mb-2" key={index}>
                                    <div
                                        key={index}
                                        onClick={() => {
                                            if (!hasNoAvailability(day)) selectDateValue(day);
                                        }}
                                        className={
                                            hasNoAvailability(day)
                                                ? `text-center text-base rounded-lg leading-loose w-9 h-9 font-skylight text-decoration-line: line-through bg-gray-100 border border-gray-100  ${
                                                      isToday(new Date(year, month, day))
                                                          ? ' text-green-700'
                                                          : 'text-gray-400'
                                                  }`
                                                : selectedDate && isSameDay(new Date(year, month, day), selectedDate)
                                                ? 'cursor-pointer text-center text-base rounded-lg leading-loose w-9 h-9 font-skylight  bg-primary-50 border border-green-700'
                                                : `cursor-pointer text-center text-base rounded-lg leading-loose w-9 h-9 font-skylight border border-gray-400 ${
                                                      isToday(new Date(year, month, day))
                                                          ? ' text-green-700'
                                                          : 'text-gray-700'
                                                  }`
                                        }
                                    >
                                        {day}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        if (step === HOUR_SELECTION)
            return (
                <div className="bg-white mt-1 rounded-lg shadow p-4 w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-between items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-7 h-7 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>

                            <span className="text-xl font-bold text-gray-800 font-skylight">{'Selecione a Hora'}</span>
                        </div>{' '}
                    </div>
                    <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="flex flex-wrap mb-3 -mx-1">
                        {selectedDate &&
                            availabilities
                                .filter((av: Availability) => isSameDay(parseISO(av.attributes.date), selectedDate))
                                .map((availability, index) => {
                                    return (
                                        <div className="px-1" key={index}>
                                            <div
                                                key={index}
                                                className={
                                                    format(parseISO(availability.attributes.date), 'HH:mm') ===
                                                    selectedHour
                                                        ? 'cursor-pointer text-center text-base rounded-lg leading-loose w-12 font-skylight text-gray-700 bg-primary-50 border border-green-700'
                                                        : 'cursor-pointer text-center text-base rounded-lg leading-loose w-12 font-skylight border text-gray-700 border-gray-400 '
                                                }
                                                onClick={() => {
                                                    setSelectedHour(
                                                        format(parseISO(availability.attributes.date), 'HH:mm'),
                                                    );
                                                    setSelectedAvailability(availability);
                                                }}
                                            >
                                                {format(parseISO(availability.attributes.date), 'HH:mm')}
                                            </div>
                                        </div>
                                    );
                                })}
                    </div>

                    <div className="flex justify-end w-full">
                        <Link
                            href={{
                                pathname: '/info',
                                query: {
                                    availability: selectedAvailability?.id,
                                },
                            }}
                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lightbg-primary-600 lighthover:bg-primary-700 focus:outline-none lightfocus:ring-primary-800"
                        >
                            {'Avançar'}
                        </Link>
                    </div>
                </div>
            );
    }, [
        availabilities,
        hasNoAvailability,
        month,
        selectDateValue,
        selectedAvailability,
        selectedDate,
        selectedHour,
        step,
        year,
    ]);

    return (
        <div className="w-full flex justify-center items-center">
            <div className="antialiased sans-serif">
                <div className="container py-2">
                    <div className="w-80">
                        <div className="relative">
                            <input type="hidden" name="date" />
                            <div className="flex justify-center items-center border border-grey-400 rounded-lg m-2 w-auto h-11 cursor-pointer p-1 bg-primary-50">
                                <div
                                    className="font-skylight text-sm font text-center h-full rounded-l-lg flex-1 flex justify-center items-center bg-primary-700 hover:bg-primary-800 text-white"
                                    onClick={() => setStep(DATE_SELECTION)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6 mx-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                        />
                                    </svg>

                                    {selectedDate ? selectedDate.toLocaleDateString() : 'Data'}
                                </div>

                                <div className="text-center h-full flex justify-center items-center bg-primary-700">
                                    <svg
                                        className="h-5 w-6 text-gray-300 inline-flex"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>

                                <div
                                    className={
                                        step === 1
                                            ? 'font-skylight text-sm font text-center h-full rounded-r-lg flex-1 flex justify-center items-center bg-primary-700 hover:bg-primary-800 text-white'
                                            : 'font-skylight text-sm font text-center h-full rounded-r-lg flex-1 flex justify-center items-center bg-transparent'
                                    }
                                    onClick={() => {
                                        if (selectedDate) setStep(HOUR_SELECTION);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6 mx-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    {selectedHour ? `${selectedHour}h` : 'Hora'}
                                </div>
                            </div>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
