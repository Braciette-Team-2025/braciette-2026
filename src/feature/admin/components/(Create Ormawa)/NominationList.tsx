"use client";

import type { OrmawaType } from "../../types/ormawa";
import {
  BEM_NOMINATIONS,
  DPM_NOMINATIONS,
  HIMA_NOMINATIONS,
  UKM_NOMINATIONS,
} from "../../constants/nominations";
import NominationItem from "./NominationItem";

interface NominationListProps {
  type: OrmawaType;
  selected: string[];
  onToggle: (id: string) => void;
}

const NOMINATIONS_MAP: Record<OrmawaType, typeof BEM_NOMINATIONS> = {
  BEM: BEM_NOMINATIONS,
  DPM: DPM_NOMINATIONS,
  HIMA: HIMA_NOMINATIONS,
  UKM: UKM_NOMINATIONS,
};

const LABEL_MAP: Record<OrmawaType, string> = {
  BEM: "Nominasi BEM",
  DPM: "Nominasi DPM",
  HIMA: "Nominasi HIMA",
  UKM: "Nominasi UKM",
};

export default function NominationList({
  type,
  selected,
  onToggle,
}: NominationListProps) {
  const nominations = NOMINATIONS_MAP[type];
  const sectionLabel = LABEL_MAP[type];

  return (
    <div className="space-y-3">
      <p className="text-[16px] font-semibold text-gray-700">{sectionLabel}</p>
      <div className="space-y-2">
        {nominations.map((item) => (
          <NominationItem
            key={item.id}
            id={item.id}
            label={item.label}
            checked={selected.includes(item.id)}
            onChange={() => onToggle(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
