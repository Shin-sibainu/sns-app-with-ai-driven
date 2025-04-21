import { Card } from "@/components/ui/card";

const trends = [
  {
    category: "プログラミング学習",
    title: "ShinCode",
    posts: "12,543",
  },
  {
    category: "テック系YouTuber",
    title: "プログラミングチュートリアル",
    posts: "5,876",
  },
  {
    category: "Web開発",
    title: "Next.js 14",
    posts: "8,765",
  },
];

export function TrendsCard() {
  return (
    <Card className="bg-muted/50 border-none rounded-xl">
      <div className="p-4">
        <h2 className="font-bold text-xl mb-4">トレンド</h2>
        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div
              key={index}
              className="hover:bg-muted/50 p-2 rounded-lg cursor-pointer"
            >
              <p className="text-sm text-muted-foreground">{trend.category}</p>
              <p className="font-bold">{trend.title}</p>
              <p className="text-sm text-muted-foreground">
                {trend.posts}件のポスト
              </p>
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
