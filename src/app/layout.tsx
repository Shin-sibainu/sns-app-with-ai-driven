import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "bg-neutral-900 hover:bg-neutral-800",
          card: "bg-white shadow-xl rounded-xl border-0",
          headerTitle: "text-neutral-900 font-bold",
          headerSubtitle: "text-neutral-600",
          socialButtonsBlockButton: "border-neutral-200 hover:bg-neutral-50",
          socialButtonsBlockButtonText: "text-neutral-600 font-medium",
          formFieldLabel: "text-neutral-600",
          formFieldInput: "border-neutral-200 focus:border-neutral-900",
          footerActionLink: "text-neutral-900 hover:text-neutral-600",
          modalBackdrop: "backdrop-blur-sm",
        },
      }}
    >
      <html lang="ja" className="overflow-hidden">
        <body
          className={`${notoSansJP.className} h-[100dvh] overscroll-none touch-pan-y`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
