'use client';

import * as React from 'react';

interface VideoModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const VideoModalContext = React.createContext<VideoModalContextType | undefined>(undefined);

export function VideoModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = React.useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal,
    }),
    [isOpen, openModal, closeModal]
  );

  return (
    <VideoModalContext.Provider value={value}>
      {children}
    </VideoModalContext.Provider>
  );
}

export function useVideoModal() {
  const context = React.useContext(VideoModalContext);
  
  if (context === undefined) {
    throw new Error('useVideoModal must be used within a VideoModalProvider');
  }
  
  return context;
}
