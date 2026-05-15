"use client"

import { Product } from "@/types/users"
import { ProductCardSlide } from "../animations/product-slider"
import Link from "next/link"


import { ArrowRight, MapPin, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/utils/format-currency';


export default function CategoryProductCard({ products }: { products: Product[] }) {
  return (
    <>
    

       {products.map((item) => ( 
           <div  key={item.id} className="group bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-emerald-300 cursor-pointer">
      {/* Image Container */}
      <div className="relative h-54 bg-slate-100 overflow-hidden">
        {/* Image */}
      <ProductCardSlide item={item} mode='profile' intervalMs={3000} queryFn="home-categories" />

       

        

        {/* Negotiable Badge */}
        {item.negotiable && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white text-xs f rounded-full flex items-center gap-1">
            <TrendingUp size={12} />
            Negotiable
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="font-semibold  text-slate-900 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
          {item.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl cat-heading font-bold text-amber-600">
            {formatCurrency(item.price)}
          </span>
          {item.negotiable && (
            <span className="text-xs text-slate-500 font-medium">
              or best offer
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin size={14} className="text-emerald-600 flex-shrink-0" />
          <span className="text-xs truncate">
            {item.city}, {item.state}
          </span>
        </div>

        {/* Seller Info */}
        <div className="pt-3 border-t border-b pb-3 border-slate-100 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {item.seller.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-900 truncate">
              {item.seller.storeName ? item.seller.storeName : item.seller.name }
            </p>
            <p className="text-xs text-slate-500">
              {item.views} views • {item.likes.length} likes
            </p>
          </div>
        </div>

          {/* cta */}
        
        <Link href={`/categories/${item.subCategory?.slug}/${item.slug}`}>
            <button className="learn-more rounded-3xl mt-4">
            <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
            </span>
            <span className="button-text absolute text-emerald-800 ">View Details</span>
         </button>  
        </Link>
          </div>
         </div>
          ))}
    </>
  )
}