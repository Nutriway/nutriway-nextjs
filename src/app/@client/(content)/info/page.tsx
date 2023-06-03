import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { User } from '@/types/User';
import UserInfoForm from '@/components/Forms/UserInfoForm';
import { Availability } from '@/types/Availability';
import { SingleStrapiResponse } from '@/types/StrapiResponse';

type InfoProps = {
    searchParams: {
        availability: number;
    };
};

async function getUser(): Promise<User> {
    return serverFetcher<User>({ url: '/users/me', method: 'get' });
}

async function getAvailability(id: number) {
    return serverFetcher<SingleStrapiResponse<Availability>>({
        url: `/nutritionist-availabilities/${id}?populate[nutritionist][populate]`,
        method: 'get',
    });
}

export default async function Info({ searchParams }: InfoProps) {
    const user = await getUser();
    const availability = await getAvailability(searchParams.availability);

    // TODO: solve when this availability is not found and show availability info on header

    return (
        <>
            <div className="bg-[url('/images/userInfoBG.png')] bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply">
                <div className=" py-4 px-4 lg:pt-24 pt-className72 lg:pb-80 mx-auto max-w-screen-sm text-center lg:px-6 ">
                    <h2 className="mb-4 text-4xl traclassName-tight font-extrabold text-white">Marcação da consulta</h2>
                    <p className="mb-16 font-light text-white sm:text-xl">
                        Antes de continuar, nós precisamos de saber um pouco mais sobre si.
                    </p>
                </div>
            </div>
            <UserInfoForm currentUser={user} availability={availability.data} />
        </>
    );
}
