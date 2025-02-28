import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PremiumCard() {
  return (
    <Card className="bg-muted/50 border-none rounded-xl">
      <div className="p-4">
        <h2 className="font-bold text-xl mb-4">プレミアムにサブスクライブ</h2>
        <p className="text-sm mb-4">
          サブスクライブして新機能を利用しましょう。資格を満たしている場合、収益配分を受け取れます。
        </p>
        <Button className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full w-full">
          購入する
        </Button>
      </div>
    </Card>
  );
}
