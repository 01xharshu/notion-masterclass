'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface SavedPage {
  id: string;
  lastAccessed: string;
  moduleId: string;
  chapterId: string;
}

interface SavedPagesContextType {
  savedPages: SavedPage[];
  toggleSavedPage: (pageId: string) => void;
  isPageSaved: (pageId: string) => boolean;
  updateLastAccessed: (pageId: string) => void;
}

const SavedPagesContext = createContext<SavedPagesContextType | undefined>(undefined);

export function SavedPagesProvider({ children }: { children: React.ReactNode }) {
  const [savedPages, setSavedPages] = useState<SavedPage[]>([]);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('savedPages');
    if (saved) {
      setSavedPages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('savedPages', JSON.stringify(savedPages));
    }
  }, [savedPages, mounted]);

  const toggleSavedPage = (pageId: string) => {
    const [moduleId, chapterId] = pageId.split('-');
    setSavedPages(prev => {
      const existingPage = prev.find(p => p.id === pageId);
      if (existingPage) {
        return prev.filter(p => p.id !== pageId);
      } else {
        return [...prev, {
          id: pageId,
          lastAccessed: new Date().toISOString(),
          moduleId,
          chapterId
        }];
      }
    });
  };

  const isPageSaved = (pageId: string) => savedPages.some(p => p.id === pageId);

  const updateLastAccessed = (pageId: string) => {
    setSavedPages(prev => 
      prev.map(p => 
        p.id === pageId 
          ? { ...p, lastAccessed: new Date().toISOString() }
          : p
      )
    );
  };

  if (!mounted) return null;

  return (
    <SavedPagesContext.Provider value={{ 
      savedPages, 
      toggleSavedPage, 
      isPageSaved,
      updateLastAccessed
    }}>
      {children}
    </SavedPagesContext.Provider>
  );
}

export function useSavedPages() {
  const context = useContext(SavedPagesContext);
  if (context === undefined) {
    throw new Error('useSavedPages must be used within a SavedPagesProvider');
  }
  return context;
} 