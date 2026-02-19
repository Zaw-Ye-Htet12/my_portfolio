import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Zaw Ye Htet — Full-Stack Software Engineer',
        short_name: 'ZawYeHtet',
        description:
            'Portfolio of Zaw Ye Htet (zawyehtet) — Full-Stack Software Engineer specializing in React, Next.js, Node.js, and scalable SaaS architecture.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
