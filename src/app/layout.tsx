import '@/styles/global.css';
import React from 'react';
import { Inter } from 'next/font/google';
import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { User } from '@/types/User';
import { cookies } from 'next/headers';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Nutriway',
    description: 'Bringing health and nutrition to your life.',
};

export default async function RootLayout({ children, modal, nutritionist, client }: { children: React.ReactNode; modal: React.ReactNode; nutritionist: React.ReactNode; client: React.ReactNode }) {
    // get current user type
    // @ts-ignore This endpoint is different from the others, has no `data` key :(
    // every other endpoint returns { data: {}, meta: {} }
    // this should be fixed in the future versions of our API
    const user =
        cookies().get('jwt-cookie') &&
        ((await serverFetcher<User>({
            url: '/users/me',
            method: 'get',
        })) as User | undefined);
    const userType = user?.type === 'client' ? client : nutritionist;

    return (
        <html lang="pt">
            <body className={`bg-white light:bg-gray-900 text-black ${inter.className}`}>
                <AppHeader />
                {user ? userType : children}
                {modal}
                <AppFooter />
            </body>
        </html>
    );
}

// data: {}, meta: {}
// {}
