import type { Metadata } from "next";


import { AuthProvider } from "@/providers/use-auth-provider";
import Header from "@/components/header";
import { NotificationProvider } from "@/providers/notification-provider";
import { SocketProvider } from "@/providers/socket-provider";
import { MobileFooter } from "@/components/_frontpage/mobile-footer";
import { AuthModal } from "@/components/auth/auth-modal";




export const metadata: Metadata = {
  title: "BuyAm",
  description: "Discover Everything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      
      <AuthProvider>
        <SocketProvider>
        <NotificationProvider>
            <Header />
            
            {children}
            <AuthModal />
            <MobileFooter/>
        </NotificationProvider>
         </SocketProvider>
         </AuthProvider>
      
    </main>
  );
}
