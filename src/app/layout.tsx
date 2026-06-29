import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "PAYLOAD FINANCE",
  description: "Amritesh Kumar — B.Tech Mission Control",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
