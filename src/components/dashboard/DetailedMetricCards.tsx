"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Eye, 
  Users, 
  Phone, 
  Handshake, 
  FileText,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface MetricCard {
  id: string;
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  change: number;
  trend: 'up' | 'down';
}

const metricsData: MetricCard[] = [
  {
    id: "comments-posted",
    title: "Comments Posted",
    value: "156",
    icon: MessageSquare,
    description: "Thought-leadership comments shared across LinkedIn posts",
    change: 12.3,
    trend: 'up',
  },
  {
    id: "comment-impressions",
    title: "Comment Impressions",
    value: "12.4K",
    icon: Eye,
    description: "Total views and reach of your comment engagement",
    change: 23.5,
    trend: 'up',
  },
  {
    id: "profile-views",
    title: "Profile Views",
    value: "847",
    icon: Users,
    description: "Unique visitors who viewed your LinkedIn profile", 
    change: 18.2,
    trend: 'up',
  },
  {
    id: "post-impressions",
    title: "Post Impressions",
    value: "18.3K",
    icon: FileText,
    description: "Total reach and visibility of your original posts",
    change: 15.7,
    trend: 'up',
  },
  {
    id: "connection-requests",
    title: "Connection Requests",
    value: "89",
    icon: Users,
    description: "New connection requests received from prospects",
    change: 34.8,
    trend: 'up',
  },
  {
    id: "booked-calls",
    title: "Booked Calls",
    value: "23",
    icon: Phone,
    description: "Discovery calls and strategy sessions scheduled",
    change: 43.8,
    trend: 'up',
  },
  {
    id: "partnerships",
    title: "New Partnerships",
    value: "7",
    icon: Handshake,
    description: "Successfully established professional partnerships",
    change: 16.7,
    trend: 'up',
  },
];

export function DetailedMetricCards() {
  return (
    <section className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-source-sans font-bold text-foreground mb-3">
          Detailed Metrics
        </h2>
        <p className="text-lg text-muted-foreground">
          Comprehensive breakdown of your LinkedIn performance indicators
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="linkedin-card hover-lift group cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-muted rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      metric.trend === 'up'
                        ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      <TrendIcon className="h-4 w-4" />
                      {metric.change}%
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="text-xl font-source-sans font-bold text-foreground mb-3">
                    {metric.title}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground animate-counter-up">
                      {metric.value}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {metric.description}
                  </p>
                  
                  {/* Mini progress indicator */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">vs last week</span>
                      <span className={`font-semibold ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        +{metric.change}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(metric.change * 2, 100)}%` }}
                        transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                        className={`h-full rounded-full ${
                          metric.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: metricsData.length * 0.05 + 0.2 }}
        className="mt-12"
      >
        <Card className="linkedin-card">
          <CardHeader className="pb-6">
            <CardTitle className="font-source-sans font-bold text-2xl">Key Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                <div className="text-3xl font-bold text-primary mb-2">93.2%</div>
                <div className="text-lg font-semibold text-foreground mb-1">Engagement Rate</div>
                <div className="text-sm text-muted-foreground">Above industry average</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="text-3xl font-bold text-green-600 mb-2">2.1K</div>
                <div className="text-lg font-semibold text-foreground mb-1">Network Growth</div>
                <div className="text-sm text-muted-foreground">New connections this month</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-800">
                <div className="text-3xl font-bold text-orange-600 mb-2">47</div>
                <div className="text-lg font-semibold text-foreground mb-1">Active Partnerships</div>
                <div className="text-sm text-muted-foreground">Professional collaborations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}