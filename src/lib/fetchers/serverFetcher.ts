import { cookies } from "next/headers";
import { fetcher } from "@/lib/fetchers/fetchUtil";

type FetcherParameters = {
    url: string,
    method: "get" | "post" | "put" | "delete",
    body?: object,
    json?: boolean,
}


export const serverFetcher = async (params: FetcherParameters) => {
    const jwt = cookies().get("jwt-cookie")?.value;
    return fetcher({ ...params, jwt });
};
