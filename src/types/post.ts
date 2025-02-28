import { User as PrismaUser } from "@prisma/client";

export interface User extends PrismaUser {
  displayName: string;
  username: string;
  profileImageUrl: string | null;
  verified?: boolean;
}

export interface PostStats {
  replies: number;
  reposts: number;
  likes: string;
  views: string;
}

export interface Post {
  id: string;
  content: string;
  user: User;
  timestamp: string;
  stats: PostStats;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  parentId: string | null;
  _count?: {
    replies: number;
    likes: number;
  };
  replies?: PostWithUser[];
}

export interface PostWithUser extends Post {
  user: User;
}

export type ActionButtonColor = "blue" | "green" | "pink";

export interface ActionButtonProps {
  icon: React.ReactNode;
  count: number | string;
  color: ActionButtonColor;
  onClick?: () => void;
}
