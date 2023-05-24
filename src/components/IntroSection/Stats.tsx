import Container from '@/components/Container';
import Image from 'next/image';

export default function Stats() {
    return (
        <div id="solution">
            <Container>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-sky-500"
                >
                    <path
                        fillRule="evenodd"
                        d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
                        clipRule="evenodd"
                    />
                    <path
                        fillRule="evenodd"
                        d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
                        clipRule="evenodd"
                    />
                </svg>

                <div className="flex-row-reverse justify-between space-y-6 text-gray-600 md:flex md:gap-6 md:space-y-0 lg:gap-12 lg:items-center">
                    <div className="lg:w-1/2 md:5/12">
                        <Image
                            src="/images/hero/woman.png"
                            alt="image"
                            loading="lazy"
                            width="600"
                            height="600"
                            className="w-full"
                        />
                    </div>
                    <div className="lg:w-1/2 md:7/12">
                        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl light:text-white">
                            As consultas de nutrição são feitas por profissionais altamente competentes
                        </h2>
                        <div className="my-9 text-gray-600 light:text-gray-300">
                            Acreditamos na importância de oferecer um atendimento personalizado e de qualidade, por
                            isso, os nossos nutricionistas são selecionados criteriosamente.
                            <br />
                            Eles são registrados nos orgãos competentes e possuem especializações em diversas áreas,
                            como <strong>
                                nutrição esportiva, clínica, gestão de peso, alimentação vegetarianao
                            </strong>{' '}
                            e muito mais.
                        </div>
                        <div className="space-y-4 divide-y divide-gray-100 light:divide-gray-800">
                            <div className="flex gap-4 mt-8 md:items-center">
                                <div className="flex gap-4 w-12 h-12 bg-indigo-100 rounded-full light:bg-indigo-900/20">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="m-auto w-6 h-6 text-indigo-500 light:text-indigo-400"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="w-5/6">
                                    <h4 className="text-lg font-semibold text-gray-700 light:text-indigo-300">
                                        Consultas online
                                    </h4>
                                    <p className="text-gray-500 light:text-gray-400">
                                        Consegue agendar uma consulta com um nutricionista de forma rápida e fácil.
                                        Tendo a consulta diretamente através do nosso portal.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4 md:items-center">
                                <div className="flex gap-4 w-12 h-12 bg-teal-100 rounded-full light:bg-teal-900/20">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="m-auto w-6 h-6 text-teal-600 light:text-teal-400"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="w-5/6">
                                    <h4 className="text-lg font-semibold text-gray-700 light:text-teal-300">
                                        Plano personalizado
                                    </h4>
                                    <p className="text-gray-500 light:text-gray-400">
                                        A partir da sua consulta obterá um plano personalizado para atingir os seus
                                        objetivos. Terá um apoio constante do seu profissional de nutrição e poderá
                                        estar a par do plano a partir do nosso portal.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
