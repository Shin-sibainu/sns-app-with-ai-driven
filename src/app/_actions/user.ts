"use server";

import { userDAL } from "@/lib/dal/user";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function toggleFollow(userId: string, targetUserId: string) {
  try {
    const isNowFollowing = await userDAL.toggleFollow(userId, targetUserId);
    revalidatePath("/[username]");
    return isNowFollowing;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateUser(data: {
  name: string;
  bio: string;
  coverImageUrl?: string | null;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await userDAL.getByClerkId(userId);
  if (!user) {
    throw new Error("User not found");
  }

  await userDAL.update(user.id, {
    displayName: data.name,
    bio: data.bio,
    coverImageUrl: data.coverImageUrl,
  });

  revalidatePath("/[username]", "layout");
}
