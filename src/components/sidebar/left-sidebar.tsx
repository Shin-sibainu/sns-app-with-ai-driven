"use client";

import { Button } from "@/components/ui/button";
import {
  Home as HomeIcon,
  Search,
  Bell,
  Mail,
  BookMarked,
  Users,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export function LeftSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="sticky top-0 h-screen p-4 min-w-[275px] flex flex-col">
      <div className="space-y-2 flex flex-col gap-1 flex-1">
        <div className="p-3">
          <Link href="/">
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
          </Link>
        </div>
        <NavButton
          href="/"
          icon={<HomeIcon className="h-[26px] w-[26px]" />}
          label="ホーム"
          isActive={pathname === "/"}
        />
        <NavButton
          href="/search"
          icon={<Search className="h-[26px] w-[26px]" />}
          label="話題を検索"
          isActive={pathname === "/search"}
        />
        <NavButton
          href="/notifications"
          icon={<Bell className="h-[26px] w-[26px]" />}
          label="通知"
          notificationCount={3}
          isActive={pathname === "/notifications"}
        />
        <NavButton
          href="/messages"
          icon={<Mail className="h-[26px] w-[26px]" />}
          label="メッセージ"
          isActive={pathname === "/messages"}
        />
        <NavButton
          href="/bookmarks"
          icon={<BookMarked className="h-[26px] w-[26px]" />}
          label="ブックマーク"
          isActive={pathname === "/bookmarks"}
        />
        <NavButton
          href="/communities"
          icon={<Users className="h-[26px] w-[26px]" />}
          label="コミュニティ"
          isActive={pathname === "/communities"}
        />
        <NavButton
          href={`/${user?.username || ""}`}
          icon={<User className="h-[26px] w-[26px]" />}
          label="プロフィール"
          isActive={pathname.startsWith("/profile")}
        />
      </div>
      <div className="mt-auto p-4">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-12 h-12",
              userPreviewMainIdentifier: "text-base font-bold",
              userPreviewSecondaryIdentifier: "text-sm text-neutral-600",
            },
          }}
          afterSignOutUrl="/"
        />
      </div>
    </div>
  );
}

function NavButton({
  href,
  icon,
  label,
  notificationCount,
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  notificationCount?: number;
  isActive?: boolean;
}) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={`w-full justify-start text-xl gap-4 p-3 h-auto relative ${
          isActive ? "font-bold" : ""
        }`}
      >
        {icon}
        <span className="text-xl">{label}</span>
        {notificationCount && (
          <span className="absolute top-3 left-7 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notificationCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
