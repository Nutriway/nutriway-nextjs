import AppHeader from '@/components/Headers/AppHeader';
import AppFooter from '@/components/AppFooter';
import React from 'react';

const authHeader = { items: [], button: { title: 'Login', href: '/login' }, logo: false };

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeader {...authHeader} />
            {children}
            <AppFooter />
        </>
    );
}
