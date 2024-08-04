/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '*',
                port: '3000',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
