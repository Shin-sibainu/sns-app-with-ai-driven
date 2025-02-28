"use client";

import { Avatar } from "@/components/ui/avatar";
import { MessageCircle, Repeat2, Heart, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";
import { PostHeader } from "./post-header";
import { ActionButton } from "./action-button";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <article
      className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
      onClick={handlePostClick}
    >
      <div className="flex gap-4">
        <Avatar className="w-10 h-10">
          <img
            src={post.user.profileImageUrl || "/default-avatar.png"}
            alt={post.user.displayName}
            className="rounded-full"
          />
        </Avatar>
        <div className="flex-1 space-y-2">
          <PostHeader post={post} />
          <p className="whitespace-pre-line">{post.content}</p>
          {post.image && (
            <div className="mt-2 rounded-xl overflow-hidden border border-border">
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-auto"
              />
            </div>
          )}
          <div className="flex justify-between items-center pt-2 text-muted-foreground max-w-md">
            <ActionButton
              icon={<MessageCircle className="h-4 w-4" />}
              count={post.stats.replies}
              color="blue"
            />
            <ActionButton
              icon={<Repeat2 className="h-4 w-4" />}
              count={post.stats.reposts}
              color="green"
            />
            <ActionButton
              icon={<Heart className="h-4 w-4" />}
              count={post.stats.likes}
              color="pink"
            />
            <ActionButton
              icon={<Share className="h-4 w-4" />}
              count={post.stats.views}
              color="blue"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
