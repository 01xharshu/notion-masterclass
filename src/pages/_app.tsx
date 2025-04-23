import type { AppProps } from 'next/app';
import { Inter } from "next/font/google";
import { VideoModalProvider } from '@/components/VideoModalContext';
import { CommandMenuProvider } from '@/components/CommandMenuProvider';
import { SidebarProvider } from '@/hooks/use-sidebar';
import { CourseProgressProvider } from '@/contexts/CourseProgressContext';
import { UserDataProvider } from '@/contexts/UserDataContext';
import { Toaster } from '@/components/ui/toast';
import { ThemeProvider } from 'next-themes';
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      
      <VideoModalProvider>
        <CommandMenuProvider>
          <SidebarProvider>
            <CourseProgressProvider>
              <UserDataProvider>
                <main className={inter.className}>
                  <Component {...pageProps} />
                </main>
              </UserDataProvider>
            </CourseProgressProvider>
          </SidebarProvider>
        </CommandMenuProvider>
      </VideoModalProvider>
      <Toaster />
    </ThemeProvider>
  );
}