'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getDaysInMonth, isToday, isSameDay } from 'date-fns';

type ClientScheduleAppointmentProps = {
    availableDates: Date[];
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

// Calculates the number of days in the given month
const getNoOfDays = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const dayOfWeek = date.getDay();

    const blankdaysArray: number[] = [];
    for (var i = 1; i <= dayOfWeek; i++) {
        blankdaysArray.push(i);
    }

    const daysArray: number[] = [];
    for (var i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
    }

    return { blankDays: blankdaysArray, numDays: daysArray };
};

const isSelectedDate = (newDate: Date, selectedDate: Date) => {
    return isSameDay(newDate, selectedDate);
};

const isSelectedHour = (hour: number, selectedHour: number | undefined) => {
    return selectedHour === hour;
};

const submitDate = (selectedDate: Date) => {
    if (selectedDate) {
        //send the selectedDate object
    }
};

export default function ClientScheduleAppointment({ availableDates }: ClientScheduleAppointmentProps) {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedHour, setSelectedHour] = useState<number | undefined>();
    const [step, setStep] = useState(0);

    const selectDateValue = useCallback(
        (day: number) => {
            const selectedDate = new Date(year, month, day);

            setSelectedDate(selectedDate);
            setSelectedHour(undefined);
            setStep(1);
        },
        [month, year],
    );

    const hasNoAvailability = (day: number): boolean => {
        return !availableDates.find((d: Date) => isSameDay(d, new Date(year, month, day)));
    };

    const DATE_SELECTION = 0;
    const HOUR_SELECTION = 1;
    const content = {
        DATE_SELECTION: (
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
                            disabled={month == 0 ? true : false}
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
                            disabled={month == 11 ? true : false}
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
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
                                            : selectedDate && isSelectedDate(new Date(year, month, day), selectedDate)
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
        ),

        HOUR_SELECTION: (
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
                        availableDates
                            .filter((d: Date) => isSameDay(d, new Date(selectedDate)))
                            .map((date, index) => {
                                return (
                                    <div className="px-1" key={index}>
                                        <div
                                            key={index}
                                            className={
                                                isSelectedHour(date.getHours(), selectedHour)
                                                    ? 'cursor-pointer text-center text-base rounded-lg leading-loose w-9 font-skylight text-gray-700 bg-primary-50 border border-green-700'
                                                    : 'cursor-pointer text-center text-base rounded-lg leading-loose w-9 font-skylight border text-gray-700 border-gray-400 '
                                            }
                                            onClick={() => {
                                                setSelectedHour(date.getHours());
                                                setSelectedDate(date);
                                            }}
                                        >
                                            {date.getHours()}
                                        </div>
                                    </div>
                                );
                            })}
                </div>

                <div className="flex justify-end w-full">
                    <button
                        onClick={() => {
                            if (selectedDate) submitDate(selectedDate);
                        }}
                        disabled={!selectedHour}
                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lightbg-primary-600 lighthover:bg-primary-700 focus:outline-none lightfocus:ring-primary-800"
                    >
                        {'Avançar'}
                    </button>
                </div>
            </div>
        ),
    };

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
                                    onClick={() => setStep(0)}
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
                                        if (selectedDate) setStep(1);
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
                            {step === DATE_SELECTION && content.DATE_SELECTION}
                            {step === HOUR_SELECTION && content.HOUR_SELECTION}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
