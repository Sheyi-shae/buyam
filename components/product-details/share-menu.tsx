"use client"
import {
  Copy,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Music,
  Pin,
  Send,
  Share2,
  Twitter,
  X,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import {
  copyToClipboard,
  openShareUrl,
  SHARE_PLATFORMS,
  ShareConfig,
  trackShareEvent,
  UseNativeShare,
} from "@/utils/social-share";

/**
 * DESIGN PHILOSOPHY: Modern Luxury Minimalism
 * - Premium share menu with smooth animations
 * - Organized platform grid with hover effects
 * - Accessible keyboard navigation
 * - Mobile-optimized touch targets
 */

interface ShareMenuProps {
  config: ShareConfig;
  productId: number;
  onShare?: (platform: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle size={20} />,
  Share2: <Share2 size={20} />,
  Facebook: <Facebook size={20} />,
  Instagram: <Instagram size={20} />,
  Music: <Music size={20} />,
  Twitter: <Twitter size={20} />,
  Linkedin: <Linkedin size={20} />,
  Send: <Send size={20} />,
  Pin: <Pin size={20} />,
  Mail: <Mail size={20} />,
};

export default function ShareMenu({
  config,
  productId,
  onShare,
}: ShareMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleShare = async (platform: typeof SHARE_PLATFORMS[number]) => {
    try {
      // Track the share event
      trackShareEvent(platform.id, productId);

      // Get the share URL
      const shareUrl = platform.getUrl(config);

      // Try native share first if available
      const nativeShareUsed = await UseNativeShare(config);

      if (!nativeShareUsed) {
        // Fall back to opening share URL
        openShareUrl(shareUrl, platform.id);
      }

      // Show success toast
      toast.success(`Shared on ${platform.name}!`);

      // Call callback
      onShare?.(platform.id);

      // Close menu
      setIsOpen(false);
    } catch (error) {
      console.error(`Failed to share on ${platform.name}:`, error);
      toast.error(`Failed to share on ${platform.name}`);
    }
  };

  const handleCopyLink = async () => {
    try {
      const copied = await copyToClipboard(config.url);
      if (copied) {
        setIsCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setIsCopied(false), 2000);
      } else {
        toast.error("Failed to copy link");
      }
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium text-sm transition-all duration-150 hover:bg-slate-50 hover:border-slate-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        title="Share this product"
      >
        <Share2 size={18} />
        <span className="hidden sm:inline">Share</span>
      </button>

      {/* Share Menu Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="mb-4 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">
              Share this product
            </h3>
            
          </div>

          {/* Copy Link Section */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-4 bg-gradient-to-r from-emerald-50 to-transparent border border-emerald-200 transition-all duration-150 hover:bg-emerald-100 active:scale-95"
          >
            <Copy
              size={18}
              className={`transition-colors duration-200 ${
                isCopied ? "text-emerald-600" : "text-emerald-600"
              }`}
            />
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-slate-900">
                {isCopied ? "Link copied!" : "Copy link"}
              </p>
              <p className="text-xs text-slate-500">
                {isCopied ? "Ready to share" : "Share via any platform"}
              </p>
            </div>
          </button>

          {/* Social Platforms Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {SHARE_PLATFORMS.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handleShare(platform)}
                className="flex flex-col items-center gap-2 px-3 py-3 rounded-lg border border-slate-200 transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 group"
                title={`Share on ${platform.name}`}
              >
                <div
                  className="p-2 rounded-lg transition-all duration-150 group-hover:scale-110"
                  style={{
                    backgroundColor: `${platform.color}20`,
                    color: platform.color,
                  }}
                >
                  {ICON_MAP[platform.icon as keyof typeof ICON_MAP]}
                </div>
                <span className="text-xs font-medium text-slate-700 text-center leading-tight">
                  {platform.name}
                </span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              Share to help vendors reach more customers
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
