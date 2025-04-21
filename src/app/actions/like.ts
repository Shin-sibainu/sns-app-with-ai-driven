"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleLike(formData: FormData): Promise<void> {
  console.log(formData);
  const postId = formData.get("postId") as string;
  if (!postId) {
    throw new Error("投稿IDが必要です");
  }

  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      throw new Error("認証が必要です");
    }

    // ユーザー情報の取得
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    // いいねの存在確認
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });

    if (existingLike) {
      // いいねを削除
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: user.id,
            postId,
          },
        },
      });
    } else {
      // いいねを作成
      await prisma.like.create({
        data: {
          userId: user.id,
          postId,
        },
      });
    }

    // キャッシュの再検証
    revalidatePath("/");
  } catch (error) {
    console.error("いいね処理エラー:", error);
    throw error;
  }
}
