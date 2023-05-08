import Potato from '@/components/Potatoes/Potato';
import { cookies } from 'next/headers';
import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { Appointment } from '@/types/Appointment';
import Link from 'next/link';
import HomeCheck from '@/components/Buttons/HomeCheck';
import EmailQuestionForm from '@/components/Forms/EmailQuestionForm';

const getAllAppointments = async () => {
    return serverFetcher<Appointment>({
        url: `/appointments`,
        method: 'get',
    });
};

const getAppointmentFromId = async (id: number) => {
    const data = await serverFetcher<Appointment>({
        url: `/appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=2000&filters[id][$eq]=${id}`,
        method: 'get',
    });
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // this is only here so that we can see the loading animation
    // please remove this after :D
    return cookies().get('jwt-cookie')?.value;
};

const content = {
    title: 'This is a server component',
};

export default async function Intro() {
    // Start using URL parameters for stuff like pagination
    const appointment = await getAllAppointments();
    const jwt = await getAppointmentFromId(appointment?.data[0].id || 1); // this is just an example, don't do the `|| 1` part in your code
    return (
        <div>
            <Potato></Potato>
            <h1>{content.title}</h1>
            <p>{jwt}</p>
            <Link href={`/cool`}>
                <div className="hover:ring-gray-300 cursor-pointer ring">{'Click this to start'}</div>
            </Link>
            <HomeCheck />
            <EmailQuestionForm />
        </div>
    );
}
