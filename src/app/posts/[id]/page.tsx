import { notFound } from "next/navigation";
import { PostCard } from "@/components/post/post-card";
import { formatTimeAgo } from "@/lib/utils/format-time";
import { LeftSidebar } from "@/components/sidebar/left-sidebar";
import { RightSidebar } from "@/components/sidebar/right-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { postDAL } from "@/lib/dal/post";
import { PostHeader } from "@/components/post/post-header";
import { NewPostInput } from "@/components/post/new-post-input";
import { PostWithUser } from "@/types/post";

interface PostPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await postDAL.getPostWithReplies(params.id);

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
  const post = await postDAL.getPostWithReplies(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="pb-16 md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-[auto_600px_350px] md:max-w-[1265px] mx-auto">
          <div className="hidden md:block">
            <LeftSidebar />
          </div>
          <main className="border-x border-border relative">
            <PostHeader post={post} isReplyPage />
            <PostCard
              post={{
                id: post.id,
                content: post.content,
                user: post.user,
                timestamp: formatTimeAgo(post.createdAt),
                stats: {
                  replies: post._count?.replies ?? 0,
                  reposts: 0,
                  likes: (post._count?.likes ?? 0).toString(),
                  views: "0",
                },
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                userId: post.userId,
                parentId: post.parentId,
              }}
            />
            <div className="border-y border-border py-3 px-4">
              <NewPostInput replyTo={post} />
            </div>
            <div className="divide-y divide-border">
              {post.replies?.map((reply: PostWithUser) => (
                <PostCard
                  key={reply.id}
                  post={{
                    id: reply.id,
                    content: reply.content,
                    user: reply.user,
                    timestamp: formatTimeAgo(reply.createdAt),
                    stats: {
                      replies: reply._count?.replies ?? 0,
                      reposts: 0,
                      likes: (reply._count?.likes ?? 0).toString(),
                      views: "0",
                    },
                    createdAt: reply.createdAt,
                    updatedAt: reply.updatedAt,
                    userId: reply.userId,
                    parentId: reply.parentId,
                  }}
                />
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
