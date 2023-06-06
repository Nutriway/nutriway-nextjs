import React from 'react';

type SimpleCTAProps = {
    title: string;
    description: string;
    buttonText?: string;
    children?: React.ReactNode;
};
export default function SimpleCTA({ title, description, buttonText, children }: SimpleCTAProps) {
    return (
        <section className="bg-white lightbg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 rounded-2xl bg-gray-50">
                <div className="mx-auto max-w-screen-md text-center">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 lighttext-white">
                        {title}
                    </h2>
                    <p className="mb-6 font-light text-gray-500 lighttext-gray-400 md:text-lg">{description}</p>
                    {buttonText && (
                        <a
                            href="#"
                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 lightbg-primary-600 lighthover:bg-primary-700 focus:outline-none lightfocus:ring-primary-800"
                        >
                            {buttonText}
                        </a>
                    )}
                    {children}
                </div>
            </div>
        </section>
    );
}
