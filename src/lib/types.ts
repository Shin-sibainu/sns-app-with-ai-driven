export interface PostWithUser {
  id: string;
  content: string;
  parentId: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    clerkId: string;
    email: string;
    username: string;
    displayName: string;
    bio: string | null;
    profileImageUrl: string | null;
    coverImageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  replies: PostWithUser[];
  likes: {
    id: string;
    userId: string;
    postId: string;
    createdAt: Date;
  }[];
  _count: {
    replies: number;
    likes: number;
  };
}
