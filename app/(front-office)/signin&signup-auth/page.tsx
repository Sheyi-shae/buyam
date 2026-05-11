"use client";
import AuthPage from '@/components/_user/auth-page';
import { useAuthStore } from '@/stores/auth-stores';
import { useRouter } from 'next/navigation';

export default function AuthenticationPage() {
  const router = useRouter()
  const {user}= useAuthStore()
  if (user) {
    router.replace('/')
  }

  return (
      
      <AuthPage />
    
  )
}
