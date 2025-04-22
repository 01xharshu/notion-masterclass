'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Sun, Moon, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface CourseLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  currentModule?: string;
  currentChapter?: string;
}

export default function CourseLayout({
  children,
  title = "Notion Masterclass",
  subtitle,
  currentModule,
  currentChapter,
}: CourseLayoutProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [savedChapters, setSavedChapters] = useState<string[]>([]);

  const handleBookmark = (chapterId: string) => {
    setSavedChapters(prev => {
      const isBookmarked = prev.includes(chapterId);
      if (isBookmarked) {
        toast({
          title: "Chapter Removed",
          description: "Chapter has been removed from your saved chapters."
        });
        return prev.filter(id => id !== chapterId);
      } else {
        toast({
          title: "Chapter Saved",
          description: "Chapter has been added to your saved chapters."
        });
        return [...prev, chapterId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-[100]">
        <div className="flex h-16 items-center px-4 gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/')}
            className="shrink-0 hover:bg-muted relative group"
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to home</span>
          </Button>

          <div className="flex flex-col">
            <h1 className="text-lg font-semibold leading-none">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Breadcrumbs */}
          {(currentModule || currentChapter) && (
            <Breadcrumb className="ml-4">
              <BreadcrumbList>
                {currentModule && (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/course/${currentModule}`}>
                        {currentModule}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {currentChapter && (
                      <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>
                            {currentChapter}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    )}
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          )}

          <div className="ml-auto flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Saved Chapters</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-2">
                  {savedChapters.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No saved chapters yet</p>
                  ) : (
                    savedChapters.map((chapterId) => (
                      <div key={chapterId} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                        <span className="text-sm">{chapterId}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleBookmark(chapterId)}
                          className="h-8 w-8"
                        >
                          <Bookmark className="h-4 w-4 text-primary fill-primary" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:bg-muted"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pb-16">
        {children}
      </main>
    </div>
  );
} 