"use client";
import CreateHeader from "../components/(Create Ormawa External)/CreateHeader";
import StepOneForm from "../components/(Create Ormawa External)/ExternalForm";

export default function CreateOrmawaEksternalContainer() {
  return (
    <div className="min-h-full py-12 px-6 font-inter">
      <div className="mx-auto max-w-[715px] space-y-8">
        <CreateHeader />
        <StepOneForm />
      </div>
    </div>
  );
}
