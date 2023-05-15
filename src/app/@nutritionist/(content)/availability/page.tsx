import NutritionistSetAvailabilityCalendar from '@/components/Calendars/NutritionistSetAvailabilityCalendar';
import React from 'react';

export default function Availability() {
    return (
        <div className="flex justify-center items-center py-8 mx-auto max-w-6xl rounded-2xl bg-gray-50">
            <NutritionistSetAvailabilityCalendar />
        </div>
    );
}
