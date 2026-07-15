import { Button } from "@/components/ui/button";

interface LogoFileButtonProps {
  href?: string;
}

export default function LogoFileButton({ href }: LogoFileButtonProps) {
  return (
    <Button asChild={!!href} size="sm" variant="secondary">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <span className="underline">Lihat File</span>
        </a>
      ) : (
        <span className="underline">Lihat File</span>
      )}
    </Button>
  );
}
