import AppHeader from '@/components/Headers/AppHeader';
import AppFooter from '@/components/AppFooter';
import React from 'react';

const loginHeader = { items: [], button: { title: 'Login', href: '/login' } };

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeader {...loginHeader} />
            {children}
            <AppFooter />
        </>
    );
}
