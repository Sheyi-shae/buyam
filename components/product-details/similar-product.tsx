import {
  ArrowRight,
  Heart,
  MapPin,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { CategoryD, ProductDetail, ProductLike, SubCategory, User } from "@/types/users";
import { formatCurrency } from "@/utils/format-currency";


const DEMO_PRODUCT: ProductDetail[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB - Clean Condition",
    price: 1850000,
    avatar: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Barely used iPhone 15 Pro Max with battery health at 98%. Comes with receipt and original accessories.",
    isPremium: true,
    negotiable: true,
    isSold: false,
    sellerPublicId: "SELL-IPH-001",
    slug: "iphone-15-pro-max-256gb",
    sellerId: 12,
    state: "Lagos",
    city: "Lekki",
    condition: "Used",
    phone: "08012345678",
    storeName: "Tech Haven",
   
    views: 432,
    likes: [{ id: 1 }, { id: 2 }, { id: 3 }] as ProductLike[],
    seller: {
      id: 12,
      name: "David Johnson",
      avatar:
        "https://randomuser.me/api/portraits/men/32.jpg",
       lastSeen: new Date(),
    } as User,
    subCategoryId: 2,
    categoryId: 1,
    subCategory: {
      id: 2,
      name: "Mobile Phones",
    } as SubCategory,
    category: {
      id: 1,
      name: "Electronics",
    } as CategoryD,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 2,
    name: "Modern L-Shaped Workstation Desk",
    price: 320000,
    avatar: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Spacious office desk perfect for remote work setups and gaming stations.",
    isPremium: false,
    negotiable: true,
    isSold: false,
    sellerPublicId: "SELL-FUR-002",
    slug: "modern-l-shaped-workstation-desk",
    sellerId: 18,
    state: "Abuja",
    city: "Wuse",
    condition: "New",
    phone: "08198765432",
    storeName: "Urban Furniture",
    
    views: 189,
    likes: [{ id: 1 }] as ProductLike[],
    seller: {
      id: 18,
      name: "Sarah Williams",
      avatar:
        "https://randomuser.me/api/portraits/women/44.jpg",
      lastSeen: new Date(),
    } as User,
    subCategoryId: 8,
    categoryId: 4,
    subCategory: {
      id: 8,
      name: "Furniture",
    } as SubCategory,
    category: {
      id: 4,
      name: "Home & Office",
    } as CategoryD,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 3,
    name: "2020 Toyota Camry Sport Edition",
    price: 14500000,
    avatar: [
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Well maintained Toyota Camry Sport Edition with full customs papers and zero accident history.",
    isPremium: true,
    negotiable: false,
    isSold: false,
    sellerPublicId: "SELL-CAR-003",
    slug: "2020-toyota-camry-sport",
    sellerId: 21,
    state: "Rivers",
    city: "Port Harcourt",
    condition: "Used",
    phone: "09022223333",
    storeName: "Elite Autos",
   
    views: 920,
    likes: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] as ProductLike[],
    seller: {
      id: 21,
      name: "Michael Ade",
      avatar:
        "https://randomuser.me/api/portraits/men/61.jpg",
       lastSeen: new Date(),
    } as User,
    subCategoryId: 15,
    categoryId: 5,
    subCategory: {
      id: 15,
      name: "Cars",
    } as SubCategory,
    category: {
      id: 5,
      name: "Vehicles",
    } as CategoryD,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 4,
    name: "PlayStation 5 Digital Edition",
    price: 780000,
    avatar: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "PS5 Digital Edition in excellent condition with one controller included.",
    isPremium: false,
    negotiable: true,
    isSold: false,
    sellerPublicId: "SELL-GAME-004",
    slug: "playstation-5-digital-edition",
    sellerId: 9,
    state: "Oyo",
    city: "Ibadan",
    condition: "Used",
    phone: "07011112222",
    storeName: "Game Plug",
    
    views: 350,
    likes: [{ id: 1 }, { id: 2 }] as ProductLike[],
    seller: {
      id: 9,
      name: "Daniel Smith",
      avatar:
        "https://randomuser.me/api/portraits/men/52.jpg",
      lastSeen: new Date(),
    } as User,
    subCategoryId: 5,
    categoryId: 1,
    subCategory: {
      id: 5,
      name: "Gaming",
    } as SubCategory,
    category: {
      id: 1,
      name: "Electronics",
    } as CategoryD,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];



export default function SimilarProducts() {
 
   

 

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 mt-2">
        <div className="flex items-center gap-3 mb-2">
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Similar Item
          </h2>
        </div>
        
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {DEMO_PRODUCT.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            
           
          />
        ))}
      </div>

      {/* Loading State */}
      {/* {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-slate-100 rounded-lg h-80 animate-pulse"
            />
          ))}
        </div>
      )} */}
    </div>
  );
}

/**
 * ProductCard Component
 * Individual product card with image, pricing, and seller info
 */
interface ProductCardProps {
  product: ProductDetail;
  isLiked?: boolean;
  
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isLiked,
 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      
      className="group bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-emerald-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        {/* Image */}
        <img
          src={product.seller.avatar || "https://via.placeholder.com/300x200"}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Loading Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-100 animate-pulse" />
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
          {/* Like Button */}
          <div className="flex justify-end">
            <button
              
              className="p-2 bg-white rounded-full shadow-lg hover:bg-emerald-50 transition-all duration-150 active:scale-95"
              title="Add to favorites"
            >
              <Heart
                size={18}
                className={`transition-all duration-200 ${
                  isLiked
                    ? "fill-red-500 text-red-500"
                    : "text-slate-600 hover:text-red-500"
                }`}
              />
            </button>
          </div>

          {/* View Details Button */}
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-150 active:scale-95">
            <ShoppingBag size={16} />
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Condition Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
          {product.condition}
        </div>

        {/* Negotiable Badge */}
        {product.negotiable && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
            <TrendingUp size={12} />
            Negotiable
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-amber-600">
            {formatCurrency(product.price)}
          </span>
          {product.negotiable && (
            <span className="text-xs text-slate-500 font-medium">
              or best offer
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin size={14} className="text-emerald-600 flex-shrink-0" />
          <span className="text-xs truncate">
            {product.city}, {product.state}
          </span>
        </div>

        {/* Seller Info */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {product.seller.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-900 truncate">
              {product.seller.name}
            </p>
            <p className="text-xs text-slate-500">
              {product.views} views • {product.likes.length} likes
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="px-2 py-1 bg-slate-50 rounded text-center">
            <p className="text-xs font-semibold text-slate-900">
              {product.likes.length}
            </p>
            <p className="text-xs text-slate-500">Likes</p>
          </div>
          <div className="px-2 py-1 bg-slate-50 rounded text-center">
            <p className="text-xs font-semibold text-slate-900">
              {product.views}
            </p>
            <p className="text-xs text-slate-500">Views</p>
          </div>
        </div>
      </div>
    </div>
  );
};
