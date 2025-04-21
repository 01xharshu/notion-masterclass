'use client';

import { motion } from 'framer-motion';
import { 
  FaUserTie, 
  FaUsers, 
  FaCogs, 
  FaVideo, 
  FaFilm, 
  FaMicrophone, 
  FaPalette, 
  FaChartBar, 
  FaChartPie, 
  FaMoneyBillWave 
} from 'react-icons/fa';

const modules = [
  {
    number: 1,
    duration: "1.5 hours",
    title: "Digital Life Audit",
    description: "Reflect on your current digital chaos and identify time-wasting habits before building a better system.",
    icon: FaUserTie
  },
  {
    number: 2,
    duration: "2 hours",
    title: "Notion Basics",
    description: "Learn how Notion works — blocks, databases, templates — and set up your first simple workspace.",
    icon: FaUsers
  },
  {
    number: 3,
    duration: "2.5 hours",
    title: "Productivity System Setup",
    description: "Build your dashboard: to-do, calendar, habit tracker, journal, bookmarks — all in one place.",
    icon: FaCogs
  },
  {
    number: 4,
    duration: "1.5 hours",
    title: "Second Brain",
    description: "Capture, organize, and retrieve ideas, notes, and resources using the PARA method in Notion.",
    icon: FaVideo
  },
  {
    number: 5,
    duration: "1.5 hours",
    title: "Student Workspace",
    description: "Create a dedicated learning system with subject-wise notes, assignment tracker, and exam planner.",
    icon: FaFilm
  },
  {
    number: 6,
    duration: "2 hours",
    title: "Content Planner",
    description: "Plan and manage your content ideas, production workflow, and publishing calendar in Notion.",
    icon: FaMicrophone
  },
  {
    number: 7,
    duration: "1.5 hours",
    title: "Templates & Automation",
    description: "Speed up your workflow using smart templates, linked databases, and repeatable systems.",
    icon: FaPalette
  },
  {
    number: 8,
    duration: "2 hours",
    title: "Collaboration & Sharing",
    description: "Learn to share your pages, collaborate in real-time, and manage permissions safely.",
    icon: FaChartBar
  },
  {
    number: 9,
    duration: "1 hour",
    title: "Mobile Productivity",
    description: "Learn how to use Notion on the go with a minimal, mobile-friendly setup.",
    icon: FaChartPie
  },
  {
    number: 10,
    duration: "1 hour",
    title: "Monetize Your Workspace",
    description: "Turn your Notion systems into templates or services others can buy or subscribe to.",
    icon: FaMoneyBillWave
  }
];

const Curriculum = () => {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Course Curriculum
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-xl text-gray-600">
            Self-paced modules to help you go from digital mess to clarity.
          </p>
        </div>
        <div className="mt-8 sm:mt-12">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 sm:p-6"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Icon className="text-2xl sm:text-3xl text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base sm:text-xl font-semibold text-gray-900">
                        Module {module.number} | {module.duration}
                      </h3>
                      <h4 className="text-sm sm:text-lg font-medium text-indigo-600 mt-1">
                        {module.title}
                      </h4>
                    </div>
                  </div>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
                    {module.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
