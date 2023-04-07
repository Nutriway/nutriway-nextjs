import { fetcher } from "@/lib/fetcher";


export const loginRequest = async (email: string, password: string) => {
    return await fetcher({
        url: "/auth/local",
        method: "post",
        body: { identifier: email, password: password }
    });
};
