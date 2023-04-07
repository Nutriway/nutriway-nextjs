import { getCookie } from "cookies-next";
import { fetcher } from "@/lib/fetchers/fetchUtil";
import useSWR from "swr";

type FetcherParameters = {
    url: string,
    method: "post" | "put" | "delete",
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

type UseFetcherReturn<DataType> = {
    data?: DataType,
    isLoading: boolean,
    isError: boolean,
}

export function useFetcher<DataType>({
                                         url,
                                         json = true,
                                         shouldFetch = true
                                     }: UseFetcherParameters): UseFetcherReturn<DataType> {
    const { data, error, isLoading } = useSWR(() => (shouldFetch ? [url, json] : null),
        // @ts-ignore this is important to make sure we do not use GET for the normal client fetcher
        ([url, json]) => clientFetcher({ url, method: "get", json }));

    return {
        data,
        isLoading,
        isError: error
    };
}
