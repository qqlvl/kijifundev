import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiji.fun",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}