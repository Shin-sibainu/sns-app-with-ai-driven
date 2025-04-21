"use server";

import { auth } from "@clerk/nextjs/server";
import { userDAL } from "@/lib/dal/user";
import { postDAL } from "@/lib/dal/post";
import { revalidatePath } from "next/cache";

export async function createReply(postId: string, content: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "認証が必要です" };
    }

    const user = await userDAL.getByClerkId(userId);
    if (!user) {
      return { error: "ユーザーが見つかりません" };
    }

    const reply = await postDAL.create({
      content,
      userId: user.id,
      parentId: postId,
    });

    // 投稿詳細ページと、タイムラインの両方を再検証
    revalidatePath(`/posts/${postId}`);

    return { success: true, post: reply };
  } catch {
    return { error: "返信の投稿に失敗しました" };
  }
}
