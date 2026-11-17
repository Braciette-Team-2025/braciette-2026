import { PODIUM_BRAND_TEXT } from "../constants/podium.content";
import type { PodiumLogo } from "../types/podium.types";
import { LogoPill } from "./LogoPill";
import { ScriptText } from "./ScriptText";

export function PodiumHeader({ logos }: { logos: PodiumLogo[] }) {
  return (
    <header className="flex flex-col items-center gap-[calc(var(--podium-brand-size)*0.7)]">
      <p
        data-podium-brand
        className="invisible text-center font-the-seasons text-[length:var(--podium-brand-size)] italic text-[color:var(--podium-ivory)] [text-shadow:0_0_18px_rgb(var(--podium-glow)/0.5)]"
      >
        <ScriptText text={PODIUM_BRAND_TEXT} initialClassName="text-[1.8em]" />
      </p>
      <LogoPill logos={logos} />
    </header>
  );
}
