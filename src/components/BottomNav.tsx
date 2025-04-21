'use client';

import { FaPlay, FaBook, FaChartLine, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useVideoModal } from './VideoModalContext';

interface NavItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
}

const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { openModal } = useVideoModal();

  const navItems: NavItem[] = [
    { icon: FaPlay, label: 'Video', href: '#video' },
    { icon: FaBook, label: 'Curriculum', href: '#curriculum' },
    { icon: FaChartLine, label: 'Results', href: '#results' },
    { icon: FaShoppingCart, label: 'Enroll', href: '#enroll' },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item, index) => {
            const Icon = item.icon;

            if (item.label === 'Video') {
              return (
                <button
                  key={index}
                  onClick={openModal}
                  className="flex flex-col items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none"
                  aria-label="Open Video Modal"
                  type="button"
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            }

            return (
              <a
                key={index}
                href={item.href}
                className="flex flex-col items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg border border-gray-100 z-50 hidden md:flex items-center justify-center space-x-2 px-6 py-3">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isEnroll = item.label === 'Enroll';

          if (item.label === 'Video') {
            return (
              <button
                key={index}
                onClick={openModal}
                className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full transition-colors text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Open Video Modal"
                type="button"
              >
                <Icon className="text-xl" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          }

          if (isEnroll) {
            return (
              <Link
                key={index}
                href={item.href}
                className="relative enroll-glow-border rounded-full"
              >
                <span className="relative z-10 flex items-center space-x-2 px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 select-none cursor-pointer">
                  <Icon className="text-xl" />
                  <span className="text-sm font-medium">{item.label}</span>
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-full transition-colors ${
                pathname === `/${item.href}` ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="text-xl" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default BottomNav;
