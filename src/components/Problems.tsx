'use client';

import { motion } from 'framer-motion';
import { FaQuestionCircle, FaChartLine, FaLightbulb } from 'react-icons/fa';

const problems = [
  {
    title: "Scattered Digital Life",
    description: "Most people use multiple tools and apps to manage their tasks, notes, goals, and projects — leading to chaos and inefficiency.",
    icon: <FaQuestionCircle />,
    className: "sm:col-span-2 sm:row-span-2 area-a"
  },
  {
    title: "Inconsistent Productivity",
    description: "Without a unified system, it’s hard to stay consistent with your habits, routines, or project timelines.",
    icon: <FaChartLine />,
    className: "sm:col-span-2 area-b"
  },
  {
    title: "Overwhelmed by Features",
    description: "Notion can feel intimidating with so many blocks, templates, and views — which often leads to procrastination or poor usage.",
    icon: <FaLightbulb />,
    className: "area-c"
  }
];

const ProblemCard = ({ title, description, icon, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white rounded-2xl p-6 shadow-md flex flex-col gap-4 justify-between ${className}`}
  >
    <div className="text-2xl font-semibold text-gray-900">{title}</div>
    <div className="text-sm text-gray-600">{description}</div>
    {icon && <div className="text-4xl mt-2 text-indigo-600">{icon}</div>}
  </motion.div>
);

const Problems = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Common Productivity Problems
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            These are the challenges most people face while trying to organize their digital life
          </p>
        </motion.div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-4 auto-rows-[200px] grid-areas-layout">
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              title={problem.title}
              description={problem.description}
              icon={problem.icon}
              className={problem.className}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900">
            But Notion is a System, Not Just a Note App
          </h3>
          <p className="mt-4 text-lg text-gray-600">
            With the right guidance, you can turn Notion into your second brain and master digital productivity
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Problems;
