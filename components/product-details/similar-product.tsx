"use client";

import { Product } from "@/types/users";
import { useFetchPublicData } from "@/utils/fetch-hooks";
import {
  ArrowRight,
  Flame,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useMemo } from "react";
import CategoryProductCard from "../_frontpage/category-product-card";

interface SimilarProductsProps {
  productId: number;
}

export default function SimilarProducts({
  productId,
}: SimilarProductsProps) {
  const {
    data,
    isLoading,
    isError,
  } = useFetchPublicData({
    queryKey: "similar-products",
    requestUrl: `/product/similar-product/${productId}`,
  });

  const similarProducts = useMemo(
    () => (data as Product[]) || [],
    [data]
  );

  if (isError) {
    return (
      <div className="rounded-sm py-7 border border-red-100 bg-red-50/70 p-8 text-center">
        <p className="text-sm font-medium text-red-600">
          Failed to load similar products
        </p>
      </div>
    );
  }

  if (!isLoading && similarProducts.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden rounded-sm  border border-border/50 bg-gradient-to-b from-white via-white to-emerald-50/30 px-4 py-8 mt-7 sm:px-6 lg:px-8">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            

            <h2 className="text-lg md:text-2xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Products You May Like
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Explore related products based on browsing patterns,
              interests, and marketplace trends.
            </p>
          </div>

          
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="
                  overflow-hidden rounded-3xl border border-border/50
                  bg-white/80 p-4 shadow-sm backdrop-blur-sm
                "
              >
                <div className="h-52 animate-pulse rounded-2xl bg-slate-100" />

                <div className="mt-4 space-y-3">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />

                  <div className="flex items-center gap-2 pt-2">
                    <div className="h-9 w-9 animate-pulse rounded-full bg-slate-100" />

                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
                      <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
           

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <CategoryProductCard
                products={similarProducts}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}