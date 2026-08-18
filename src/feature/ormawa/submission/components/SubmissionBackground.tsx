export default function SubmissionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-blue-900" />

      <div className="absolute inset-x-0 bottom-0 top-30 bg-[#171A3B] rounded-[100%] blur-[98px] opacity-30 " />
      <div
        className="absolute inset-0 origin-center"
        style={{
          backgroundImage: "url('/images/background/dots.svg')",
          backgroundRepeat: "repeat",
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
