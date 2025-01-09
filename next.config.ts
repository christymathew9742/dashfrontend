// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//  // reactStrictMode: false, // Disable React Strict Mode (useful for debugging hydration issues)

//   // Experimental features (remove reactRoot as it's not needed in recent versions)
//   // experimental: {
//   //   // Add other experimental settings here if needed
//   // },
// };

// export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // React Strict Mode (optional)
  // reactStrictMode: false, // Uncomment to disable React Strict Mode

  // Webpack Configuration to suppress logs
  webpack(config, { isServer }) {
    // Suppress unnecessary logs in production
    if (!isServer && process.env.NODE_ENV === 'production') {
      config.stats = 'errors-only'; // Show only errors in logs
    }

    // Additional custom Webpack configuration can be added here
    return config;
  },
};

export default nextConfig;






