import React from 'react';
import HeroSection from '@/components/IntroSection/HeroSection';
import Features from '@/components/IntroSection/Features';
import Stats from '@/components/IntroSection/Stats';
import Testimonials from '@/components/IntroSection/Testimonials';
import CallToAction from '@/components/IntroSection/CallToAction';

export default function Intro() {
    return (
        <main className="space-y-40 mb-40">
            <HeroSection />
            <Features />
            <Stats />
            <Testimonials />
            <CallToAction />
        </main>
    );
}
