'use client';
import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ClientScheduleAppointment() {
    //CHANGE THIS ID TO CATARINA'S
    const today = new Date().toISOString().substring(0, 10);
    const { data, isLoading } = useSWR(
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

    const [step, setStep] = useState(0);
    const [availabilities, setAvailabilities] = useState<Map<string, number[]>>();
    const [availableHours, setAvailableHours] = useState<number[]>();

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

    useEffect(() => {
        getNoOfDays(month);
    }, [month, getNoOfDays]);

    useEffect(() => {
        if (data?.data) {
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
    }, [data]);

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
    };

    const submitDate = () => {
        console.log(`${datepickerValue} às ${selectedHour}h`);

        //juntar data e hora numa string pronta a entregar ao André
        //GO TO FORM
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

    const CalendarSpinner = () => {
        return (
            <div role="status" className="w-full h-full flex justify-center items-center p-8">
                <svg
                    aria-hidden="true"
                    className="w-19 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        );
    };

    return (
        <div className="w-full flex justify-center items-center">
            <div className="antialiased sans-serif">
                <div className="container py-2">
                    <div className="w-80">
                        <div className="relative">
                            <input type="hidden" name="date" />

                            <div
                                style={{ backgroundColor: 'rgb(243, 252, 243)' }}
                                className="flex justify-center items-center border border-grey-400 rounded-lg m-2 w-auto h-11 cursor-pointer p-1"
                            >
                                <div
                                    style={{
                                        backgroundColor: 'rgb(88, 148, 66)',
                                        color: 'white',
                                    }}
                                    className="font-skylight text-sm font text-center h-full rounded-l-lg flex-1 flex justify-center items-center "
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

                                    {datepickerValue ? new Date(datepickerValue).toLocaleDateString() : 'Data'}
                                </div>

                                <div
                                    className="text-center h-full flex justify-center items-center"
                                    style={{
                                        backgroundColor: 'rgb(88, 148, 66)',
                                    }}
                                >
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
                                    style={{
                                        backgroundColor: step === 1 ? 'rgb(88, 148, 66)' : 'transparent',
                                        color: step === 1 ? 'white' : 'black',
                                    }}
                                    className="font-skylight text-sm font text-center h-full rounded-r-lg flex-1 flex justify-center items-center"
                                    onClick={() => {
                                        if (datepickerValue) setStep(1);
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

                            {step === 0 && (
                                <div className="bg-white mt-1 rounded-lg shadow p-4 w-full">
                                    <div className="flex justify-between items-center mb-3">
                                        <div>
                                            <span className="text-xl font-bold text-gray-800 font-skylight">
                                                {' '}
                                                {MONTH_NAMES[month]}
                                            </span>
                                            <span className="ml-1 text-xl text-gray-600 font-normal font-skylight">
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
                                    <div className="flex flex-wrap mb-3 -mx-1 justify-center">
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
                                    {!isLoading ? (
                                        <div className="flex flex-wrap -mx-1 mx-1">
                                            {blankdays.map((day, index) => {
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
                                            {no_of_days.map((day, index) => {
                                                return (
                                                    <div className="px-0.5 mb-2" key={index}>
                                                        <div
                                                            key={index}
                                                            onClick={() => {
                                                                if (!hasNoAvailability(day)) selectDateValue(day);
                                                            }}
                                                            className={
                                                                hasNoAvailability(day)
                                                                    ? 'text-center text-base rounded-lg leading-loose w-9 h-9 font-skylight text-decoration-line: line-through'
                                                                    : 'cursor-pointer text-center text-base rounded-lg leading-loose w-9 h-9 font-skylight'
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
                                    ) : (
                                        <CalendarSpinner />
                                    )}
                                </div>
                            )}

                            {step === 1 && (
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

                                            <span className="text-xl font-bold text-gray-800 font-skylight">
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
                                                            className="cursor-pointer text-center text-base rounded-lg leading-loose w-9 hover:bg-blue-400 font-skylight"
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

                                    <div className="flex justify-end w-full">
                                        <button
                                            onClick={submitDate}
                                            disabled={!selectedHour}
                                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lightbg-primary-600 lighthover:bg-primary-700 focus:outline-none lightfocus:ring-primary-800"
                                        >
                                            {'Avançar'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
