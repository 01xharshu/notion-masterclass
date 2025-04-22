"use client";

import React from 'react';
import Head from 'next/head';
import CourseLayout from '@/components/layouts/CourseLayout';
import CourseContent from '@/pages/CourseContent';
import VideoModal from '@/components/VideoModal';

export default function CoursePage() {
  return (
    <CourseLayout>
      <Head>
        <title>Course - Notion Masterclass</title>
        <meta name="description" content="Learn to master Notion with our comprehensive course" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex-1">
        <CourseContent />
      </div>
      <VideoModal />
    </CourseLayout>
  );
}