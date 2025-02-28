import { PostCard } from "@/components/post/post-card";
import { profilePosts } from "./profile-data";

export function ProfileTimeline() {
  return (
    <div className="divide-y divide-border">
      {profilePosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
} 