import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { User } from '@/types/User';
import UserInfoForm from '@/components/Forms/UserInfoForm';

async function getUser(): Promise<User> {
    const user = await serverFetcher<User>({ url: '/users/me', method: 'get' });
    console.log(user);
    return user!; // this is always returned
}

export default async function Info() {
    const user = await getUser();

    return <UserInfoForm currentUser={user} />;
}
