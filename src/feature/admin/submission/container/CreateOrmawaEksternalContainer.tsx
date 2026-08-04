"use client";
import CreateHeader from "../components/create-ormawa-external/CreateHeader";
import StepOneForm from "../components/create-ormawa-external/ExternalForm";

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
