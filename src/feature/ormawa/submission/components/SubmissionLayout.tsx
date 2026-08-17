import SubmissionBackground from "./SubmissionBackground";
import SubmissionNavbar from "./navbar/SubmissionNavbar";

export default function SubmissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-jakarta relative flex min-h-screen flex-col overflow-hidden text-white">
      <SubmissionBackground />

      <SubmissionNavbar />

      {children}
    </div>
  );
}
