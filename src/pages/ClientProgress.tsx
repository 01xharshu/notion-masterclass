// components/progress/ClientProgress.tsx
'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress'; // Adjust import path

interface ClientProgressProps {
  module: { id: string };
  isLoading?: boolean;
}

export function ClientProgress({ module, isLoading }: ClientProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setProgress(Math.round(getModuleProgress(module.id)));
  }, [module.id]);

  if (!isMounted) return null;

  return (
    <div className="mt-4">
      <div className="flex justify-evenly text-sm">
        <span>Progress : {progress}%</span>
        <Progress 
          value={isLoading ? 0 : progress} 
          className="h-2" 
        />
      </div>
    </div>
  );
}

// Mock function - replace with your actual progress calculation
function getModuleProgress(moduleId: string): number {
  // Your actual progress calculation logic here
  return 0; 
}
