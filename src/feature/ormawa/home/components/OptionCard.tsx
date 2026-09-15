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
    <Link href={href} className="group flex-1 flex flex-col">
      <div className="flex-1 flex flex-col justify-center py-6 px-4 xl:py-8 xl:px-6 bg-blue-700 border-2 border-yellow-50 rounded-2xl md:rounded-3xl xl:rounded-4xl transition-all duration-300 group-hover:border-yellow-500 group-hover:-translate-y-2 group-hover:shadow-[0_8px_30px_rgba(201,162,39,0.25)]">
        <div className="flex flex-col gap-2 md:gap-4">
          <Icon className="size-6 md:size-6 xl:size-8 text-yellow-200" />
          <h1 className="text-yellow-200 text-2xl md:text-3xl xl:text-4xl font-bold">
            {title}
          </h1>
          <p className="text-yellow-50 text-xs md:text-sm xl:text-md font-medium">
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
}
