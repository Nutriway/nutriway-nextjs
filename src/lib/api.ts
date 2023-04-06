type FetcherParameters = {
    url: string,
    method: 'get' | 'post',
    body: object,
    json?: boolean
}

export const fetcher = async ({url, method, body, json = true}: FetcherParameters) => {
    const res = await fetch(url, {
        method: method.toUpperCase(),
        ...(body && {body: JSON.stringify(body)}),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })

    if (!res.ok) {
        // handle error
        throw new Error('API error')
    }

    if (json) {
        const data = await res.json()
        return data.data
    }
}

export const register = (user: object) => {
    return fetcher({url: '/api/register', method: 'post', body: user})
}

export const signin = (user: object) => {
    return fetcher({url: '/api/signin', method: 'post', body: user})
}
