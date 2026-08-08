import Image from "next/image";

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
    <div className="p-15 bg-blue-800 w-fit shadow-[0_0_40px_rgba(255,214,133,0.16)] rounded-3xl">
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="flex flex-col gap-10 items-center justify-center">
          <Image
            src="/images/logo/braciate-logo.svg"
            alt="Braciate Logo"
            width={120}
            height={120}
          />
          <div className="space-x-5">
            <h1 className="font-sloop text-8xl text-yellow-300 drop-shadow-[0_0_40px_rgba(218,161,17,1)] text-center">
              {title}
            </h1>
            <p className="text-center text-xl text-blue-100 font-semibold">
              {description}
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
