'use client';
import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ClientScheduleAppointment() {
    //CHANGE THIS ID TO CATARINA'S

    //deixo isto para deixar marcar apenas para amanhã?
    const today = new Date().toISOString().substring(0, 10);
    const { data, error } = useSWR(
        `http://localhost:1337/api/nutritionist-availabilities?populate[nutritionist][populate]&filters[nutritionist][id]=2&filters[date][$gte]=${today}`,
        fetcher,
    );

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

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [no_of_days, setNumDays] = useState<number[]>([]);
    const [blankdays, setBlankDays] = useState<number[]>([]);
    const [datepickerValue, setDatepickerValue] = useState('');
    const [selectedHour, setSelectedHour] = useState<number | null>();

    //colocar step para data e dps hora - usar simbolos a verde como o the fork
    const [step, setStep] = useState(0);

    const [availabilities, setAvailabilities] = useState<Map<string, number[]>>();
    const [availableHours, setAvailableHours] = useState<number[]>();

    /*   //DO I NEED THESE 2 USE EFFECTS
    useEffect(() => {
        // initDate();
    }, []); */

    // Calculates the number of days in the given month
    const getNoOfDays = useCallback(
        (month: number) => {
            let daysInMonth = new Date(year, month + 1, 0).getDate();
            let dayOfWeek = new Date(year, month).getDay();

            let blankdaysArray: number[] = [];
            for (var i = 1; i <= dayOfWeek; i++) {
                blankdaysArray.push(i);
            }

            let daysArray: number[] = [];
            for (var i = 1; i <= daysInMonth; i++) {
                daysArray.push(i);
            }

            setBlankDays(blankdaysArray);
            setNumDays(daysArray);
        },
        [year],
    );

    //sempre que mudo o mes estou a contruir o mapa - n pode ser - separar
    useEffect(() => {
        getNoOfDays(month);
        if (data?.data) {
            //console.log(data.data);
            const datesList = data.data.map((d: any) => d.attributes.date);

            const dateMap: Map<string, number[]> = new Map();

            for (let d of datesList) {
                const date = new Date(d).toLocaleDateString();
                const hour = parseInt(d.substr(11, 2));
                if (!dateMap.has(date)) {
                    dateMap.set(date, []);
                }
                const hoursArray = dateMap.get(date);
                if (hoursArray) hoursArray.push(hour);
            }

            setAvailabilities(dateMap);
            setAvailableHours(dateMap.get(new Date().toLocaleDateString()));

            console.log(dateMap);
        }
    }, [data, getNoOfDays, month]);

    const handleAvailableHours = (date: string) => {
        //agora procuro as horas
        //no fim - setAvailableHours
    };

    /*  const initDate = () => {
        let today = new Date();
        setDatepickerValue(() => new Date(year, month, today.getDate()).toDateString());
    }; */

    // Checks if the day is the current day
    const isToday = (date: number) => {
        const today = new Date();
        const d = new Date(year, month, date);

        return today.toDateString() === d.toDateString() ? true : false;
    };

    // Sets an actual date value from the calendar number passed in
    const selectDateValue = (day: number) => {
        let selectedDate = new Date(year, month, day);

        setDatepickerValue(() => selectedDate.toDateString());
        setSelectedHour(null);

        if (availabilities) setAvailableHours(availabilities.get(selectedDate.toLocaleDateString()));

        setStep(1);
    };

    const selectHour = (hour: number) => {
        setSelectedHour(hour);
        console.log(hour);

        //que faço depois disto? formulário?
    };

    const hasNoAvailability = (day: number): boolean => {
        const dateKey = new Date(year, month, day).toLocaleDateString();

        return !!!availabilities?.get(dateKey);
    };

    // Checking to see if the date has been selected or not
    const isSelectedDate = (date: number) => {
        let newDate = new Date(year, month, date);

        if (datepickerValue !== null) {
            return newDate.toDateString() == datepickerValue;
        }
        return false;
    };

    const isSelectedHour = (hour: number) => {
        if (selectedHour !== null) {
            return selectedHour === hour;
        }
        return false;
    };

    return (
        <div className=" antialiased sans-serif">
            <div className="container mx-auto px-4 py-2">
                <div className=" w-72">
                    <div className="relative">
                        <input type="hidden" name="date" />

                        <div
                            style={{ backgroundColor: 'rgb(243, 252, 243)' }}
                            className="flex justify-center items-center border border-grey-400 rounded-lg m-2 w-auto h-9 cursor-pointer p-1"
                        >
                            <div
                                style={{
                                    backgroundColor: 'rgb(88, 148, 66)',
                                    color: 'white',
                                }}
                                className="font-skylight text-xs font text-center h-full rounded-l-lg flex-1 flex justify-center items-center"
                                onClick={() => setStep(0)}
                            >
                                {datepickerValue ? new Date(datepickerValue).toLocaleDateString() : 'Data'}
                            </div>

                            <div
                                className="text-center h-full flex justify-center items-center"
                                style={{
                                    backgroundColor: 'rgb(88, 148, 66)',
                                }}
                            >
                                <svg
                                    className="h-4 w-5 text-gray-300 inline-flex"
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
                                style={{
                                    backgroundColor: step === 1 ? 'rgb(88, 148, 66)' : 'transparent',
                                    color: step === 1 ? 'white' : 'black',
                                }}
                                className="font-skylight text-xs font text-center h-full rounded-r-lg flex-1 flex justify-center items-center"
                                onClick={() => {
                                    if (datepickerValue) setStep(1);
                                }}
                            >
                                {selectedHour ? `${selectedHour}h` : 'Hora'}
                            </div>
                        </div>

                        {step === 0 && (
                            <div className="bg-white mt-10 rounded-lg shadow p-4 absolute top-0 left-0 w-full">
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <span className="text-lg font-bold text-gray-800 font-skylight">
                                            {' '}
                                            {MONTH_NAMES[month]}
                                        </span>
                                        <span className="ml-1 text-lg text-gray-600 font-normal font-skylight">
                                            {' '}
                                            {year}
                                        </span>
                                    </div>{' '}
                                    <div>
                                        <button
                                            type="button"
                                            className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                                            disabled={month == 0 ? true : false}
                                            onClick={() => {
                                                setMonth((prev) => prev - 1);
                                                getNoOfDays(month - 1);
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
                                                getNoOfDays(month + 1);
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
                                <div className="flex flex-wrap mb-3 -mx-1">
                                    {DAYS.map((day, index) => {
                                        return (
                                            <div className="px-1" key={index}>
                                                <div
                                                    key={index}
                                                    className="text-gray-800 font-medium text-center text-xs w-7 font-skylight"
                                                >
                                                    {day}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex flex-wrap -mx-1">
                                    {blankdays.map((day, index) => {
                                        return (
                                            <div className="px-1 mb-1" key={index}>
                                                <div
                                                    key={index}
                                                    className="cursor-pointer text-center text-sm rounded-lg leading-loose font-skylight w-7 text-gray-700"
                                                >
                                                    {}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {no_of_days.map((day, index) => {
                                        return (
                                            <div className="px-1 mb-1" key={index}>
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        if (!hasNoAvailability(day)) selectDateValue(day);
                                                    }}
                                                    className={
                                                        hasNoAvailability(day)
                                                            ? 'text-center text-sm rounded-lg leading-loose w-7 font-skylight text-decoration-line: line-through'
                                                            : 'cursor-pointer text-center text-sm rounded-lg leading-loose w-7 font-skylight'
                                                    }
                                                    style={{
                                                        backgroundColor: hasNoAvailability(day)
                                                            ? 'rgb(236, 237, 239)'
                                                            : isSelectedDate(day)
                                                            ? 'rgb(243, 252, 243)'
                                                            : 'white',

                                                        color: isToday(day)
                                                            ? 'rgb(88, 148, 66)'
                                                            : hasNoAvailability(day)
                                                            ? 'rgb(149, 155, 167)'
                                                            : 'black',

                                                        border: hasNoAvailability(day)
                                                            ? '1px solid rgb(236, 237, 239)'
                                                            : isSelectedDate(day)
                                                            ? '1px solid rgb(88, 148, 66)'
                                                            : '1px solid rgb(149, 155, 167)',
                                                    }}
                                                >
                                                    {' '}
                                                    {day}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="bg-white mt-10 rounded-lg shadow p-4 absolute top-0 left-0 w-full">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-lg font-bold text-gray-800 font-skylight">
                                            {'Selecione a Hora'}
                                        </span>
                                    </div>{' '}
                                </div>
                                <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
                                <div className="flex flex-wrap mb-3 -mx-1">
                                    {availableHours &&
                                        availableHours.map((hour, index) => {
                                            return (
                                                <div className="px-1" key={index}>
                                                    <div
                                                        key={index}
                                                        className="cursor-pointer text-center text-sm rounded-lg leading-loose w-7  hover:bg-blue-400 font-skylight"
                                                        onClick={() => {
                                                            selectHour(hour);
                                                        }}
                                                        style={{
                                                            backgroundColor: isSelectedHour(hour)
                                                                ? 'rgb(243, 252, 243)'
                                                                : 'white',
                                                            color: 'black',
                                                            border: isSelectedHour(hour)
                                                                ? '1px solid rgb(88, 148, 66)'
                                                                : '1px solid rgb(149, 155, 167)',
                                                        }}
                                                    >
                                                        {hour}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
