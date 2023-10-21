'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(); // Ensure signOut is awaited

    router.push('/login'); // Use router.push for navigation
  }

  return (
    <button
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
