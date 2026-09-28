import { Inter } from "next/font/google";
import "./globals.css";

// Open substitute for Haas Grotesk (DESIGN.md "Font Substitutes").
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata = {
  title: "3D Workspace Builder",
  description:
    "Design your home office in 3D: pick a desk, chair and accessories and see the weekly rental price.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
