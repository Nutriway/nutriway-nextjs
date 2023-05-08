import AppHeader from '@/components/Headers/AppHeader';
import AppFooter from '@/components/AppFooter';
import React from 'react';

const nutritionistHeader = {
    items: [
        {
            title: 'Minhas Consultas',
            href: '/consultas',
        },
    ],
    button: { title: 'Perfil', href: '/perfil' },
};

export default function NutritionistLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeader {...nutritionistHeader} />
            <div className="pt-20">{children}</div>
            <AppFooter />
        </>
    );
}
