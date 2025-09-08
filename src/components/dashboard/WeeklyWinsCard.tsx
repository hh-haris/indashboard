"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, MessageSquare, Eye, Users, Phone, Handshake } from "lucide-react";

interface WinMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  description: string;
  details: {
    currentWeek: number;
    lastWeek: number;
    trend: 'up' | 'down';
    breakdown: Array<{ label: string; value: string; description: string }>;
  };
}

const winsData: WinMetric[] = [
  {
    id: "comment-impressions",
    title: "Comment Impressions",
    value: "12.4K",
    change: 23.5,
    icon: MessageSquare,
    description: "Total impressions on your comments across LinkedIn",
    details: {
      currentWeek: 12400,
      lastWeek: 10045,
      trend: 'up',
      breakdown: [
        { label: "Thought Leadership Comments", value: "8.2K", description: "Comments on industry posts" },
        { label: "Engagement Comments", value: "2.8K", description: "Comments on connections' posts" },
        { label: "Community Comments", value: "1.4K", description: "Comments in LinkedIn groups" },
      ]
    }
  },
  {
    id: "profile-views",
    title: "Profile Views",
    value: "847",
    change: 18.2,
    icon: Eye,
    description: "People who viewed your LinkedIn profile",
    details: {
      currentWeek: 847,
      lastWeek: 717,
      trend: 'up',
      breakdown: [
        { label: "Search Results", value: "423", description: "Found via LinkedIn search" },
        { label: "Content Engagement", value: "289", description: "Via your posts and comments" },
        { label: "Network Activity", value: "135", description: "Through mutual connections" },
      ]
    }
  },
  {
    id: "connection-requests",
    title: "Connection Requests",
    value: "89",
    change: 34.8,
    icon: Users,
    description: "New connection requests received",
    details: {
      currentWeek: 89,
      lastWeek: 66,
      trend: 'up',
      breakdown: [
        { label: "Industry Leaders", value: "32", description: "Senior professionals in your field" },
        { label: "Potential Clients", value: "28", description: "Decision makers at target companies" },
        { label: "Peers & Colleagues", value: "29", description: "Similar-level professionals" },
      ]
    }
  },
  {
    id: "booked-calls",
    title: "Booked Calls",
    value: "23",
    change: 43.8,
    icon: Phone,
    description: "Discovery calls and meetings scheduled",
    details: {
      currentWeek: 23,
      lastWeek: 16,
      trend: 'up',
      breakdown: [
        { label: "Discovery Calls", value: "12", description: "Initial consultation calls" },
        { label: "Strategy Sessions", value: "7", description: "In-depth strategy discussions" },
        { label: "Follow-up Meetings", value: "4", description: "Second-stage conversations" },
      ]
    }
  },
  {
    id: "closed-deals",
    title: "Closed Deals",
    value: "7",
    change: 16.7,
    icon: Handshake,
    description: "Successfully closed business deals",
    details: {
      currentWeek: 7,
      lastWeek: 6,
      trend: 'up',
      breakdown: [
        { label: "Consulting Projects", value: "4", description: "Long-term consulting engagements" },
        { label: "Training Programs", value: "2", description: "Corporate training contracts" },
        { label: "Speaking Engagements", value: "1", description: "Paid speaking opportunities" },
      ]
    }
  }
];

function useOutsideClick(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
}

const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-foreground"
  >
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);

export function WeeklyWinsCard() {
  const [active, setActive] = useState<WinMetric | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-source-sans font-semibold text-foreground mb-2">
          This Week's Wins
        </h2>
        <p className="text-muted-foreground">
          Click any metric to see detailed breakdown and insights
        </p>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm h-full w-full z-50"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-card rounded-full h-8 w-8 border border-border"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-2xl h-fit max-h-[90vh] flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-2xl"
            >
              <motion.div
                layoutId={`header-${active.title}-${id}`}
                className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <motion.div
                      layoutId={`icon-${active.title}-${id}`}
                      className="p-3 bg-primary/10 rounded-lg"
                    >
                      <active.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div>
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="text-xl font-source-sans font-semibold text-foreground"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-muted-foreground mt-1"
                      >
                        {active.description}
                      </motion.p>
                    </div>
                  </div>
                  <motion.button
                    className="hidden lg:flex items-center justify-center bg-background rounded-full h-8 w-8 border border-border hover:bg-muted transition-colors"
                    onClick={() => setActive(null)}
                  >
                    <CloseIcon />
                  </motion.button>
                </div>
              </motion.div>

              <div className="flex-1 overflow-auto p-6">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="linkedin-card p-4">
                      <p className="text-sm text-muted-foreground">This Week</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {active.details.currentWeek.toLocaleString()}
                      </p>
                    </div>
                    <div className="linkedin-card p-4">
                      <p className="text-sm text-muted-foreground">Last Week</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {active.details.lastWeek.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div>
                    <h4 className="font-source-sans font-semibold text-foreground mb-4">
                      Detailed Breakdown
                    </h4>
                    <div className="space-y-3">
                      {active.details.breakdown.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="linkedin-card p-4"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{item.label}</p>
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            </div>
                            <p className="text-lg font-semibold text-primary ml-4">{item.value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {winsData.map((win, index) => {
          const Icon = win.icon;
          const isPositive = win.change > 0;
          
          return (
            <motion.div
              key={win.id}
              layoutId={`card-${win.title}-${id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActive(win)}
              className="linkedin-card hover-lift cursor-pointer group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <motion.div
                    layoutId={`icon-${win.title}-${id}`}
                    className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                  </motion.div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    isPositive 
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(win.change)}%
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <motion.h3
                  layoutId={`title-${win.title}-${id}`}
                  className="font-source-sans font-semibold text-foreground text-sm mb-1"
                >
                  {win.title}
                </motion.h3>
                <p className="text-2xl font-bold text-foreground mb-2">{win.value}</p>
                <motion.p
                  layoutId={`description-${win.description}-${id}`}
                  className="text-xs text-muted-foreground"
                >
                  vs last week
                </motion.p>
              </CardContent>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}