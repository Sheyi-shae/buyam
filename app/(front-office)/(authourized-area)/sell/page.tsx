"use client"
import SellProductForm from '@/components/_user/sell-product/sell-product-form'
import { useAuthStore } from '@/stores/auth-stores'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

import { AlertTriangleIcon } from "lucide-react"
import {
  Alert,
   
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from '@/components/ui/button'

export function WarningMsg() {
  return (

    <div className="w-full max-w-3xl  mx-auto px-4 py-6">
      <Alert className="w-full border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
      <AlertTriangleIcon />
      <AlertTitle>Update your mobile number</AlertTitle>
      <AlertDescription className='text-xs'>
         Please visit the profile section to add your mobile number . This helps buyers contact you and builds trust in your seller profile.
        </AlertDescription>
      
    </Alert>
    </div>
  )
}

export default function SellPage() {
  const { user } = useAuthStore()

  
  
  return (
    <div className='pt-16 bg-gradient-to-br from-emerald-50 via-white to-amber-50'>
      {!user?.phone && <WarningMsg />}
      <SellProductForm/>
    </div>
  )
  
}
