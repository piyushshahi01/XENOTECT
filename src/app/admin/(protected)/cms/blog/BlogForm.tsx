"use client";

import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { createBlogPost, updateBlogPost, getBlogTags } from "@/app/actions/blog";
import { uploadBlogImage } from "@/lib/supabase";
import { 
  X, Save, Edit2, Plus, Type, Image as ImageIcon, Search, 
  Settings, CheckCircle2, ChevronDown, ChevronRight, Eye, Calendar, UploadCloud,
  Bold, Italic, Link as LinkIcon, List, ListOrdered, Heading2, Heading3, Quote, Code, SeparatorHorizontal
} from "lucide-react";
import { animate } from "animejs";
import { useLenis } from "lenis/react";

// Tiptap imports
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapLink from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';

const CATEGORIES = [
  "Web Development",
  "AI & Automation",
  "SEO & Digital Growth",
  "Business & Technology",
  "Case Studies",
  "XENOTECT Insights"
];

const SECTIONS = [
  { id: 'basic', label: 'Basic Information', icon: Type },
  { id: 'content', label: 'Content', icon: Edit2 },
  { id: 'media', label: 'Media', icon: ImageIcon },
  { id: 'seo', label: 'SEO & Social', icon: Search },
  { id: 'publishing', label: 'Publishing', icon: Settings },
];

export function BlogForm({ post, onSaved }: { post: any, onSaved: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [existingTags, setExistingTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    category: post?.category || "Web Development",
    tags: post?.tags || [],
    author: post?.author || "XENOTECT Team",
    coverImage: post?.coverImage || "",
    featuredImageAlt: post?.featuredImageAlt || "",
    seoTitle: post?.seoTitle || "",
    metaDescription: post?.metaDescription || "",
    canonicalUrl: post?.canonicalUrl || "",
    noindex: post?.noindex || false,
    ogTitle: post?.ogTitle || "",
    ogDescription: post?.ogDescription || "",
    ogImage: post?.ogImage || "",
    status: post?.status || "DRAFT", // DRAFT, PUBLISHED, SCHEDULED
    publishedAt: post?.publishedAt ? new Date(post.publishedAt).toISOString().slice(0,16) : "",
  });

  const [saving, setSaving] = useState(false);
  const isEdit = !!post;
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
      animate('.modal-overlay', { opacity: [0, 1], duration: 400, ease: 'outExpo' });
      animate('.modal-content', { opacity: [0, 1], scale: [0.95, 1], y: [20, 0], duration: 600, ease: 'outExpo', delay: 100 });
      
      // Fetch tags
      getBlogTags().then(tags => setExistingTags(tags));
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
      opacity: 0, scale: 0.95, duration: 300, ease: 'inExpo',
      onComplete: () => setIsOpen(false)
    });
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] }, // Restrict to H2 and H3 only
      }),
      TiptapLink.configure({ openOnClick: false }),
      TiptapImage
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4 font-sans text-white',
      },
    }
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!isEdit || (formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === formData.slug)) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData({ ...formData, title, slug, seoTitle: title });
    } else {
      setFormData({ ...formData, title, seoTitle: formData.seoTitle || title });
    }
  };

  const handleTagAdd = (tagStr: string) => {
    const tag = tagStr.trim();
    if (!tag) return;
    
    // Prevent case-insensitive duplicates
    const exists = formData.tags.some((t: string) => t.toLowerCase() === tag.toLowerCase());
    if (!exists) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput("");
    setShowTagSuggestions(false);
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter((t: string) => t !== tagToRemove) }));
  };

  const filteredTags = existingTags.filter(t => 
    t.toLowerCase().includes(tagInput.toLowerCase()) && 
    !formData.tags.some((ft: string) => ft.toLowerCase() === t.toLowerCase())
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'coverImage' | 'ogImage') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate size (e.g. 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }
    
    setIsUploading(true);
    const folder = field === 'coverImage' ? 'featured' : 'og';
    const { url, error } = await uploadBlogImage(file, folder);
    setIsUploading(false);

    if (url) {
      setFormData(prev => ({ ...prev, [field]: url }));
    } else {
      alert("Failed to upload image: " + error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const submitData = {
      ...formData,
      publishedAt: formData.status === 'SCHEDULED' && formData.publishedAt ? new Date(formData.publishedAt) : new Date(),
    };
    
    let res;
    if (isEdit) {
      res = await updateBlogPost(post.id, submitData);
    } else {
      res = await createBlogPost(submitData);
    }
    
    setSaving(false);
    if (res.success) {
      setIsOpen(false);
      onSaved();
    } else {
      alert("Error saving blog post: " + res.error);
    }
  };

  // SEO Score calculation (Checklist style)
  const seoChecklist = [
    { label: "Title Set", checked: !!formData.title },
    { label: "Meta Description", checked: formData.metaDescription.length > 50 },
    { label: "URL Slug", checked: !!formData.slug },
    { label: "Featured Image", checked: !!formData.coverImage },
    { label: "Image Alt Text", checked: !!formData.featuredImageAlt },
    { label: "Good Content Length", checked: formData.content.length > 500 },
  ];
  const seoScore = Math.round((seoChecklist.filter(c => c.checked).length / seoChecklist.length) * 100);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`group relative overflow-hidden rounded-full font-medium transition-all duration-300 active:scale-[0.98] flex items-center gap-2 ${
          isEdit 
            ? "px-5 py-2.5 bg-white/5 border border-white/10 text-white hover:bg-white/10" 
            : "px-6 py-3 bg-white text-black hover:bg-neutral-200"
        }`}
      >
        <span className="relative z-10 flex items-center gap-2 text-sm font-bold">
          {isEdit ? <Edit2 className="w-3.5 h-3.5" /> : <Plus className="w-4 h-4" />} 
          {isEdit ? "Edit Post" : "New Post"}
        </span>
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans">
          <div className="modal-overlay absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeModal} />
          
          <div className="modal-content relative w-full max-w-6xl h-[90vh] flex flex-col md:flex-row rounded-[2rem] bg-[#0A0A0F] border border-white/10 shadow-2xl overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-[#050508] border-r border-white/5 p-6 flex flex-col gap-2 shrink-0 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white tracking-tight">XENOTECT CMS</h2>
                <button onClick={closeModal} className="md:hidden text-neutral-400 hover:text-white"><X className="w-5 h-5"/></button>
              </div>
              
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveTab(sec.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                    activeTab === sec.id 
                      ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <sec.icon className={`w-4 h-4 ${activeTab === sec.id ? "text-emerald-400" : ""}`} />
                  {sec.label}
                  {activeTab === sec.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                </button>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0F]">
              <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar" data-lenis-prevent="true">
                <form id="blog-form" onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col gap-8">
                  
                  {/* --- BASIC INFORMATION --- */}
                  {activeTab === 'basic' && (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
                      <div className="flex flex-col gap-2.5">
                        <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Post Title *</label>
                        <input type="text" required value={formData.title} onChange={handleTitleChange}
                          className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium focus:border-white/30 focus:outline-none transition-colors"
                          placeholder="How Much Does a Website Cost in India in 2026?"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2.5">
                        <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">URL Slug *</label>
                        <div className="flex items-center bg-[#111116] border border-white/10 rounded-xl overflow-hidden focus-within:border-white/30 transition-colors">
                          <span className="pl-4 text-neutral-500 text-sm hidden sm:block">xenotectsolution.com/blog/</span>
                          <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})}
                            className="w-full bg-transparent px-4 py-3.5 text-white text-sm focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2.5">
                          <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Category *</label>
                          <div className="relative">
                            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                              className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:border-white/30 cursor-pointer"
                            >
                              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2.5">
                          <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Author *</label>
                          <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})}
                            className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Tags</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {formData.tags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 bg-white/10 text-white rounded-md text-sm flex items-center gap-1.5">
                              {tag}
                              <button type="button" onClick={() => handleTagRemove(tag)} className="hover:text-red-400"><X className="w-3 h-3"/></button>
                            </span>
                          ))}
                        </div>
                        <div className="relative">
                          <input type="text" value={tagInput} onChange={e => { setTagInput(e.target.value); setShowTagSuggestions(true); }}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleTagAdd(tagInput); } }}
                            onFocus={() => setShowTagSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
                            placeholder="Type a tag and press Enter"
                            className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30"
                          />
                          {showTagSuggestions && filteredTags.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A1A24] border border-white/10 rounded-xl overflow-hidden z-20 shadow-xl">
                              {filteredTags.map(tag => (
                                <button key={tag} type="button" onMouseDown={(e) => { e.preventDefault(); handleTagAdd(tag); }}
                                  className="w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-white/10 hover:text-white"
                                >
                                  {tag}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Excerpt</label>
                        <textarea value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})}
                          placeholder="Short 1-2 sentence summary..."
                          className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 min-h-[100px] resize-y"
                        />
                      </div>
                    </div>
                  )}

                  {/* --- CONTENT --- */}
                  {activeTab === 'content' && (
                    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 h-full">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Rich Text Editor</label>
                        <span className="text-xs text-neutral-500 flex items-center gap-1.5">
                          <ListOrdered className="w-3.5 h-3.5"/> TOC is auto-generated on the frontend
                        </span>
                      </div>
                      
                      <div className="border border-white/10 rounded-xl overflow-hidden bg-[#111116] flex flex-col flex-1 min-h-[400px]">
                        <div className="border-b border-white/10 bg-[#0A0A0F] p-2 flex flex-wrap gap-1 sticky top-0 z-10">
                          {editor && (
                            <>
                              <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 2 }) ? 'bg-white/10 text-emerald-400' : 'text-neutral-400'}`}><Heading2 className="w-4 h-4"/></button>
                              <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 3 }) ? 'bg-white/10 text-emerald-400' : 'text-neutral-400'}`}><Heading3 className="w-4 h-4"/></button>
                              <div className="w-px h-6 bg-white/10 mx-1 self-center" />
                              <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-white/10 ${editor.isActive('bold') ? 'bg-white/10 text-white' : 'text-neutral-400'}`}><Bold className="w-4 h-4"/></button>
                              <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-white/10 ${editor.isActive('italic') ? 'bg-white/10 text-white' : 'text-neutral-400'}`}><Italic className="w-4 h-4"/></button>
                              <div className="w-px h-6 bg-white/10 mx-1 self-center" />
                              <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-white/10 ${editor.isActive('bulletList') ? 'bg-white/10 text-white' : 'text-neutral-400'}`}><List className="w-4 h-4"/></button>
                              <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded hover:bg-white/10 ${editor.isActive('orderedList') ? 'bg-white/10 text-white' : 'text-neutral-400'}`}><ListOrdered className="w-4 h-4"/></button>
                              <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded hover:bg-white/10 ${editor.isActive('blockquote') ? 'bg-white/10 text-white' : 'text-neutral-400'}`}><Quote className="w-4 h-4"/></button>
                              <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-2 rounded hover:bg-white/10 ${editor.isActive('codeBlock') ? 'bg-white/10 text-white' : 'text-neutral-400'}`}><Code className="w-4 h-4"/></button>
                              <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="p-2 rounded hover:bg-white/10 text-neutral-400"><SeparatorHorizontal className="w-4 h-4"/></button>
                              <div className="w-px h-6 bg-white/10 mx-1 self-center" />
                              <button type="button" onClick={() => {
                                const url = window.prompt('URL');
                                if (url) editor.chain().focus().setLink({ href: url }).run();
                              }} className={`p-2 rounded hover:bg-white/10 ${editor.isActive('link') ? 'bg-white/10 text-emerald-400' : 'text-neutral-400'}`}><LinkIcon className="w-4 h-4"/></button>
                            </>
                          )}
                        </div>
                        <div className="flex-1 overflow-y-auto">
                          <EditorContent editor={editor} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- MEDIA --- */}
                  {activeTab === 'media' && (
                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4">
                      
                      <div className="flex flex-col gap-4">
                        <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Featured Image</label>
                        
                        <div className="flex flex-col gap-4">
                          {formData.coverImage ? (
                            <div className="relative group w-full aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/10">
                              <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                              <button type="button" onClick={() => setFormData({...formData, coverImage: ""})} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="w-full aspect-video rounded-xl border-2 border-dashed border-white/10 bg-[#111116] hover:bg-white/[0.02] hover:border-white/20 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer text-neutral-400">
                              <UploadCloud className="w-8 h-8" />
                              <span className="text-sm font-medium">Click to upload featured image</span>
                              <span className="text-xs text-neutral-500">JPG, PNG, WebP up to 5MB</span>
                              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'coverImage')} className="hidden" />
                            </label>
                          )}
                          
                          {isUploading && <p className="text-sm text-emerald-400 animate-pulse">Uploading...</p>}

                          <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-xs text-neutral-500">OR PROVIDE URL</span>
                            <div className="flex-1 h-px bg-white/10" />
                          </div>

                          <input type="text" value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})}
                            placeholder="https://..." className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Image Alt Text *</label>
                        <input type="text" value={formData.featuredImageAlt} onChange={e => setFormData({...formData, featuredImageAlt: e.target.value})}
                          placeholder="Describe the image for SEO and accessibility"
                          className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30"
                        />
                      </div>

                    </div>
                  )}

                  {/* --- SEO & SOCIAL --- */}
                  {activeTab === 'seo' && (
                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4">
                      
                      {/* Search Preview */}
                      <div className="p-5 rounded-2xl bg-white flex flex-col gap-1 text-black font-sans shadow-lg max-w-2xl">
                        <div className="flex items-center gap-2 mb-1 text-sm text-[#4d5156]">
                          <span>www.xenotectsolution.com</span>
                          <span> › blog › {formData.slug || 'slug'}</span>
                        </div>
                        <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1">
                          {formData.seoTitle || formData.title || 'Your SEO Title Here'}
                        </h3>
                        <p className="text-[#4d5156] text-sm leading-snug">
                          {formData.metaDescription || formData.excerpt || 'Your meta description goes here to entice users to click.'}
                        </p>
                      </div>

                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2.5">
                          <div className="flex justify-between items-end">
                            <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">SEO Title</label>
                            <span className={`text-xs ${formData.seoTitle.length > 60 ? 'text-red-400' : 'text-neutral-500'}`}>{formData.seoTitle.length} / 60</span>
                          </div>
                          <input type="text" value={formData.seoTitle} onChange={e => setFormData({...formData, seoTitle: e.target.value})}
                            className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30"
                          />
                        </div>

                        <div className="flex flex-col gap-2.5">
                          <div className="flex justify-between items-end">
                            <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Meta Description</label>
                            <span className={`text-xs ${formData.metaDescription.length > 160 ? 'text-red-400' : 'text-neutral-500'}`}>{formData.metaDescription.length} / 160</span>
                          </div>
                          <textarea value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})}
                            className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 min-h-[80px]"
                          />
                        </div>

                        <div className="flex flex-col gap-2.5">
                          <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Canonical URL (Optional)</label>
                          <input type="text" value={formData.canonicalUrl} onChange={e => setFormData({...formData, canonicalUrl: e.target.value})}
                            placeholder="Leave empty to use default URL"
                            className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-white/30"
                          />
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-[#111116]">
                          <input type="checkbox" id="noindex" checked={formData.noindex} onChange={e => setFormData({...formData, noindex: e.target.checked})}
                            className="w-5 h-5 rounded bg-black border border-white/20 text-red-500 cursor-pointer"
                          />
                          <label htmlFor="noindex" className="text-sm font-medium text-white cursor-pointer select-none">NoIndex (Prevent Google from indexing this page)</label>
                        </div>
                      </div>

                      <hr className="border-white/10" />

                      <div className="flex flex-col gap-6">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Open Graph / Social</h4>
                        
                        <div className="flex flex-col gap-2.5">
                          <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">OG Title</label>
                          <input type="text" value={formData.ogTitle} onChange={e => setFormData({...formData, ogTitle: e.target.value})} placeholder="Overrides SEO Title for Social Media"
                            className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30"
                          />
                        </div>
                        
                        <div className="flex flex-col gap-2.5">
                          <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">OG Description</label>
                          <textarea value={formData.ogDescription} onChange={e => setFormData({...formData, ogDescription: e.target.value})} placeholder="Overrides Meta Description for Social Media"
                            className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 min-h-[80px]"
                          />
                        </div>

                        <div className="flex flex-col gap-2.5">
                          <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">OG Image (Optional)</label>
                          <div className="flex gap-4 items-center">
                            {formData.ogImage && (
                              <img src={formData.ogImage} alt="OG Preview" className="w-24 h-24 object-cover rounded-lg border border-white/10" />
                            )}
                            <label className="flex-1 border-2 border-dashed border-white/10 bg-[#111116] hover:bg-white/[0.02] rounded-xl py-4 flex flex-col items-center justify-center cursor-pointer text-neutral-400 transition-colors">
                              <UploadCloud className="w-5 h-5 mb-1" />
                              <span className="text-xs">Upload 1200x630 Image</span>
                              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'ogImage')} className="hidden" />
                            </label>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* --- PUBLISHING --- */}
                  {activeTab === 'publishing' && (
                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2.5">
                          <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Status</label>
                          <div className="relative">
                            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
                              className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:border-white/30 cursor-pointer font-bold"
                            >
                              <option value="DRAFT">Draft</option>
                              <option value="PUBLISHED">Published</option>
                              <option value="SCHEDULED">Scheduled</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                          </div>
                        </div>

                        {formData.status === 'SCHEDULED' && (
                          <div className="flex flex-col gap-2.5 animate-in fade-in zoom-in-95">
                            <label className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Publish Date & Time</label>
                            <input type="datetime-local" value={formData.publishedAt} onChange={e => setFormData({...formData, publishedAt: e.target.value})}
                              className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30"
                            />
                          </div>
                        )}
                      </div>

                      {/* SEO Checklist */}
                      <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> SEO Readiness</h4>
                          <span className="text-lg font-bold text-emerald-400">{seoScore}%</span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                          {seoChecklist.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.checked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-transparent'}`}>
                                {item.checked && <CheckCircle2 className="w-3 h-3" />}
                              </div>
                              <span className={`text-sm ${item.checked ? 'text-neutral-300' : 'text-neutral-500'}`}>{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                    </div>
                  )}

                </form>
              </div>

              {/* Action Footer */}
              <div className="p-6 border-t border-white/5 flex items-center justify-between shrink-0 bg-[#0A0A0F] z-20">
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => window.open(`/blog/${formData.slug}?preview=true`, '_blank')} className="px-5 py-2.5 rounded-full text-sm font-medium border border-white/10 text-white hover:bg-white/5 flex items-center gap-2 transition-colors">
                    <Eye className="w-4 h-4" /> Preview
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <button type="button" onClick={closeModal} className="px-6 py-2.5 rounded-full text-neutral-400 font-medium hover:text-white transition-colors text-sm">
                    Cancel
                  </button>
                  <button form="blog-form" type="submit" disabled={saving}
                    className="px-8 py-2.5 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center gap-2 active:scale-95 text-sm"
                  >
                    {saving ? <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                    {formData.status === 'PUBLISHED' ? "Publish Post" : "Save Changes"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}
