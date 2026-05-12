"use client";
import AuthPage from '@/components/_user/auth-page';
import { PageLoader } from '@/components/loading-spinners';
import { useAuthStore } from '@/stores/auth-stores';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';

export default function AuthenticationPage() {
  const router = useRouter()
  const { user } = useAuthStore()

  useEffect(() => {
    
  if (user) {
    router.replace('/')
  }
   
  }, [user,router])
  
  

  return (
      <Suspense fallback={<PageLoader/>}>
      <AuthPage />
    </Suspense>
    
  )
}
