"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBlogPosts(publishedOnly = false) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: publishedOnly ? { OR: [{ published: true }, { status: 'PUBLISHED' }] } : undefined,
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

export async function getBlogTags() {
  try {
    // Basic distinct tags fetch. Prisma doesn't support distinct on array elements directly in a simple query,
    // so we fetch all tags and deduplicate in code (fine for small to medium scale).
    const posts = await prisma.blogPost.findMany({
      select: { tags: true }
    });
    const allTags = posts.flatMap(p => p.tags);
    return Array.from(new Set(allTags));
  } catch (error) {
    console.error("Error fetching blog tags:", error);
    return [];
  }
}

// Helper to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>?/gm, '').split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export type BlogPostInput = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  tags?: string[];
  author?: string;
  coverImage?: string;
  featuredImageAlt?: string;
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  status: string; // DRAFT, PUBLISHED, SCHEDULED
  publishedAt?: Date | null;
  published?: boolean; // legacy
};

export async function createBlogPost(data: BlogPostInput) {
  try {
    const readingTime = calculateReadingTime(data.content);
    
    const post = await prisma.blogPost.create({
      data: {
        ...data,
        readingTime,
        published: data.status === 'PUBLISHED' || data.published === true
      },
    });
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true, post };
  } catch (error: any) {
    console.error("Error creating blog post:", error);
    return { success: false, error: error.message };
  }
}

export async function updateBlogPost(id: string, data: BlogPostInput) {
  try {
    const readingTime = calculateReadingTime(data.content);

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        readingTime,
        published: data.status === 'PUBLISHED' || data.published === true
      },
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
