import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/static') || pathname.startsWith('/signin') || pathname.startsWith('/login') || PUBLIC_FILE.test(pathname)) {
        return NextResponse.next();
    }

    const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

    if (!jwt) {
        req.nextUrl.pathname = '/login'; // change this to /signin as we want to redirect to the signin page if we have no jwt
        return NextResponse.redirect(req.nextUrl);
    }
    try {
        return NextResponse.next();
    } catch (e) {
        console.error(e);
        req.nextUrl.pathname = '/login';
        return NextResponse.redirect(req.nextUrl);
    }
}
