import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "África con Caballeros · 2027",
  description: "6 países. 33 días. Mauritania, Egipto, Tanzania, Kenia, Zimbabwe y Sudáfrica.",
  openGraph: {
    title: "África con Caballeros · 2027",
    description: "6 países. 33 días. De noroeste a sureste.",
    images: ["https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
