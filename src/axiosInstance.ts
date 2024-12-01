// // utils/axiosInstance.ts
// import axios from 'axios';
// import { getCookie } from 'cookies-next';

// const axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:9000/', // Set your base URL
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getCookie('access_token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


// // utils/axiosInstance.ts
// import axios from 'axios';
// import { getCookie } from 'cookies-next';

// // Use the environment variable for the base URL
// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL, // Use the environment variable here
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getCookie('access_token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;




// utils/axiosInstance.ts

// import axios from 'axios';
// import { getCookie } from 'cookies-next';

// // Use the environment variable for the base URL
// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL, // Use the environment variable here
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Exclude /signin/ and /signup/ endpoints from requiring Authorization header
//     if (
//       !config.url?.includes('/users/signin/') && 
//       !config.url?.includes('/users/signup/')
//     ) {
//       const token = getCookie('access_token');
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//     }
//     config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';

// Flag to prevent multiple redirects
let isRedirecting = false;

// Use the environment variable for the base URL
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add response interceptor to handle unauthorized errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is an unauthorized error (401 status code)
    // and we're not already in the process of redirecting
    if (error.response && error.response.status === 401 && !isRedirecting) {
      // Set redirecting flag to prevent multiple redirects
      isRedirecting = true;

      // Clear the access token cookie
      deleteCookie('access_token');

      // Check if we're in a browser environment before redirecting
      if (typeof window !== 'undefined') {
        // Store the original request details for potential retry after login
        const originalRequest = error.config;
        
        // Save the attempted URL to local storage for potential post-login redirect
        localStorage.setItem('attempted_url', window.location.pathname);

        // Redirect to sign-in page
        window.location.href = '/auth/signin';
      }

      // Reset the redirecting flag after a short delay (in case of any issues)
      setTimeout(() => {
        isRedirecting = false;
      }, 5000);
    }
    
    return Promise.reject(error);
  }
);

// Request interceptor remains the same as in your original code
axiosInstance.interceptors.request.use(
  (config) => {
    // Prevent API calls if we're in the process of redirecting
    if (isRedirecting) {
      return Promise.reject(new Error('Redirecting to sign-in'));
    }

    // Exclude /signin/ and /signup/ endpoints from requiring Authorization header
    if (
      !config.url?.includes('/users/signin/') && 
      !config.url?.includes('/users/signup/')
    ) {
      const token = getCookie('access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;