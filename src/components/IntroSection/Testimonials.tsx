import React from 'react';
import Container from '@/components/Container';
import Image from 'next/image';

const testimonials = [
    {
        author: 'Julyane Fernandes',
        date: '6 de Março de 2023',
        phrase: '“Adorei a consulta, fácil marcação e rápida disponibilidade, um plano alimentar realista com atenção aos meus objetivos e que encaixa perfeitamente na minha rotina. Estou bastante satisfeita.”',
        image: '/images/avatars/avatar-2.png',
    },
    {
        author: 'Tomás Santos',
        date: '12 de Fevereiro de 2023',
        phrase: '“Adorei a consulta! Com este plano alimentar digital fica me muito mais fácil comprar os ingredientes para as receitas.”',
        image: '/images/avatars/avatar-1.png',
    },
    {
        author: 'Carlos Teixeira',
        date: '3 de Março de 2023',
        phrase: '“A consulta foi ótima, fácil de marcar e com grande disponibilidade.”',
        image: '/images/avatars/avatar-3.png',
    },
    {
        author: 'Ana Lúcia Silva',
        date: '15 de Março de 2023',
        phrase: '“Estou muito impressionada com a qualidade do atendimento e o quão personalizado é o meu plano alimentar. Recomendo fortemente!”',
        image: '/images/avatars/avatar-4.png',
    },
    {
        author: 'Mariana Sampaio',
        date: '20 de Março de 2023',
        phrase: '“Excelente serviço! A consulta foi simples e o plano alimentar se encaixa perfeitamente no meu estilo de vida agitado.”',
        image: '/images/avatars/avatar-6.png',
    },
    {
        author: 'Paulo Roberto',
        date: '28 de Abril de 2023',
        phrase: '“Nunca pensei que seria tão fácil seguir um plano alimentar. Fantástico!”',
        image: '/images/avatars/avatar-5.png',
    },
];
export default function Testimonials() {
    return (
        <div className="text-gray-600 light:text-gray-300" id="testimonials">
            <Container>
                <div className="px-6 mb-20 space-y-4 md:px-0">
                    <h2 className="text-2xl font-bold text-center text-gray-800 md:text-4xl light:text-white">
                        Nós temos alguns fãs.
                    </h2>
                </div>
                <div className="gap-8 space-y-8 md:columns-2 lg:columns-3">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="p-8 bg-white rounded-3xl border border-gray-100 shadow-2xl aspect-auto light:bg-gray-800 light:border-gray-700 shadow-gray-600/10 light:shadow-none"
                        >
                            <div className="flex gap-4">
                                <Image
                                    className="w-12 h-12 rounded-full"
                                    src={testimonial.image}
                                    alt="user avatar"
                                    width="400"
                                    height="400"
                                    loading="lazy"
                                />
                                <div>
                                    <h6 className="text-lg font-medium text-gray-700 light:text-white">
                                        {testimonial.author}
                                    </h6>
                                    <p className="text-sm text-gray-500 light:text-gray-300">{testimonial.date}</p>
                                </div>
                            </div>
                            <p className="mt-8">{testimonial.phrase}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
