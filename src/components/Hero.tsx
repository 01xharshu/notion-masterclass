"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaUserGraduate, FaUsers, FaStar } from 'react-icons/fa';
import { useVideoModal } from './VideoModalContext';

export default function Hero() {
  const { openModal } = useVideoModal();

  return (
    <section className="relative bg-white" aria-label="Notion Masterclass Hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              From Chaos to Clarity: Master Notion & Organize Your Digital Life
            </h1>
            <p className="text-lg text-gray-600">
              <span className="text-2xl text-indigo-600">
                A FREE Masterclass to Help You Save Time, Focus Better & Take Control — Built for Students & Professionals
              </span>
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <FaUserGraduate className="text-indigo-600 text-xl" />
                  <span className="text-2xl font-bold text-gray-900">1500+</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Enrolled</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <FaUsers className="text-indigo-600 text-xl" />
                  <span className="text-2xl font-bold text-gray-900">2000+</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Students</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <FaStar className="text-indigo-600 text-xl" />
                  <span className="text-2xl font-bold text-gray-900">4.96</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Course Rating</p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                'Master Notion from Zero to Pro',
                'Build Your Second Brain & Productivity System',
                '100% Free Course – No Strings',
                'Live Q&A + Lifetime Access',
              ].map((feature, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <span className="text-indigo-600" aria-hidden="true">
                    ✓
                  </span>
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            <Link href="/course"
              className="w-full md:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Enroll Now"
            >
              Take me to the course!
            </Link>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-video rounded-xl overflow-hidden shadow-xl"
          >
            <button
              onClick={openModal}
              aria-label="Open Video Modal"
              className="relative w-full h-full focus:outline-none"
              type="button"
            >
              <Image
                src="/thw-content.png"
                alt="Course Preview"
                className="block object-cover w-full h-full"
                width={600}
                height={400}
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <span className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
