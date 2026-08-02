import { NotchNavbar } from "@/components/ui/notch-navbar";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { getBlogPostBySlug } from "@/app/actions/blog";
import { notFound } from "next/navigation";

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="w-full relative bg-[#050505] overflow-x-hidden min-h-screen flex flex-col">
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
            <span>By System Admin</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </header>

        {post.coverImage && (
          <div className="aspect-video w-full rounded-3xl mb-12 flex items-center justify-center border border-white/5 overflow-hidden">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {post.excerpt && (
          <div className="text-xl leading-relaxed text-white/90 mb-12 font-medium border-l-2 border-emerald-500 pl-6">
            {post.excerpt}
          </div>
        )}

        <div 
          className="prose prose-invert prose-lg max-w-none prose-p:text-white/70 prose-headings:text-white prose-a:text-emerald-400 prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      
      <div className="relative z-10 w-full bg-[#050505]">
        <Footer />
      </div>
    </main>
  );
}
