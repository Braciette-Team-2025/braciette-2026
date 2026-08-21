import Image from "next/image";

export default function LogoTransition() {
  return (
    <div className="w-full flex justify-between items-center relative overflow-hidden">
      <div className="flex-1 relative -left-8 md:-left-12 lg:-left-20">
        <Image
          className="-scale-x-100 w-full h-auto"
          src="/images/gold_string/gold_string_2.svg"
          width={748}
          height={134}
          alt="Gold Wave"
        />
      </div>
      <div className="w-12.5 md:w-28 xl:w-42.5 shrink-0 z-10">
        <Image
          src="/images/logo/braciate-logo.svg"
          width={170}
          height={243}
          alt="Logo Braciate"
          className="w-full h-auto"
        />
      </div>
      <div className="flex-1 relative -right-8 md:-right-12 lg:-right-20">
        <Image
          className="w-full h-auto"
          src="/images/gold_string/gold_string_2.svg"
          width={748}
          height={134}
          alt="Gold Wave"
        />
      </div>
    </div>
  );
}
