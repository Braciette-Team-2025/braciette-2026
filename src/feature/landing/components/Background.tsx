export default function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-blue-900" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(8,14,72,.28) 0%, rgba(8,14,72,.08) 35%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, transparent 45%, rgba(3,6,30,.35) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/background/dots.svg')",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "top center",
          backgroundSize: "auto auto",
        }}
      />
    </div>
  );
}
