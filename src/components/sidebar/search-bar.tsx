import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="sticky top-0 pt-2 pb-4">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="検索"
          className="pl-10 bg-muted/80 border-none rounded-full"
        />
      </div>
    </div>
  );
}
