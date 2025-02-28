import { notFound } from "next/navigation";
import { PostCard } from "@/components/post/post-card";
import { formatTimeAgo } from "@/lib/utils/format-time";
import { ProfileHeader } from "@/components/profile/profile-header";
import { LeftSidebar } from "@/components/sidebar/left-sidebar";
import { RightSidebar } from "@/components/sidebar/right-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { userDAL } from "@/lib/dal/user";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const user = await userDAL.getByUsername(params.username);

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
  const [user, posts] = await Promise.all([
    userDAL.getByUsername(params.username),
    userDAL.getPosts(params.username),
  ]);

  if (!user) {
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
            <ProfileHeader
              user={{
                id: user.id,
                username: user.username,
                displayName: user.displayName,
                bio: user.bio,
                profileImageUrl: user.profileImageUrl,
                coverImageUrl: user.coverImageUrl,
                stats: {
                  posts: user._count.posts,
                  following: user._count.following,
                  followers: user._count.followers,
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
                    user: {
                      name: post.user.displayName,
                      handle: `@${post.user.username}`,
                      avatar:
                        post.user.profileImageUrl || "/default-avatar.png",
                      verified: false,
                    },
                    timestamp: formatTimeAgo(post.createdAt),
                    stats: {
                      replies: post._count.replies,
                      reposts: 0,
                      likes: post._count.likes.toString(),
                      views: "0",
                    },
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
