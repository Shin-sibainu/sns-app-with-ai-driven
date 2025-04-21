"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type State = {
  message?: string;
  error?: string;
};

export async function createPost(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const content = formData.get("content") as string;

    if (!content?.trim()) {
      return { error: "投稿内容を入力してください" };
    }

    // 認証チェック
    const { userId } = await auth();
    if (!userId) {
      return { error: "認証が必要です" };
    }

    // ユーザー情報の取得
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return { error: "ユーザーが見つかりません" };
    }

    // 投稿の作成
    await prisma.post.create({
      data: {
        content,
        userId: user.id,
      },
    });

    // キャッシュの再検証
    revalidatePath("/");

    return { message: "投稿が完了しました！" };
  } catch (error) {
    console.error("投稿作成エラー:", error);
    return {
      error:
        error instanceof Error ? error.message : "投稿の作成に失敗しました",
    };
  }
}
