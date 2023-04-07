"use client";
import "@/styles/global.css";
import React from "react";
import Button from "@/components/Buttons/Button";
import { setCookie } from "cookies-next";
import useSWRMutation from "swr/mutation";
import { clientFetcher, useFetcher } from "@/lib/fetchers/clientFetcher";


async function doLogin(url: string, { arg: { email, password } }: { arg: { email: string, password: string } }) {
    const { jwt } = await clientFetcher({
        url,
        method: "post",
        body: { identifier: email, password: password }
    });

    // this cookie part is specific to this login request
    setCookie("jwt-cookie", jwt, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        secure: true
    });
}

export default function Login() {
    const { data: appointment } = useFetcher({ url: `/appointments` });
    const {
        data,
        isError,
        isLoading
    } = useFetcher({
        shouldFetch: !!appointment,
        url: `/appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=2000&filters[id][$eq]=${appointment?.data[0].id}`
    });
    // this is for the login button mutation
    const { trigger } = useSWRMutation("/auth/local", doLogin);

    return (
        <div>
            <Button onClick={async () => {
                await trigger({ email: "andre@email.com", password: "password" });
            }}>Click me</Button>

            <p>{isLoading && !isError ? "Loading..." : data?.data[0].attributes.meeting_url}</p>
            <p>{isError ? "Error" : ""}</p>
        </div>
    );
}
