'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/SupabaseClient';

type Roast = {
  id: string;
  content: string;
  author: string;
  created_at: string;
};

export default function PostFeed() {
  const [posts, setPosts] = useState<Roast[]>([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('roasts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setPosts(data || []);
    else console.error('Fetch error:', error);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-4 p-4">
      {posts.map((post) => (
        <div key={post.id} className="border p-3 rounded bg-white text-black">
          <p className="text-sm font-bold">@{post.author}</p>
          <p>{post.content}</p>
          <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
