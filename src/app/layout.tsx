import type { Metadata } from "next";
import { VideoModalProvider } from '@/components/VideoModalContext';
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationWrapper from '@/components/NavigationWrapper';
import { CommandMenuProvider } from '@/components/CommandMenuProvider';

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
          <CommandMenuProvider>
            <NavigationWrapper>
              {children}
            </NavigationWrapper>
          </CommandMenuProvider>
        </VideoModalProvider>
      </body>
    </html>
  );
}
