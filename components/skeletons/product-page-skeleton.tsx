"use client"

import { Skeleton } from "@/components/ui/skeleton"

 function ProductGallerySkeleton() {
  return (
    <div className="gallery-root">
      
      {/* Main Gallery */}
      <div className="gallery-stage relative overflow-hidden rounded-2xl">
        
        {/* Main Image */}
        <Skeleton className="w-full aspect-[4/3] rounded-2xl" />

        {/* Top Right Online / Username */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Counter */}
        <div className="absolute top-4 right-4 z-10">
          <Skeleton className="h-7 w-14 rounded-full" />
        </div>

        {/* Zoom Button */}
        <div className="absolute bottom-4 right-4 z-10">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        {/* Navigation */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`rounded-full ${
                i === 0 ? "w-6 h-2" : "w-2 h-2"
              }`}
            />
          ))}
        </div>

        {/* Progress */}
        <div className="absolute bottom-0 left-0 w-full">
          <Skeleton className="h-1 w-full rounded-none" />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="gallery-thumbs mt-4 flex gap-3 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`rounded-xl shrink-0 ${
              i === 0
                ? "w-[72px] h-[56px]"
                : "w-[64px] h-[48px]"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
function ProductInfoPanelSkeleton() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 space-y-6">

      {/* Title */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-40" />
      </div>

      {/* Price + Actions */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32" />

        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-5" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-3">
        <Skeleton className="h-12 flex-1 rounded-lg" />
        <Skeleton className="h-12 flex-1 rounded-lg" />
      </div>

      {/* Contact Seller */}
      <div className="rounded-xl border border-gray-200 p-4 space-y-4">
        
        {/* Quick Replies */}
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-8 w-28 rounded-full shrink-0"
            />
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 w-12 rounded-md" />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center border-b border-gray-100 pb-3"
          >
            <Skeleton className="h-5 w-5 rounded-full mr-3" />

            <Skeleton className="h-4 w-24 mr-4" />

            <Skeleton className="h-4 flex-1 max-w-[180px]" />
          </div>
        ))}
      </div>
    </div>
  )
}
 function DescriptionAndSpecsSkeleton() {
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-8">

      {/* Product Description */}
      <div>
        <Skeleton className="h-7 w-52 mb-5" />

        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>

        <Skeleton className="h-5 w-40 mt-4" />
      </div>

      {/* More Info */}
      <div>
        <Skeleton className="h-7 w-36 mb-5" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Condition */}
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Negotiable */}
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-10" />
          </div>

        </div>
      </div>
    </div>
  )
}

function ProductReviewsSkeleton() {
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-5 w-28" />
      </div>

      {/* Rating Summary */}
      <div className="flex items-center gap-4">
        
        {/* Stars */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-5 w-5 rounded-full"
            />
          ))}
        </div>

        {/* Average */}
        <Skeleton className="h-10 w-12" />

        {/* Text */}
        <Skeleton className="h-4 w-40" />
      </div>

      {/* Reviews */}
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-5 space-y-4"
          >
            
            {/* User */}
            <div className="flex items-center gap-3">
              
              {/* Avatar */}
              <Skeleton className="h-10 w-10 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Skeleton
                      key={idx}
                      className="h-3 w-3 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[92%]" />
              <Skeleton className="h-4 w-[75%]" />
            </div>

            {/* Date */}
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Review Form */}
      <div className="border border-border rounded-xl bg-white/50 shadow-sm p-6 space-y-6">

        {/* Form Header */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Rating Input */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />

          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-7 w-7 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Textarea */}
        <Skeleton className="h-32 w-full rounded-md" />

        {/* Submit */}
        <Skeleton className="h-11 w-full rounded-md" />
      </div>
    </div>
  )
}

 function SellerInfoCardSkeleton() {
  return (
    <div className="sticky top-4 mt-8 md:mt-0 bg-white p-6 rounded-xl shadow-lg border-2 border-emerald-500/20 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-5 w-32" />
      </div>

      {/* Seller Info */}
      <div className="flex items-center space-x-4 border-b pb-4">
        
        {/* Avatar */}
        <Skeleton className="h-16 w-16 rounded-full shrink-0" />

        <div className="space-y-2 flex-1">
          {/* Name */}
          <Skeleton className="h-5 w-36" />

          {/* Badge */}
          <Skeleton className="h-6 w-32 rounded-full" />
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-4">

        {/* Rating */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />

          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-3 w-3 rounded-full"
                />
              ))}
            </div>

            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Reviews */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-8" />
        </div>

        {/* Last Seen */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Member Since */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* CTA */}
      <Skeleton className="h-12 w-full rounded-lg" />

      {/* Report */}
      <div className="flex justify-center">
        <Skeleton className="h-4 w-36" />
      </div>
    </div>
  )
}
export default function ProductPageSkeleton() {
  return (

    <div className="relative mt-16 min-h-screen  p-4 sm:p-8 font-inter">
    

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs/Back Button placeholder */}
        <p className="text-gray-500 mb-4 text-xs md:text-sm">
         
        </p>
     <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left/Main Column (Gallery, Info, Description, Reviews) */}
              <div className="md:col-span-2">
                <ProductGallerySkeleton/>
                <ProductInfoPanelSkeleton />
                <DescriptionAndSpecsSkeleton />
                <ProductReviewsSkeleton />
              </div>
    
              {/* Right/Sidebar Column (Seller Info) */}
              <div className="md:col-span-1">
                <SellerInfoCardSkeleton />
              </div>
        </div>
        
      </div>
      </div>
  )
}
