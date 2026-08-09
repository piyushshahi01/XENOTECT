"use client";

import React, { useEffect, useState } from "react";
import { getBlogPosts, deleteBlogPost } from "@/app/actions/blog";
import { BlogForm } from "./BlogForm";
import { Trash2 } from "lucide-react";

export default function BlogCmsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    setLoading(true);
    getBlogPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      await deleteBlogPost(id);
      fetchPosts();
    }
  };

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto pb-32">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-neutral-400 w-max mb-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            Content Module
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tighter">Blog Posts</h1>
          <p className="text-neutral-400 max-w-lg text-lg">Write, edit, and publish articles for your landing page.</p>
        </div>
        <div className="shrink-0">
          <BlogForm post={null} onSaved={fetchPosts} />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-64 rounded-[2rem] bg-white/[0.02] border border-white/5 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 relative z-10">
          {posts.map((post) => (
            <div key={post.id} className="p-1.5 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl hover:border-white/10 transition-colors group">
              <div className="h-full rounded-[calc(2.5rem-6px)] bg-[#0A0A0F]/90 border border-white/5 p-8 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
                
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold bg-emerald-400/10 px-2 py-1 rounded-md">
                      {post.category}
                    </span>
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md ${post.published ? 'text-green-400 bg-green-400/10' : 'text-neutral-400 bg-white/10'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm line-clamp-3">
                    {post.excerpt || 'No excerpt provided.'}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center relative z-10">
                  <span className="text-xs text-neutral-500 font-medium">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <BlogForm post={post} onSaved={fetchPosts} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="col-span-full p-12 rounded-[2rem] bg-white/[0.01] border border-white/5 text-center flex flex-col items-center justify-center gap-4">
              <p className="text-neutral-500 text-lg">No blog posts found.</p>
              <BlogForm post={null} onSaved={fetchPosts} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
