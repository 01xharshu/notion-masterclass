'use client';

import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaSlack,
  FaTiktok,
} from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { BsRobot } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const platforms = [
  <FaInstagram />, <FaTiktok />, <FaTwitter />, <FaFacebookF />, <FaLinkedinIn />, <FaSlack />,
  <FaLinkedinIn />, <FaSlack />, <FaInstagram />, <FaTwitter />, <FaFacebookF />
];

const FeatureCard = ({ title, description, icon, children, className = "" }: any) => (
  <div className={`bg-zinc-900 text-white rounded-2xl p-6 shadow-md flex flex-col gap-4 justify-between ${className}`}>
    <div className="text-2xl font-semibold">{title}</div>
    <div className="text-sm text-zinc-400">{description}</div>
    {icon && <div className="text-4xl mt-2">{icon}</div>}
    {children && <div className="mt-4">{children}</div>}
  </div>
);

const DashboardGrid = () => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-4 auto-rows-[200px] grid-areas-layout p-10 min-h-screen bg-zinc-950">
      <FeatureCard
        title="Post to multiple platforms at once"
        description="With our AI-powered platform, you can post to multiple platforms at once, saving you time and effort."
        className="sm:col-span-2 sm:row-span-2 area-a"
      >
        <div className="flex flex-wrap gap-3 text-xl text-white/80">
          {platforms.map((icon, i) => (
            <div
              key={i}
              className="bg-zinc-800 p-2 rounded-xl hover:bg-zinc-700 transition"
            >
              {icon}
            </div>
          ))}
        </div>
      </FeatureCard>

      <FeatureCard
        title="Analytics for everything"
        description="Check analytics, track your posts, and get insights into your audience."
        icon={<MdAnalytics />}
        className="sm:col-span-2 area-b"
      />

      <FeatureCard
        title="Integrated AI"
        description="Proactiv uses AI to help you create engaging content."
        icon={<BsRobot />}
        className="area-c"
      />

      <FeatureCard
        title="Easy Collaboration"
        description="Proactive can integrate with Zapier, Slack and every other popular integration tools."
        icon={<AiOutlineTeam />}
        className="area-d"
      >
        <div className="text-sm mt-2 text-zinc-400">
          Twitter post → Manu Arora <br />
          Email Campaign → Tyler Durden <br />
          Newsletter Campaign
        </div>
      </FeatureCard>

      <FeatureCard
        title="Know your audience"
        description="Based on your audience, create funnels and drive more traffic."
        icon={<FaUserCircle />}
        className="area-e"
      >
        <div className="text-sm mt-2 text-zinc-400">
          Manu Arora <br />
          Most engagements • 69,420
        </div>
      </FeatureCard>
    </div>
  );
};

export default DashboardGrid; 