'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { courseData } from '@/data/courseData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bookmark, Clock, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeIn, staggerChildren } from '@/lib/animations';
import { useToast } from '@/components/ui/use-toast';
import { useCourseProgress } from '@/contexts/CourseProgressContext';

export function SavedPages() {
  const router = useRouter();
  const { savedPages, toggleSavedPage, updateLastAccessed } = useCourseProgress();
  const { toast } = useToast();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleChapterClick = (pageId: string, moduleId: string, chapterId: string) => {
    updateLastAccessed(pageId);
    router.push(`/course/${moduleId}/${chapterId}`);
  };

  const handleUnsave = (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSavedPage(pageId);
    toast({
      title: "Page Unsaved",
      description: "The page has been removed from your saved pages.",
    });
  };

  const sortedPages = [...savedPages].sort((a, b) => 
    new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="max-w-4xl mx-auto space-y-8"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <motion.div 
            className="flex items-center gap-4"
            variants={staggerChildren}
          >
            <Button
              variant="ghost"
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => router.push('/course')}
            >
              <motion.div
                whileHover={{ x: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <ArrowLeft className="h-4 w-4" />
              </motion.div>
              Back to Course
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Saved Pages</h1>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerChildren}
          >
            {sortedPages.map((page) => {
              const module = courseData.find(m => m.id === page.moduleId);
              const chapter = module?.chapters.find(c => c.id === page.chapterId);
              
              if (!chapter) return null;

              return (
                <motion.div
                  key={page.id}
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader 
                      className="cursor-pointer" 
                      onClick={() => handleChapterClick(page.id, page.moduleId, page.chapterId)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{chapter.title}</CardTitle>
                          <CardDescription>{module?.title}</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleUnsave(page.id, e)}
                          className="h-8 w-8"
                        >
                          <Bookmark className={cn(
                            "h-4 w-4 transition-colors",
                            "text-primary fill-primary"
                          )} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{chapter.duration || 'No duration'}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last accessed: {new Date(page.lastAccessed).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {savedPages.length === 0 && (
            <motion.div 
              className="text-center py-12"
              variants={fadeIn}
            >
              <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Saved Pages</h2>
              <p className="text-muted-foreground">
                Save pages to access them quickly from here.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 