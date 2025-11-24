import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "./sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SOLIDIA Partner Portal",
  description: "Partner portal for automation, projects and AI systems",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen bg-[#0a1a2f]`}>
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto text-white">{children}</main>
      </body>
    </html>
  );
}
