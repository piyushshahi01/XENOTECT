"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBlogPosts(publishedOnly = false) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });
    return post;
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
}

export async function createBlogPost(data: {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  coverImage?: string;
  published: boolean;
}) {
  try {
    const post = await prisma.blogPost.create({
      data,
    });
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true, post };
  } catch (error: any) {
    console.error("Error creating blog post:", error);
    return { success: false, error: error.message };
  }
}

export async function updateBlogPost(id: string, data: {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  coverImage?: string;
  published: boolean;
}) {
  try {
    const post = await prisma.blogPost.update({
      where: { id },
      data,
    });
    revalidatePath("/blog");
    revalidatePath("/");
    revalidatePath(`/blog/${data.slug}`);
    return { success: true, post };
  } catch (error: any) {
    console.error("Error updating blog post:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await prisma.blogPost.delete({
      where: { id },
    });
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting blog post:", error);
    return { success: false, error: error.message };
  }
}
