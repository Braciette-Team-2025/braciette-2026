"use client";

import type { CompetitionItem } from "../../types/ormawa";
import CompetitionField from "./CompetitionField";

interface DynamicCompetitionProps {
  value: CompetitionItem[];
  onChange: (items: CompetitionItem[]) => void;
}

export default function DynamicCompetition({
  value,
  onChange,
}: DynamicCompetitionProps) {
  const handleAdd = () => {
    const newItem: CompetitionItem = {
      id: `comp-${Date.now()}`,
      name: "",
    };
    onChange([...value, newItem]);
  };

  const handleRemove = (id: string) => {
    onChange(value.filter((item) => item.id !== id));
  };

  const handleChange = (id: string, name: string) => {
    onChange(value.map((item) => (item.id === id ? { ...item, name } : item)));
  };

  return (
    <div className="space-y-3">
      <p className="text-[16px] font-semibold text-gray-700">
        Lomba yang Dimenangkan
      </p>
      <div className="space-y-2">
        {value.map((item, index) => (
          <CompetitionField
            key={item.id}
            id={`competition-${item.id}`}
            value={item.name}
            onChange={(name) => handleChange(item.id, name)}
            showAdd={index === value.length - 1}
            onAdd={handleAdd}
            onRemove={() => handleRemove(item.id)}
          />
        ))}
        {value.length === 0 && (
          <CompetitionField
            id="competition-empty"
            value=""
            onChange={() => {}}
            showAdd={true}
            onAdd={handleAdd}
            onRemove={() => {}}
          />
        )}
      </div>
    </div>
  );
}
