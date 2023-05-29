import React from 'react';
import Container from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';

type HeaderProps = {
    items: {
        title: string;
        href: string;
    }[];
    button: {
        title: string;
        href: string;
    };
    logo: boolean;
};

export default function AppHeader({ items, button, logo }: HeaderProps) {
    return (
        <header>
            <nav className="absolute z-10 w-full">
                <Container>
                    <div className="flex relative flex-wrap gap-6 justify-between items-center py-2 md:gap-0 md:py-4">
                        <input
                            aria-hidden="true"
                            type="checkbox"
                            name="toggle_nav"
                            id="toggle_nav"
                            className="hidden peer"
                        />
                        <div className="flex relative z-20 justify-between w-full md:px-0 lg:w-max">
                            {logo && (
                                <>
                                    {' '}
                                    <Link href="/" aria-label="logo" className="flex items-center space-x-2">
                                        <Image
                                            className="mr-2 w-40"
                                            src="/images/logo.svg"
                                            loading="lazy"
                                            alt="logo"
                                            width="800"
                                            height="800"
                                        />
                                    </Link>
                                    <div className="flex relative items-center max-h-10 lg:hidden">
                                        <label
                                            role="button"
                                            htmlFor="toggle_nav"
                                            aria-label="humburger"
                                            id="hamburger"
                                            className="relative p-6 -mr-6"
                                        >
                                            <div
                                                aria-hidden="true"
                                                id="line"
                                                className="m-auto w-5 h-0.5 rounded transition duration-300 bg-sky-900 light:bg-gray-300"
                                            ></div>
                                            <div
                                                aria-hidden="true"
                                                id="line2"
                                                className="m-auto mt-2 w-5 h-0.5 rounded transition duration-300 bg-sky-900 light:bg-gray-300"
                                            ></div>
                                        </label>
                                    </div>
                                </>
                            )}
                        </div>
                        <div
                            aria-hidden="true"
                            className="fixed inset-0 z-10 w-screen h-screen transition duration-500 origin-bottom scale-y-0 lg:hidden bg-white/70 backdrop-blur-2xl peer-checked:origin-top peer-checked:scale-y-100 light:bg-gray-900/70"
                        ></div>
                        <div className="absolute left-0 top-full invisible z-20 flex-col flex-wrap gap-6 justify-end p-8 w-full bg-white rounded-3xl border border-gray-100 shadow-2xl opacity-0 transition-all duration-300 origin-top scale-95 translate-y-1 lg:flex lg:relative lg:visible lg:flex-row lg:gap-0 lg:items-center lg:p-0 lg:w-7/12 lg:bg-transparent lg:border-none lg:shadow-none lg:opacity-100 lg:scale-100 lg:translate-y-0 shadow-gray-600/10 peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible light:shadow-none light:bg-gray-800 light:border-gray-700 lg:peer-checked:translate-y-0">
                            <div className="w-full text-gray-600 lg:pt-0 lg:pr-4 lg:w-auto light:text-gray-300">
                                <ul className="flex flex-col gap-6 font-medium tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
                                    {items.map((item) => (
                                        <li key={item.title}>
                                            <Link
                                                href={item.href}
                                                className="block transition md:px-4 hover:text-primary-900"
                                            >
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-12 lg:mt-0">
                                <Link
                                    href={button.href}
                                    className="flex relative justify-center items-center px-4 w-full h-9 sm:w-max active:duration-75 before:absolute before:inset-0 before:rounded-full before:bg-primary-900 before:transition before:duration-300 hover:before:scale-105 active:before:scale-95"
                                >
                                    <span className="relative text-sm font-semibold text-white">{button.title}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </nav>
        </header>
    );
}
