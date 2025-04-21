import { prisma } from "@/lib/prisma";
import { Post, User } from "@prisma/client";

interface PostWithUser extends Post {
  user: User;
  _count: {
    replies: number;
    likes: number;
  };
  likes: {
    userId: string;
    postId: string;
    createdAt: Date;
  }[];
  replies?: PostWithUser[];
}

export const postDAL = {
  async create(data: { content: string; userId: string; parentId?: string }) {
    return await prisma.post.create({
      data,
      include: {
        user: true,
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
        likes: {
          select: {
            userId: true,
            postId: true,
            createdAt: true,
          },
        },
      },
    });
  },

  async getById(id: string): Promise<PostWithUser | null> {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
            postId: true,
            createdAt: true,
          },
        },
        replies: {
          include: {
            user: true,
            likes: {
              select: {
                userId: true,
                postId: true,
                createdAt: true,
              },
            },
            _count: {
              select: {
                likes: true,
                replies: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
      },
    });
  },

  async getPostWithReplies(postId: string): Promise<PostWithUser | null> {
    return await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        replies: {
          include: {
            user: true,
            _count: {
              select: {
                replies: true,
                likes: true,
              },
            },
            likes: {
              select: {
                userId: true,
                postId: true,
                createdAt: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
        likes: {
          select: {
            userId: true,
            postId: true,
            createdAt: true,
          },
        },
      },
    });
  },

  async getLikeStatus(postId: string, userId: string): Promise<boolean> {
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    return !!like;
  },

  async getUserByClerkId(clerkId: string) {
    return await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });
  },

  async getTimelinePosts(): Promise<PostWithUser[]> {
    return await prisma.post.findMany({
      where: {
        parentId: null, // 親投稿のみを取得（リプライを除外）
      },
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
        likes: {
          select: {
            userId: true,
            postId: true,
            createdAt: true,
          },
        },
      },
    });
  },
};
