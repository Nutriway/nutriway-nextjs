'use client';
import React, { useState } from 'react';
import { add, format, previousSunday, sub } from 'date-fns';
import ScheduleSelector from 'react-schedule-selector';
import { clientFetcher, useFetcher } from '@/lib/fetchers/clientFetcher';
import { User } from '@/types/User';
import useSWRMutation from 'swr/mutation';
import { Availability } from '@/types/Availability';

type NutritionistAvailabilityCalendarProps = {
    availabilities: Availability[];
};

const daysOfCalendar = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
];

function hasCellBefore(date: Date, schedule: Date[], selected: boolean) {
    if (selected) {
        const previousCell = sub(date, { minutes: 30 });
        return schedule.map((s) => s.getTime()).includes(previousCell.getTime());
    }
    return true;
}

function hasCellAfter(date: Date, schedule: Date[], selected: boolean) {
    if (selected) {
        const previousCell = add(date, { minutes: 30 });
        return schedule.map((s) => s.getTime()).includes(previousCell.getTime());
    }
    return true;
}

function inSchedule(date: Date, schedule: Date[]) {
    return schedule.map((s) => s.getTime()).includes(date.getTime());
}

async function submitAvailability(url: string, { arg }: { arg: { nutritionist: User; dates: Date[] } }) {
    await clientFetcher<Availability>({
        method: 'post',
        url,
        body: {
            nutritionist: { id: arg.nutritionist.id },
            date: arg.date, // TODO: discuss this with the team. The current way to set availabilities is odd
        },
    });
}

export default function NutritionistSetAvailabilityCalendar({ availabilities }: NutritionistAvailabilityCalendarProps) {
    const { data: nutritionist } = useFetcher<User>({ url: '/users/me' });
    const { trigger } = useSWRMutation(`/nutritionist-availabilities`, submitAvailability);
    const [schedule, setSchedule] = useState<Date[]>(availabilities.map((a) => new Date(a.attributes.date)));

    const handleSubmit = async (dates: Date[]) => {
        setSchedule(dates);
        await trigger({ nutritionist, dates });
    };

    return (
        <ScheduleSelector
            rowGap="0"
            columnGap="0"
            renderDateLabel={(date) => {
                return <div className="text-center font-medium text-sm">{daysOfCalendar[date.getDay()]}</div>;
            }}
            renderTimeLabel={(time) => {
                return <div className="text-left mx-2 my-0.5">{`${format(time, 'HH:mm')}`}</div>;
            }}
            renderDateCell={(date, selected) => {
                return (
                    <div
                        className={`${!selected && 'border border-gray-100'} ${
                            selected && 'border-t border-dotted border-gray-100 bg-primary-500'
                        } ${inSchedule(date, schedule) && !hasCellBefore(date, schedule, selected) && 'rounded-t-lg'} ${
                            inSchedule(date, schedule) && !hasCellAfter(date, schedule, selected) && 'rounded-b-lg'
                        } h-full hover:bg-primary-300 hover:animate-pulse bg-gray-50`}
                    />
                );
            }}
            startDate={previousSunday(new Date())}
            selection={schedule}
            numDays={7}
            minTime={8}
            maxTime={19}
            hourlyChunks={2}
            onChange={async (dates) => {
                await handleSubmit(dates);
            }}
        />
    );
}
