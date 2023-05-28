import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { User } from '@/types/User';
import UserInfoForm from '@/components/Forms/UserInfoForm';

async function getUser(): Promise<User | undefined> {
    return serverFetcher<User>({ url: '/users/me', method: 'get' });
}

export default async function Info() {
    const user = await getUser();

    return (
        <UserInfoForm
            currentUser={user!} // user is always returned
            appointmentDate={new Date()}
            nutritionistAvailability={1}
            nutritionistId={1}
        />
    );
}
