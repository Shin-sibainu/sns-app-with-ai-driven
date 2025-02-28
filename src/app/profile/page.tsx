import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    redirect("/login");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">プロフィール設定</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">プロフィール画像</h2>
        </div>

        {/* 他のプロフィール設定項目をここに追加 */}
      </div>
    </div>
  );
}
