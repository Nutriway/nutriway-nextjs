import React from 'react';
import Container from '@/components/Container';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <div className="relative" id="home">
            <div
                aria-hidden="true"
                className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 light:opacity-20"
            >
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary-900 to-purple-400 light:from-blue-700"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 light:to-indigo-600"></div>
            </div>
            <Container>
                <div className="relative pt-36 ml-auto">
                    <div className="lg:w-2/3 text-center mx-auto">
                        <h1 className="text-gray-900 light:text-black font-bold text-5xl md:text-6xl xl:text-7xl">
                            Nutrição online com <span className="text-primary-900 light:text-white">resultados.</span>
                        </h1>
                        <p className="mt-8 text-gray-700 light:text-gray-300">
                            Consultas personalizadas, acompanhamento nutricional e planos alimentares individualizados,
                            tudo no conforto da sua casa!
                        </p>
                        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                            <Link
                                href="/login"
                                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary-900 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                            >
                                <span className="relative text-base font-semibold text-white">
                                    Marque uma consulta!
                                </span>
                            </Link>
                            <a
                                href="#"
                                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary-900/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 light:before:border-gray-700 light:before:bg-gray-800 sm:w-max"
                            >
                                <span className="relative text-base font-semibold text-primary-900 light:text-white">
                                    Saber mais
                                </span>
                            </a>
                        </div>
                        <div className="hidden py-8 mt-16 border-y border-gray-100 light:border-gray-800 sm:flex justify-between">
                            <div className="text-left">
                                <h6 className="text-lg mr-2 font-semibold text-gray-700 light:text-white">
                                    Nutricionistas certificados
                                </h6>
                                <p className="mt-2 mr-4 text-gray-500">
                                    Marca a sua consulta no dia e hora que seja mais conveniente.
                                </p>
                            </div>
                            <div className="text-left">
                                <h6 className="text-lg mr-2 font-semibold text-gray-700 light:text-white">
                                    Planos personalizados
                                </h6>
                                <p className="mt-2 mr-4 text-gray-500">
                                    Recebe o seu plano nutriconal prescrito por um nutricionista certificado.
                                </p>
                            </div>
                            <div className="text-left">
                                <h6 className="text-lg mr-2 font-semibold text-gray-700 light:text-white">
                                    Resultados garantidos
                                </h6>
                                <p className="mt-2 mr-4 text-gray-500">
                                    Obtenha resultados mesmo a partir da sua casa.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
