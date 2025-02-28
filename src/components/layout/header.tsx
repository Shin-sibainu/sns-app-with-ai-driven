import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          SNSアプリ
        </Link>
      </div>
    </header>
  );
}
