"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface CoverImageUploadProps {
  defaultImage?: string | null;
  onUpload: (url: string) => void;
}

export function CoverImageUpload({
  defaultImage,
  onUpload,
}: CoverImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(defaultImage);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ファイルサイズチェック (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("ファイルサイズは5MB以下にしてください");
      return;
    }

    // 画像ファイルチェック
    if (!file.type.startsWith("image/")) {
      toast.error("画像ファイルを選択してください");
      return;
    }

    setIsUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("cover-images")
        .upload(fileName, file);

      if (error) {
        console.error("Upload error:", error);
        toast.error("画像のアップロードに失敗しました");
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("cover-images").getPublicUrl(data.path);

      setPreviewUrl(publicUrl);
      onUpload(publicUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("予期せぬエラーが発生しました");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <div className="h-48 bg-muted relative">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="カバー画像"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="absolute bottom-4 right-4">
        <Button
          variant="secondary"
          size="sm"
          className="relative"
          disabled={isUploading}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {isUploading ? "アップロード中..." : "カバー画像を変更"}
        </Button>
      </div>
    </div>
  );
}
