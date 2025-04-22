'use client';

import React from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface ChapterActivity {
  completed: boolean;
  lastAccessed: Date;
  timeSpent: number; // in seconds
  progress: number; // 0-100
  notes?: string;
}

interface ModuleActivity {
  chapters: Record<string, ChapterActivity>;
  lastAccessed: Date;
  totalTimeSpent: number;
  progress: number;
}

interface UserData {
  modules: Record<string, ModuleActivity>;
  overallProgress: number;
  totalTimeSpent: number;
  lastActiveModule?: string;
  lastActiveChapter?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    autoPlay: boolean;
  };
}

interface UserDataContextType {
  userData: UserData;
  updateChapterActivity: (
    moduleId: string,
    chapterId: string,
    updates: Partial<ChapterActivity>
  ) => void;
  updateModuleActivity: (
    moduleId: string,
    updates: Partial<ModuleActivity>
  ) => void;
  updatePreferences: (updates: Partial<UserData['preferences']>) => void;
  getChapterActivity: (moduleId: string, chapterId: string) => ChapterActivity | null;
  getModuleActivity: (moduleId: string) => ModuleActivity | null;
  getOverallProgress: () => number;
  getTotalTimeSpent: () => number;
}

const initialUserData: UserData = {
  modules: {},
  overallProgress: 0,
  totalTimeSpent: 0,
  preferences: {
    theme: 'system',
    notifications: true,
    autoPlay: true,
  },
};

const UserDataContext = React.createContext<UserDataContextType | undefined>(undefined);

// Cache for frequently accessed data
const cache = new Map<string, any>();

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useLocalStorage<UserData>('user-data', initialUserData);

  // Update cache when userData changes
  React.useEffect(() => {
    cache.clear();
    // Cache frequently accessed data
    cache.set('overallProgress', userData.overallProgress);
    cache.set('totalTimeSpent', userData.totalTimeSpent);
    cache.set('preferences', userData.preferences);
  }, [userData]);

  const updateChapterActivity = React.useCallback((
    moduleId: string,
    chapterId: string,
    updates: Partial<ChapterActivity>
  ) => {
    setUserData((prev) => {
      const updatedModules = { ...prev.modules };
      
      // Initialize module if it doesn't exist
      if (!updatedModules[moduleId]) {
        updatedModules[moduleId] = {
          chapters: {},
          lastAccessed: new Date(),
          totalTimeSpent: 0,
          progress: 0,
        };
      }

      // Initialize chapter if it doesn't exist
      if (!updatedModules[moduleId].chapters[chapterId]) {
        updatedModules[moduleId].chapters[chapterId] = {
          completed: false,
          lastAccessed: new Date(),
          timeSpent: 0,
          progress: 0,
        };
      }

      // Update chapter activity
      const chapter = updatedModules[moduleId].chapters[chapterId];
      updatedModules[moduleId].chapters[chapterId] = {
        ...chapter,
        ...updates,
        lastAccessed: new Date(),
      };

      // Update module stats
      const module = updatedModules[moduleId];
      const chapters = Object.values(module.chapters);
      module.totalTimeSpent = chapters.reduce((sum, ch) => sum + ch.timeSpent, 0);
      module.progress = chapters.length > 0
        ? (chapters.filter(ch => ch.completed).length / chapters.length) * 100
        : 0;
      module.lastAccessed = new Date();

      // Update overall stats
      const modules = Object.values(updatedModules);
      const totalTimeSpent = modules.reduce((sum, m) => sum + m.totalTimeSpent, 0);
      const overallProgress = modules.length > 0
        ? modules.reduce((sum, m) => sum + m.progress, 0) / modules.length
        : 0;

      return {
        ...prev,
        modules: updatedModules,
        totalTimeSpent,
        overallProgress,
        lastActiveModule: moduleId,
        lastActiveChapter: chapterId,
      };
    });
  }, [setUserData]);

  const updateModuleActivity = React.useCallback((
    moduleId: string,
    updates: Partial<ModuleActivity>
  ) => {
    setUserData((prev) => {
      const updatedModules = { ...prev.modules };
      
      if (!updatedModules[moduleId]) {
        updatedModules[moduleId] = {
          chapters: {},
          lastAccessed: new Date(),
          totalTimeSpent: 0,
          progress: 0,
        };
      }

      updatedModules[moduleId] = {
        ...updatedModules[moduleId],
        ...updates,
        lastAccessed: new Date(),
      };

      return {
        ...prev,
        modules: updatedModules,
        lastActiveModule: moduleId,
      };
    });
  }, [setUserData]);

  const updatePreferences = React.useCallback((
    updates: Partial<UserData['preferences']>
  ) => {
    setUserData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...updates,
      },
    }));
  }, [setUserData]);

  const getChapterActivity = React.useCallback((
    moduleId: string,
    chapterId: string
  ) => {
    const cacheKey = `chapter-${moduleId}-${chapterId}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const chapter = userData.modules[moduleId]?.chapters[chapterId];
    if (chapter) {
      cache.set(cacheKey, chapter);
    }
    return chapter || null;
  }, [userData.modules]);

  const getModuleActivity = React.useCallback((moduleId: string) => {
    const cacheKey = `module-${moduleId}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const module = userData.modules[moduleId];
    if (module) {
      cache.set(cacheKey, module);
    }
    return module || null;
  }, [userData.modules]);

  const getOverallProgress = React.useCallback(() => {
    return cache.get('overallProgress') || userData.overallProgress;
  }, [userData.overallProgress]);

  const getTotalTimeSpent = React.useCallback(() => {
    return cache.get('totalTimeSpent') || userData.totalTimeSpent;
  }, [userData.totalTimeSpent]);

  const value = React.useMemo(
    () => ({
      userData,
      updateChapterActivity,
      updateModuleActivity,
      updatePreferences,
      getChapterActivity,
      getModuleActivity,
      getOverallProgress,
      getTotalTimeSpent,
    }),
    [
      userData,
      updateChapterActivity,
      updateModuleActivity,
      updatePreferences,
      getChapterActivity,
      getModuleActivity,
      getOverallProgress,
      getTotalTimeSpent,
    ]
  );

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = React.useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
} 