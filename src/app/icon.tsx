import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#0d0d12",
          border: "1px solid rgba(167,139,250,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#a78bfa",
            lineHeight: 1,
            letterSpacing: "-0.5px",
          }}
        >
          G
        </span>
      </div>
    ),
    { ...size },
  );
}
