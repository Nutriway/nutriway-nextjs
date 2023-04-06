import bcrypt from "bcrypt"
import {jwtVerify, SignJWT} from "jose";
import {db} from "@/lib/db";
import {RequestCookies} from "next/dist/server/web/spec-extension/cookies";
import {ReadonlyRequestCookies} from "next/dist/server/app-render";

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 10)
}

export const comparePasswords = (plainTextPassword: string, hashedPassword: string) => {
    return bcrypt.compare(plainTextPassword, hashedPassword)
}

export const createJWT = (user: { id: string, email: string }) => {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 60 * 60 + 24 * 7

    return new SignJWT({payload: {id: user.id, email: user.email}})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const validateJWT = async (jwt: string) => {
    const {payload} = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET))

    return payload.payload as { id: string, email: string }
}

export const getUserFromCookie = async (cookies: RequestCookies | ReadonlyRequestCookies) => {
    const jwt = cookies.get(process.env.COOKIE_NAME as string)
    if (jwt) {
        const {id} = await validateJWT(jwt.value)

        return db.user.findUnique({
            where: {
                id
            }
        });
    }
}
