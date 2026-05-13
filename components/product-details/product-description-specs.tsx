"use client";
import { ProductDetail } from "@/types/users";
import { ChevronDown, Info, Tag } from "lucide-react";
import React, { useState } from "react";



interface DescriptionAndSpecsProps {
  productData: ProductDetail;
}

export default function DescriptionAndSpecs({
  productData,
}: DescriptionAndSpecsProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Calculate if description is truncated
  const isTruncated = productData.description?.length > 280;
  const displayDescription = showFullDescription
    ? productData.description
    : productData.description?.substring(0, 280);

  return (
    <div className="w-full mt-2 mx-auto">
      {/* Main Container */}
      <div className=" rounded-lg shadow-sm border bg-gradient-to-br from-white to-emerald-50 overflow-hidden transition-all duration-300 hover:shadow-md">
        {/* Description Section */}
        <div className="px-6 py-8 border-b border-slate-100">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              More Info
            </h2>
          </div>

          {/* Description Text */}
          <div className="space-y-4">
            <p
              className={`text-slate-700 leading-relaxed whitespace-pre-wrap break-words transition-all duration-300 ${
                showFullDescription ? "max-h-none" : "max-h-32 overflow-hidden"
              }`}
            >
              {displayDescription}
              {isTruncated && !showFullDescription && (
                <span className="text-slate-400">...</span>
              )}
            </p>

            {/* Read More / Read Less Button */}
            {isTruncated && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="inline-flex items-center gap-2 px-4 py-2 text-emerald-600 font-semibold rounded-lg transition-all duration-150 hover:bg-emerald-50 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 group"
              >
                <span>
                  {showFullDescription ? "Show Less" : "Read Full Description"}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    showFullDescription ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Specs Section */}
        <div className="px-6 py-3">
        

          {/* Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Condition Spec */}
            <SpecItem
              label="Condition"
              value={productData.condition}
              icon="🏷️"
            />

            {/* Negotiable Spec */}
            <SpecItem
              label="Price Negotiable"
              value={productData.negotiable ? "Yes" : "No"}
             
              highlight={productData.negotiable}
            />
          </div>

          {/* Additional Info Card */}
          <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-emerald-100">
            <p className="text-sm text-slate-50">
               Contact
              the seller for more details or to negotiate the price.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


interface SpecItemProps {
  label: string;
  value: string | boolean;
  icon?: string;
  highlight?: boolean;
}

const SpecItem: React.FC<SpecItemProps> = ({
  label,
  value,
  icon,
  highlight,
}) => (
  <div
    className={`group flex items-center gap-4 p-4 rounded-lg border transition-all duration-150 ${
      highlight
        ? "bg-emerald-50 border-emerald-200 hover:border-emerald-300 hover:shadow-md"
        : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
    }`}
  >
    {/* Icon */}
    {icon && (
      <div className="text-2xl transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
    )}

    {/* Content */}
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p
        className={`text-sm font-semibold truncate ${
          highlight ? "text-emerald-700" : "text-slate-900"
        }`}
      >
        {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
      </p>
    </div>

    {/* Highlight Badge */}
    {highlight && (
      <div className="flex-shrink-0 px-2 py-1 bg-emerald-600 text-white text-xs font-semibold rounded">
        Negotiable
      </div>
    )}
  </div>
);
