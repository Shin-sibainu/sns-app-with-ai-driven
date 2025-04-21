"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { updateUser } from "@/app/_actions/user";
import { CoverImageUpload } from "@/components/ui/cover-image-upload";

interface EditDialogProps {
  user: User;
}

export function EditDialog({ user }: EditDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState(user.coverImageUrl);

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      router.back();
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;

    try {
      await updateUser({
        name,
        bio,
        coverImageUrl,
      });

      toast.success("プロフィールを更新しました");
      router.back();
      router.refresh();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("プロフィールの更新に失敗しました");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>プロフィールを編集</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <CoverImageUpload
            defaultImage={coverImageUrl}
            onUpload={setCoverImageUrl}
          />
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input
              id="name"
              name="name"
              defaultValue={user.displayName}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">自己紹介</Label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={user.bio || ""}
              rows={5}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "更新中..." : "更新"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
