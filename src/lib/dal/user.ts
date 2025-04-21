/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { Post, PostWithUser } from "@/types/post";
import { User } from "@prisma/client";

interface UserWithStats extends User {
  _count: {
    followers: number;
    following: number;
    posts: number;
  };
}

function convertToPost(prismaPost: any): Post {
  return {
    id: prismaPost.id,
    content: prismaPost.content,
    user: prismaPost.user,
    timestamp: prismaPost.createdAt.getTime().toString(),
    stats: {
      replies: prismaPost._count?.replies ?? 0,
      reposts: 0,
      likes: (prismaPost._count?.likes ?? 0).toString(),
      views: "0",
    },
    createdAt: prismaPost.createdAt,
    updatedAt: prismaPost.updatedAt,
    userId: prismaPost.userId,
    parentId: prismaPost.parentId,
    _count: prismaPost._count,
    likes: prismaPost.likes,
    replies: prismaPost.replies?.map(convertToPost) || [],
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

  async getByClerkId(clerkId: string): Promise<UserWithStats | null> {
    return await prisma.user.findUnique({
      where: { clerkId },
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

  async update(
    userId: string,
    data: {
      displayName?: string;
      bio?: string;
      coverImageUrl?: string | null;
    }
  ) {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  },

  async getPosts(username: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        user: {
          username: username.toLowerCase(),
        },
      },
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts.map(convertToPost);
  },

  async getTimelinePosts(): Promise<PostWithUser[]> {
    const posts = await prisma.post.findMany({
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
            postId: true,
            createdAt: true,
          },
        },
        replies: true,
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
      },
    });

    function convertPost(post: any): PostWithUser {
      return {
        ...post,
        timestamp: post.createdAt.getTime().toString(),
        stats: {
          replies: post._count.replies,
          reposts: 0,
          likes: post._count.likes.toString(),
          views: "0",
        },
        replies: post.replies?.map(convertPost) || [],
      };
    }

    return posts.map(convertPost);
  },

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    return !!follow;
  },

  async follow(followerId: string, followingId: string): Promise<void> {
    await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
  },

  async unfollow(followerId: string, followingId: string): Promise<void> {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  },

  async toggleFollow(
    followerId: string,
    followingId: string
  ): Promise<boolean> {
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (follow) {
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });
      return false;
    } else {
      await prisma.follow.create({
        data: {
          followerId,
          followingId,
        },
      });
      return true;
    }
  },
};
/* eslint-enable @typescript-eslint/no-explicit-any */
