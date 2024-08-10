import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
import withAuth from 'next-auth/middleware';

export default withAuth({
  pages: {
    ...pagesOptions,
  },
});



export const config = {
  // restricted routes
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



// previous middleware



// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtVerify } from 'jose';

// // Middleware function
// export async function middleware(request: NextRequest) {
//   // Check for the token in cookies
//   const token = request.cookies.get('access_token')?.value;

//   console.log('Token:', token); // Log token to console for debugging

//   if (!token) {
//     return redirectToLogin(request);
//   }



//   try {
//     // Verify the token
//     // Replace 'your-secret-key' with your actual secret key
//     await jwtVerify(token, new TextEncoder().encode('django-insecure-3t!a&dtryebf_9n(zhm&b#%(!nqc67hisav6hy02faz_ztb=_$'));
//   } catch (error) {
//     // Token is invalid or expired
//     console.log('Token verification failed:', error);
//     return redirectToLogin(request);
//   }



//   // Token is present and valid, continue to the requested route
//   return NextResponse.next();
// }

// function redirectToLogin(request: NextRequest) {
//   const url = request.nextUrl.clone();
//   url.pathname = '/login';
//   return NextResponse.redirect(url);
// }

// // Specify which paths the middleware should run on
// export const config = {
//   matcher: ['/', "/dashbdoard", "/session", "/overview"],
// };

