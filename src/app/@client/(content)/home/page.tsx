import BlogShowcase from '@/components/Blogs/BlogShowcase';
import React from 'react';
import SimpleCTA from '@/components/CTA/SimpleCTA';

export default function Home() {
    return (
        <>
            <SimpleCTA title="Parece que ainda não tem nenhuma consulta marcada..." description="Reserve agora a sua primeira consulta." buttonText="Marcar consulta" />
            <section>
                {
                    //@ts-ignore
                    <BlogShowcase />
                }
            </section>
        </>
    );
}
