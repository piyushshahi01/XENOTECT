import { NotchNavbar } from "@/components/ui/notch-navbar";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { getBlogPostBySlug, getBlogPosts } from "@/app/actions/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.xenotectsolution.com";

// Generate dynamic metadata for each blog post
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const post = await getBlogPostBySlug(params.slug);

  if (!post || !post.published) {
    return { title: "Post Not Found | XENOTECT" };
  }

  const postUrl = post.canonicalUrl || `${BASE_URL}/blog/${post.slug}`;
  const ogImage = post.ogImage || post.coverImage || `${BASE_URL}/og-image.png`;
  const metaTitle = post.seoTitle || `${post.title} | XENOTECT Blog`;
  const metaDesc = post.metaDescription || post.excerpt || `Read "${post.title}" on the XENOTECT blog — insights on web development, AI, and digital growth.`;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: [post.category, ...(post.tags || []), "XENOTECT"],
    robots: {
      index: !post.noindex,
      follow: !post.noindex,
    },
    openGraph: {
      type: "article",
      title: post.ogTitle || metaTitle,
      description: post.ogDescription || metaDesc,
      url: postUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
      modifiedTime: post.updatedAt?.toISOString() || post.createdAt.toISOString(),
      authors: [post.author || "XENOTECT Team"],
      tags: [...(post.tags || []), post.category],
    },
    twitter: {
      card: "summary_large_image",
      title: post.ogTitle || metaTitle,
      description: post.ogDescription || metaDesc,
      images: [ogImage],
    },
    alternates: { canonical: postUrl },
  };
}

// Static params for ISR/SSG pre-rendering known blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts(true);
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  
  const post = await getBlogPostBySlug(slug);

  if (!post || (!post.published && post.status !== 'PUBLISHED')) {
    notFound();
  }

  const postUrl = post.canonicalUrl || `${BASE_URL}/blog/${post.slug}`;

  // Extract headings for dynamic TOC
  const headings: { level: number; text: string; id: string }[] = [];
  const headingRegex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  let match;
  let processedContent = post.content;
  let headingCount = 0;

  while ((match = headingRegex.exec(post.content)) !== null) {
    const level = parseInt(match[1], 10);
    // Strip inner HTML tags (e.g. strong, em) for TOC text
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    // Create an anchor ID safely
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `heading-${headingCount++}`;
    headings.push({ level, text, id });
  }

  // Inject IDs back into the HTML content so the TOC links work
  let index = 0;
  processedContent = post.content.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (fullMatch, level, attrs, innerText) => {
    const currentHeading = headings[index++];
    if (currentHeading) {
      return `<h${level}${attrs} id="${currentHeading.id}">${innerText}</h${level}>`;
    }
    return fullMatch;
  });

  return (
    <main className="w-full relative bg-[#050505] overflow-x-hidden min-h-screen flex flex-col">
      <ArticleSchema
        title={post.title}
        description={post.excerpt || ""}
        url={postUrl}
        imageUrl={post.coverImage || undefined}
        datePublished={post.createdAt.toISOString()}
        dateModified={post.updatedAt?.toISOString() || post.createdAt.toISOString()}
        authorName={post.author || "XENOTECT Team"}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: post.title, url: postUrl },
        ]}
      />
      <AmbientBackground />
      <NotchNavbar />
      
      <article className="flex-1 relative z-10 pt-40 pb-24 px-5 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
            &larr; Back to All Posts
          </Link>
        </div>
        <header className="mb-12 text-center">
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-4 block">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/50 text-sm">
            <span>By XENOTECT Team</span>
            <span>•</span>
            <time dateTime={post.createdAt.toISOString()}>
              {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          </div>
        </header>

        {post.coverImage && (
          <div className="aspect-video w-full rounded-3xl mb-12 border border-white/5 overflow-hidden relative">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {post.excerpt && (
          <div className="text-xl leading-relaxed text-white/90 mb-12 font-medium border-l-2 border-emerald-500 pl-6">
            {post.excerpt}
          </div>
        )}

        {headings.length > 0 && (
          <div className="mb-12 p-6 rounded-2xl bg-[#0A0A0F] border border-white/5">
            <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Table of Contents</h2>
            <ul className="flex flex-col gap-3">
              {headings.map((heading, i) => (
                <li key={i} style={{ marginLeft: heading.level === 3 ? '1.5rem' : '0' }}>
                  <a href={`#${heading.id}`} className="text-neutral-400 hover:text-emerald-400 transition-colors text-sm font-medium">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div 
          className="prose prose-invert prose-lg max-w-none prose-p:text-white/70 prose-headings:text-white prose-a:text-emerald-400 prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />

        {/* Internal linking CTA */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <p className="text-neutral-400 text-sm mb-4 uppercase tracking-widest font-bold">Explore More</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/services/web-solutions" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
              Web Development →
            </Link>
            <Link href="/services/ai-solutions" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
              AI Solutions →
            </Link>
            <Link href="/services/growth-solutions" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
              Digital Marketing →
            </Link>
            <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
              Start a Project →
            </Link>
          </div>
        </div>
      </article>
      
      <div className="relative z-10 w-full bg-[#050505]">
        <Footer />
      </div>
    </main>
  );
}
