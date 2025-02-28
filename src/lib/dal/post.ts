import { prisma } from "@/lib/prisma";
import { PostWithUser } from "@/types/post";

export const postDAL = {
  async create(userId: string, content: string): Promise<PostWithUser> {
    return await prisma.post.create({
      data: {
        content,
        userId,
      },
      include: {
        user: true,
        likes: true,
        replies: {
          include: {
            user: true,
            likes: true,
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

  async getById(id: string): Promise<PostWithUser | null> {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        likes: true,
        replies: {
          include: {
            user: true,
            likes: true,
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

  async getPostWithReplies(id: string): Promise<PostWithUser | null> {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        likes: true,
        replies: {
          include: {
            user: true,
            likes: true,
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
};
