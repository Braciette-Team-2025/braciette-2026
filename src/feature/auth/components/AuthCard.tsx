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
        "md:p-15 md:max-w-none md:w-fit md:rounded-[20px] md:mx-0",
        // Desktop (lg)
        "lg:p-15",
      )}
    >
      <div className="flex flex-col gap-8 md:gap-12 items-center justify-center">
        <div className="flex flex-col gap-4 md:gap-10 items-center justify-center">
          <Image
            src="/images/logo/braciate-logo.svg"
            alt="Braciate Logo"
            width={120}
            height={120}
            className={cn(
              // Mobile (Base)
              "w-17 h-17",
              // Tablet (md)
              "md:w-30 md:h-30",
              // Desktop (lg)
              "lg:w-30 lg:h-30",
            )}
          />
          <div className="flex flex-col">
            <h1
              className={cn(
                // Mobile (Base)
                "font-sloop text-6xl text-yellow-300 drop-shadow-[0_0_40px_rgba(218,161,17,1)] text-center leading-none",
                // Tablet (md)
                "md:text-7xl",
                // Desktop (lg)
                "lg:text-8xl",
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                // Mobile (Base)
                "text-center text-sm text-blue-100 font-semibold",
                // Tablet (md)
                "md:text-md md:mt-0",
                // Desktop (lg)
                "lg:text-xl lg:mt-0",
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
