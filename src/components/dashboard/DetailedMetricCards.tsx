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
  color: string;
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
    color: "hsl(var(--primary))",
  },
  {
    id: "comment-impressions",
    title: "Comment Impressions",
    value: "12.4K",
    icon: Eye,
    description: "Total views and reach of your comment engagement",
    change: 23.5,
    trend: 'up',
    color: "hsl(197 100% 35%)",
  },
  {
    id: "profile-views",
    title: "Profile Views",
    value: "847",
    icon: Users,
    description: "Unique visitors who viewed your LinkedIn profile", 
    change: 18.2,
    trend: 'up',
    color: "hsl(var(--linkedin-gray))",
  },
  {
    id: "post-impressions",
    title: "Post Impressions",
    value: "18.3K",
    icon: FileText,
    description: "Total reach and visibility of your original posts",
    change: 15.7,
    trend: 'up',
    color: "hsl(142 76% 36%)",
  },
  {
    id: "connection-requests",
    title: "Connection Requests",
    value: "89",
    icon: Users,
    description: "New connection requests received from prospects",
    change: 34.8,
    trend: 'up',
    color: "hsl(47 96% 56%)",
  },
  {
    id: "booked-calls",
    title: "Booked Calls",
    value: "23",
    icon: Phone,
    description: "Discovery calls and strategy sessions scheduled",
    change: 43.8,
    trend: 'up',
    color: "hsl(290 84% 60%)",
  },
  {
    id: "closed-deals",
    title: "Closed Deals",
    value: "7",
    icon: Handshake,
    description: "Successfully closed business deals and contracts",
    change: 16.7,
    trend: 'up',
    color: "hsl(0 84% 60%)",
  },
];

export function DetailedMetricCards() {
  return (
    <section className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-source-sans font-semibold text-foreground mb-2">
          Detailed Metrics
        </h2>
        <p className="text-muted-foreground">
          Comprehensive breakdown of your LinkedIn performance indicators
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div 
                      className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: `${metric.color}15` }}
                    >
                      <Icon 
                        className="h-6 w-6" 
                        style={{ color: metric.color }}
                      />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      metric.trend === 'up'
                        ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      <TrendIcon className="h-3 w-3" />
                      {metric.change}%
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="text-lg font-source-sans font-semibold text-foreground mb-2">
                    {metric.title}
                  </CardTitle>
                  <div className="mb-3">
                    <span className="text-3xl font-bold text-foreground animate-counter-up">
                      {metric.value}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {metric.description}
                  </p>
                  
                  {/* Mini progress indicator */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">vs last week</span>
                      <span className={`font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        +{metric.change}%
                      </span>
                    </div>
                    <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
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
        className="mt-8"
      >
        <Card className="linkedin-card">
          <CardHeader>
            <CardTitle className="font-source-sans">Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary mb-1">93.2%</div>
                <div className="text-sm font-medium text-foreground">Engagement Rate</div>
                <div className="text-xs text-muted-foreground mt-1">Above industry avg</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-2xl font-bold text-green-600 mb-1">$47.2K</div>
                <div className="text-sm font-medium text-foreground">Revenue Generated</div>
                <div className="text-xs text-muted-foreground mt-1">This month</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="text-2xl font-bold text-orange-600 mb-1">2.1K</div>
                <div className="text-sm font-medium text-foreground">Network Growth</div>
                <div className="text-xs text-muted-foreground mt-1">New connections</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}