import "./globals.css";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SOLIDIA Partner Portal",
  description: "Partner portal for automation, projects and AI systems",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#0a1a2f]`}>
        {children}
      </body>
    </html>
  );
}
