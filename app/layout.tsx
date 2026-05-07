import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

import { ReactQueryProvider } from "@/providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner"
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "BuyAm",
  description: "Discover Everything",
  icons: {
   icon: [
      { url: "/logo/favicon.ico", sizes: "any" },
      { url: "/logo/favicon-16x16.png", type: "image/png" },
      { url: "/logo/favicon-32x32.png", type: "image/png" },
    ],
    shortcut: "/logo/favicon.ico",
    apple: "/logo/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
         <head>
        <Script src="https://js.paystack.co/v1/inline.js"></Script>
      </head>
      <body
        className={`${poppins.className}  antialiased`}
      >
        <ReactQueryProvider>
        
          {children}
          <Toaster
            richColors
            visibleToasts={2}
            dir="ltr"
          />
        </ReactQueryProvider>
        
      </body>
    </html>
  );
}
