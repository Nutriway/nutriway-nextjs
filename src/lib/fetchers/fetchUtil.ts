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

function showError(url: string, body: object | undefined, method: string, status?: number) {
    console.error(`url: ${BASE_URL}${url}\nbody: ${JSON.stringify(body)}\nmethod: ${method}\nstatus: ${status}`);
}

export async function fetcher({
    url,
    method,
    body,
    json = true,
    jwt,
    revalidate = 60,
    cache = 'default',
}: FetcherParameters) {
    try {
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
            showError(url, body, method, res.status);
            return null;
        } else if (json) {
            return await res.json();
        }
    } catch (error) {
        console.error(error);
        showError(url, body, method);
    }
}
