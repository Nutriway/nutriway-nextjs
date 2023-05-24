import '@/styles/global.css';
import React from 'react';
import LoginForm from '@/components/Forms/LoginForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
    return (
        <section className="bg-gray-50 light:bg-gray-900">
            <div className="grid py-8 px-4 mx-auto max-w-screen-xl lg:grid-cols-12 lg:gap-20 lg:py-16">
                <div className="place-self-center w-full lg:col-span-6">
                    <div className="p-6 mx-auto bg-white rounded-lg shadow sm:p-8 sm:max-w-xl light:bg-gray-800">
                        <Link
                            href="/"
                            className="inline-flex items-center mb-4 w-full text-xl font-semibold text-gray-900 light:text-white"
                        >
                            <Image
                                className="mr-2 w-80"
                                src="./images/logo.svg"
                                loading="eager"
                                alt="logo"
                                width="800"
                                height="800"
                            />
                        </Link>
                        <h1 className="mb-2 text-2xl font-bold tracking-tight leading-tight text-gray-900 light:text-white">
                            Bem-vindo.
                        </h1>
                        <p className="text-sm font-light text-gray-500 light:text-gray-300">
                            Inicie sessão. Não tem uma conta?{' '}
                            <Link
                                href="/register"
                                className="font-medium hover:underline text-primary-600 light:text-primary-500"
                            >
                                Registe-se
                            </Link>
                            .
                        </p>
                        <LoginForm />
                    </div>
                </div>
                <div className="place-self-center mr-auto lg:col-span-6">
                    <Image
                        className="hidden mx-auto lg:flex"
                        loading="eager"
                        width={500}
                        height={500}
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
                        alt="illustration"
                    />
                </div>
            </div>
        </section>
    );
}
