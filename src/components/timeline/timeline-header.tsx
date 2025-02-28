import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";

export function TimelineHeader() {
  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center px-4 h-14 border-b border-border">
        <div className="flex items-center justify-between gap-6 flex-1">
          <MobileNav />
          <Link href="/" className="flex items-center">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
          </Link>
          <div className="w-8" />
        </div>
      </div>
      <div className="flex">
        <button className="flex-1 h-14 hover:bg-muted/50 relative">
          <span className="font-bold">おすすめ</span>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-900 rounded-full mx-12" />
        </button>
        <button className="flex-1 h-14 hover:bg-muted/50 text-muted-foreground">
          <span>フォロー中</span>
        </button>
      </div>
    </div>
  );
}
