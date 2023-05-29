import AppFooter from '@/components/AppFooter';
import React from 'react';
import AppHeader from '@/components/Headers/AppHeader';

const clientHeader = {
    items: [{ title: 'Consultas', href: '/consultas' }],
    button: { title: 'Perfil', href: '/perfil' },
    logo: true,
};

export default function ClientContentLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeader {...clientHeader} />
            <div className="pt-20">{children}</div>
            <AppFooter />
        </>
    );
}
