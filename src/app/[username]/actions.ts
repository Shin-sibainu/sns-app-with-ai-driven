"use server";

import { auth } from "@clerk/nextjs/server";
import { userDAL } from "@/lib/dal/user";
import { revalidatePath } from "next/cache";

export async function toggleFollow(
  targetUserId: string,
  targetUsername: string
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "認証が必要です" };
    }

    // 自分のデータベースのユーザーIDを取得
    const currentUser = await userDAL.getByClerkId(userId);
    if (!currentUser) {
      return { error: "ユーザーが見つかりません" };
    }

    // 自分自身をフォローしようとしている場合
    if (currentUser.id === targetUserId) {
      return { error: "自分自身をフォローすることはできません" };
    }

    // 現在のフォロー状態を確認
    const isFollowing = await userDAL.isFollowing(currentUser.id, targetUserId);

    if (isFollowing) {
      // フォロー解除
      await userDAL.unfollow(currentUser.id, targetUserId);
    } else {
      // フォロー
      await userDAL.follow(currentUser.id, targetUserId);
    }

    // キャッシュを更新
    revalidatePath(`/${targetUsername}`);

    return {
      success: true,
      isFollowing: !isFollowing,
    };
  } catch (error) {
    console.error("フォロー操作エラー:", error);
    return { error: "フォロー操作に失敗しました" };
  }
}
