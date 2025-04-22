'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  LineChart, 
  Lightbulb, 
  ArrowRight, 
  Youtube as YoutubeIcon, 
  BarChart3,
  ArrowUpRight 
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProblemCardProps {
  title: string;
  description: string;
  solution: string;
  icon: React.ReactNode;
  className?: string;
  index: number;
}

const problems = [
  {
    title: "Scattered Digital Life",
    description:
      "Most people use multiple tools and apps to manage their tasks, notes, goals, and projects — leading to chaos and inefficiency.",
    solution: 
      "Learn to centralize your digital life in Notion with our comprehensive workspace setup. Create a single source of truth for all your information.",
    icon: <HelpCircle className="h-12 w-12" />,
    className: "lg:col-span-3 lg:row-span-2",
    highlight: true,
  },
  {
    title: "Inconsistent Productivity",
    description:
      "Without a unified system, it's hard to stay consistent with your habits, routines, or project timelines.",
    solution:
      "Build automated systems and dashboards in Notion that help you stay accountable and track your progress effortlessly.",
    icon: <LineChart className="h-12 w-12" />,
    className: "lg:col-span-2",
    highlight: false,
  },
  {
    title: "Overwhelmed by Features",
    description:
      "Notion can feel intimidating with so many blocks, templates, and views — which often leads to procrastination or poor usage.",
    solution:
      "Follow our step-by-step approach to master Notion's features gradually, starting with the essentials and building up to advanced techniques.",
    icon: <Lightbulb className="h-12 w-12" />,
    className: "lg:col-span-2",
    highlight: false,
  },
  {
    title: "Content Organization Chaos",
    description:
      "YouTube content creators struggle to organize their video ideas, scripts, thumbnails, and publishing schedules effectively.",
    solution:
      "Learn our proven content management system that streamlines your entire YouTube workflow from ideation to publication.",
    icon: <YoutubeIcon className="h-12 w-12" />,
    className: "lg:col-span-2",
    highlight: false,
  },
  {
    title: "Analytics Overwhelm",
    description:
      "Tracking channel growth, engagement metrics, and content performance across multiple platforms becomes overwhelming.",
    solution:
      "Set up automated dashboards in Notion that aggregate all your important metrics in one place for easy monitoring and decision-making.",
    icon: <BarChart3 className="h-12 w-12" />,
    className: "lg:col-span-3",
    highlight: false,
  },
];

const ProblemCard = ({
  title,
  description,
  solution,
  icon,
  className = "",
  index,
  highlight,
}: ProblemCardProps & { highlight?: boolean }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("h-full perspective group", className)}
    >
      <div 
        className={cn(
          "relative w-full h-full duration-500 preserve-3d cursor-pointer",
          isFlipped && "rotate-y-180"
        )}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card */}
        <Card className={cn(
          "absolute inset-0 h-full backface-hidden border transition-colors",
          highlight ? "bg-primary text-primary-foreground" : "bg-card",
          !isFlipped && "group-hover:border-primary/50"
        )}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-2 rounded-xl transition-colors",
                highlight 
                  ? "bg-primary-foreground/10 text-primary-foreground" 
                  : "bg-primary/5 text-primary group-hover:bg-primary/10"
              )}>
                {icon}
              </div>
              <CardTitle className="leading-tight text-lg md:text-xl">{title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className={cn(
              "text-base",
              highlight && "text-primary-foreground/90"
            )}>
              {description}
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button 
              variant={highlight ? "secondary" : "ghost"} 
              className="ml-auto gap-2 group/btn"
            >
              See Solution 
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Button>
          </CardFooter>
        </Card>

        {/* Back of Card */}
        <Card className={cn(
          "absolute inset-0 h-full backface-hidden rotate-y-180",
          highlight ? "bg-primary/5 border-primary/10" : "bg-muted/50"
        )}>
          <CardHeader>
            <CardTitle className={cn(
              "leading-tight text-lg md:text-xl",
              highlight ? "text-primary" : "text-foreground"
            )}>Solution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base">
              {solution}
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant={highlight ? "default" : "ghost"} 
              className="ml-auto gap-2 group/btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              Go Back 
              <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover/btn:-translate-x-0.5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  );
};

const Problems = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 space-y-4"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Common Productivity Problems
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These are the challenges most people face while trying to organize their digital life.
            <span className="block mt-2 text-sm font-medium">Click any card to see its solution!</span>
          </p>
        </motion.div>

        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-6 auto-rows-[minmax(300px,auto)]">
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              index={index}
              title={problem.title}
              description={problem.description}
              solution={problem.solution}
              icon={problem.icon}
              className={problem.className}
              highlight={problem.highlight}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 md:mt-24 text-center space-y-4"
        >
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Transform Notion into Your Productivity Hub
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn our systematic approach to turn these common challenges into opportunities for growth and efficiency.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Problems;
