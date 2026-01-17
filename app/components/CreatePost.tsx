'use client';
import { useState } from 'react';
import { supabase } from '../lib/SupabaseClient';

export default function CreatePost({ onPost }: { onPost: () => void }) {
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!content.trim()) return;

    const { error } = await supabase.from('roasts').insert({
      content,
      author: 'anonymous', // TODO: Replace with user info
    });

    if (!error) {
      setContent('');
      onPost(); // trigger refetch
    } else {
      console.error('Insert error:', error);
    }
  };

  return (
    <div className="p-4">
      <textarea
        className="w-full border rounded p-2 text-black"
        placeholder="Roast someone 🔥"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Post Roast
      </button>
    </div>
  );
}
