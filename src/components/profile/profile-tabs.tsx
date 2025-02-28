export function ProfileTabs() {
  return (
    <div className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm">
      <div className="flex text-sm md:text-base overflow-x-auto">
        <button className="flex-1 min-w-[4rem] p-3 md:p-4 text-center font-bold border-b-4 border-neutral-900">
          ポスト
        </button>
        <button className="flex-1 min-w-[4rem] p-3 md:p-4 text-center text-muted-foreground hover:bg-muted/50">
          返信
        </button>
        <button className="flex-1 min-w-[4rem] p-3 md:p-4 text-center text-muted-foreground hover:bg-muted/50">
          ハイライト
        </button>
        <button className="flex-1 min-w-[4rem] p-3 md:p-4 text-center text-muted-foreground hover:bg-muted/50">
          メディア
        </button>
        <button className="flex-1 min-w-[4rem] p-3 md:p-4 text-center text-muted-foreground hover:bg-muted/50">
          いいね
        </button>
      </div>
    </div>
  );
}
