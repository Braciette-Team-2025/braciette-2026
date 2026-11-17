import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Backend sudah dinonaktifkan (event selesai): tidak ada proxy /api lagi,
  // dan semua halaman yang butuh backend dialihkan ke beranda.
  async redirects() {
    const disabled = [
      "/login",
      "/login/:path*",
      "/exception",
      "/admin",
      "/admin/:path*",
      "/ormawa",
      "/ormawa/:path*",
      "/oauth/:path*",
      "/voting",
      "/open-talent",
      "/profile",
      "/profile/:path*",
    ];
    return disabled.map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
