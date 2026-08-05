"use client";

import { useState } from "react";
import type { StepOneValues } from "../../types/ormawa";
import { ORMAWA_TYPES } from "../../constants/nominations";
import SelectField from "./SelectField";
import FormField from "./FormField";
import TextareaField from "./TextareaField";

interface StepOneFormProps {
  initialValues?: Partial<StepOneValues>;
  onNext: (data: StepOneValues) => void;
}

const DEFAULT_VALUES: StepOneValues = {
  jenisOrmawa: "",
  namaOrmawa: "",
  namaKabinet: "",
  pic: "",
  kontakPic: "",
  deskripsi: "",
  programKerja: "",
};

export default function StepOneForm({
  initialValues,
  onNext,
}: StepOneFormProps) {
  const [form, setForm] = useState<StepOneValues>({
    ...DEFAULT_VALUES,
    ...initialValues,
  });

  const set = (field: keyof StepOneValues) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isComplete =
    form.jenisOrmawa.trim() !== "" &&
    form.namaOrmawa.trim() !== "" &&
    form.namaKabinet.trim() !== "" &&
    form.pic.trim() !== "" &&
    form.kontakPic.trim() !== "" &&
    form.deskripsi.trim() !== "" &&
    form.programKerja.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isComplete) return;

    onNext(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <SelectField
        label="Jenis Ormawa"
        placeholder="Pilih Jenis Ormawa"
        options={ORMAWA_TYPES}
        value={form.jenisOrmawa}
        onValueChange={set("jenisOrmawa")}
        id="jenis-ormawa"
      />

      <FormField
        label="Nama Ormawa"
        placeholder="Kabinet Departemen Sistem Informasi"
        value={form.namaOrmawa}
        onChange={set("namaOrmawa")}
        id="nama-ormawa"
      />

      <FormField
        label="Nama Kabinet"
        placeholder="Imaginera"
        value={form.namaKabinet}
        onChange={set("namaKabinet")}
        id="nama-kabinet"
      />

      <FormField
        label="PIC"
        placeholder="Resbob"
        value={form.pic}
        onChange={set("pic")}
        id="pic"
      />

      <FormField
        label="Kontak PIC"
        placeholder="08xxxxxxxxxx"
        value={form.kontakPic}
        onChange={set("kontakPic")}
        type="tel"
        id="kontak-pic"
      />

      <TextareaField
        label="Deskripsi Singkat"
        placeholder="UKM hebat dan sangat keren"
        value={form.deskripsi}
        onChange={set("deskripsi")}
        id="deskripsi"
      />

      <TextareaField
        label="Program Kerja Unggulan"
        placeholder="Synergy of Symphony"
        value={form.programKerja}
        onChange={set("programKerja")}
        id="program-kerja"
      />

      <button
        type="submit"
        id="step-one-submit"
        disabled={!isComplete}
        className="w-full rounded-lg bg-gray-700 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:active:scale-100"
      >
        Selanjutnya
      </button>
    </form>
  );
}
