import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Braciate – Brawijaya Festival Appreciate 2026";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/images/logo/braciate-logo.svg"),
    "base64",
  );
  const logoSrc = `data:image/svg+xml;base64,${logoData}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0d1a3a 100%)",
        position: "relative",
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(120, 60, 200, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(60, 100, 200, 0.15) 0%, transparent 60%)",
        }}
      />

      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        width={160}
        height={230}
        alt="Braciate Logo"
        style={{ marginBottom: 40 }}
      />

      {/* Title */}
      <div
        style={{
          color: "#ffffff",
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: "-2px",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Braciate
      </div>

      {/* Subtitle */}
      <div
        style={{
          color: "rgba(255,255,255,0.65)",
          fontSize: 28,
          fontWeight: 400,
          letterSpacing: "2px",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        Brawijaya Festival Appreciate 2026
      </div>
    </div>,
    {
      ...size,
    },
  );
}
