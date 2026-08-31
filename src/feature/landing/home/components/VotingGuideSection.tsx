import { VOTE_GUIDE_DATA } from "../constants/constants";
import FloatingNotesWrapper from "./ui/FloatingNotesWrapper";
import { LandingButton } from "./ui/LandingButton";
import VotingTextbox from "./ui/VotingTextbox";

export default function VotingGuideSection() {
  const highlightClass =
    "font-sloop text-[60px] md:text-[120px] xl:text-[200px]";
  return (
    <FloatingNotesWrapper>
      <section className="flex flex-col items-center justify-center px-4 lg:px-25 gap-5 md:gap-7 xl:gap-10 md:h-screen">
        <h1 className="font-the-seasons text-[24px] md:text-[40px] xl:text-[80px] leading-[0.6] text-center flex flex-col justify-center pt-4 md:pt-8 xl:pt-12">
          <span className="block text-blue-100 drop-shadow-[0_0_20px_rgba(132,98,255,0.6)]">
            <span className={highlightClass}>G</span>uide to
          </span>
          <span className="block text-yellow-300 drop-shadow-[0_0_20px_rgba(218,161,17,0.8)]">
            <span className={highlightClass}>V</span>oting
          </span>
        </h1>
        <div className="flex gap-6">
          {VOTE_GUIDE_DATA.map((data) => {
            return (
              <VotingTextbox key={data.id} id={data.id} desc={data.desc} />
            );
          })}
        </div>
        <div className="w-32 md:w-64 xl:w-100 mt-4 md:mt-7 xl:mt-10">
          <LandingButton className="w-full" href="/voting">
            Voting
          </LandingButton>
        </div>
      </section>
    </FloatingNotesWrapper>
  );
}
