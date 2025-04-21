"use client";

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaPlay, FaFileDownload, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import "@/app/globals.css";


// Define interfaces for our data structure
interface TopicContent {
  id: string;
  title: string;
  videoUrl: string;
  content: string;
  hasDownload: boolean;
  downloadUrl?: string;
  downloadName?: string;
}

interface CourseModule {
  id: number;
  title: string;
  description: string;
  topics: TopicContent[];
}

export default function Course() {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  
  const modules: CourseModule[] = [
    {
      id: 1,
      title: "Introduction to Notion",
      description: "Get familiar with Notion's interface and core concepts.",
      topics: [
        {
          id: "1.1",
          title: "Navigating the interface",
          videoUrl: "/videos/module1/navigating-interface.mp4",
          content: `
            <h3>The Notion Interface</h3>
            <p>Notion's interface is designed to be clean and intuitive, with several key areas:</p>
            <ul>
              <li><strong>Sidebar:</strong> Access all your pages and workspaces</li>
              <li><strong>Workspace:</strong> Your main editing area</li>
              <li><strong>Command Bar:</strong> Quick access to commands with '/'</li>
              <li><strong>Top Navigation:</strong> Share, favorite, and access page settings</li>
            </ul>
            <p>The interface is designed to be minimal, allowing you to focus on your content while providing powerful features when needed.</p>
          `,
          hasDownload: false
        },
        {
          id: "1.2",
          title: "Understanding blocks and pages",
          videoUrl: "/videos/module1/blocks-and-pages.mp4",
          content: `
            <h3>Blocks: The Building Blocks of Notion</h3>
            <p>Everything in Notion is a block - text, headings, images, videos, embeds, and even databases are all blocks that you can move, transform, and customize.</p>
            <p>Blocks can be:</p>
            <ul>
              <li>Nested inside other blocks</li>
              <li>Moved around via drag and drop</li>
              <li>Converted between different types</li>
              <li>Duplicated, deleted, or styled</li>
            </ul>
            <h3>Pages: Organizing Your Content</h3>
            <p>Pages are containers for blocks that can be organized hierarchically. Pages can contain other pages, creating a nested structure for your information.</p>
          `,
          hasDownload: true,
          downloadUrl: "/downloads/notion-blocks-cheatsheet.pdf",
          downloadName: "Notion Blocks Cheatsheet"
        }
      ]
    },
    {
      id: 2,
      title: "Building Blocks of Systems",
      description: "Learn how to create and link databases to build powerful systems.",
      topics: [
        {
          id: "2.1",
          title: "Creating databases",
          videoUrl: "/videos/module2/creating-databases.mp4",
          content: `
            <h3>Notion Databases</h3>
            <p>Databases are one of Notion's most powerful features, allowing you to create custom tables with properties, filters, and views.</p>
            <p>In this lesson, you'll learn:</p>
            <ul>
              <li>How to create a database from scratch</li>
              <li>Different property types and their uses</li>
              <li>How to customize views (Table, Board, Calendar, List, Gallery)</li>
              <li>Using filters and sorts to organize your data</li>
            </ul>
          `,
          hasDownload: true,
          downloadUrl: "/downloads/database-templates.zip",
          downloadName: "Database Templates Pack"
        },
        {
          id: "2.2",
          title: "Linking and relating data",
          videoUrl: "/videos/module2/linking-data.mp4",
          content: `
            <h3>Creating Relationships Between Databases</h3>
            <p>Notion's real power emerges when you connect databases together using relation and rollup properties.</p>
            <p>In this lesson, you'll learn:</p>
            <ul>
              <li>How to create relation properties between databases</li>
              <li>Using rollup properties to aggregate data</li>
              <li>Creating bidirectional relationships</li>
              <li>Best practices for database architecture</li>
            </ul>
            <p>By the end of this lesson, you'll understand how to design complex systems with interconnected data.</p>
          `,
          hasDownload: false
        }
      ]
    },
    {
      id: 3,
      title: "Designing Your Workflow",
      description: "Set up task managers and project trackers for optimal productivity.",
      topics: [
        {
          id: "3.1",
          title: "Setting up task managers",
          videoUrl: "/videos/module3/task-managers.mp4",
          content: `
            <h3>Task Management in Notion</h3>
            <p>A well-designed task management system is essential for productivity. This lesson covers how to build flexible and powerful task managers in Notion.</p>
            <p>You'll learn how to:</p>
            <ul>
              <li>Design a task database with useful properties</li>
              <li>Set up multiple views for different contexts (Today, This Week, By Project)</li>
              <li>Use filters and sorts to prioritize work</li>
              <li>Implement GTD, Kanban, or other productivity methodologies</li>
            </ul>
          `,
          hasDownload: true,
          downloadUrl: "/downloads/task-manager-template.notion",
          downloadName: "Task Manager Template"
        },
        {
          id: "3.2",
          title: "Creating project trackers",
          videoUrl: "/videos/module3/project-trackers.mp4",
          content: `
            <h3>Project Management Systems</h3>
            <p>Projects require more structure than simple tasks. In this lesson, we'll build comprehensive project tracking systems.</p>
            <p>Topics covered:</p>
            <ul>
              <li>Designing a project database that tracks goals, timeline, and status</li>
              <li>Connecting project databases to tasks and resources</li>
              <li>Creating dashboards to visualize project progress</li>
              <li>Setting up project templates for consistency</li>
            </ul>
          `,
          hasDownload: true,
          downloadUrl: "/downloads/project-tracker-template.notion",
          downloadName: "Project Tracker Template"
        }
      ]
    },
    {
      id: 4,
      title: "Advanced Techniques",
      description: "Master formulas, rollups, and automation to create sophisticated systems.",
      topics: [
        {
          id: "4.1",
          title: "Using formulas and rollups",
          videoUrl: "/videos/module4/formulas-rollups.mp4",
          content: `
            <h3>The Power of Formulas</h3>
            <p>Formulas allow you to create dynamic content that updates automatically based on your data. Combined with rollups, they enable powerful data analysis.</p>
            <p>In this advanced lesson, you'll learn:</p>
            <ul>
              <li>Formula syntax and common functions</li>
              <li>Creating conditional formatting with formulas</li>
              <li>Advanced rollup techniques for data aggregation</li>
              <li>Building automated calculations and indicators</li>
            </ul>
          `,
          hasDownload: true,
          downloadUrl: "/downloads/formula-cheatsheet.pdf",
          downloadName: "Notion Formula Cheatsheet"
        },
        {
          id: "4.2",
          title: "Automating workflows",
          videoUrl: "/videos/module4/automation.mp4",
          content: `
            <h3>Automation in Notion</h3>
            <p>While Notion's native automation is limited, there are several ways to automate workflows within and connected to Notion.</p>
            <p>This lesson covers:</p>
            <ul>
              <li>Using templates for quick content creation</li>
              <li>Setting up self-maintaining systems with formulas</li>
              <li>Integrating with Zapier, Automate.io, and other services</li>
              <li>Using the Notion API for custom integrations</li>
            </ul>
          `,
          hasDownload: false
        }
      ]
    },
    {
      id: 5,
      title: "Maintaining and Evolving Your System",
      description: "Learn best practices for system maintenance and adaptation.",
      topics: [
        {
          id: "5.1",
          title: "Best practices for upkeep",
          videoUrl: "/videos/module5/system-upkeep.mp4",
          content: `
            <h3>Maintaining Your Notion System</h3>
            <p>Even the best systems can become cluttered and inefficient without proper maintenance.</p>
            <p>In this lesson, you'll learn:</p>
            <ul>
              <li>Creating maintenance routines and schedules</li>
              <li>Archiving vs. deleting content</li>
              <li>Performance optimization for large databases</li>
              <li>Backup strategies for your Notion workspace</li>
            </ul>
          `,
          hasDownload: false
        },
        {
          id: "5.2",
          title: "Adapting systems as needs change",
          videoUrl: "/videos/module5/adapting-systems.mp4",
          content: `
            <h3>Evolving Your Notion Workspace</h3>
            <p>Your needs will change over time, and your Notion systems should evolve with you.</p>
            <p>This final lesson covers:</p>
            <ul>
              <li>Signs that your system needs adjustment</li>
              <li>Techniques for safe system evolution without data loss</li>
              <li>Testing changes before full implementation</li>
              <li>Gathering feedback from collaborators and stakeholders</li>
            </ul>
            <p>By the end of this course, you'll have the skills to not only build powerful Notion systems but also maintain and evolve them as your needs change.</p>
          `,
          hasDownload: true,
          downloadUrl: "/downloads/system-audit-checklist.pdf",
          downloadName: "System Audit Checklist"
        }
      ]
    }
  ];

  // Function to toggle module visibility
  const toggleModule = (moduleId: number) => {
    setActiveModule(activeModule === moduleId ? null : moduleId);
    setActiveTopic(null); // Reset active topic when changing modules
  };

  // Function to toggle topic visibility
  const toggleTopic = (topicId: string) => {
    setActiveTopic(activeTopic === topicId ? null : topicId);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideDown = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Notion Masterclass</title>
        <meta name="description" content="Learn to master Notion with our comprehensive course" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mx-2">
            <h1 className="text-3xl font-bold text-gray-900">Notion Masterclass</h1>
            <Link href="/">
              <span className="text-blue-600 hover:text-blue-800 font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar navigation */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Course Modules</h2>
              <nav className="space-y-1">
                {modules.map((module) => (
                  <div key={module.id} className="mb-2">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between text-left px-3 py-2 rounded-md text-gray-900 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      <span className="font-medium">{module.title}</span>
                      {activeModule === module.id ? (
                        <FaChevronDown className="h-4 w-4" />
                      ) : (
                        <FaChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    
                    {activeModule === module.id && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={slideDown}
                        className="ml-4 mt-1 space-y-1"
                      >
                        {module.topics.map((topic) => (
                          <button
                            key={topic.id}
                            onClick={() => toggleTopic(topic.id)}
                            className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                              activeTopic === topic.id
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {topic.title}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Content area */}
          <div className="md:w-3/4">
            {activeTopic ? (
              // Show selected topic content
              modules.map((module) => 
                module.topics.map((topic) => {
                  if (topic.id === activeTopic) {
                    return (
                      <motion.div
                        key={topic.id}
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{topic.title}</h2>
                            <p className="text-gray-600">Module {module.id}: {module.title}</p>
                          </div>
                          
                          {/* Video player */}
                          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6 relative aspect-video">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                                <FaPlay className="w-6 h-6 text-white ml-1" />
                              </div>
                            </div>
                            <Image
                              src="/api/placeholder/800/450" 
                              alt="Video thumbnail" 
                              className="w-full h-full object-cover opacity-50"
                            />
                          </div>
                          
                          {/* Text content */}
                          <div 
                            className="prose max-w-none mb-6"
                            dangerouslySetInnerHTML={{ __html: topic.content }}
                          />
                          
                          {/* Download section if available */}
                          {topic.hasDownload && (
                            <div className="mt-8 pt-6 border-t border-gray-200">
                              <div className="flex items-center">
                                <FaFileDownload className="w-5 h-5 text-blue-600 mr-2" />
                                <h3 className="text-lg font-medium text-gray-900">Resources</h3>
                              </div>
                              <div className="mt-3">
                                <a 
                                  href={topic.downloadUrl}
                                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                  Download {topic.downloadName}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  }
                  return null;
                })
              )
            ) : (
              // Show course overview when no topic is selected
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h2>
                <p className="text-gray-700 mb-6">
                  Welcome to Master Notion! This comprehensive course will teach you how to build powerful productivity systems in Notion. 
                  Select a module from the sidebar to begin your learning journey.
                </p>
                
                <div className="space-y-6">
                  {modules.map((module) => (
                    <div key={module.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h3 className="text-lg font-medium text-gray-900">Module {module.id}: {module.title}</h3>
                      <p className="text-gray-600 mt-1">{module.description}</p>
                      <ul className="mt-2 space-y-1 text-sm text-gray-500">
                        {module.topics.map((topic) => (
                          <li key={topic.id} className="flex items-center">
                            <span className="mr-2">•</span>
                            {topic.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} TheHarshWise. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}