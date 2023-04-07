import { cookies } from "next/headers";
import { fetcher } from "@/lib/fetchers/fetchUtil";

type FetcherParameters = {
    url: string,
    method: "get" | "post",
    body?: object,
    json?: boolean,
}


export const serverFetcher = async ({ url, method, body, json = true }: FetcherParameters) => {
    const jwt = cookies().get("jwt-cookie")?.value;
    return fetcher({ url, method, body, json, jwt });
};
