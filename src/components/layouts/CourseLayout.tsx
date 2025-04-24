'use client';

import { useRouter } from 'next/router';
import { ArrowLeft, Sun, Moon} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useTheme } from 'next-themes';

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