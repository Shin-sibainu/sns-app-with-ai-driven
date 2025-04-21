"use client";

import { Avatar } from "@/components/ui/avatar";
import { MessageCircle, Repeat2, Share } from "lucide-react";
import { Post } from "@/types/post";
import { PostHeader } from "./post-header";
import { ActionButton } from "./action-button";
import { LikeButtonServer } from "./like-button-server";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PostCardClientProps {
  post: Post;
  isLiked: boolean;
  likeCount: number;
}

export function PostCardClient({
  post,
  isLiked,
  likeCount,
}: PostCardClientProps) {
  const router = useRouter();

  const handlePostClick = (e: React.MouseEvent) => {
    // フォームやボタンのクリックを無視
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest("button") || e.target.closest("form"))
    ) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    router.push(`/posts/${post.id}`);
  };

  return (
    <article
      className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
      onClick={handlePostClick}
    >
      <div className="flex gap-4">
        <Avatar className="w-10 h-10">
          <Image
            src={post.user.profileImageUrl || "/default-avatar.png"}
            alt={`${post.user.displayName}のプロフィール画像`}
            width={40}
            height={40}
            className="rounded-full"
          />
        </Avatar>
        <div className="flex-1 space-y-2">
          <PostHeader post={post} />
          <p className="whitespace-pre-line">{post.content}</p>
          {post.image && (
            <div className="mt-2 rounded-xl overflow-hidden border border-border relative aspect-[16/9]">
              <Image
                src={post.image}
                alt="投稿画像"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}
          <div
            className="flex justify-between items-center pt-2 text-muted-foreground max-w-md"
            onClick={(e) => e.stopPropagation()} // アクションボタンのクリックイベントの伝播を停止
          >
            <ActionButton
              icon={<MessageCircle className="h-4 w-4" />}
              count={post._count?.replies || 0}
              color="blue"
            />
            <ActionButton
              icon={<Repeat2 className="h-4 w-4" />}
              count={post.stats.reposts}
              color="green"
            />
            <LikeButtonServer
              postId={post.id}
              isLiked={isLiked}
              likeCount={likeCount}
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
