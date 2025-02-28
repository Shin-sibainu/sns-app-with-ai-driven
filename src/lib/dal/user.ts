import { prisma } from "@/lib/prisma";
import { PostWithUser } from "@/types/post";
import { User } from "@prisma/client";

interface UserWithStats extends User {
  _count: {
    followers: number;
    following: number;
    posts: number;
  };
}

export const userDAL = {
  async getByUsername(username: string): Promise<UserWithStats | null> {
    return await prisma.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });
  },

  async getPosts(username: string): Promise<PostWithUser[]> {
    return await prisma.post.findMany({
      where: {
        user: {
          username: username.toLowerCase(),
        },
      },
      include: {
        user: true,
        likes: true,
        replies: true,
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async getTimelinePosts(): Promise<PostWithUser[]> {
    return await prisma.post.findMany({
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        likes: true,
        replies: true,
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
      },
    });
  },
};
