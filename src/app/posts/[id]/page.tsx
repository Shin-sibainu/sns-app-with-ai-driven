import { notFound } from "next/navigation";
import { PostCard } from "@/components/post/post-card";
import { formatTimeAgo } from "@/lib/utils/format-time";
import { LeftSidebar } from "@/components/sidebar/left-sidebar";
import { RightSidebar } from "@/components/sidebar/right-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { postDAL } from "@/lib/dal/post";
import { PostHeader } from "@/components/post/post-header";
import { ReplyForm } from "@/components/post/reply-form";
import { Post, User } from "@prisma/client";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface PostWithUser extends Post {
  user: User;
  _count: {
    replies: number;
    likes: number;
  };
  likes: {
    userId: string;
    postId: string;
    createdAt: Date;
  }[];
  replies?: PostWithUser[];
}

function convertPrismaPostToPost(prismaPost: PostWithUser) {
  return {
    id: prismaPost.id,
    content: prismaPost.content,
    user: prismaPost.user,
    timestamp: formatTimeAgo(prismaPost.createdAt),
    stats: {
      replies: prismaPost._count?.replies ?? 0,
      reposts: 0,
      likes: (prismaPost._count?.likes ?? 0).toString(),
      views: "0",
    },
    createdAt: prismaPost.createdAt,
    updatedAt: prismaPost.updatedAt,
    userId: prismaPost.userId,
    parentId: prismaPost.parentId,
    _count: prismaPost._count,
    likes: prismaPost.likes,
  };
}

export async function generateMetadata({ params }: PostPageProps) {
  const { id } = await params;
  const post = await postDAL.getPostWithReplies(id);

  if (!post) {
    return {
      title: "投稿が見つかりません",
    };
  }

  return {
    title: `${post.user.displayName}さんの投稿: ${post.content.slice(
      0,
      50
    )}...`,
    description: post.content,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const prismaPost = await postDAL.getPostWithReplies(id);

  if (!prismaPost) {
    notFound();
  }

  const post = convertPrismaPostToPost(prismaPost);
  const replies = prismaPost.replies?.map(convertPrismaPostToPost) ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="pb-16 md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-[auto_600px_350px] md:max-w-[1265px] mx-auto">
          <div className="hidden md:block">
            <LeftSidebar />
          </div>
          <main className="border-x border-border relative">
            <PostHeader post={post} isReplyPage />
            <PostCard post={post} />
            <div className="border-y border-border">
              <ReplyForm postId={post.id} />
            </div>
            <div>
              {replies.map((reply) => (
                <PostCard key={reply.id} post={reply} />
              ))}
            </div>
          </main>
          <div className="hidden md:block">
            <RightSidebar />
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
