import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubmissionContent from "../components/(Admin Submission)/SubmissionContent";

export default function SubmissionContainer() {
  return (
    <div className="py-15 pl-6 pr-[100px] bg-white space-y-4">
      <div className="space-y-2 text-[#7F7F7F]">
        <h1 className="text-[32px] font-extrabold">Statistik Pendaftaran</h1>
        <p className="text-[20px] font-bold">Hasil pendaftaran ormawa</p>
      </div>
      <Tabs defaultValue="internal">
        <TabsList>
          <TabsTrigger value="internal">Internal</TabsTrigger>
          <TabsTrigger value="external">Eksternal</TabsTrigger>
        </TabsList>
        <TabsContent value="internal">
          <SubmissionContent type="internal" />
        </TabsContent>
        <TabsContent value="external">
          <SubmissionContent type="external" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
