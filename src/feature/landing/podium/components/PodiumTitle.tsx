import { PODIUM_TITLE_TEXT } from "../constants/podium.content";
import { ScriptText } from "./ScriptText";

const TITLE_GLOW =
  "[text-shadow:0_0_26px_rgb(var(--podium-glow)/0.75),0_0_52px_rgb(var(--podium-glow)/0.4)]";

export function PodiumTitle({ categoryLabel }: { categoryLabel: string }) {
  return (
    <h1
      id="podium-title"
      className="mt-[calc(var(--podium-title-sm)*0.5)] flex flex-col items-center text-center leading-[0.9] text-[color:var(--podium-ivory)]"
    >
      <span
        data-podium-title-line
        className={`invisible block font-the-seasons text-[length:var(--podium-title-sm)] ${TITLE_GLOW}`}
      >
        <ScriptText text={PODIUM_TITLE_TEXT} initialClassName="text-[1.7em]" />
      </span>
      <span
        data-podium-category
        className={`invisible block font-the-seasons text-[length:var(--podium-title-lg)] font-bold italic ${TITLE_GLOW}`}
      >
        {categoryLabel}
      </span>
    </h1>
  );
}
