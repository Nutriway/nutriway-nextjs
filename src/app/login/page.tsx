"use client";
import "@/styles/global.css";
import React, { useMemo } from "react";
import Button from "@/components/Buttons/Button";
import { setCookie } from "cookies-next";
import useSWRMutation from "swr/mutation";
import { clientFetcher, useFetcher } from "@/lib/fetchers/clientFetcher";
import { Appointment } from "@/types/Appointment";


async function doLogin(url: string, { arg: { email, password } }: { arg: { email: string, password: string } }) {
    const { jwt } = await clientFetcher({
        url,
        method: "post",
        body: { identifier: email, password: password }
    });

    // this cookie part is specific to this login request
    // mustn't appear on other calls
    setCookie("jwt-cookie", jwt, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        secure: true
    });
}

export default function Login() {
    // useFetcher is a client side fetcher for GET's ONLY
    // This is a bad example of useFetcher, as these two calls can be done on a server component.
    // I am using it here to show how dependencies work in fetching on the client.
    // There is also a mutation example to show how to use the useSWRMutation hook
    const { data: appointment } = useFetcher<Appointment>({
        url: `/appointments`
    });
    const {
        data,
        isError,
        isLoading
    } = useFetcher<Appointment>({
        shouldFetch: !!appointment, // is appointment defined?
        url: `/appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=2000&filters[id][$eq]=${appointment?.data[0].id}`
    });
    // this is for the login button mutation; key= the url
    const { trigger } = useSWRMutation("/auth/local", doLogin);

    // use a memo on every client component for these things
    // this should be really done if we have a lot of data being changed
    // if we have just one, like in this case its kinda meh.
    // IMPORTANT NOTE: on the server, we don't need to create a memo, we can compute it outside the component.
    const content = useMemo(() => ({
        title: isError ? "Error" : isLoading ? "Loading" : data?.data[0].attributes.meeting_url
    }), [data?.data, isError, isLoading]);

    return (
        <div>
            <Button
                onClick={async () => {
                    await trigger({ email: "andre@email.com", password: "password" });
                }}
            >Click me</Button>
            <p>{content.title}</p>
        </div>
    );
}
