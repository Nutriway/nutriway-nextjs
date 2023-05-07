import { getCookie } from 'cookies-next';
import { fetcher } from '@/lib/fetchers/fetchUtil';
import useSWR, { SWRConfiguration } from 'swr';
import { StrapiResponse } from '@/types/StrapiResponse';

type FetcherParameters = {
    url: string;
    method: 'post' | 'put' | 'delete';
    body?: object;
    json?: boolean;
};

// POST, PUT, DELETE fetcher
export function clientFetcher(params: FetcherParameters) {
    const jwt = getCookie('jwt-cookie');
    return fetcher({ ...params, jwt });
}

type UseFetcherParameters = {
    url: string;
    json?: boolean;
    shouldFetch?: boolean;
    config?: SWRConfiguration;
};

type UseFetcherReturn<DataType> = {
    data?: DataType;
    isLoading: boolean;
    isError: boolean;
    isValidating: boolean;
};

// SWR GET fetcher
export function useFetcher<DataType>({
    url,
    json = true,
    shouldFetch = true,
    config = {}, // define some default configs
}: UseFetcherParameters): UseFetcherReturn<StrapiResponse<DataType>> {
    const { data, error, isLoading, isValidating } = useSWR(
        () => (shouldFetch ? [url, json] : null),
        // @ts-ignore this is important to make sure we do not use GET for the normal client fetcher
        ([url, json]) => clientFetcher({ url, method: 'get', json }),
        config
    );

    return {
        data,
        isLoading,
        isError: error,
        isValidating,
    };
}
