import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { auth } from "@clerk/nextjs/server";
import { userDAL } from "@/lib/dal/user";
import { FollowButton } from "./follow-button";
import Image from "next/image";

interface ProfileHeaderProps {
  user: {
    id: string;
    clerkId: string;
    username: string;
    displayName: string;
    bio: string | null;
    profileImageUrl: string | null;
    coverImageUrl: string | null;
    stats: {
      posts: number;
      following: number;
      followers: number;
    };
  };
}

export async function ProfileHeader({ user }: ProfileHeaderProps) {
  const { userId: clerkId } = await auth();
  const isOwnProfile = clerkId === user.clerkId;

  const currentUser = clerkId ? await userDAL.getByClerkId(clerkId) : null;

  const isFollowing = currentUser
    ? await userDAL.isFollowing(currentUser.id, user.id)
    : false;

  return (
    <div>
      <div className="flex items-center px-4 h-14 border-b border-border">
        <Link href="/" className="p-2 hover:bg-muted/50 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="ml-6">
          <h1 className="text-xl font-semibold">{user.displayName}</h1>
          <p className="text-xs text-muted-foreground">
            {user.stats.posts} 件のポスト
          </p>
        </div>
      </div>
      <div className="h-48 bg-muted relative">
        {user.coverImageUrl ? (
          <Image
            src={user.coverImageUrl}
            alt={`${user.displayName}のカバー画像`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
      </div>
      <div className="px-4 py-3 relative">
        <div className="absolute -top-16 left-4">
          <Avatar className="w-32 h-32 border-4 border-background">
            <Image
              src={user.profileImageUrl || "/default-avatar.png"}
              alt={user.displayName}
              width={128}
              height={128}
              className="rounded-full"
              priority
            />
          </Avatar>
        </div>
        <div className="flex justify-end mb-16 gap-2">
          {!isOwnProfile && clerkId && currentUser && (
            <FollowButton
              userId={currentUser.id}
              targetUserId={user.id}
              username={user.username}
              isFollowing={isFollowing}
            />
          )}
          {isOwnProfile && (
            <Link href={`/${user.username}/edit`} className="rounded-full">
              <Button variant="outline" className="rounded-full">
                プロフィールを編集
              </Button>
            </Link>
          )}
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-bold">{user.displayName}</h1>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
        {user.bio && <p className="mt-3">{user.bio}</p>}
        <div className="flex gap-4 mt-3 text-sm">
          <span>
            <span className="font-bold">{user.stats.following}</span>{" "}
            <span className="text-muted-foreground">フォロー中</span>
          </span>
          <span>
            <span className="font-bold">{user.stats.followers}</span>{" "}
            <span className="text-muted-foreground">フォロワー</span>
          </span>
        </div>
      </div>
      <div className="border-b border-border">
        <nav className="flex">
          <button className="flex-1 h-14 hover:bg-muted/50 relative">
            <span className="font-bold">投稿</span>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-900 rounded-full mx-12" />
          </button>
          <button className="flex-1 h-14 hover:bg-muted/50 text-muted-foreground">
            <span>返信</span>
          </button>
          <button className="flex-1 h-14 hover:bg-muted/50 text-muted-foreground">
            <span>ハイライト</span>
          </button>
          <button className="flex-1 h-14 hover:bg-muted/50 text-muted-foreground">
            <span>いいね</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
