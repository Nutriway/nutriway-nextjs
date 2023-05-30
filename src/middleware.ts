import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

    const valid = jwt && jwt.value.length > 0;

    if (!(valid || pathname.startsWith('/login') || pathname.startsWith('/register') || pathname === '/')) {
        req.nextUrl.pathname = '/login';
        return NextResponse.redirect(req.nextUrl);
    }
    if (valid && (pathname.startsWith('/login') || pathname.startsWith('/register') || pathname === '/')) {
        req.nextUrl.pathname = '/home';
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
