"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useVideoModal } from './VideoModalContext';
import { Play, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const { openModal } = useVideoModal();

  return (
    <div className="relative overflow-hidden bg-background pt-[4.5rem]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-muted/50 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Master Notion for{' '}
              <span className="text-primary">YouTube Success</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Learn how to build powerful systems in Notion to grow and monetize your YouTube channel. Join hundreds of creators who have transformed their content creation process.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="gap-2"
                onClick={openModal}
              >
                <Play className="h-4 w-4" />
                Watch Overview
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="gap-2"
              >
                <Link href="/course">
                  Take me to the course
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6"
          >
            {[
              { title: '20+ Lessons', description: 'Comprehensive curriculum' },
              { title: 'Lifetime Access', description: 'Learn at your own pace' },
              { title: 'Community', description: 'Join fellow creators' },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border bg-card p-4 text-card-foreground shadow transition-colors hover:bg-muted/50"
              >
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Course Preview Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 relative"
          >
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-muted shadow-2xl ring-1 ring-gray-900/10 m-2">
              <Image
                src="/thw-content.png"
                alt="Course Preview"
                width={1920}
                height={1080}
                className="object-cover"
                priority
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-xl" /> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
