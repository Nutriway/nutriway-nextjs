export default function Info() {
    return (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Informações do cliente</h2>
            <form action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="my-3 sm:col-span-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                                Motivo da consulta
                            </label>
                            <textarea
                                required
                                id="description"
                                rows={4}
                                className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Eu desejo levar uma vida mais saudável e perder peso, procuro um plano de treino e alimentar que me ajude a atingir os meus objetivos."
                            ></textarea>
                        </div>
                        <div className="my-3 sm:col-span-2">
                            <label htmlFor="condition" className="block mb-2 text-sm font-medium text-gray-900">
                                Possui alguma condição ou restrição médica? Se sim, preencha-a abaixo
                            </label>
                            <textarea
                                id="condition"
                                rows={4}
                                className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Sou diabético(a) e tenho Hipotiroidismo."
                            ></textarea>
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
                            Género
                        </label>
                        <select
                            id="gender"
                            className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="N/A" selected>
                                Não especificado
                            </option>
                            <option value="male">Masculino</option>
                            <option value="female">Feminino</option>
                            <option value="other">Outro</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">
                            Idade
                        </label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                            placeholder="Idade"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900">
                            Peso
                        </label>
                        <input
                            type="number"
                            name="weight"
                            id="weight"
                            className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                            placeholder="Peso (kg)"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900">
                            Altura
                        </label>
                        <input
                            type="number"
                            name="height"
                            id="height"
                            className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600"
                            placeholder="Altura (cm)"
                            required
                        />
                    </div>
                    <div className="my-6 sm:col-span-2">
                        <label htmlFor="activity" className="block mb-2 text-sm font-medium text-gray-900">
                            Ativilidade física
                        </label>
                        <select
                            id="activity"
                            className="block p-2.5 w-full text-sm placeholder-gray-400 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="low" selected>
                                Sedentário (pouco ou nenhum exercício)
                            </option>
                            <option value="medium-low">Levemente ativo (exercício leve 1 a 3 vezes por semana)</option>
                            <option value="medium">
                                Moderadamente ativo (exercício moderado 3 a 5 vezes por semana)
                            </option>
                            <option value="medium-high">
                                Bastante ativo (exercício pesado de 5 a 6 vezes por semana)
                            </option>
                            <option value="high">
                                Extremamente ativo (exercício pesado diariamente ou até 2 vezes por dia)
                            </option>
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-5 mt-4 text-sm font-medium text-center text-white rounded-lg sm:mt-6 focus:ring-4 bg-primary-700 hover:bg-primary-800 focus:ring-primary-200"
                >
                    Guardar Informações
                </button>
            </form>
        </div>
    );
}
