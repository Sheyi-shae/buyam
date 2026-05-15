"use client"
import { Product } from '@/types/users';
import CategoryProductCard from './category-product-card';
import HomeTitleHeader from './home-title-header';
import { ProductCardSlide } from '../animations/product-slider';
import { ArrowRight, MapPin, ShoppingBag, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/utils/format-currency';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ProductCardSkeleton } from '../skeletons/product-card-sketeton';


export default function HomeListings({
    products,
    isLoading }: { products: Product[], isLoading:boolean}) {
    

    return (
        <section className=" bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* --- Header Section --- */}
         
                <HomeTitleHeader
                    title="Featured Listings"
                    desc="Discover the latest and most popular items ." />
                 
                {isLoading ? (
                <div className=" gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            
            <ProductCardSkeleton/>
          </div>
        ))}
           
       </div>
                
                ) : (
                         <div className=" gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                    <CategoryProductCard
                        products={products} />
           
       </div>
                )}
        
        </div>
                

            
        </section>
    )
}