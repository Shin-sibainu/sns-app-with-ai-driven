"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image, ListFilter, Smile, Calendar } from "lucide-react";
import { PostWithUser } from "@/types/post";

interface NewPostInputProps {
  replyTo?: PostWithUser;
}

export function NewPostInput({ replyTo }: NewPostInputProps) {
  return (
    <>
      <div className="p-4 border-b border-border">
        {replyTo && (
          <div className="mb-3 text-muted-foreground text-sm">
            <span>返信先: @{replyTo.user.username}</span>
          </div>
        )}
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="いまどうしてる？"
              className="border-none text-xl bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2 text-blue-500">
                {[Image, ListFilter, Smile, Calendar].map((Icon, i) => (
                  <button
                    key={i}
                    className="hover:bg-blue-500/10 p-2 rounded-full"
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
              <Button className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-4">
                ポストする
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
