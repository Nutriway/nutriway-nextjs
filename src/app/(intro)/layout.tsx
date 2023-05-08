import AppFooter from '@/components/AppFooter';
import React from 'react';
import IntroHeader from '@/components/Headers/IntroHeader';

export default function IntroLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <IntroHeader />
            {children}
            <AppFooter />
        </>
    );
}
