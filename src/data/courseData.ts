export interface Chapter {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  duration?: string;
  content?: string;
  videoUrl?: string;
  downloadable?: boolean;
  downloadUrl?: string;
  resources?: {
    type: 'pdf' | 'doc' | 'zip' | 'code';
    title: string;
    url: string;
    size: string;
  }[];
  notes?: string;
  discussion?: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
}

export const courseData: Module[] = [
  {
    id: 'module-1',
    title: 'Getting Started with Notion',
    description: 'Learn the fundamentals of Notion and set up your workspace',
    chapters: [
      {
        id: 'chapter-1',
        title: 'Introduction to Notion',
        type: 'video',
        duration: '15 min',
        content: 'In this chapter, you will learn the basics of Notion and how to navigate its interface. We will cover the main features and how to get started with your first workspace.',
        videoUrl: 'https://www.youtube.com/embed/wTSFbjT8UL4',
        downloadable: true,
        downloadUrl: '/downloads/introduction-to-notion.pdf',
        resources: [
          {
            type: 'pdf',
            title: 'Notion Basics Guide',
            url: '/downloads/notion-basics.pdf',
            size: '2.5 MB'
          },
          {
            type: 'code',
            title: 'Sample Templates',
            url: '/downloads/templates.zip',
            size: '1.2 MB'
          }
        ],
        notes: 'Key points to remember:\n1. Notion is a flexible workspace\n2. Everything is a block\n3. Pages can be nested infinitely',
        discussion: [
          {
            id: '1',
            author: 'John Doe',
            content: 'Great introduction! The video was very clear and helpful.',
            timestamp: '2 hours ago'
          }
        ]
      },
      {
        id: 'chapter-2',
        title: 'Basic Navigation',
        type: 'video',
        duration: '20 min',
        content: 'Learn how to navigate through Notion efficiently. We will cover the sidebar, page hierarchy, and keyboard shortcuts to improve your workflow.',
        videoUrl: 'https://www.youtube.com/embed/wTSFbjT8UL4',
        downloadable: true,
        downloadUrl: '/downloads/basic-navigation.pdf'
      },
      {
        id: 'chapter-3',
        title: 'Creating Your First Page',
        type: 'text',
        content: 'Step-by-step guide to creating your first page in Notion. We will explore different page types, templates, and how to organize your content effectively.',
        downloadable: true,
        downloadUrl: '/downloads/creating-first-page.pdf'
      },
    ],
  },
  {
    id: 'module-2',
    title: 'Advanced Features',
    description: 'Master Notion\'s powerful features for maximum productivity',
    chapters: [
      {
        id: 'chapter-1',
        title: 'Databases and Relations',
        type: 'video',
        duration: '30 min',
        content: 'Deep dive into Notion databases. Learn how to create relations between databases, use formulas, and build complex systems to organize your information.',
        videoUrl: 'https://www.youtube.com/embed/wTSFbjT8UL4',
        downloadable: true,
        downloadUrl: '/downloads/databases-and-relations.pdf'
      },
      {
        id: 'chapter-2',
        title: 'Formulas and Functions',
        type: 'video',
        duration: '25 min',
        content: 'Master Notion formulas to create powerful calculations and automations. We will cover basic to advanced formula functions and their practical applications.',
        videoUrl: 'https://www.youtube.com/embed/wTSFbjT8UL4',
        downloadable: true,
        downloadUrl: '/downloads/formulas-and-functions.pdf'
      },
    ],
  },
]; 