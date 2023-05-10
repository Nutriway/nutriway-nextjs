type FetcherParameters = {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
    body?: object;
    json?: boolean;
    jwt?: string | boolean | null;
    revalidate?: number; // https://beta.nextjs.org/docs/data-fetching/revalidating
    cache?: 'default' | 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached'; // https://beta.nextjs.org/docs/data-fetching/caching
};

const BASE_URL = process.env.REACT_APP_PROD || 'http://127.0.0.1:1337/api';

export async function fetcher({ url, method, body, json = true, jwt, revalidate = 60, cache = 'default' }: FetcherParameters) {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: method.toUpperCase(),
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(jwt && { Authorization: `Bearer ${jwt}` }),
        },
        next: {
            revalidate,
        },
        cache,
    });

    if (!res.ok) {
        if (res.status === 404) {
            return undefined;
        }
        // handle error
        console.error(res);
        throw new Error('API error ' + res.statusText);
    }

    if (json) {
        return await res.json();
    }
}
