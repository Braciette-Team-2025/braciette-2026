import Image from "next/image";
import { cn } from "@/lib/utils";

export default function AuthCard({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        // Mobile (Base)
        "px-6 py-8 bg-blue-800 w-[calc(100vw-2rem)] max-w-100 shadow-[0_0_40px_rgba(255,214,133,0.16)] rounded-[12px]",
        // Tablet (md)
        "md:p-10 md:max-w-none md:w-fit md:rounded-[20px] md:mx-0",
        // Desktop (lg)
        "lg:pt-6 pb-10 px-10",
      )}
    >
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-4 items-center justify-center">
          <Image
            src="/images/logo/braciate-logo.svg"
            alt="Braciate Logo"
            width={0}
            height={0}
            className={cn(
              // Mobile (Base)
              "w-17 h-17",
              // Tablet (md)
              "md:w-19 md:h-19",
              // Desktop (lg)
              "lg:w-23 lg:h-23",
            )}
          />
          <div className="flex flex-col -space-y-1">
            <h1
              className={cn(
                // Mobile (Base)
                "font-sloop text-5xl text-yellow-300 drop-shadow-[0_0_15px_rgba(218,161,17,1)] text-center leading-none",
                // Tablet (md)
                "md:text-5xl",
                // Desktop (lg)
                "lg:text-6xl",
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                // Mobile (Base)
                "text-center text-sm text-blue-100 font-semibold",
                // Tablet (md)
                "md:text-sm",
                // Desktop (lg)
                "lg:text-md",
              )}
            >
              {description}
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
