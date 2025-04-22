'use client';

import React from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface ChapterProgress {
  completed: boolean;
  lastAccessed?: Date;
}

interface ModuleProgress {
  chapters: Record<string, ChapterProgress>;
  progress: number;
}

interface CourseProgress {
  modules: Record<string, ModuleProgress>;
  overallProgress: number;
}

interface CourseProgressContextType {
  progress: CourseProgress;
  updateChapterProgress: (moduleId: string, chapterId: string, completed: boolean) => void;
  getModuleProgress: (moduleId: string) => number;
  getOverallProgress: () => number;
}

const CourseProgressContext = React.createContext<CourseProgressContextType | undefined>(undefined);

const initialProgress: CourseProgress = {
  modules: {},
  overallProgress: 0,
};

export function CourseProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useLocalStorage<CourseProgress>('course-progress', initialProgress);

  const calculateModuleProgress = (moduleId: string, chapters: Record<string, ChapterProgress>) => {
    const chapterIds = Object.keys(chapters);
    if (chapterIds.length === 0) return 0;
    
    const completedChapters = chapterIds.filter(id => chapters[id].completed);
    return (completedChapters.length / chapterIds.length) * 100;
  };

  const calculateOverallProgress = (modules: Record<string, ModuleProgress>) => {
    const moduleIds = Object.keys(modules);
    if (moduleIds.length === 0) return 0;
    
    const totalProgress = moduleIds.reduce((sum, id) => sum + modules[id].progress, 0);
    return totalProgress / moduleIds.length;
  };

  const updateChapterProgress = React.useCallback((moduleId: string, chapterId: string, completed: boolean) => {
    setProgress((prev) => {
      const updatedModules = { ...prev.modules };
      
      // Initialize module if it doesn't exist
      if (!updatedModules[moduleId]) {
        updatedModules[moduleId] = {
          chapters: {},
          progress: 0,
        };
      }

      // Update chapter progress
      updatedModules[moduleId].chapters[chapterId] = {
        completed,
        lastAccessed: new Date(),
      };

      // Calculate module progress
      updatedModules[moduleId].progress = calculateModuleProgress(
        moduleId,
        updatedModules[moduleId].chapters
      );

      // Calculate overall progress
      const overallProgress = calculateOverallProgress(updatedModules);

      return {
        modules: updatedModules,
        overallProgress,
      };
    });
  }, [setProgress]);

  const getModuleProgress = React.useCallback((moduleId: string) => {
    return progress.modules[moduleId]?.progress || 0;
  }, [progress]);

  const getOverallProgress = React.useCallback(() => {
    return progress.overallProgress;
  }, [progress]);

  const value = React.useMemo(
    () => ({
      progress,
      updateChapterProgress,
      getModuleProgress,
      getOverallProgress,
    }),
    [progress, updateChapterProgress, getModuleProgress, getOverallProgress]
  );

  return (
    <CourseProgressContext.Provider value={value}>
      {children}
    </CourseProgressContext.Provider>
  );
}

export function useCourseProgress() {
  const context = React.useContext(CourseProgressContext);
  if (context === undefined) {
    throw new Error('useCourseProgress must be used within a CourseProgressProvider');
  }
  return context;
} 