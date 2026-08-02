import { NotchNavbar } from "@/components/ui/notch-navbar";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { getBlogPosts } from "@/app/actions/blog";

export default async function BlogPage() {
  const posts = await getBlogPosts(true);

  return (
    <main className="w-full relative bg-transparent overflow-x-hidden min-h-screen flex flex-col">
      <AmbientBackground />
      <NotchNavbar />
      
      <div className="flex-1 relative z-10 pt-32 pb-24 px-5 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
            &larr; Back to Home
          </Link>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
          All Posts
        </h1>
        <p className="text-white/50 text-xl max-w-2xl mb-16">
          Explore our latest insights, case studies, and engineering deep-dives.
        </p>

        {posts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/5">
            <p className="text-neutral-500 text-lg">No posts published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <a 
                href={`/blog/${post.slug}`}
                key={post.id}
                className="group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex flex-col gap-6"
              >
                <div className="aspect-video bg-white/[0.03] rounded-xl flex items-center justify-center overflow-hidden relative">
                  {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <span className="text-white/20 text-sm font-medium">No Cover Image</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2 block">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      
      <div className="relative z-10 w-full bg-[#050505]">
        <Footer />
      </div>
    </main>
  );
}
