export default function NutritionistAvailabilityOverview() {
    return (
        <section className="">
            <div className="flex justify-between">
                <h2 className="text-base font-semibold leading-6 text-gray-900">Disponibilidade</h2>
                <button className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">Editar</button>
            </div>
            <ol className="mt-2 divide-y divide-gray-200 text-sm leading-6 text-gray-500">
                <li className="py-4 sm:flex">
                    <time dateTime="2022-01-17" className="w-28 flex-none">
                        Wed, Jan 12
                    </time>
                    <p className="mt-2 flex-auto sm:mt-0">Nothing on today’s schedule</p>
                </li>
                <li className="py-4 sm:flex">
                    <time dateTime="2022-01-19" className="w-28 flex-none">
                        Thu, Jan 13
                    </time>
                    <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">View house with real estate agent</p>
                    <p className="flex-none sm:ml-6">
                        <time dateTime="2022-01-13T14:30">2:30 PM</time>- <time dateTime="2022-01-13T16:30">4:30 PM</time>
                    </p>
                </li>
                <li className="py-4 sm:flex">
                    <time dateTime="2022-01-20" className="w-28 flex-none">
                        Fri, Jan 14
                    </time>
                    <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">Meeting with bank manager</p>
                    <p className="flex-none sm:ml-6">All day</p>
                </li>
                <li className="py-4 sm:flex">
                    <time dateTime="2022-01-18" className="w-28 flex-none">
                        Mon, Jan 17
                    </time>
                    <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0">Sign paperwork at lawyers</p>
                    <p className="flex-none sm:ml-6">
                        <time dateTime="2022-01-17T10:00">10:00 AM</time>- <time dateTime="2022-01-17T10:15">10:15 AM</time>
                    </p>
                </li>
            </ol>
        </section>
    );
}
