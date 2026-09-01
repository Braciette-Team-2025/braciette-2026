"use client";

import { useState } from "react";
import type {
  OrmawaType,
  StepTwoValues,
  CompetitionItem,
} from "../../types/ormawa";
import NominationList from "./NominationList";
import DynamicCompetition from "./DynamicCompetition";
import DriveInput from "./DriveInput";
import { UKM_TYPES } from "../../constants/ormawa";

interface StepTwoFormProps {
  type: OrmawaType;
  initialValues?: Partial<StepTwoValues>;
  onSubmit: (data: StepTwoValues) => void;
}

const DEFAULT_COMPETITION: CompetitionItem[] = [
  { id: "comp-default", name: "" },
];

export default function StepTwoForm({
  type,
  initialValues,
  onSubmit,
}: StepTwoFormProps) {
  const [selectedNominations, setSelectedNominations] = useState<string[]>(
    initialValues?.selectedNominations ?? [],
  );
  const [competitions, setCompetitions] = useState<CompetitionItem[]>(
    initialValues?.competitions ?? DEFAULT_COMPETITION,
  );
  const [driveLink, setDriveLink] = useState(initialValues?.driveLink ?? "");

  const isUkm = UKM_TYPES.includes(type as string);

  const handleToggleNomination = (id: string) => {
    setSelectedNominations((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      selectedNominations,
      competitions,
      driveLink,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isUkm && (
        <DynamicCompetition value={competitions} onChange={setCompetitions} />
      )}

      <NominationList
        type={type}
        selected={selectedNominations}
        onToggle={handleToggleNomination}
      />

      <DriveInput value={driveLink} onChange={setDriveLink} />

      <button
        type="submit"
        id="step-two-submit"
        className="w-full rounded-lg bg-gray-700 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-gray-800 active:scale-[0.99]"
      >
        Selanjutnya
      </button>
    </form>
  );
}
