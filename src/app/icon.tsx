import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "linear-gradient(135deg, #0b1224 0%, #080c16 100%)",
          color: "#38bdf8",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          borderRadius: 8,
          border: "1.5px solid #38bdf8",
          letterSpacing: "-0.5px",
        }}
      >
        DB
      </div>
    ),
    { ...size }
  );
}
