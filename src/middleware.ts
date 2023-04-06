import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_FILE = /\.(.*)$/;

// had to make this again here as the other one is in a file with bcrypt which is not supported on edge runtimes
const verifyJWT = async (jwt: string) => {
    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return payload;
};

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/static") ||
        pathname.startsWith("/signin") ||
        pathname.startsWith("/signin") ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

    if (!jwt) {
        //req.nextUrl.pathname = "/signin"; // change this to /signin as we want to redirect to the signin page if we have no jwt
        // return NextResponse.redirect(req.nextUrl);
        return;
    }

    try {
        await verifyJWT(jwt.value);
        return NextResponse.next();
    } catch (e) {
        console.error(e);
        req.nextUrl.pathname = "/signin";
        return NextResponse.redirect(req.nextUrl);
    }
}
