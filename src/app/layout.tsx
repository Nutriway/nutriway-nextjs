import '@/styles/global.css';
import React from 'react';
import { Inter } from 'next/font/google';
import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { User } from '@/types/User';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Nutriway',
    description: 'Bringing health and nutrition to your life.',
};

export default async function RootLayout({ children, modal, nutritionist, client }: { children: React.ReactNode; modal: React.ReactNode; nutritionist: React.ReactNode; client: React.ReactNode }) {
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
                {user ? userType : children}
                {modal}
            </body>
        </html>
    );
}
