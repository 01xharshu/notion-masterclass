'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { 
  BookOpen, 
  Video, 
  FileText, 
  CheckCircle2,
  ChevronRight,
  Download,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Clock,
  Bookmark,
  Share2,
  MessageSquare,
  Sun,
  Moon,
  Maximize,
  Minimize
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useCourseProgress } from '@/contexts/CourseProgressContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { CourseProgressBar } from './CourseProgressBar';
import { fadeIn, slideIn, scaleIn, staggerChildren } from "@/lib/animations";
import { useSavedPages } from '@/components/SavedPagesContext';

interface Chapter {
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

interface Module {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
}

interface VideoProgress {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}

const courseData: Module[] = [
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

const getChapterIcon = (type: Chapter['type']) => {
  switch (type) {
    case 'video':
      return <Video className="h-4 w-4" />;
    case 'text':
      return <FileText className="h-4 w-4" />;
    case 'quiz':
      return <CheckCircle2 className="h-4 w-4" />;
  }
};

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-4 w-4" />;
    case 'doc':
      return <FileText className="h-4 w-4" />;
    case 'zip':
      return <Download className="h-4 w-4" />;
    case 'code':
      return <FileText className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const CourseContent = () => {
  const router = useRouter();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<{ moduleId: string; chapterId: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { progress, updateChapterProgress, getModuleProgress } = useCourseProgress();
  const { toast } = useToast();
  const [videoProgress, setVideoProgress] = useState<VideoProgress>({
    currentTime: 0,
    duration: 0,
    isPlaying: false,
  });
  const [comment, setComment] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { isPageSaved, toggleSavedPage, updateLastAccessed } = useSavedPages();
  const currentPageId = selectedChapter ? `${selectedChapter.moduleId}-${selectedChapter.chapterId}` : '';

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Handle mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle video fullscreen
  const toggleVideoFullscreen = () => {
    if (!videoContainerRef.current) return;
    
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen();
      setIsVideoFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsVideoFullscreen(false);
    }
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModule((prev) => (prev === moduleId ? null : moduleId));
  };

  const handleChapterClick = (moduleId: string, chapterId: string) => {
    const pageId = `${moduleId}-${chapterId}`;
    if (isPageSaved(pageId)) {
      updateLastAccessed(pageId);
    }
    setSelectedChapter({ moduleId, chapterId });
  };

  const handleBackClick = () => {
    setSelectedChapter(null);
  };

  const isChapterCompleted = (moduleId: string, chapterId: string) => {
    return progress.modules[moduleId]?.chapters[chapterId]?.completed || false;
  };

  const selectedChapterData = selectedChapter 
    ? courseData
        .find(m => m.id === selectedChapter.moduleId)
        ?.chapters.find(c => c.id === selectedChapter.chapterId)
    : null;

  const selectedModuleData = selectedChapter 
    ? courseData.find(m => m.id === selectedChapter.moduleId)
    : null;

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreenToggle = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePlaybackSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const handleVideoProgress = (e: React.ChangeEvent<HTMLVideoElement>) => {
    if (videoRef.current) {
      setVideoProgress({
        currentTime: videoRef.current.currentTime,
        duration: videoRef.current.duration,
        isPlaying: !videoRef.current.paused,
      });
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      // Add comment to discussion
      const newComment = {
        id: Date.now().toString(),
        author: "You",
        content: comment,
        timestamp: "Just now",
      };
      // Update discussion state
      setComment("");
      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully.",
      });
    }
  };

  const handleBookmark = () => {
    if (selectedChapter) {
      const chapterId = `${selectedChapter.moduleId}-${selectedChapter.chapterId}`;
      // This will be handled by the parent component
      const event = new CustomEvent('bookmark', { detail: { chapterId } });
      window.dispatchEvent(event);
    }
  };

  // Listen for bookmark events
  React.useEffect(() => {
    const handleBookmarkEvent = (e: CustomEvent) => {
      const { chapterId } = e.detail;
      setIsBookmarked(prev => !prev);
    };

    window.addEventListener('bookmark', handleBookmarkEvent as EventListener);
    return () => window.removeEventListener('bookmark', handleBookmarkEvent as EventListener);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSavePage = () => {
    toggleSavedPage(currentPageId);
    toast({
      title: isPageSaved(currentPageId) ? "Page Unsaved" : "Page Saved",
      description: isPageSaved(currentPageId) 
        ? "The page has been removed from your saved pages."
        : "The page has been added to your saved pages.",
    });
  };

  const handleChapterComplete = () => {
    if (selectedChapter) {
      const isCompleted = isChapterCompleted(selectedChapter.moduleId, selectedChapter.chapterId);
      updateChapterProgress(selectedChapter.moduleId, selectedChapter.chapterId, !isCompleted);
      toast({
        title: isCompleted ? "Chapter Reset" : "Chapter Completed! 🎉",
        description: isCompleted 
          ? "You can continue learning from where you left off. Your progress has been saved." 
          : "Great job! You've completed this chapter. Keep up the good work!"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-[90]">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <motion.div
            animate={isMobileMenuOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 }
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 bg-background md:hidden z-[80]"
          >
            {/* Mobile menu content */}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        {selectedChapter && selectedChapterData ? (
          <motion.div 
            className="max-w-5xl mx-auto space-y-8"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
          >
            {/* Header */}
            <motion.div 
              className="flex items-center justify-between"
              variants={slideIn}
            >
              <Button
                variant="ghost"
                className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={handleBackClick}
              >
                <motion.div
                  whileHover={{ x: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </motion.div>
                Back to Modules
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSavePage}
                  className={cn(
                    "h-8 w-8",
                    isPageSaved(currentPageId) && "text-primary"
                  )}
                >
                  <Bookmark className={cn(
                    "h-4 w-4 transition-colors",
                    isPageSaved(currentPageId) && "fill-primary"
                  )} />
                </Button>
                <Button
                  onClick={handleChapterComplete}
                  className={cn(
                    "gap-2 transition-all duration-300 relative overflow-hidden group",
                    isChapterCompleted(selectedChapter.moduleId, selectedChapter.chapterId) 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <CheckCircle2 className={cn(
                      "h-4 w-4 transition-all duration-300",
                      isChapterCompleted(selectedChapter.moduleId, selectedChapter.chapterId) && "text-primary-foreground"
                    )} />
                  </motion.div>
                  {isChapterCompleted(selectedChapter.moduleId, selectedChapter.chapterId) 
                    ? "Mark as Incomplete" 
                    : "Mark as Complete"}
                </Button>
              </div>
            </motion.div>

            {/* Chapter Title and Info */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{selectedChapterData.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedChapterData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 hover:bg-muted"
                    onClick={handleBookmark}
                  >
                    <Bookmark className={cn(
                      "h-4 w-4 transition-colors duration-300",
                      isBookmarked ? "text-primary fill-primary" : "text-muted-foreground"
                    )} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Video Player */}
            {selectedChapterData.videoUrl && (
              <motion.div
                ref={videoContainerRef}
                className="relative group rounded-lg overflow-hidden border bg-muted"
                variants={scaleIn}
              >
                <div className="aspect-video">
                  <video
                    ref={videoRef}
                    src={selectedChapterData.videoUrl}
                    className="h-full w-full"
                    onTimeUpdate={handleVideoProgress}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVideoFullscreen ? 1 : 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[videoProgress.currentTime]}
                        max={videoProgress.duration}
                        step={1}
                        className="flex-1"
                        onValueChange={(value) => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = value[0];
                          }
                        }}
                      />
                      <span className="text-white text-sm">
                        {formatTime(videoProgress.currentTime)} / {formatTime(videoProgress.duration)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-white hover:bg-white/10"
                                onClick={handlePlayPause}
                              >
                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{isPlaying ? "Pause" : "Play"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-white hover:bg-white/10"
                                onClick={handleMuteToggle}
                              >
                                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{isMuted ? "Unmute" : "Mute"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <select
                          value={playbackSpeed}
                          onChange={(e) => handlePlaybackSpeedChange(Number(e.target.value))}
                          className="bg-transparent text-white text-sm border-none focus:outline-none hover:bg-white/10 rounded-md px-2 py-1"
                        >
                          <option value={0.5}>0.5x</option>
                          <option value={1}>1x</option>
                          <option value={1.5}>1.5x</option>
                          <option value={2}>2x</option>
                        </select>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-white hover:bg-white/10"
                        onClick={toggleVideoFullscreen}
                      >
                        {isVideoFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Content Tabs */}
            <motion.div variants={slideIn}>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <p>{selectedChapterData.content}</p>
                  </div>
                  {selectedChapterData.notes && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Key Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="whitespace-pre-line text-sm">
                          {selectedChapterData.notes}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                <TabsContent value="resources" className="space-y-4">
                  {selectedChapterData.resources?.map((resource, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getResourceIcon(resource.type)}
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-sm text-muted-foreground">{resource.size}</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(resource.url, '_blank')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="discussion" className="space-y-4">
                  <ScrollArea className="h-[400px] pr-4">
                    {selectedChapterData.discussion?.map((comment) => (
                      <Card key={comment.id} className="mb-4">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.author}`} />
                              <AvatarFallback>{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{comment.author}</p>
                                <p className="text-sm text-muted-foreground">{comment.timestamp}</p>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="h-8">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </ScrollArea>
                  <form onSubmit={handleCommentSubmit} className="space-y-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button type="submit" disabled={!comment.trim()}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="max-w-4xl mx-auto space-y-8"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {courseData.map((module) => (
              <motion.div
                key={module.id}
                variants={scaleIn}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                      <ChevronRight 
                        className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          expandedModule === module.id && "rotate-90"
                        )} 
                      />
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>
                          {isLoading ? (
                            <span className="animate-pulse">...</span>
                          ) : (
                            `${Math.round(getModuleProgress(module.id))}%`
                          )}
                        </span>
                      </div>
                      <Progress 
                        value={isLoading ? 0 : getModuleProgress(module.id)} 
                        className="h-2" 
                      />
                    </div>
                  </CardHeader>
                  
                  {expandedModule === module.id && (
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {module.chapters.map((chapter) => (
                          <Button
                            key={chapter.id}
                            variant="ghost"
                            className="w-full justify-between hover:bg-muted/50"
                            onClick={() => handleChapterClick(module.id, chapter.id)}
                          >
                            <div className="flex items-center gap-2">
                              {getChapterIcon(chapter.type)}
                              <span>{chapter.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {chapter.duration && (
                                <span className="text-sm text-muted-foreground">
                                  {chapter.duration}
                                </span>
                              )}
                              {isChapterCompleted(module.id, chapter.id) && (
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <CourseProgressBar />
    </div>
  );
};

export default CourseContent; 