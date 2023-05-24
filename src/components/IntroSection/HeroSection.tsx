import React from 'react';
import Container from '@/components/Container';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <div className="relative" id="home">
            <div
                aria-hidden="true"
                className="grid absolute inset-0 grid-cols-2 -space-x-52 opacity-40 light:opacity-20"
            >
                <div className="h-56 bg-gradient-to-br to-purple-400 blur-[106px] from-primary-900 light:from-blue-700"></div>
                <div className="h-32 bg-gradient-to-r from-cyan-400 blur-[106px] to-sky-300 light:to-indigo-600"></div>
            </div>
            <Container>
                <div className="relative pt-36 ml-auto">
                    <div className="mx-auto text-center lg:w-4/5">
                        <h1 className="text-5xl font-bold text-gray-900 md:text-6xl xl:text-7xl light:text-black">
                            Nutrição online com <span className="text-primary-900 light:text-white">resultados.</span>
                        </h1>
                        <p className="mt-8 text-gray-700 light:text-gray-300">
                            Consultas personalizadas, acompanhamento nutricional e planos alimentares individualizados,
                            tudo no conforto da sua casa!
                        </p>
                        <div className="flex flex-wrap gap-y-4 gap-x-6 justify-center mt-16">
                            <Link
                                href="/login"
                                className="flex relative justify-center items-center px-6 w-full h-11 sm:w-max active:duration-75 before:absolute before:inset-0 before:rounded-full before:bg-primary-900 before:transition before:duration-300 hover:before:scale-105 active:before:scale-95"
                            >
                                <span className="relative text-base font-semibold text-white">
                                    Marque uma consulta!
                                </span>
                            </Link>
                            <a
                                href="#"
                                className="flex relative justify-center items-center px-6 w-full h-11 sm:w-max active:duration-75 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary-900/10 before:bg-gradient-to-b before:transition before:duration-300 light:before:border-gray-700 light:before:bg-gray-800 hover:before:scale-105 active:before:scale-95"
                            >
                                <span className="relative text-base font-semibold text-primary-900 light:text-white">
                                    Saber mais
                                </span>
                            </a>
                        </div>
                        <div className="hidden justify-between py-8 mt-16 border-gray-100 sm:flex border-y light:border-gray-800">
                            <div className="text-left">
                                <h6 className="mr-2 text-lg font-semibold text-gray-700 light:text-white">
                                    Nutricionistas certificados
                                </h6>
                                <p className="mt-2 mr-4 text-gray-500">
                                    Marca a sua consulta no dia e hora que seja mais conveniente.
                                </p>
                            </div>
                            <div className="text-left">
                                <h6 className="mr-2 text-lg font-semibold text-gray-700 light:text-white">
                                    Planos personalizados
                                </h6>
                                <p className="mt-2 mr-4 text-gray-500">
                                    Recebe o seu plano nutriconal prescrito por um nutricionista certificado.
                                </p>
                            </div>
                            <div className="text-left">
                                <h6 className="mr-2 text-lg font-semibold text-gray-700 light:text-white">
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
