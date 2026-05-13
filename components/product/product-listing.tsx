"use client"

import { Button } from "@/components/ui/button"
import { ProductListing } from "@/types/users"
import { timeAgo } from "@/utils/date-format"
import { formatCurrency } from "@/utils/format-currency"
import { ArrowRight, Clock, LayoutList, MapPin, TrendingUp, User2, UserCheck } from "lucide-react"
import { ProductCardSlide } from "../animations/product-slider"
import LoadingSpinners from "../loading-spinners"
import ProductSorting from "./product-sorting"
import Link from "next/link"
import { ProductCardSkeleton } from "../skeletons/product-card-sketeton"
import { EmptyItem } from "../_frontpage/empty-item"



interface PaginationMeta {
 
  totalPages: number;
  currentPage?: number;
}
interface ProductGridProps {
  defaultProducts: ProductListing[],
  isLoading: boolean,
  paginationMeta?: PaginationMeta
  page?:number
  handlePreviousPage?:()=>void
  handleNextPage?: () => void
  setDefaultProducts: React.Dispatch<React.SetStateAction<ProductListing[]>>
  queryParams?:string
}

export const getConditionColor = (condition: string) => {
  switch (condition) {
    case "New":
      return "bg-green-100 text-green-800"
    case "Fairly-used":
      return "bg-blue-100 text-blue-800"
    case "Used":
      return "bg-yellow-100 text-yellow-800"
   
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ProductGrid({defaultProducts, setDefaultProducts, isLoading, handleNextPage, handlePreviousPage, paginationMeta, page }: ProductGridProps) {


  // sort product by price low to high
  const sortProductsByPriceLowToHigh = () => {
    const sortedProducts = [...defaultProducts].sort((a, b) => a.price - b.price);
    setDefaultProducts(sortedProducts);
  };
  // sort product by price high to low
  const sortProductsByPriceHighToLow = () => {
    const sortedProducts = [...defaultProducts].sort((a, b) => b.price - a.price);
    setDefaultProducts(sortedProducts);
  };
  // most recent
  const sortProductsByMostRecent = () => {
    const sortedProducts = [...defaultProducts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setDefaultProducts(sortedProducts);
  };
  // most popular by highest likes
  const sortProductsByMostPopular = () => {
    const sortedProducts = [...defaultProducts].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
    setDefaultProducts(sortedProducts);
  };
 
 

  return (
    <div className="lg:col-span-3 pb-8">
      <ProductSorting
      sortProductsByMostPopular={sortProductsByMostPopular}
      sortProductsByMostRecent={sortProductsByMostRecent}
      defaultProducts={defaultProducts}
      sortProductsByPriceLowToHigh={sortProductsByPriceLowToHigh}
      sortProductsByPriceHighToLow={sortProductsByPriceHighToLow}
      setDefaultProducts={setDefaultProducts}
      />
      
      {/* loading state */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {isLoading
    && Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))
   }
</div>
    
      {defaultProducts.length > 0 ? (
  
        <div className="pcard-grid sm:grid-cols-2">
    
        
        


        {defaultProducts.map((item) => ( 
                   <div  key={item.id} className="group bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-emerald-300 cursor-pointer">
              {/* Image Container */}
              <div className="relative h-54 bg-slate-100 overflow-hidden">
                {/* Image */}
               <ProductCardSlide
                item={item}
                intervalMs={3000}
                queryFn="subcategory-products"
                //disable like button
                mode="profile"
              />
        
                
        
                {/* Negotiable Badge */}
                {item.negotiable && (
                  <div className="absolute top-3 left-3 px-3 py-1  bg-amber-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <TrendingUp size={12} />
                    Negotiable
                  </div>
                )}
              </div>
        
              {/* Content Section */}
              <div className="p-4 space-y-3">
              {/* Product Name */}
               <p className="uppercase font-light text-primary text-xs">{item.subCategory.name}</p>
                <h3 className="font-semibold  text-slate-900 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
                  {item.name}
                </h3>
        
                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className=" cat-heading font-bold text-amber-600">
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
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
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
                    <span className="button-text text-sm absolute text-emerald-800 font-medium">View Details</span>
                 </button>  
                </Link>
                  </div>
                 </div>
        ))}
        </div>
      ):(
      <>
    
      <EmptyItem
        icon={LayoutList}
        title="No items found in this category"
      />
      </>
      

)}
      
      
      {/* pagination here */}
      {paginationMeta  && (
            <div className="flex justify-center items-center gap-4 pt-6">
              <Button
                variant="outline"
                disabled={page === 1 || isLoading}
                onClick={handlePreviousPage}
              >
                Previous
              </Button>

              <span className="text-sm text-gray-600">
                Page {page} of {paginationMeta.totalPages}
                {isLoading && " (Loading...)"}
              </span>

              <Button
                variant="outline"
                disabled={page === paginationMeta.totalPages || isLoading}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          )}
    </div>
  )
}
