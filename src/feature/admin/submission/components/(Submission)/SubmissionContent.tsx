import AddOrmawaButton from "./AddOrmawaButton";
import FilterJenis from "./FilterJenis";
import SearchBar from "./SearchBar";
import SortButton from "./SortButton";
import Statistic from "./Statistic";
import SubmissionTable from "./(table)/SubmissionTable";
import FilterStatus from "./FilterStatus";
import { externalCards, internalCards } from "../../constants/statistics";
import {
  externalSubmissionList,
  internalSubmissionList,
} from "../../constants/ormawaList";

interface SubmissionContentProps {
  type: "internal" | "external";
}

export default function SubmissionContent({ type }: SubmissionContentProps) {
  const cards = type === "internal" ? internalCards : externalCards;
  const submissions =
    type === "internal" ? internalSubmissionList : externalSubmissionList;

  return (
    <div className="font-inter flex flex-col gap-8">
      <Statistic cards={cards} />
      <AddOrmawaButton />
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1">
          <SearchBar />
        </div>
        <FilterJenis />
        <FilterStatus />
        <SortButton />
      </div>
      <SubmissionTable submissionList={submissions} />
    </div>
  );
}
