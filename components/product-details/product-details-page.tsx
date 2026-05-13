"use client"
import { ProductDetail } from '@/types/users';
import { useFetchPublicData } from '@/utils/fetch-hooks';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import LoadingSpinners from '../loading-spinners';
import DescriptionAndSpecs from './product-description-specs';
import ProductGallery from './product-gallery';
import ProductInfoPanel from './product-info-panel';
import ProductReviews from './product-review';
import SellerInfoCard from './seller-info-card';
import apiPublic from '@/utils/api-public';
import { useQueryClient } from '@tanstack/react-query';
import AiEnquiry from './ai-enquiry';
import ProductPageSkeleton from '../skeletons/product-page-skeleton';
import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SimilarProducts from './similar-product';





 
const ProductDetailsPage = ({slug}:{slug:string}) => {
    // fetch product details based slug
     const { data, isLoading,isError} = useFetchPublicData({
        queryKey: "product-details",
        requestUrl:`/product/prodct-details/${slug}`,
        queryParams:slug
     })
  
  const queryClient = useQueryClient()

    const productDetail = useMemo(
      () => (data as ProductDetail) ,
      [data]
  );

  const router = useRouter()
  async function refreshData() {
    router.refresh()
   }

  // track views
    useEffect (() => {
       if (!('IntersectionObserver' in window)) return;
     
      const trackViews = async () => {
       await apiPublic.post(`/product/view/${slug}`)
       queryClient.invalidateQueries({ queryKey: ['product-details',slug], })
      }

      trackViews()  
    },);


    if (isLoading) {
       return <ProductPageSkeleton/>
  }
  
if (isError) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur">
        
        <div className="flex flex-col items-center text-center">
          
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <RefreshCcw className="h-10 w-10 text-red-500" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Something went wrong
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            We couldn&apos;t fetch the data at the moment. 
            Please try refreshing the page.
          </p>

          <button
            onClick={refreshData}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98]"
          >
            <RefreshCcw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
  

 

  return (
    <div className="relative mt-16 min-h-screen  p-4 sm:p-8 font-inter">
    

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs/Back Button placeholder */}
        <p className="text-gray-500 mb-4 text-xs md:text-sm">
          <Link href="/">Home</Link> &gt;
          <Link className='mr-1 ml-1' href={`/categories/${productDetail?.subCategory?.slug}`}>{productDetail?.subCategory?.name}</Link>&gt;
          <span className="ml-1 text-emerald-600 truncate">{productDetail?.name}</span>
        </p>

        {/* Main Grid Layout */}
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left/Main Column (Gallery, Info, Description, Reviews) */}
          <div className="md:col-span-2">
            <ProductGallery
              images={productDetail?.avatar}
              username={productDetail.seller.name}
            online={productDetail.seller.online}
            />
            <ProductInfoPanel productData={productDetail} />
            <DescriptionAndSpecs productData={productDetail} />
            <ProductReviews productID={productDetail?.id} sellerId={productDetail.sellerId} />
          </div>

          {/* Right/Sidebar Column (Seller Info) */}
          <div className="md:col-span-1">
            <SellerInfoCard productData={productDetail} />
          </div>
        </div>

        {/* Bottom Section (Recommendations) */}
        <SimilarProducts/>
      </div>

      {/* ai enquiry */}
      <div className='  '>
        <AiEnquiry product={productDetail}/>

      </div>

  
    </div>
  );
};

export default ProductDetailsPage;