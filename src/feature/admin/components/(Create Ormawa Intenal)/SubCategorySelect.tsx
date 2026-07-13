"use client";

import { UKM_SUBCATEGORIES } from "../../constants/nominations";
import SelectField from "./SelectField";

interface SubCategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function SubCategorySelect({
  value,
  onValueChange,
}: SubCategorySelectProps) {
  return (
    <SelectField
      label="Sub Kategori"
      placeholder="Pilih Kategori UKM"
      options={UKM_SUBCATEGORIES}
      value={value}
      onValueChange={onValueChange}
      id="sub-kategori-ukm"
    />
  );
}
