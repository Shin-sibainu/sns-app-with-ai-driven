"use client";

import { Heart } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { toggleLike } from "@/app/actions/like";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LikeButtonServerProps {
  postId: string;
  isLiked: boolean;
  likeCount: number;
}

export function LikeButtonServer({
  postId,
  isLiked: initialIsLiked,
  likeCount: initialLikeCount,
}: LikeButtonServerProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticState, addOptimisticState] = useOptimistic(
    { isLiked: initialIsLiked, count: initialLikeCount },
    (state) => ({
      isLiked: !state.isLiked,
      count: state.count + (state.isLiked ? -1 : 1),
    })
  );

  const handleLike = () => {
    startTransition(async () => {
      try {
        // 楽観的に状態を更新
        addOptimisticState(optimisticState);
        const formData = new FormData();
        formData.append("postId", postId);
        await toggleLike(formData);
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    });
  };

  return (
    <div className="flex items-center gap-1">
      <SignedIn>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="hover:bg-red-500/10"
          onClick={handleLike}
          disabled={isPending}
        >
          <Heart
            className={`h-5 w-5 ${
              optimisticState.isLiked
                ? "fill-red-500 text-red-500"
                : "text-neutral-500"
            }`}
          />
        </Button>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="ghost" size="icon" className="hover:bg-red-500/10">
            <Heart className="h-5 w-5 text-neutral-500" />
          </Button>
        </SignInButton>
      </SignedOut>
      <span
        className={cn(
          "text-sm",
          optimisticState.isLiked ? "text-red-500" : "text-neutral-500"
        )}
      >
        {optimisticState.count}
      </span>
    </div>
  );
}
