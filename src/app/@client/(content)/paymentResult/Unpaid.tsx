'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Unpaid() {
    const router = useRouter();
    return (
        <div className="py-2 px-4 mx-auto max-w-screen-xl lg:py-4 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-2xl text-primary-600">
                    A consulta não foi marcada.
                </h1>
                <p className="mb-4 text-lg font-light text-gray-500">
                    O pagamento da consulta não foi efetuado com sucesso... Por favor, tente novamente.
                </p>
                <div className="w-full flex justify-center">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex text-white bg-primary-600 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
                    >
                        Tente novamente
                    </button>
                    <button
                        onClick={() => router.push('/home')}
                        className="ml-4 inline-flex text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
                    >
                        Voltar à página inicial
                    </button>
                </div>
            </div>
        </div>
    );
}
