'use client';

import * as React from 'react';
import {
  Play,
  Book,
  ChartLine,
  ShoppingCart,
  Home,
  Laptop,
  GraduationCap,
  Search,
} from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useRouter, usePathname } from 'next/navigation';
import { useVideoModal } from './VideoModalContext';


interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { openModal } = useVideoModal();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, [setOpen]);

  const navigateTo = React.useCallback((path: string) => {
    runCommand(() => {
      // If we're already on the page but with a hash, just scroll to the section
      if (pathname === '/' && path.startsWith('/#')) {
        const element = document.querySelector(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      
      // If it's a new page, use router.push
      router.push(path);
    });
  }, [pathname, router, runCommand]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
        <div className="relative w-full max-w-[90vw] md:max-w-[400px] rounded-lg border bg-popover text-popover-foreground shadow-lg">
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              placeholder="Type a command or search..." 
              className="flex h-11 w-full rounded-md bg-transparent py-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList className="max-h-[60vh] overflow-y-auto">
            <CommandEmpty>No results found.</CommandEmpty>
            
            <CommandGroup heading="Navigation" className="px-2">
              <CommandItem
                onSelect={() => navigateTo('/')}
                className="flex items-center px-2 py-2"
              >
                <Home className="mr-2 h-4 w-4" />
                <span>Go to Home</span>
              </CommandItem>
              <CommandItem
                onSelect={() => navigateTo('/course')}
                className="flex items-center px-2 py-2"
              >
                <Laptop className="mr-2 h-4 w-4" />
                <span>Take me to the course</span>
                {!isMobile && <CommandShortcut>⌘C</CommandShortcut>}
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Course Actions" className="px-2">
              <CommandItem 
                onSelect={() => runCommand(() => openModal())}
                className="flex items-center px-2 py-2"
              >
                <Play className="mr-2 h-4 w-4" />
                <span>Watch Overview Video</span>
                {!isMobile && <CommandShortcut>⌘V</CommandShortcut>}
              </CommandItem>
              <CommandItem
                onSelect={() => navigateTo('/#curriculum')}
                className="flex items-center px-2 py-2"
              >
                <Book className="mr-2 h-4 w-4" />
                <span>View Curriculum</span>
              </CommandItem>
              <CommandItem
                onSelect={() => navigateTo('/#results')}
                className="flex items-center px-2 py-2"
              >
                <ChartLine className="mr-2 h-4 w-4" />
                <span>See Results</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Quick Links" className="px-2">
              <CommandItem
                onSelect={() => navigateTo('/#enroll')}
                className="flex items-center px-2 py-2"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Enroll Now</span>
                {!isMobile && <CommandShortcut>⌘E</CommandShortcut>}
              </CommandItem>
              <CommandItem
                onSelect={() => navigateTo('/#instructors')}
                className="flex items-center px-2 py-2"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                <span>Meet Instructors</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </div>
      </div>
    </CommandDialog>
  );
} 