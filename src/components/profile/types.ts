export interface ProfilePost {
  id: number;
  user: {
    name: string;
    handle: string;
    verified: boolean;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  stats: {
    replies: number;
    reposts: number;
    likes: string;
    views: string;
  };
}
