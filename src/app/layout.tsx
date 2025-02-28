import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "SNSアプリケーション",
  description: "Next.jsで作成したSNSアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="overflow-hidden">
      <body
        className={`${notoSansJP.className} h-[100dvh] overscroll-none touch-pan-y`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
