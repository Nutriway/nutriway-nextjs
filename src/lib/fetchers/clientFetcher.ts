import { getCookie } from "cookies-next";
import { fetcher } from "@/lib/fetchers/fetchUtil";
import useSWR from "swr";

type FetcherParameters = {
    url: string,
    method: "get" | "post",
    body?: object,
    json?: boolean,
}

export function clientFetcher(params: FetcherParameters) {
    const jwt = getCookie("jwt-cookie");
    return fetcher({ ...params, jwt });
}

type UseFetcherParameters = {
    url: string,
    json?: boolean,
    shouldFetch?: boolean,
}

type UseFetcherReturn = {
    data?: any,
    isLoading: boolean,
    isError: boolean,
}

export function useFetcher({ url, json = true, shouldFetch = true }: UseFetcherParameters): UseFetcherReturn {
    const { data, error, isLoading } = useSWR(() => (shouldFetch ? [url, json] : null),
        ([url, json]) => clientFetcher({ url, method: "get", json }));

    return {
        data,
        isLoading,
        isError: error
    };
}
