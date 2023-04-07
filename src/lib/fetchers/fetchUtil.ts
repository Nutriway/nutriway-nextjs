type FetcherParameters = {
    url: string,
    method: "get" | "post",
    body?: object,
    json?: boolean,
    jwt?: string | boolean | null,
    revalidate?: number,
    cache?: "default" | "no-cache" | "reload" | "force-cache" | "only-if-cached"
}

const BASE_URL = process.env.REACT_APP_PROD || "http://127.0.0.1:1337/api";


export async function fetcher({
                                  url,
                                  method,
                                  body,
                                  json = true,
                                  jwt,
                                  revalidate = 10,
                                  cache = "default"
                              }: FetcherParameters) {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: method.toUpperCase(),
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(jwt && { Authorization: `Bearer ${jwt}` })
        },
        next: {
            revalidate
        },
        cache
    });

    if (!res.ok) {
        // handle error
        throw new Error("API error " + res.statusText);
    }

    if (json) {
        return await res.json();
    }
}
