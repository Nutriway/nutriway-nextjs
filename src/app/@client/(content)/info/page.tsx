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

    // TODO: solve when this availability is not found

    return <UserInfoForm currentUser={user} availability={availability.data} />;
}
