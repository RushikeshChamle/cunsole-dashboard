// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getCookie } from 'cookies-next';


// export function middleware(request: NextRequest) {
//   // Your middleware logic here
//   // For now, we'll just allow all requests to pass through
//   return NextResponse.next();
// }




// export const config = {
//   // restricted routes
//   matcher: [
//     '/',
//     '/executive',
//     '/financial',
//     '/analytics',
//     '/logistics/:path*',
//     '/ecommerce/:path*',
//     '/support/:path*',
//     '/file/:path*',
//     '/file-manager',
//     '/invoice/:path*',
//     '/forms/profile-settings/:path*',
//   ],
// };



import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(request: NextRequest) {
  const token = getCookie('access_token', { req: request });
  
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }

  
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
    '/forms/profile-settings/:path*',
  ],
};

