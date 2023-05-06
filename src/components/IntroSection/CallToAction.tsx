import React from "react";
import Container from "@/components/Container";
import Image from "next/image";

export default function CallToAction() {
    return (
        <div className="relative py-16">
            <div aria-hidden="true"
                 className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 light:opacity-20">
                <div
                    className="blur-[106px] h-56 bg-gradient-to-br from-primary-900 to-purple-400 light:from-blue-700"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 light:to-indigo-600"></div>
            </div>
            <Container>
                <div className="relative">
                    <div className="flex items-center justify-center -space-x-2">
                        <Image
                            loading="lazy"
                            width="400"
                            height="400"
                            src="/images/avatars/avatar.webp"
                            alt="member photo"
                            className="h-8 w-8 rounded-full object-cover"
                        />
                        <Image
                            loading="lazy"
                            width="200"
                            height="200"
                            src="/images/avatars/avatar-2.webp"
                            alt="member photo"
                            className="h-12 w-12 rounded-full object-cover"
                        />
                        <Image
                            loading="lazy"
                            width="200"
                            height="200"
                            src="/images/avatars/avatar-3.webp"
                            alt="member photo"
                            className="z-10 h-16 w-16 rounded-full object-cover"
                        />
                        <Image
                            loading="lazy"
                            width="200"
                            height="200"
                            src="/images/avatars/avatar-4.webp"
                            alt="member photo"
                            className="relative h-12 w-12 rounded-full object-cover"
                        />
                        <Image
                            loading="lazy"
                            width="200"
                            height="200"
                            src="/images/avatars/avatar-1.webp"
                            alt="member photo"
                            className="h-8 w-8 rounded-full object-cover"
                        />
                    </div>
                    <div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
                        <h1 className="text-center text-4xl font-bold text-gray-800 light:text-white md:text-5xl">Comece
                            já</h1>
                        <p className="text-center text-xl text-gray-600 light:text-gray-300">
                            Junte-se a nós e descubra como a nutrição adequada pode transformar sua vida!
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a
                                href="#"
                                className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-primary-900 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                            >
              <span className="relative text-base font-semibold text-white light:text-dark"
              >Comece já</span
              >
                            </a>
                            <a
                                href="#"
                                className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary-900/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 light:before:border-gray-700 light:before:bg-gray-800 sm:w-max"
                            >
              <span
                  className="relative text-base font-semibold text-primary-900 light:text-white"
              >Saber mais</span
              >
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
