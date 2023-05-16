'use client';
import { Menu, Transition } from '@headlessui/react';
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday } from 'date-fns';
import React, { Fragment, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { pt } from 'date-fns/locale';
import Image from 'next/image';
import { Appointment } from '@/types/Appointment';
import Link from 'next/link';

// This function is used to get the styles of the days in the calendar
// It can be seen as where on the calendar should the day go to
// e.g. sunday -> 1 -> col-start-1
//      monday -> 2 -> col-start-2
// etc.
function getDayStyle(index: number, day: Date) {
    let colStartClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7'];

    return index === 0 && colStartClasses[getDay(day)];
}

export type NutritionistCalendarProps = {
    appointments: Appointment[];
};

export default function NutritionistCalendar({ appointments }: NutritionistCalendarProps) {
    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
    const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

    const days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

    function previousMonth() {
        const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    }

    function nextMonth() {
        const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    }

    const selectedDayMeetings = appointments.filter((consultation) => isSameDay(parseISO(consultation.attributes.date), selectedDay));

    return (
        <div className="pt-16">
            <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                    <div className="md:pr-14">
                        <div className="flex items-center">
                            <h2 className="flex-auto font-semibold text-gray-900">{format(firstDayCurrentMonth, 'MMMM yyyy', { locale: pt })}</h2>
                            <button type="button" onClick={previousMonth} className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Mês Passado</span>
                                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <button onClick={nextMonth} type="button" className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Mês Seguinte</span>
                                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                            <div>S</div>
                            <div>M</div>
                            <div>T</div>
                            <div>W</div>
                            <div>T</div>
                            <div>F</div>
                            <div>S</div>
                        </div>
                        <div className="grid grid-cols-7 mt-2 text-sm">
                            {days.map((day: Date, dayIdx: number) => (
                                <div key={day.toString()} className={`${getDayStyle(dayIdx, day)} py-1.5`}>
                                    <button type="button" onClick={() => setSelectedDay(day)} className={`${isEqual(day, selectedDay) && 'text-white'} ${!isEqual(day, selectedDay) && isToday(day) && 'text-red-500'} ${!isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900'} ${!isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400'} ${isEqual(day, selectedDay) && isToday(day) && 'bg-red-500'} ${isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900'} ${!isEqual(day, selectedDay) && 'hover:bg-gray-200'} ${(isEqual(day, selectedDay) || isToday(day)) && 'font-semibold'} mx-auto flex h-8 w-8 items-center justify-center rounded-full`}>
                                        <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
                                    </button>

                                    <div className="w-1 h-1 mx-auto mt-1">{appointments.some((consultation) => isSameDay(parseISO(consultation.attributes.date), day)) && <div className="w-1 h-1 rounded-full bg-sky-500"></div>}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <section className="mt-12 md:mt-0 md:pl-14">
                        <h2 className="font-semibold text-gray-900">
                            Consultas para <time dateTime={format(selectedDay, 'yyyy-MM-dd', { locale: pt })}>{format(selectedDay, 'MMMM dd, yyy', { locale: pt })}</time>
                        </h2>
                        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">{selectedDayMeetings.length > 0 ? selectedDayMeetings.map((consultation) => <Consultation consultation={consultation} key={consultation.id} />) : <p>Sem consultas para este dia.</p>}</ol>
                    </section>
                </div>
            </div>
        </div>
    );
}

function Consultation({ consultation }: { consultation: Appointment }) {
    const startDateTime = parseISO(consultation.attributes.date);
    const endDateTime = new Date();
    endDateTime.setTime(startDateTime.getTime() + 60 * 30 * 1000);

    return (
        <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
            <Image src={'/images/avatars/user.png'} alt="" className="flex-none w-10 h-10 rounded-full" width={50} height={50} />
            <div className="flex-auto">
                <p className="text-gray-900">{consultation.attributes.client.data.attributes.username}</p>
                <p className="mt-0.5">
                    <time dateTime={consultation.attributes.date}>{format(startDateTime, 'HH:mm ', { locale: pt })}</time>- <time dateTime={endDateTime.toString()}>{format(endDateTime, 'HH:mm')}</time>
                </p>
            </div>
            <Menu as="div" className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100">
                <div>
                    <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Abrir opções</span>
                        <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link href={`/appointment/${consultation.id}`} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                                        Informações
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>{({ active }) => <a className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm cursor-pointer`}>Cancelar</a>}</Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </li>
    );
}
