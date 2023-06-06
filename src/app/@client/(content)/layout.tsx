import AppFooter from '@/components/AppFooter';
import React from 'react';
import AppHeader from '@/components/Headers/AppHeader';

const clientHeader = {
    items: [{ title: 'Consultas', href: '/consultas' }],
    button: { title: 'Perfil', href: '/perfil' },
    logo: true,
};

export default function ClientContentLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <>
            <AppHeader {...clientHeader} />
            <div className="pt-20">{children}</div>
            {modal}
            <AppFooter />
        </>
    );
}
