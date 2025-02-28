import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const suggestedUsers = [
  {
    name: "深津 貴之 / THE G...",
    handle: "@fladdict",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "山田 太郎",
    handle: "@yamada_taro",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&auto=format&fit=crop&q=60",
  },
];

export function SuggestedUsersCard() {
  return (
    <Card className="bg-muted/50 border-none rounded-xl">
      <div className="p-4">
        <h2 className="font-bold text-xl mb-4">おすすめユーザー</h2>
        <div className="space-y-4">
          {suggestedUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-full"
                  />
                </Avatar>
                <div>
                  <p className="font-bold">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.handle}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="rounded-full bg-background text-foreground hover:bg-muted"
              >
                フォロー
              </Button>
            </div>
          ))}
        </div>
        <button className="text-blue-500 hover:text-blue-600 text-sm mt-4">
          さらに表示
        </button>
      </div>
    </Card>
  );
}
