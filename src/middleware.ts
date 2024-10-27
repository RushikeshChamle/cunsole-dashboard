import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(request: NextRequest) {
  const token = getCookie('access_token', { req: request });
  
  if (!token) {
    // If there's no token, redirect to the signin page
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // You might want to add some basic validation here
  // For example, check if the token has the expected format
  if (typeof token !== 'string' || token.split('.').length !== 3) {
    // If the token is invalid, redirect to the signin page
    return NextResponse.redirect(new URL('/actions', request.url));
  }

  // If the token exists and passes basic validation, set the Authorization header
  request.headers.set('Authorization', `Bearer ${token}`);

  return NextResponse.next();
}



export const config = {
  matcher: [
    '/',
    '/executive',
    '/financial',
    '/analytics',
    '/logistics/:path*',
    '/ecommerce/:path*',
    '/support/:path*',
    '/file/:path*',
    '/file-manager',
    '/invoice/:path*',
    // '/customers/:path*',
    '/forms/profile-settings/:path*',
    '/actions',
    '/actions:path*',
    '/dashboard:path*',

  ],
};