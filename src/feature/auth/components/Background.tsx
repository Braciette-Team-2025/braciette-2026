export default function AuthBackground() {
  return (
    <div className="pointer-events-none absolute  inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-blue-900" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(59,130,246,0.30) 0%, transparent 50%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/background/dots.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "1059px 1757px",
        }}
      />
    </div>
  );
}
