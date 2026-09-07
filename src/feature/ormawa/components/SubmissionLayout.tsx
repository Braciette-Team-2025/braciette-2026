import SubmissionBackground from "./Background";
import SubmissionNavbar from "./navbar/SubmissionNavbar";

export default function SubmissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-jakarta relative flex min-h-screen flex-col overflow-x-clip text-white">
      <SubmissionBackground />

      <SubmissionNavbar />

      {children}
    </div>
  );
}
