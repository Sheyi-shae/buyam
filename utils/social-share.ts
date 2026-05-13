/**
 * Social Sharing Utility Module
 * Provides functions to generate share URLs for various social platforms
 * and native sharing capabilities
 */

export interface ShareConfig {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  price?: string;
}

/**
 * Generate WhatsApp share URL
 * Opens WhatsApp with pre-filled message
 */
export function getWhatsAppShareUrl(config: ShareConfig): string {
  const message = encodeURIComponent(
    `Check out this product: *${config.title}*\n\n${config.description}\n\nPrice: ${config.price || "Contact for price"}\n\n${config.url}`
  );
  return `https://wa.me/?text=${message}`;
}

/**
 * Generate WhatsApp Status share URL
 * Shares to WhatsApp Status (story)
 */
export function getWhatsAppStatusShareUrl(config: ShareConfig): string {
  const message = encodeURIComponent(
    `Check out this product: ${config.title}\n${config.url}`
  );
  return `https://wa.me/?text=${message}`;
}

/**
 * Generate Facebook share URL
 * Opens Facebook share dialog
 */
export function getFacebookShareUrl(config: ShareConfig): string {
  const params = new URLSearchParams({
    app_id: "YOUR_FACEBOOK_APP_ID", // Replace with your app ID
    display: "popup",
    href: config.url,
    redirect_uri: config.url,
  });
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(config.url)}`;
}

/**
 * Generate Instagram share URL
 * Note: Instagram doesn't support direct URL sharing, opens Instagram app/web
 */
export function getInstagramShareUrl(config: ShareConfig): string {
  // Instagram doesn't have a direct share URL, so we open the app
  return `https://www.instagram.com/`;
}

/**
 * Generate TikTok share URL
 * Opens TikTok app or web
 */
export function getTikTokShareUrl(config: ShareConfig): string {
  return `https://www.tiktok.com/`;
}

/**
 * Generate Twitter/X share URL
 * Opens Twitter with pre-filled tweet
 */
export function getTwitterShareUrl(config: ShareConfig): string {
  const text = encodeURIComponent(
    `Check out this amazing product: ${config.title} - ${config.price || "Great price!"} ${config.url}`
  );
  return `https://twitter.com/intent/tweet?text=${text}`;
}

/**
 * Generate LinkedIn share URL
 * Opens LinkedIn share dialog
 */
export function getLinkedInShareUrl(config: ShareConfig): string {
  const params = new URLSearchParams({
    url: config.url,
    title: config.title,
    summary: config.description,
    source: "ProductShare",
  });
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(config.url)}`;
}

/**
 * Generate Email share URL
 * Opens default email client
 */
export function getEmailShareUrl(config: ShareConfig): string {
  const subject = encodeURIComponent(`Check out: ${config.title}`);
  const body = encodeURIComponent(
    `I found this amazing product you might like!\n\n${config.title}\n${config.description}\n\nPrice: ${config.price || "Contact for price"}\n\nView it here: ${config.url}`
  );
  return `mailto:?subject=${subject}&body=${body}`;
}

/**
 * Generate Telegram share URL
 * Opens Telegram with pre-filled message
 */
export function getTelegramShareUrl(config: ShareConfig): string {
  const text = encodeURIComponent(
    `Check out this product: ${config.title}\n${config.description}\n${config.url}`
  );
  return `https://t.me/share/url?url=${encodeURIComponent(config.url)}&text=${text}`;
}

/**
 * Generate Pinterest share URL
 * Opens Pinterest save dialog
 */
export function getPinterestShareUrl(config: ShareConfig): string {
  const params = new URLSearchParams({
    url: config.url,
    media: config.imageUrl || "",
    description: config.title,
  });
  return `https://pinterest.com/pin/create/button/?${params.toString()}`;
}

/**
 * Copy text to clipboard
 * Useful for copying product links
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
    return false;
  }
}

/**
 * Use native Web Share API if available
 * Falls back to custom sharing if not supported
 */
export async function UseNativeShare(config: ShareConfig): Promise<boolean> {
  if (!navigator.share) {
    return false;
  }

  try {
    await navigator.share({
      title: config.title,
      text: config.description,
      url: config.url,
    });
    return true;
  } catch (err) {
    console.error("Native share failed:", err);
    return false;
  }
}

/**
 * Open share URL in a new window
 * Handles both mobile and desktop platforms
 */
export function openShareUrl(url: string, platform: string): void {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const width = 600;
  const height = 400;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  if (isMobile) {
    // On mobile, just open the URL
    window.open(url, "_blank");
  } else {
    // On desktop, open in a popup window
    window.open(
      url,
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top}`
    );
  }
}

/**
 * Generate a shareable product link with tracking
 * Useful for analytics
 */
export function generateShareableLink(
  baseUrl: string,
  productId: number,
  platform: string
): string {
  const params = new URLSearchParams({
    product_id: productId.toString(),
    shared_via: platform,
    timestamp: Date.now().toString(),
  });
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Track share event (for analytics)
 */
export function trackShareEvent(platform: string, productId: number): void {
  // Send to your analytics service
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "share", {
      method: platform,
      content_id: productId,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Share configuration for all platforms
 */
export const SHARE_PLATFORMS = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "MessageCircle",
    color: "#25D366",
    getUrl: getWhatsAppShareUrl,
  },
  {
    id: "whatsapp-status",
    name: "WhatsApp Status",
    icon: "Share2",
    color: "#25D366",
    getUrl: getWhatsAppStatusShareUrl,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "Facebook",
    color: "#1877F2",
    getUrl: getFacebookShareUrl,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "Instagram",
    color: "#E4405F",
    getUrl: getInstagramShareUrl,
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "Music",
    color: "#000000",
    getUrl: getTikTokShareUrl,
  },
  
 
  
  {
    id: "pinterest",
    name: "Pinterest",
    icon: "Pin",
    color: "#E60023",
    getUrl: getPinterestShareUrl,
  },
  
] as const;
