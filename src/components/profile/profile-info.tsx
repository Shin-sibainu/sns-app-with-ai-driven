import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Link as LinkIcon, MapPin } from "lucide-react";

export function ProfileInfo() {
  return (
    <>
      <div className="h-48 bg-blue-950 relative">
        <img
          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1470&auto=format&fit=crop"
          alt="カバー画像"
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-16 left-4">
          <Avatar className="w-32 h-32 border-4 border-background">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop"
              alt="プロフィール画像"
              className="rounded-full"
            />
          </Avatar>
        </div>
      </div>

      <div className="pt-4 px-2 md:px-4">
        <div className="flex justify-end mb-6">
          <Button
            variant="outline"
            className="rounded-full text-sm md:text-base"
          >
            プロフィールを編集
          </Button>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold">
            Shin@プログラミングチュートリアル
          </h2>
          <p className="text-muted-foreground">@Shin_Engineer</p>
        </div>

        <p className="mb-4">
          4.7万人プログラミング解説系Youtuber | 受講生3万人Udemyベストセラー講師
          | 最近は個人開発とかAIの勉強中です！ | お仕事はDMにて |
          お得なUdemy割引クーポン配布中です→
          <a
            href="https://shincode.info/2021/12/31/ude..."
            className="text-blue-500 hover:underline"
          >
            shincode.info/2021/12/31/ude...
          </a>
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>日本</span>
          </div>
          <div className="flex items-center gap-1">
            <LinkIcon className="h-4 w-4" />
            <a
              href="https://youtube.com/channel/UCNTxc"
              className="text-blue-500 hover:underline"
            >
              youtube.com/channel/UCNTxc...
            </a>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>2020年11月からX.comを利用しています</span>
          </div>
        </div>

        <div className="flex gap-4 text-sm overflow-x-auto pb-3 md:pb-0">
          <button className="hover:underline whitespace-nowrap">
            <span className="font-bold">24</span>
            <span className="text-muted-foreground"> フォロー中</span>
          </button>
          <button className="hover:underline whitespace-nowrap">
            <span className="font-bold">6,509</span>
            <span className="text-muted-foreground"> フォロワー</span>
          </button>
        </div>
      </div>
    </>
  );
}
