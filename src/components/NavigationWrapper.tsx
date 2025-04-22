'use client';

import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';

interface NavigationWrapperProps {
  children: React.ReactNode;
}

export default function NavigationWrapper({ children }: NavigationWrapperProps) {
  const pathname = usePathname();
  const showBottomNav = pathname !== '/course';

  return (
    <>
      {children}
      {showBottomNav && <BottomNav />}
      {showBottomNav && <div className="pb-16 md:pb-24" />}
    </>
  );
} 