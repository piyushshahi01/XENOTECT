"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { createBlogPost, updateBlogPost } from "@/app/actions/blog";
import { X, Save, Edit2, FileText, Plus } from "lucide-react";
import { animate } from "animejs";
import { useLenis } from "lenis/react";

export function BlogForm({ post, onSaved }: { post: any, onSaved: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    category: post?.category || "Engineering",
    coverImage: post?.coverImage || "",
    published: post?.published || false,
  });
  const [saving, setSaving] = useState(false);
  
  const isEdit = !!post;
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
      animate('.modal-overlay', {
        opacity: [0, 1],
        duration: 400,
        ease: 'outExpo'
      });
      animate('.modal-content', {
        opacity: [0, 1],
        scale: [0.95, 1],
        y: [20, 0],
        duration: 600,
        ease: 'outExpo',
        delay: 100
      });
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = 'auto';
    }
    return () => { 
      if (lenis) lenis.start();
      document.body.style.overflow = 'auto'; 
    };
  }, [isOpen, lenis]);

  const closeModal = () => {
    animate('.modal-overlay, .modal-content', {
      opacity: 0,
      scale: 0.95,
      duration: 300,
      ease: 'inExpo',
      onComplete: () => setIsOpen(false)
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    // Auto-generate slug if not editing or if slug was previously auto-generated
    if (!isEdit || (formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === formData.slug)) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData({ ...formData, title, slug });
    } else {
      setFormData({ ...formData, title });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    let res;
    if (isEdit) {
      res = await updateBlogPost(post.id, formData);
    } else {
      res = await createBlogPost(formData);
    }
    
    setSaving(false);
    if (res.success) {
      setIsOpen(false);
      onSaved();
    } else {
      alert("Error saving blog post: " + res.error);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`group relative overflow-hidden rounded-full font-medium transition-all duration-300 active:scale-[0.98] flex items-center gap-2 ${
          isEdit 
            ? "px-5 py-2.5 bg-white/5 border border-white/10 text-white hover:bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
            : "px-6 py-3 bg-white text-black hover:bg-neutral-200"
        }`}
      >
        <span className="relative z-10 flex items-center gap-2 text-sm font-bold">
          {isEdit ? <Edit2 className="w-3.5 h-3.5" /> : <Plus className="w-4 h-4" />} 
          {isEdit ? "Edit Post" : "New Post"}
        </span>
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="modal-overlay absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeModal} />
          
          <div className="modal-content relative w-full max-w-4xl p-1.5 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
            <div className="rounded-[calc(2.5rem-6px)] bg-[#0A0A0F] border border-white/5 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative flex flex-col max-h-[90vh]">
              
              <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/5 relative z-10 shrink-0">
                <div className="flex flex-col gap-1">
                  <h2 className="text-3xl font-display font-bold text-white tracking-tight">{isEdit ? "Edit Blog Post" : "Draft New Post"}</h2>
                  <p className="text-neutral-400 text-sm">Write amazing content for your audience.</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto relative z-10 flex-1 custom-scrollbar min-h-0" data-lenis-prevent="true">
                <form id="blog-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Post Title *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={handleTitleChange}
                        className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">URL Slug *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.slug}
                        onChange={e => setFormData({...formData, slug: e.target.value})}
                        className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-sm focus:outline-none focus:border-white/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Category *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Cover Image URL</label>
                      <input 
                        type="text" 
                        value={formData.coverImage}
                        placeholder="https://your-supabase-url.../image.jpg"
                        onChange={e => setFormData({...formData, coverImage: e.target.value})}
                        className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Excerpt (Short Description)</label>
                    <textarea 
                      value={formData.excerpt}
                      onChange={e => setFormData({...formData, excerpt: e.target.value})}
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 transition-all min-h-[80px]"
                    />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 flex items-center justify-between">
                      <span>Content (Markdown/HTML) *</span>
                      <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" className="text-emerald-500 hover:underline flex items-center gap-1"><FileText className="w-3 h-3" /> Markdown Guide</a>
                    </label>
                    <textarea 
                      required
                      value={formData.content}
                      onChange={e => setFormData({...formData, content: e.target.value})}
                      className="w-full bg-[#050508] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/20 transition-all min-h-[300px] font-mono text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <input 
                      type="checkbox" 
                      id="published"
                      checked={formData.published}
                      onChange={e => setFormData({...formData, published: e.target.checked})}
                      className="w-5 h-5 rounded bg-[#050508] border border-white/20 text-emerald-500"
                    />
                    <label htmlFor="published" className="text-sm font-bold text-white tracking-tight cursor-pointer">Publish Post immediately?</label>
                  </div>

                </form>
              </div>

              <div className="p-6 md:p-8 border-t border-white/5 flex justify-end gap-4 shrink-0 bg-[#0A0A0F]/50 backdrop-blur-sm relative z-10">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 rounded-full text-neutral-400 font-medium hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  form="blog-form"
                  type="submit" 
                  disabled={saving}
                  className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center gap-2 active:scale-95"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Post
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}
