"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createReply } from "@/app/_actions/post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReplyFormProps {
  postId: string;
  onSuccess?: () => void;
}

export function ReplyForm({ postId, onSuccess }: ReplyFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await createReply(postId, content.trim());
      if (result.error) {
        toast.error(result.error);
      } else {
        setContent("");
        toast.success("返信を投稿しました");
        onSuccess?.();
        router.refresh();
      }
    } catch {
      toast.error("返信の投稿に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="返信を投稿"
        maxLength={280}
        disabled={isSubmitting}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={!content.trim() || isSubmitting}>
          {isSubmitting ? "投稿中..." : "返信"}
        </Button>
      </div>
    </form>
  );
}
