import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});

// Helper to upload image to blog bucket
export async function uploadBlogImage(file: File, folder: 'featured' | 'content' | 'og' = 'content'): Promise<{ url: string | null; error: string | null }> {
  if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder_key') {
    return { url: null, error: 'Supabase URL or Anon Key is missing in environment variables.' };
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('blog')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading image to Supabase:', error);
      return { url: null, error: error.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from('blog')
      .getPublicUrl(filePath);

    return { url: publicUrlData.publicUrl, error: null };
  } catch (error: any) {
    console.error('Upload exception:', error);
    return { url: null, error: error.message };
  }
}
