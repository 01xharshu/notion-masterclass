'use client';

import { FaPlay, FaBook, FaChartLine } from 'react-icons/fa';
import { BiSolidFaceMask } from "react-icons/bi";
import Link from 'next/link';

import React from 'react';
import { useVideoModal } from './VideoModalContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
}

const BottomNav: React.FC = () => {
  const { openModal } = useVideoModal();

  const navItems: NavItem[] = [
    { icon: FaPlay, label: 'Video', href: '#video' },
    { icon: FaBook, label: 'Curriculum', href: '#curriculum' },
    { icon: FaChartLine, label: 'Results', href: '#results' },
    { icon: BiSolidFaceMask, label: 'Join Now', href: '/course' },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isVideo = item.label === 'Video';
            const isEnroll = item.label === 'Enroll';

            if (isVideo) {
              return (
                <Button
                  key={index}
                  onClick={openModal}
                  variant="ghost"
                  className="h-full rounded-none flex flex-col items-center justify-center gap-1 hover:bg-muted"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              );
            }

            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 hover:bg-muted transition-colors",
                  isEnroll && "text-primary"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div className="flex items-center gap-3 rounded-full border bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 p-6 shadow-lg">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isVideo = item.label === 'Video';
            const isEnroll = item.label === 'Take me to Course'; 

            if (isVideo) {
              return (
                <Button
                  key={index}
                  onClick={openModal}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-3 px-4"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-lg font-medium">{item.label}</span>
                </Button>
              );
            }

            if (isEnroll) {
              return (
                <Button
                  key={index}
                  asChild
                  size="sm"
                  className="p-8 m-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  variant="ghost"
                >
                  <Link href={item.href}>
                    <Icon className="h-5 w-5" />
                    <span className="text-2xl font-bold">{item.label}</span>
                  </Link>
                </Button>
              );
            }

            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                asChild
                className="px-4"
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="text-lg font-medium">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BottomNav;
