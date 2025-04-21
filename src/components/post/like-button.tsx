"use client";

import { Heart } from "lucide-react";
import { useTransition } from "react";
import { toggleLike } from "@/app/actions/like";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface LikeButtonProps {
  postId: string;
  isLiked: boolean;
  likeCount: number;
}

export function LikeButton({ postId, isLiked, likeCount }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await toggleLike(formData);
    });
  };

  return (
    <div className="flex items-center gap-1">
      <SignedIn>
        <form action={handleSubmit}>
          <input type="hidden" name="postId" value={postId} />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="hover:bg-red-500/10"
            disabled={isPending}
          >
            <Heart
              className={`h-5 w-5 ${
                isLiked ? "fill-red-500 text-red-500" : "text-neutral-500"
              }`}
            />
          </Button>
        </form>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="ghost" size="icon" className="hover:bg-red-500/10">
            <Heart className="h-5 w-5 text-neutral-500" />
          </Button>
        </SignInButton>
      </SignedOut>
      <span className="text-sm text-neutral-500">{likeCount}</span>
    </div>
  );
}
