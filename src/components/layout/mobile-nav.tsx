"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Home,
  Search,
  Bell,
  Mail,
  BookMarked,
  Users,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden">
          <Avatar className="w-8 h-8">
            <Image
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop"
              alt="プロフィール"
              width={32}
              height={32}
              className="rounded-full"
            />
          </Avatar>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[80%] max-w-[320px]">
        <SheetHeader className="sr-only">
          <SheetTitle>ナビゲーションメニュー</SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-4">
          <div className="flex flex-col gap-1">
            <Avatar className="w-10 h-10">
              <Image
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop"
                alt="プロフィール"
                width={32}
                height={32}
                className="rounded-full"
              />
            </Avatar>
            <div className="mt-2">
              <p className="font-bold">Shin@プログラミング...</p>
              <p className="text-sm text-muted-foreground">@Shin_Engineer</p>
            </div>
            <div className="flex gap-4 mt-2 text-sm">
              <span>
                <span className="font-bold">24</span>
                <span className="text-muted-foreground"> フォロー中</span>
              </span>
              <span>
                <span className="font-bold">6,509</span>
                <span className="text-muted-foreground"> フォロワー</span>
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            <NavLink
              href="/"
              icon={<Home />}
              label="ホーム"
              active={pathname === "/"}
            />
            <NavLink
              href="/search"
              icon={<Search />}
              label="話題を検索"
              active={pathname === "/search"}
            />
            <NavLink
              href="/notifications"
              icon={<Bell />}
              label="通知"
              active={pathname === "/notifications"}
            />
            <NavLink
              href="/messages"
              icon={<Mail />}
              label="メッセージ"
              active={pathname === "/messages"}
            />
            <NavLink
              href="/bookmarks"
              icon={<BookMarked />}
              label="ブックマーク"
              active={pathname === "/bookmarks"}
            />
            <NavLink
              href="/communities"
              icon={<Users />}
              label="コミュニティ"
              active={pathname === "/communities"}
            />
            <NavLink
              href="/profile"
              icon={<User />}
              label="プロフィール"
              active={pathname === "/profile"}
            />
          </nav>

          <div className="border-t border-border pt-4">
            <NavLink href="/settings" icon={<Settings />} label="設定" />
            <NavLink href="/help" icon={<HelpCircle />} label="ヘルプ" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function NavLink({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={`w-full justify-start gap-4 p-3 h-auto ${
          active ? "font-bold" : ""
        }`}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
}
