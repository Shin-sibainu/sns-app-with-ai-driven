export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) return "たった今";
  if (hours < 24) return `${hours}時間`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}日`;
  return date.toLocaleDateString("ja-JP");
}
