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
    logo: true,
};

export default function NutritionistLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
    return (
        <>
            <AppHeader {...nutritionistHeader} />
            <div className="pt-20">{children}</div>
            {modal}
            <AppFooter />
        </>
    );
}
