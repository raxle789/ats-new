/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'media.licdn.com'
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.jp',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/seed/picsum/**'
            },
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                port: '',
                pathname: '/ats-erajaya/users_profile_photo/**'
            },
            {
                protocol: 'https',
                hostname: 'media.licdn.com',
                port: '',
                pathname: '/dms/image/**'
            }
        ]
    }
};

export default nextConfig;
