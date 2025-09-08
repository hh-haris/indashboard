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
    title: "New Connections",
    value: "47",
    change: 16.7,
    icon: Handshake,
    description: "Successfully established professional connections",
    details: {
      currentWeek: 47,
      lastWeek: 40,
      trend: 'up',
      breakdown: [
        { label: "Industry Professionals", value: "28", description: "Connections within your industry" },
        { label: "Potential Collaborators", value: "12", description: "People for potential partnerships" },
        { label: "Thought Leaders", value: "7", description: "Influential professionals in your field" },
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
    className="h-4 w-4 text-muted-foreground"
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
      <div className="mb-8">
        <h2 className="text-3xl font-source-sans font-bold text-foreground mb-3">
          This Week's Performance
        </h2>
        <p className="text-lg text-muted-foreground">
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
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-card rounded-full h-10 w-10 border border-border hover:bg-muted transition-colors"
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
                className="p-8 border-b border-border bg-gradient-to-r from-muted/30 to-muted/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-6">
                    <motion.div
                      layoutId={`icon-${active.title}-${id}`}
                      className="p-4 bg-muted rounded-xl"
                    >
                      <active.icon className="h-8 w-8 text-muted-foreground" />
                    </motion.div>
                    <div>
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="text-2xl font-source-sans font-bold text-foreground mb-2"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-muted-foreground text-lg"
                      >
                        {active.description}
                      </motion.p>
                    </div>
                  </div>
                  <motion.button
                    className="hidden lg:flex items-center justify-center bg-background rounded-full h-10 w-10 border border-border hover:bg-muted transition-colors"
                    onClick={() => setActive(null)}
                  >
                    <CloseIcon />
                  </motion.button>
                </div>
              </motion.div>

              <div className="flex-1 overflow-auto p-8">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="linkedin-card p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">This Week</p>
                      <p className="text-3xl font-bold text-foreground">
                        {active.details.currentWeek.toLocaleString()}
                      </p>
                    </div>
                    <div className="linkedin-card p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Last Week</p>
                      <p className="text-3xl font-bold text-foreground">
                        {active.details.lastWeek.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div>
                    <h4 className="font-source-sans font-bold text-xl text-foreground mb-6">
                      Detailed Breakdown
                    </h4>
                    <div className="space-y-4">
                      {active.details.breakdown.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="linkedin-card p-6"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-semibold text-foreground text-lg mb-2">{item.label}</p>
                              <p className="text-muted-foreground">{item.description}</p>
                            </div>
                            <p className="text-2xl font-bold text-primary ml-6">{item.value}</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
              className="linkedin-card hover-lift cursor-pointer group p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  layoutId={`icon-${win.title}-${id}`}
                  className="p-3 bg-muted rounded-lg group-hover:bg-muted/80 transition-colors"
                >
                  <Icon className="h-6 w-6 text-muted-foreground" />
                </motion.div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  isPositive 
                    ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                    : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {Math.abs(win.change)}%
                </div>
              </div>
              
              <motion.h3
                layoutId={`title-${win.title}-${id}`}
                className="font-source-sans font-bold text-foreground text-lg mb-3"
              >
                {win.title}
              </motion.h3>
              
              <p className="text-3xl font-bold text-foreground mb-3">{win.value}</p>
              
              <motion.p
                layoutId={`description-${win.description}-${id}`}
                className="text-sm text-muted-foreground"
              >
                vs last week
              </motion.p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}