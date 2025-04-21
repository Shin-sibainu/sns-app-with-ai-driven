"use server";

import { userDAL } from "@/lib/dal/user";
import { revalidatePath } from "next/cache";

interface UpdateProfileData {
  username: string;
  displayName: string;
  bio: string;
}

export async function updateProfile(data: UpdateProfileData) {
  try {
    const user = await userDAL.getByUsername(data.username);

    if (!user) {
      return { error: "ユーザーが見つかりません" };
    }

    // ユーザー情報を更新
    await userDAL.update(user.id, {
      displayName: data.displayName,
      bio: data.bio,
    });

    // キャッシュを更新
    revalidatePath(`/${data.username}`);

    return { success: true };
  } catch (error) {
    console.error("プロフィール更新エラー:", error);
    return { error: "プロフィールの更新に失敗しました" };
  }
}
