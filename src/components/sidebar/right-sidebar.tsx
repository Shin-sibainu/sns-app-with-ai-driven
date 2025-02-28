import { SearchBar } from "@/components/sidebar/search-bar";
import { PremiumCard } from "@/components/sidebar/premium-card";
import { TrendsCard } from "@/components/sidebar/trends-card";
import { SuggestedUsersCard } from "@/components/sidebar/suggested-users-card";

export function RightSidebar() {
  return (
    <div className="sticky top-0 h-screen p-4">
      <div className="space-y-4">
        <SearchBar />
        <PremiumCard />
        <TrendsCard />
        <SuggestedUsersCard />
      </div>
    </div>
  );
}
