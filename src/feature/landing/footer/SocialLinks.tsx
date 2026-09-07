import Link from "next/link";
import type { ReactNode } from "react";

interface SocialLinkItem {
  id: string;
  href: string;
  label: string;
  icon: ReactNode;
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M14.5 3h2.7c.2 1.6 1.2 3 2.7 3.6.5.2 1.1.3 1.6.3v2.8c-1.5 0-2.9-.4-4.1-1.2v6.7c0 3.3-2.6 5.9-5.9 5.9S5.6 18.5 5.6 15.2c0-3.1 2.4-5.6 5.4-5.9v2.9c-1.4.3-2.5 1.5-2.5 3 0 1.7 1.4 3.1 3.1 3.1s3.1-1.4 3.1-3.1V3h-.2z" />
    </svg>
  );
}

const socialLinks: SocialLinkItem[] = [
  {
    id: "instagram",
    href: "https://instagram.com/braciate_",
    label: "Instagram",
    icon: <InstagramIcon />,
  },
  {
    id: "tiktok",
    href: "https://tiktok.com/@braciate_",
    label: "TikTok",
    icon: <TikTokIcon />,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-5">
      {socialLinks.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-50 text-blue-900 transition hover:bg-yellow-100"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
}
