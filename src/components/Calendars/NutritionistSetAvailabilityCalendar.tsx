'use client';
import React, { useState } from 'react';
import { add, format, previousSunday, sub } from 'date-fns';
import ScheduleSelector from 'react-schedule-selector';

const daysOfCalendar = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

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

export default function NutritionistSetAvailabilityCalendar() {
    const [schedule, setSchedule] = useState<Date[]>([]);

    return (
        <ScheduleSelector
            rowGap="0"
            columnGap="0"
            renderDateLabel={(date) => {
                return <div className="text-center">{daysOfCalendar[date.getDay()]}</div>;
            }}
            renderTimeLabel={(time) => {
                return <div className="text-left mx-2 my-0.5">{`${format(time, 'HH:mm')}`}</div>;
            }}
            renderDateCell={(date, selected) => {
                return <div className={`${!selected && 'border border-gray-100'} ${selected && 'bg-primary-400'} ${inSchedule(date, schedule) && !hasCellBefore(date, schedule, selected) && 'rounded-t-lg'} ${inSchedule(date, schedule) && !hasCellAfter(date, schedule, selected) && 'rounded-b-lg'} h-full hover:bg-primary-100 hover:animate-pulse bg-gray-50`} />;
            }}
            startDate={previousSunday(new Date())}
            selection={schedule}
            numDays={7}
            minTime={8}
            maxTime={19}
            hourlyChunks={2}
            onChange={setSchedule}
        />
    );
}
