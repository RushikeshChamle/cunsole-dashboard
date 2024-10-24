// import { withSentryConfig } from '@sentry/nextjs';
// import './src/env.mjs';
// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'randomuser.me',
//         pathname: '/api/portraits/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'cloudflare-ipfs.com',
//         pathname: '/ipfs/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'avatars.githubusercontent.com',
//         pathname: '/u/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'picsum.photos',
//       },
//       {
//         protocol: 'https',
//         hostname: 'flagcdn.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'utfs.io',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 's3.amazonaws.com',
//         pathname: '/redqteam.com/isomorphic-furyroad/public/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'isomorphic-furyroad.s3.amazonaws.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'isomorphic-furyroad.vercel.app',
//       },
//     ],
//   },
//   reactStrictMode: true,

//   webpack: (config, { isServer }) => {
//     config.optimization = {
//       ...config.optimization,
//       minimize: true
//     }
//     return config
//   },
//   experimental: {
//     optimizeCss: true,
//   }





// };

// export default withSentryConfig(nextConfig, {
//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options

//   org: 'cunsole',
//   project: 'javascript-nextjs',

//   // Only print logs for uploading source maps in CI
//   silent: !process.env.CI,

//   // For all available options, see:
//   // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

//   // Upload a larger set of source maps for prettier stack traces (increases build time)
//   widenClientFileUpload: true,

//   // Automatically annotate React components to show their full name in breadcrumbs and session replay
//   reactComponentAnnotation: {
//     enabled: true,
//   },

//   // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
//   // This can increase your server load as well as your hosting bill.
//   // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
//   // side errors will fail.
//   tunnelRoute: '/monitoring',

//   // Hides source maps from generated client bundles
//   hideSourceMaps: true,

//   // Automatically tree-shake Sentry logger statements to reduce bundle size
//   disableLogger: true,

//   // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
//   // See the following for more information:
//   // https://docs.sentry.io/product/crons/
//   // https://vercel.com/docs/cron-jobs
//   automaticVercelMonitors: true,
// });




import './src/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/redqteam.com/isomorphic-furyroad/public/**',
      },
      {
        protocol: 'https',
        hostname: 'isomorphic-furyroad.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'isomorphic-furyroad.vercel.app',
      },
    ],
  },
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      minimize: true,
    };
    return config;
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
