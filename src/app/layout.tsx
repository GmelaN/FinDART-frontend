import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Today | finDART",
  description: "데이터로 정리한 오늘의 시장 흐름",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <Sidebar />
        <div className="min-h-screen lg:pl-[244px]">
          <MobileNav />
          {children}
        </div>
      </body>
    </html>
  );
}
