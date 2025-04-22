'use client';

import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useCourseProgress } from '@/contexts/CourseProgressContext';
import { CheckCircle2, User, ChevronUp } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export function CourseProgressBar() {
  const { progress, getOverallProgress, updateChapterProgress } = useCourseProgress();
  const [overallProgress, setOverallProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    setOverallProgress(getOverallProgress());
  }, [getOverallProgress]);

  const handleCompleteToggle = () => {
    const newProgress = overallProgress === 100 ? 0 : 100;
    // Update all chapters to match the new progress
    Object.keys(progress.modules).forEach(moduleId => {
      Object.keys(progress.modules[moduleId].chapters).forEach(chapterId => {
        updateChapterProgress(moduleId, chapterId, newProgress === 100);
      });
    });

    toast({
      title: newProgress === 100 ? "Course Completed!" : "Course Reset",
      description: newProgress === 100 
        ? "Congratulations on completing the course!" 
        : "You can start over from the beginning.",
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t shadow-lg transition-all duration-300 z-50",
      isExpanded ? "h-32" : "h-16"
    )}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Your Progress</span>
            </div>
            <div className="w-48">
              <Progress 
                value={overallProgress} 
                className="h-2 transition-all duration-300" 
              />
            </div>
            <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronUp className={cn(
              "h-4 w-4 transition-transform duration-300",
              isExpanded && "rotate-180"
            )} />
          </Button>
        </div>
        {isExpanded && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Modules Completed</p>
              <p className="text-lg font-semibold">
                {Object.values(progress.modules).filter(m => m.progress === 100).length} / {Object.keys(progress.modules).length}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Time Spent</p>
              <p className="text-lg font-semibold">2h 30m</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Last Activity</p>
              <p className="text-lg font-semibold">2 hours ago</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 