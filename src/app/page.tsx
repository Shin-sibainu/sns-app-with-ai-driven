import { LeftSidebar } from "@/components/sidebar/left-sidebar";
import { RightSidebar } from "@/components/sidebar/right-sidebar";
import { TimelineHeader } from "@/components/timeline/timeline-header";
import { NewPostInput } from "@/components/post/new-post-input";
import { PostCard } from "@/components/post/post-card";
import { formatTimeAgo } from "@/lib/utils/format-time";
import { MobileNav } from "@/components/layout/mobile-nav";
import { userDAL } from "@/lib/dal/user";

export default async function Home() {
  const posts = await userDAL.getTimelinePosts();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="pb-16 md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-[auto_600px_350px] md:max-w-[1265px] mx-auto">
          <div className="hidden md:block">
            <LeftSidebar />
          </div>
          <main className="border-x border-border relative">
            <TimelineHeader />
            <div className="md:h-[calc(100vh-53px)] md:overflow-y-auto">
              <NewPostInput />
              <div className="divide-y divide-border">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
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
                ))}
              </div>
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
