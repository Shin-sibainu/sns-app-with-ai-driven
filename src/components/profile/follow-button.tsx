"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toggleFollow } from "@/app/_actions/user";

interface FollowButtonProps {
  userId: string;
  targetUserId: string;
  username: string;
  isFollowing: boolean;
}

export function FollowButton({
  userId,
  targetUserId,
  isFollowing: initialIsFollowing,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    if (!userId) return;

    startTransition(async () => {
      try {
        setIsFollowing(!isFollowing); // Optimistic update
        const isNowFollowing = await toggleFollow(userId, targetUserId);
        setIsFollowing(isNowFollowing);
      } catch {
        setIsFollowing(isFollowing); // Revert on error
        toast.error("フォロー操作に失敗しました");
      }
    });
  };

  return (
    <Button
      variant={isFollowing ? "secondary" : "default"}
      onClick={handleFollow}
      disabled={isPending}
    >
      {isFollowing ? "フォロー中" : "フォロー"}
    </Button>
  );
}
