import RegisterForm from '@/components/Forms/RegisterForm';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export default function Register() {
    return (
        <section className="bg-gray-50 light:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
                <div className="w-full p-6 mx-auto bg-white rounded-lg shadow light:bg-gray-800 sm:max-w-xl lg:col-span-6 sm:p-8">
                    <a href="" className="inline-flex w-full items-center mb-4 text-xl font-semibold text-gray-900 light:text-white">
                        <Image className="w-80 mr-2" src="./images/logo.svg" loading="lazy" alt="logo" width="800" height="800" />
                    </a>
                    <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 light:text-white">Crie a sua conta</h1>
                    <p className="text-sm font-light text-gray-500 light:text-gray-300">
                        Entre para agendar consultas. Já tem uma conta?{' '}
                        <Link href="/login" className="font-medium text-primary-600 hover:underline light:text-primary-500">
                            Entre aqui
                        </Link>
                        .
                    </p>
                    <RegisterForm />
                </div>
                <div className="mr-auto place-self-center lg:col-span-6">
                    <Image className="hidden mx-auto lg:flex" width={500} height={500} src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg" alt="illustration" />
                </div>
            </div>
        </section>
    );
}