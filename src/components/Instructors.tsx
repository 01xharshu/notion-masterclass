'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaYoutube, FaUsers, FaChartLine } from 'react-icons/fa';

interface Instructor {
  name: string;
  role?: string;
  social?: string;
  description?: string;
  stats?: {
    value: string;
    label: string;
    icon: React.ComponentType<React.ComponentProps<'svg'>>;
  }[];
}

const mainInstructor: Instructor = {
  name: 'Harsh Mishra',
  stats: [
    { value: '500+', label: 'subscribers on YouTube', icon: FaYoutube },
    { value: '5K+', label: 'monthly views on YouTube', icon: FaChartLine },
    { value: '4500+', label: 'followers across social platforms', icon: FaUsers }
  ],
  description: 'Harsh is an expert in digital productivity and YouTube growth, with a focus on helping creators and professionals become more efficient.'
};




const Instructors = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Course Instructors
        </h2>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Instructor Card - Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Instructed By
                  <br />
                  <span className="text-indigo-600">{mainInstructor.name}</span>
                </h3>
                
                <div className="space-y-4">
                  {mainInstructor.stats?.map((stat, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <stat.icon className="text-indigo-600 text-2xl" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-gray-600 italic">
                  {mainInstructor.description}
                </p>
              </div>

              <div className="relative aspect-square rounded-xl overflow-">
                <Image
                  src="/harsh.png"
                  alt={mainInstructor.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Instructors;
