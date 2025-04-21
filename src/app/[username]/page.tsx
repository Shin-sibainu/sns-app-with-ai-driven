import { notFound } from "next/navigation";
import { PostCard } from "@/components/post/post-card";
import { ProfileHeader } from "@/components/profile/profile-header";
import { LeftSidebar } from "@/components/sidebar/left-sidebar";
import { RightSidebar } from "@/components/sidebar/right-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { userDAL } from "@/lib/dal/user";
import { formatTimeAgo } from "@/lib/utils/format-time";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = await userDAL.getByUsername(username);

  if (!user) {
    return {
      title: "ユーザーが見つかりません",
    };
  }

  return {
    title: `${user.displayName} (@${user.username})`,
    description: user.bio || `${user.displayName}のプロフィール`,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const [profileUser, posts] = await Promise.all([
    userDAL.getByUsername(username),
    userDAL.getPosts(username),
  ]);

  if (!profileUser) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="pb-16 md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-[auto_600px_350px] md:max-w-[1265px] mx-auto">
          <div className="hidden md:block">
            <LeftSidebar />
          </div>
          <main className="border-x border-border relative max-h-screen overflow-y-auto">
            <ProfileHeader
              user={{
                id: profileUser.id,
                clerkId: profileUser.clerkId,
                username: profileUser.username,
                displayName: profileUser.displayName,
                bio: profileUser.bio,
                profileImageUrl: profileUser.profileImageUrl,
                coverImageUrl:
                  profileUser.coverImageUrl ||
                  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&auto=format&fit=crop&q=60",
                stats: {
                  posts: profileUser._count.posts,
                  following: profileUser._count.following,
                  followers: profileUser._count.followers,
                },
              }}
            />
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
                    _count: post._count,
                    likes: post.likes,
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
