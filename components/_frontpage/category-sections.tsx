import { CategoryD, SubCategory } from '@/types/users'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'
import HomeTitleHeader from './home-title-header'
import SectionReveal from './section-reveal'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react"

const getItemCountLabel = (count: number) =>
  `${count.toLocaleString()} ${count === 1 ? 'listing' : 'listings'}`

interface CategorySectionsProps {
  category: SubCategory[]
  isLoading?: boolean
}

export default function CategorySections({ category, isLoading }: CategorySectionsProps) {
 const duplicatedCategories = [...category, ...category]

const [currentIndex, setCurrentIndex] = useState(0)
const [isPaused, setIsPaused] = useState(false)

const sliderRef = useRef<HTMLDivElement>(null)

const CARD_WIDTH = 195

// AUTO SLIDE
useEffect(() => {
  if (isPaused) return

  const interval = setInterval(() => {
    setCurrentIndex((prev) => prev + 1)
  }, 3000)

  return () => clearInterval(interval)
}, [isPaused])

// SLIDE EFFECT
useEffect(() => {
  if (!sliderRef.current) return

  sliderRef.current.style.transform = `translateX(-${
    currentIndex * CARD_WIDTH
  }px)`

  // Infinite reset
  if (currentIndex >= category.length) {
    setTimeout(() => {
      if (!sliderRef.current) return

      sliderRef.current.style.transition = "none"
      setCurrentIndex(0)
      sliderRef.current.style.transform = `translateX(0px)`

      requestAnimationFrame(() => {
        if (!sliderRef.current) return

        sliderRef.current.style.transition =
          "transform 0.6s cubic-bezier(0.22,1,0.36,1)"
      })
    }, 600)
  }
}, [currentIndex, category.length])

// CONTROLS
const nextSlide = () => {
  setCurrentIndex((prev) => prev + 1)
}

const prevSlide = () => {
  if (currentIndex === 0) {
    setCurrentIndex(category.length - 1)
  } else {
    setCurrentIndex((prev) => prev - 1)
  }
}
  return (
 
    
          <section
        className="cat-section mt-10">
        


        <div>

          <div className='grid place-items-center '> 
            <HomeTitleHeader desc="Browse by category" />
            
        
          </div>  
          {isLoading ? (
  <div className="relative w-full">
    
    {/* Edge fades */}
    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

    {/* Skeleton slider */}
    <div className="overflow-hidden w-full">
      <div className="flex gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="min-w-[150px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            
            {/* Image */}
            <Skeleton className="h-[80px] w-full rounded-xl" />

            {/* Content */}
            <div className="pt-3 flex flex-col items-center">
              
              {/* Title */}
              <Skeleton className="h-4 w-20" />

              {/* Badge */}
              <Skeleton className="mt-3 h-5 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Indicators */}
    <div className="mt-6 flex items-center justify-center gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-2 rounded-full ${
            i === 0 ? "w-8" : "w-2"
          }`}
        />
      ))}
    </div>
  </div>

          ): (
            
            
        <SectionReveal>
   <div
  className="relative w-full"
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
>
  
  {/* LEFT CONTROL */}
  <button
    onClick={prevSlide}
    className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 p-3 shadow-xl backdrop-blur transition-all hover:scale-110 hover:border-emerald-200 hover:bg-emerald-50 lg:flex"
  >
    <ChevronLeft className="h-5 w-5 text-slate-700" />
  </button>

  {/* RIGHT CONTROL */}
  <button
    onClick={nextSlide}
    className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 p-3 shadow-xl backdrop-blur transition-all hover:scale-110 hover:border-emerald-200 hover:bg-emerald-50 lg:flex"
  >
    <ChevronRight className="h-5 w-5 text-slate-700" />
  </button>

  {/* EDGE FADE */}
  <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />

  <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

  {/* SLIDER */}
  <div className="overflow-hidden w-full">
    <div
      ref={sliderRef}
      className="flex gap-3 transition-transform duration-700 ease-out will-change-transform"
    >
      {duplicatedCategories.map((cat, index) => (
        <Link
          key={`${cat.name}-${index}`}
          href={`/categories/${cat.name
            .toLowerCase()
            .replace(/\s/g, "-")}`}
          className="group min-w-[150px]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
            
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-transparent to-amber-50/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Image */}
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src={cat.avatar}
                width={200}
                height={200}
                className="h-[80px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={`${cat.name} icon`}
              />
            </div>

            {/* Content */}
            <div className="relative pt-3 text-center">
              <p className="line-clamp-2 min-h-[40px] text-sm font-bold capitalize text-slate-900">
                {cat.name}
              </p>

              <Badge className="mt-2 border border-amber-200 bg-amber-50 text-[10px] text-amber-700 group-hover:bg-amber-500 group-hover:text-white">
                {getItemCountLabel(cat?.products?.length || 0)}
              </Badge>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>

  {/* INDICATORS */}
  <div className="mt-6 flex items-center justify-center gap-2">
    {category.slice(0, 6).map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentIndex(i)}
        className={`h-2 rounded-full transition-all duration-300 ${
          currentIndex % category.length === i
            ? "w-8 bg-emerald-600"
            : "w-2 bg-slate-300 hover:bg-slate-400"
        }`}
      />
    ))}
  </div>
</div>
              </SectionReveal>
          )}

           

            </div>
          </section>
     
     
  )
}