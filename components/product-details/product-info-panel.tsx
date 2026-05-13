"use client"
import { useAuthStore } from '@/stores/auth-stores';
import { ProductDetail } from '@/types/users';
import apiPrivate, { parseErrorMessage } from '@/utils/api-private';
import { timeAgo } from '@/utils/date-format';
import { formatCurrency } from '@/utils/format-currency';
import playSound from '@/utils/like-sound-function';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronRight, Eye, Heart, Locate, MapPin, MessageSquare, PhoneCall, Share2, Star, ThumbsUp } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import ProductContactSeller from './product-contact-seller';
import ShareMenu from './share-menu';



interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <div className="group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-150 hover:bg-slate-50">
    <div className="flex-shrink-0 text-emerald-600 transition-transform duration-200 group-hover:scale-110">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-medium text-slate-900 truncate">{value}</p>
    </div>
  </div>
);
  
export default function ProductInfoPanel({ productData }: { productData: ProductDetail }) {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  const [showNumber, setShowNumber] = useState<boolean>(false);
  const [contactSeller, setContactSeller] = useState<boolean>(false);
    const [isLiking, setIsLiking] = useState(false);

  // handle contact seller
  const handleContactSeller = () => {
    setContactSeller(!contactSeller);
  };
  
  // handle likes 
  const toggleLike = async (id: number) => {
    try {
      setIsLiking(true)
      const isLiked = productData.likes.some(like => like.userId === Number(user?.id));
      const { data } = await apiPrivate.post(`/like/${id}`);
      toast.success(data.message);
      
      // Only play sound
      if (!isLiked) {
      
        playSound("/sound/like.wav");
      }

      queryClient.invalidateQueries({ queryKey: ["product-details",productData.slug] });
    } catch (error) {
      parseErrorMessage(error);
    } finally {
      setIsLiking(false)
    }
  };

  const isLiked = productData.likes.some(like => like.userId === user?.id);
   const isOwnProduct = productData.sellerId === user?.id;


   const shareConfig = {
    title: productData.name,
    description: `Check out this amazing product: ${productData.name}. Price: ${formatCurrency(productData.price)}. Location: ${productData.city}, ${productData.state}`,
    url: typeof window !== "undefined" ? window.location.href : "",
    price: formatCurrency(productData.price),
  };

    
  return (
   <div className="p-2 md:p-6 rounded-xl shadow-lg border  bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="  flex justify-between items-start mb-4">
        <h1 className="text-2xl md:text-3xl capitalize font-bold text-gray-800 leading-tight">
          {productData.name}
              </h1>
    
       
      </div>

      {/* views and price */}
      <div className='  flex justify-between'>
      <p className="text-2xl md:text-3xl  text-amber-600 mb-6">
        {formatCurrency(productData.price)}
        </p>
        
        {/* Engagement Metrics */}
              <div className="flex items-center gap-4 text-sm">
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(productData.id)}
                  disabled={isLiking}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-150 hover:bg-slate-100 active:scale-95 disabled:opacity-50"
                  title="Like this product"
                >
                  <ThumbsUp
                    size={18}
                    className={`transition-all duration-200 ${
                      isLiked
                        ? "fill-amber-600 text-amber-600"
                        : "text-slate-600 hover:text-amber-600"
                    }`}
                  />
                  {productData.likes.length > 0 && (
                    <span className="text-xs font-semibold text-slate-700">
                      {productData.likes.length}
                    </span>
                  )}
                </button>

                {/* Views */}
                <div className="flex items-center gap-2 text-slate-600">
                  <Eye size={18} className="text-slate-500" />
                  <span className="text-xs font-semibold">
                    {productData.views.toLocaleString()}
                  </span>
                </div>

                {/* Share Menu */}
                <div className="ml-auto">
                  <ShareMenu
                    config={shareConfig}
                    productId={productData.id}
                  />
                </div>
              </div>
      
      </div>


       

      {/* Action Buttons (Emerald) */}
       {!isOwnProduct &&
      <div className="flex flex-col md:flex-row gap-3 mb-6 text-sm md:text-base">
        <button
          onClick={handleContactSeller}
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg  text-white bg-emerald-600 hover:bg-emerald-700 "
        >
          <MessageSquare size={20} />
          <span>{contactSeller ? 'Hide Chat' : 'Contact Seller' }</span>
        </button>
        <button onClick={()=>setShowNumber(!showNumber)}
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg  text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50 ">
           <PhoneCall size={20} className='mr-1' />       
          {showNumber ?  
            <a href={productData.phone ? String(productData.phone) : "#"} className="underline">{productData.phone ? productData.phone : "Unavailable"}</a>
            : "View Phone Number"}
        </button>

      </div>}
      {/* contact seller  */}
         <div
  className={`
    transition-all duration-700
    ${contactSeller ? "translate-y-3 h-40 opacity-100" : "opacity-0 -translate-y-3 h-0 "}
  `}
>
       
          <ProductContactSeller
          buyerId={Number(user?.id)}
          productId={productData.id}
          sellerId={productData.seller.id} />
</div>

     {/* Details Section */}
        <div className=" py-6 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 mb-4">
            Product Details
          </p>

          <DetailItem
            icon={<MapPin size={18} />}
            label="Location"
            value={productData.state}
          />

          <DetailItem
            icon={<Locate size={18} />}
            label="City/Town"
            value={productData.city}
          />

          <DetailItem
            icon={<Star size={18} />}
            label="Condition"
            value={productData.condition}
          />

          <DetailItem
            icon={<ChevronRight size={18} />}
            label="Category"
            value={productData.subCategory.name}
          />

          <DetailItem
            icon={<Share2 size={18} />}
            label="Posted"
            value={timeAgo(productData.createdAt)}
          />
      </div>
      
       {/* Footer Section */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Seller: <span className="font-semibold text-slate-700">{productData.seller.name}</span>
          </p>
        </div>
    </div>
  )
}

