/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'images.unsplash.com']
    },
    env:{
        url: 'http://localhost:8000'
    }
};

export default nextConfig;
