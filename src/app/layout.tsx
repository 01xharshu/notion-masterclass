import type { Metadata } from "next";
import { VideoModalProvider } from '@/components/VideoModalContext';
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from '../components/BottomNav';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion Masterclass - Grow And Monetize Your YouTube Channel",
  description: "Learn how to grow and monetize your YouTube channel with expert guidance from Ankur Warikoo and his team.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <VideoModalProvider>
        {children}
        <BottomNav />
        <div className="pb-16 md:pb-24" /> {/* Different padding for mobile and desktop */}
        </VideoModalProvider>
      </body>
    </html>
  );
}
