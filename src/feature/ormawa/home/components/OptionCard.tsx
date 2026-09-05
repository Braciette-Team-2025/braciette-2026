import Link from "next/link";
import { OptionCardProps } from "../types/types";

export default function OptionCard({
  icon,
  title,
  desc,
  href,
}: OptionCardProps) {
  const Icon = icon;
  return (
    <Link href={href} className="group">
      <div className="py-9 px-6 md:py-12 md:px-8 xl:py-15 xl:px-10 bg-blue-700 border-2 border-yellow-50 rounded-2xl md:rounded-3xl xl:rounded-4xl transition-all duration-300 group-hover:border-yellow-500 group-hover:-translate-y-2 group-hover:shadow-[0_8px_30px_rgba(201,162,39,0.25)]">
        <div className="flex flex-col gap-3 md:gap-6">
          <Icon className="w-6 h-6 md:h-8 md:w-8 xl:h-12 xl:w-12 text-yellow-200" />
          <h1 className="text-yellow-200 text-3xl md:text-4xl xl:text-6xl font-bold">
            {title}
          </h1>
          <p className="text-yellow-50 text-sm md:text-md xl:text-xl font-medium">
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
}
