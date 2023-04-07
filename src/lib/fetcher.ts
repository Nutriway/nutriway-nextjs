type FetcherParameters = {
    url: string,
    method: "get" | "post",
    body?: object,
    json?: boolean,
}

const BASE_URL = process.env.REACT_APP_PROD || "http://localhost:1337/api";

export const fetcher = async ({ url, method, body, json = true }: FetcherParameters) => {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: method.toUpperCase(),
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        // handle error
        throw new Error("API error " + res.statusText);
    }

    if (json) {
        return await res.json();
    }
};
