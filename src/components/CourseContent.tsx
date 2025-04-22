import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const CourseContent: React.FC = () => {
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [savedPages, setSavedPages] = useState<Page[]>([]);
  const [isPageSaved, setIsPageSaved] = useState<boolean>(false);

  const handleChapterClick = (moduleId: string, chapterId: string) => {
    setCurrentPageId(`${moduleId}-${chapterId}`);
    setCurrentModuleId(moduleId);
    setCurrentChapterId(chapterId);
    updateLastAccessed(`${moduleId}-${chapterId}`);
  };

  const handleSavePage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPageId) {
      toggleSavedPage(currentPageId);
      const isSaved = savedPages.some(page => page.id === currentPageId);
      toast({
        title: isSaved ? "Page Saved" : "Page Unsaved",
        description: isSaved 
          ? "This page has been added to your saved pages."
          : "This page has been removed from your saved pages.",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSavePage}
      className="h-8 w-8"
    >
      <Bookmark className={cn(
        "h-4 w-4 transition-colors",
        isPageSaved && "text-primary fill-primary"
      )} />
    </Button>
  );
};

export default CourseContent; 