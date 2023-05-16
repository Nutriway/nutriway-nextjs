import { cookies } from 'next/headers';
import { fetcher } from '@/lib/fetchers/fetchUtil';

type FetcherParameters = {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
    body?: object;
    json?: boolean;
    revalidate?: number; // https://beta.nextjs.org/docs/data-fetching/revalidating
    cache?: 'default' | 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached'; // https://beta.nextjs.org/docs/data-fetching/caching
};

export async function serverFetcher<DataType>(params: FetcherParameters): Promise<DataType | undefined> {
    const jwt = cookies().get('jwt-cookie')?.value;
    return fetcher({ ...params, jwt });
}
