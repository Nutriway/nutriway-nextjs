import BlogShowcase from '@/components/Blogs/BlogShowcase';

export default function Home() {
    return (
        <>
            <section className="bg-white lightbg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 rounded-2xl bg-gray-50">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 lighttext-white">Parece que ainda não tem nenhuma consulta marcada...</h2>
                        <p className="mb-6 font-light text-gray-500 lighttext-gray-400 md:text-lg">Reserve agora a sua primeira consulta.</p>
                        <a href="#" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 lightbg-primary-600 lighthover:bg-primary-700 focus:outline-none lightfocus:ring-primary-800">
                            Marcar consulta
                        </a>
                    </div>
                </div>
            </section>
            <section>
                <BlogShowcase />
            </section>
        </>
    );
}
