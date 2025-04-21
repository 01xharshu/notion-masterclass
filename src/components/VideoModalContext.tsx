'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VideoModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const VideoModalContext = createContext<VideoModalContextType | undefined>(undefined);

export const VideoModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <VideoModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </VideoModalContext.Provider>
  );
};

export const useVideoModal = (): VideoModalContextType => {
  const context = useContext(VideoModalContext);
  if (!context) {
    throw new Error('useVideoModal must be used within a VideoModalProvider');
  }
  return context;
};
