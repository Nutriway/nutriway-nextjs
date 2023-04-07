"use client";
import "@/styles/global.css";
import React from "react";
import Button from "@/components/Buttons/Button";
import { loginRequest } from "@/lib/api/auth";
import { setCookie } from "cookies-next";

async function saveCookie(email: string, password: string) {
    const { _, jwt } = await loginRequest(email, password);
    setCookie("jwt-cookie", jwt, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        secure: true
    });
}

export default function Login() {
    return (
        <Button onClick={async () => {
            await saveCookie("andre@email.com", "password");
        }}>Click me</Button>
    );
}
