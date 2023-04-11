import { cookies } from "next/headers";
import { fetcher } from "@/lib/fetchers/fetchUtil";
import { StrapiResponse } from "@/types/StrapiResponse";

type FetcherParameters = {
    url: string,
    method: "get" | "post" | "put" | "delete",
    body?: object,
    json?: boolean,
}

export async function serverFetcher<DataType>(params: FetcherParameters): Promise<StrapiResponse<DataType> | undefined> {
    const jwt = cookies().get("jwt-cookie")?.value;
    return fetcher({ ...params, jwt });
}
