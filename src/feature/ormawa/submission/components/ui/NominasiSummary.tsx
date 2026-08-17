interface NominasiSummaryProps {
  files: string[];
}

export function NominasiSummary({ files }: NominasiSummaryProps) {
  if (files.length === 0) return null;

  return (
    <div className="border-l-[3px] border-yellow-500 pl-4 py-1 flex flex-col gap-2 mt-2">
      <p className="text-white font-jakarta text-sm md:text-base font-bold">
        Berdasarkan nominasi yang telah dipilih, kamu perlu submit:
      </p>
      <ul className="list-disc list-inside text-white font-jakarta text-sm md:text-base font-light">
        {files.map((file) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
    </div>
  );
}
