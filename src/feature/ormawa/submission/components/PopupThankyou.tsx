import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/Button";
import { useEffect } from "react";

interface ModalThankyouProps {
  logoSrc: string;
  bgSrc: string;
  buttonLabel: string;
}

export default function ModalThankyou({ onClose }: { onClose?: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const data: ModalThankyouProps = {
    logoSrc: "/images/logo/braciate-logo.svg",
    bgSrc: "/images/background/dots.svg",
    buttonLabel: "Ok",
  };

  const isHighlight = "font-sloop text-[200px]";
  return (
    <div
      className={cn(
        "w-fit px-33.5 pt-10 pb-16 bg-[#03061E]",
        "shadow-[0_0_40px_rgba(201,162,39,0.4)] rounded-[60px]",
        "relative flex flex-col gap-10 items-center justify-center overflow-hidden",
      )}
    >
      <div className="absolute inset-x-0 inset-y-60 bg-[#171A3B] rounded-[100%] blur-[80px]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${data.bgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative">
        <Image src={data.logoSrc} width={89} height={127} alt="Logo Braciate" />
      </div>
      <h1 className="text-center text-[80px] font-the-seasons leading-[0.7]">
        <span className="block text-blue-100 drop-shadow-[0_0_20px_rgba(132,98,255,0.6)]">
          <span className={isHighlight}>T</span>hanks
          <span className={isHighlight}>F</span> or
        </span>
        <span className="block text-yellow-300 drop-shadow-[0_0_20px_rgba(252,186,3,0.8)]">
          <span className={isHighlight}>A</span>pplying
        </span>
      </h1>
      <Button className="relative px-39.5!" onClick={onClose}>
        {data.buttonLabel}
      </Button>
    </div>
  );
}
