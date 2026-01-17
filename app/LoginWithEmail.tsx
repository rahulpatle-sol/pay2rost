'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginWithEmail() {
  const { login, ready, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      // Redirect to dashboard or any page after login
      router.push('/dashboard');
    }
  }, [ready, authenticated, router]);

  return (
    <div className='flex justify-center items-center'>
      <button
        className='items-center cursor-pointer font-mono border bg-black py-2 px-4 rounded-md text-gray-300'
        onClick={login}
      >
        login
      </button>
    </div>
  );
}
