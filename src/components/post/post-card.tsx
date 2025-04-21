import { Post } from "@/types/post";
import { auth } from "@clerk/nextjs/server";
import { postDAL } from "@/lib/dal/post";
import { PostCardClient } from "./post-card-client";

interface PostCardProps {
  post: Post;
}

export async function PostCard({ post }: PostCardProps) {
  const { userId: clerkId } = await auth();
  let isLiked = false;

  if (clerkId) {
    const user = await postDAL.getUserByClerkId(clerkId);
    if (user) {
      isLiked = await postDAL.getLikeStatus(post.id, user.id);
    }
  }

  const likeCount = post._count?.likes || 0;

  return <PostCardClient post={post} isLiked={isLiked} likeCount={likeCount} />;
}
