'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useVideoModal } from './VideoModalContext';

export default function VideoModal() {
  const { isOpen, closeModal } = useVideoModal();
  const [isClient, setIsClient] = React.useState(false);

  // Handle client-side mounting
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[800px] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Course Overview
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={closeModal}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <DialogDescription className="text-sm text-muted-foreground pt-2">
            Watch this overview to learn what you'll master in this course
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-2">
          <div className="aspect-video overflow-hidden rounded-lg border bg-muted">
            <iframe
              src="https://www.youtube.com/embed/wTSFbjT8UL4?autoplay=1"
              title="Course Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              variant="outline"
              className="sm:flex-1"
              onClick={closeModal}
            >
              Close Video
            </Button>
            <Button 
              className="sm:flex-1"
              onClick={() => {
                closeModal();
                // Add navigation to course enrollment
                window.location.href = '/#enroll';
              }}
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
