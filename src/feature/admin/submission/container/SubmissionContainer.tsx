"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InternalSubmissionContent from "../components/submission/InternalSubmissionContent";
import ExternalSubmissionContent from "../components/submission/ExternalSubmissionContent";

export default function SubmissionContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialTab =
    searchParams.get("tab") === "external" ? "external" : "internal";

  const [activeTab, setActiveTab] = useState<"internal" | "external">(
    initialTab,
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value as "internal" | "external");

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="py-15 pl-6 pr-[100px] bg-white space-y-4">
      <div className="space-y-2 text-[#7F7F7F]">
        <h1 className="text-[32px] font-extrabold">Statistik Pendaftaran</h1>
        <p className="text-[20px] font-bold">Hasil pendaftaran ormawa</p>
      </div>

      <Tabs
        defaultValue={initialTab}
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList>
          <TabsTrigger value="internal">Internal</TabsTrigger>
          <TabsTrigger value="external">Eksternal</TabsTrigger>
        </TabsList>

        {/* Tab Internal — terhubung ke API */}
        <TabsContent value="internal">
          <InternalSubmissionContent />
        </TabsContent>

        {/* Tab External — terhubung ke real API */}
        <TabsContent value="external">
          <ExternalSubmissionContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
