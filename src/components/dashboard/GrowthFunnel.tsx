"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageSquare, Eye, Users, Phone, Handshake, TrendingUp, ArrowDown } from "lucide-react";

interface FunnelStage {
  id: string;
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  description: string;
  conversionRate?: number;
}

const funnelData: FunnelStage[] = [
  {
    id: "comments",
    title: "Comments Posted",
    value: 156,
    icon: MessageSquare,
    color: "hsl(var(--primary))",
    description: "Thought-leadership comments across LinkedIn",
  },
  {
    id: "impressions",
    title: "Impressions Generated",
    value: 33400,
    icon: Eye,
    color: "hsl(197 100% 35%)",
    description: "Total reach across all content",
    conversionRate: 85.2,
  },
  {
    id: "profile-views",
    title: "Profile Views",
    value: 847,
    icon: Users,
    color: "hsl(var(--linkedin-gray))",
    description: "People who viewed your profile",
    conversionRate: 2.5,
  },
  {
    id: "connections",
    title: "Connection Requests",
    value: 89,
    icon: Users,
    color: "hsl(142 76% 36%)",
    description: "New connection requests received",
    conversionRate: 10.5,
  },
  {
    id: "calls",
    title: "Booked Calls",
    value: 23,
    icon: Phone,
    color: "hsl(47 96% 56%)",  
    description: "Discovery calls and meetings scheduled",
    conversionRate: 25.8,
  },
  {
    id: "deals",
    title: "Closed Deals",
    value: 7,
    icon: Handshake,
    color: "hsl(0 84% 60%)",
    description: "Successfully closed business deals",
    conversionRate: 30.4,
  },
];

export function GrowthFunnel() {
  const maxValue = Math.max(...funnelData.map(stage => stage.value));

  return (
    <section className="animate-scale-in">
      <div className="mb-6">
        <h2 className="text-2xl font-source-sans font-semibold text-foreground mb-2">
          Growth Funnel
        </h2>
        <p className="text-muted-foreground">
          Your LinkedIn engagement to business conversion pipeline
        </p>
      </div>

      <Card className="linkedin-card">
        <CardHeader>
          <CardTitle className="font-source-sans flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            LinkedIn Business Funnel
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Track how your LinkedIn activities convert to business outcomes
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {funnelData.map((stage, index) => {
            const Icon = stage.icon;
            const widthPercentage = (stage.value / maxValue) * 100;
            const isLast = index === funnelData.length - 1;
            
            return (
              <div key={stage.id} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="linkedin-card p-4 hover-lift"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${stage.color}15` }}
                      >
                        <Icon 
                          className="h-5 w-5" 
                          style={{ color: stage.color }}
                        />
                      </div>
                      <div>
                        <h3 className="font-source-sans font-semibold text-foreground">
                          {stage.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">
                        {stage.value.toLocaleString()}
                      </div>
                      {stage.conversionRate && (
                        <div className="text-sm text-green-600 font-medium">
                          {stage.conversionRate}% conversion
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Funnel Bar */}
                  <div className="relative">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPercentage}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                    </div>
                  </div>
                </motion.div>
                
                {/* Arrow connector */}
                {!isLast && (
                  <motion.div 
                    className="flex justify-center py-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                )}
              </div>
            );
          })}
          
          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: funnelData.length * 0.1 + 0.3 }}
            className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20"
          >
            <h4 className="font-source-sans font-semibold text-foreground mb-2">
              Funnel Performance
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Overall Conversion</p>
                <p className="text-lg font-bold text-primary">4.5%</p>
                <p className="text-xs text-muted-foreground">Comments → Deals</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Stage</p>
                <p className="text-lg font-bold text-green-600">30.4%</p>
                <p className="text-xs text-muted-foreground">Calls → Deals</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-lg font-bold text-foreground">$47.2K</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Deal Size</p>
                <p className="text-lg font-bold text-foreground">$6.7K</p>
                <p className="text-xs text-muted-foreground">Per closed deal</p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </section>
  );
}