"use client"

import { useMemo, useState } from "react"
import { 
  ChevronRight, 
  ArrowRight, 
  PackageOpen, 
  Layers, 
  Search,
  ArrowUpRight
} from "lucide-react"
import { useFetchPublicData } from "@/utils/fetch-hooks"
import { CategoryD } from "@/types/users"
import Link from "next/link"
import Image from "next/image"
import { EmptyItem } from "../_frontpage/empty-item"
import { useIsMobile } from "@/utils/use-mobile-screen" // Assuming this is the correct import path

interface CategoryCardProps {
  category: CategoryD
  isSelected: boolean
  onClick: () => void
}

function CategoryCard({ category, isSelected, onClick }: CategoryCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`group relative overflow-hidden rounded-md transition-all duration-500 cursor-pointer
        ${isSelected 
          ? "ring-1 ring-emerald-400 ring-offset-1 shadow-2xl scale-[1.02]" 
          : "hover:shadow-xl hover:-translate-y-1 bg-white border border-gray-100"
        }`}
    >
      {/* Background Accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-3xl transition-opacity duration-500 
        ${isSelected ? "bg-emerald-100 opacity-100" : "bg-gray-100 opacity-0 group-hover:opacity-100"}`} 
      />

      <div className="relative p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          {/* ICON/IMAGE */}
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-inner bg-gray-50 border border-gray-100 transition-transform duration-500 group-hover:scale-110">
            <Image
              src={category.avatar || "/fallback.png"}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
          
          {/* STATS BADGE */}
          <div className="flex flex-col items-end">
            <span className="text-xs  uppercase tracking-wider text-gray-400">Listings</span>
            <span className="text-xl font-light text-gray-900">{category.products.length}</span>
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="mt-auto">
          <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
            {category.description}
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
            <Layers className="w-3.5 h-3.5" />
            <span>{category.subcategories.length} Subcategories</span>
          </div>
          <div className={`p-2 rounded-full transition-colors ${isSelected ? "bg-black text-white" : "bg-gray-50 text-gray-400 group-hover:bg-black group-hover:text-white"}`}>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CategoriesPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useIsMobile()

  const { data, isLoading } = useFetchPublicData({
    queryKey: "all-categories",
    requestUrl: "/category",
  })

  const categories = useMemo(
    () => (data as CategoryD[]) || [],
    [data]
  )

  const filteredCategories = useMemo(() => {
    return categories.filter(cat => 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [categories, searchQuery])

  const selectedCategory = useMemo(
    () => categories.find(cat => cat.id === selectedId),
    [categories, selectedId]
  )

  // Determine if we should show the list/grid
  // Hide if (isMobile AND a category is selected)
  const showList = !isMobile || (isMobile && !selectedId)
  
  // Determine if we should show the detail panel
  const showDetail = !!selectedCategory

  return (
    <div className="min-h-screen bg-inherit text-gray-900 ">
      <main className="max-w-7xl mx-auto px-6 py-16">
        
        {/* HERO SECTION - Hidden on mobile when viewing details for more focus */}
        {(!isMobile || !selectedId) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-in fade-in duration-500">
            <div className="max-w-2xl">
              
              <h1 className="text-3xl cat-heading sm:text-4xl font-semibold text-gray-900">
                Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Categories</span>
              </h1>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                 Browse through our curated collections 
                and find exactly what you are looking for.
              </p>
            </div>

            {/* SEARCH BAR */}
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
              <input 
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>
        )}

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* CATEGORIES GRID */}
          {showList && (
            <div className={`${selectedId ? "lg:col-span-7" : "lg:col-span-12"} transition-all duration-500 animate-in fade-in slide-in-from-left-4`}>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-200/50 animate-pulse rounded-3xl" />
                  ))}
                </div>
              ) : filteredCategories.length > 0 ? (
                <div className={`grid gap-6 ${selectedId ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}`}>
                  {filteredCategories.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      isSelected={selectedId === cat.id}
                      onClick={() => setSelectedId(selectedId === cat.id ? null : cat.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <EmptyItem
                    icon={PackageOpen}
                    title="No results found"
                    description="We couldn't find any categories matching your search. Try a different keyword."
                  />
                </div>
              )}
            </div>
          )}

          {/* SIDE DETAIL PANEL */}
          {showDetail && (
            <div className={`${isMobile ? "w-full" : "lg:col-span-5"} animate-in slide-in-from-right-8 duration-500`}>
              <div className="sticky top-8  bg-gradient-to-r from-emerald-100 to-amber-100 rounded-sm p-5 shadow-sm ">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    {isMobile && (
                       <button 
                        onClick={() => setSelectedId(null)}
                        className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>
                    )}
                    <div>
                      <h2 className="text-lg md:text-2xl capitalize font-bold mb-1">{selectedCategory.name}</h2>
                      <p className="text-sm text-gray-500">Explore subcategories</p>
                    </div>
                  </div>
                  {!isMobile && (
                    <button 
                      onClick={() => setSelectedId(null)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 animate-bounce transition-all duration-500 rotate-180" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-700 flex items-center gap-2 mb-4">
                    <Layers className="w-4 h-4" />
                    Subcategories
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {selectedCategory.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/categories/${sub.slug}`}
                        className="group flex items-center justify-between  rounded-2xl bg-gray-50 hover:bg-black hover:text-white transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-inner bg-gray-50 border border-gray-100 transition-transform duration-500 group-hover:scale-110">
           
                            <Image
                              src={sub.avatar || "/fallback.png"}
                              alt={sub.name}
                              width={400}
                              height={500}
                               className="object-cover absolute w-12 h-12"
                            />
                            </div>
                          {/* <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:bg-white" /> */}
                          <span className="font-medium capitalize text-sm">{sub.name}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    ))}
                    
                    {selectedCategory.subcategories.length === 0 && (
                      <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-2xl border border-dashed">
                        No subcategories available
                      </div>
                    )}
                  </div>
                </div>

                
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
