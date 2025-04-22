'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/use-sidebar';
import { useCourseProgress } from '@/contexts/CourseProgressContext';
import { Progress } from '@/components/ui/progress';

interface CourseLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  currentModule?: string;
  currentChapter?: string;
}

interface Module {
  id: string;
  title: string;
  chapters: {
    id: string;
    title: string;
    href: string;
  }[];
}

const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Getting Started with Notion',
    chapters: [
      { id: 'chapter-1', title: 'Introduction to Notion', href: '/course/module-1/chapter-1' },
      { id: 'chapter-2', title: 'Basic Navigation', href: '/course/module-1/chapter-2' },
    ],
  },
  {
    id: 'module-2',
    title: 'Advanced Features',
    chapters: [
      { id: 'chapter-1', title: 'Databases and Relations', href: '/course/module-2/chapter-1' },
      { id: 'chapter-2', title: 'Formulas and Functions', href: '/course/module-2/chapter-2' },
    ],
  },
];

export default function CourseLayout({
  children,
  title = "Notion Masterclass",
  subtitle,
  currentModule,
  currentChapter,
}: CourseLayoutProps) {
  const router = useRouter();
  const { isOpen, toggle } = useSidebar();
  const [expandedModules, setExpandedModules] = React.useState<string[]>([]);
  const { getModuleProgress } = useCourseProgress();

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
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
                        {modules.find(m => m.id === currentModule)?.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {currentChapter && (
                      <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>
                            {modules
                              .find(m => m.id === currentModule)
                              ?.chapters.find(c => c.id === currentChapter)
                              ?.title}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    )}
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden ml-auto"
            onClick={toggle}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-20 left-0 z-30 lg:hidden"
          onClick={toggle}
        >
          <ChevronRight className={cn(
            "h-4 w-4 transition-transform duration-300",
            isOpen && "rotate-180"
          )} />
        </Button>

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed top-16 z-30 -translate-x-full w-64 border-r bg-background transition-transform duration-300 lg:translate-x-0",
            isOpen && "translate-x-0"
          )}
        >
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="p-4">
              {modules.map((module) => (
                <div key={module.id} className="mb-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{module.title}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress 
                          value={getModuleProgress(module.id)} 
                          className="h-1 w-16" 
                        />
                        <span className="text-xs text-muted-foreground">
                          {Math.round(getModuleProgress(module.id))}%
                        </span>
                      </div>
                    </div>
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  {expandedModules.includes(module.id) && (
                    <div className="mt-2 space-y-1 pl-4">
                      {module.chapters.map((chapter) => (
                        <Button
                          key={chapter.id}
                          variant="ghost"
                          className="w-full justify-start"
                          asChild
                        >
                          <Link href={chapter.href}>
                            {chapter.title}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Content Area */}
        <main className={cn(
          "flex-1 min-w-0 transition-[margin] duration-300",
          isOpen ? "lg:ml-64" : "lg:ml-0"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
} 