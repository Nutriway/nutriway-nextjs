'use client';
import React from 'react';
import NutritionistPlansList from '@/oldVersion/components/organisms/NutritionistPlansList';

export default function DietPlan() {
    return (
        <div className="flex justify-center items-center py-8 mx-auto max-w-6xl rounded-2xl bg-gray-50">
            <NutritionistPlansList />
        </div>
    );
}
