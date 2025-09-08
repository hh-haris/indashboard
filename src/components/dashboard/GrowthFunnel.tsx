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
  description: string;
  conversionRate?: number;
}

const funnelData: FunnelStage[] = [
  {
    id: "comments",
    title: "Comments Posted",
    value: 156,
    icon: MessageSquare,
    description: "Thought-leadership comments across LinkedIn",
  },
  {
    id: "impressions",
    title: "Impressions Generated",
    value: 33400,
    icon: Eye,
    description: "Total reach across all content",
    conversionRate: 85.2,
  },
  {
    id: "profile-views",
    title: "Profile Views",
    value: 847,
    icon: Users,
    description: "People who viewed your profile",
    conversionRate: 2.5,
  },
  {
    id: "connections",
    title: "Connection Requests",
    value: 89,
    icon: Users,
    description: "New connection requests received",
    conversionRate: 10.5,
  },
  {
    id: "calls",
    title: "Booked Calls",
    value: 23,
    icon: Phone,
    description: "Discovery calls and meetings scheduled",
    conversionRate: 25.8,
  },
  {
    id: "partnerships",
    title: "New Partnerships",
    value: 7,
    icon: Handshake,
    description: "Successfully established professional partnerships",
    conversionRate: 30.4,
  },
];

export function GrowthFunnel() {
  const maxValue = Math.max(...funnelData.map(stage => stage.value));

  return (
    <section className="animate-scale-in">
      <div className="mb-8">
        <h2 className="text-3xl font-source-sans font-bold text-foreground mb-3">
          Growth Funnel
        </h2>
        <p className="text-lg text-muted-foreground">
          Your LinkedIn engagement to professional connection pipeline
        </p>
      </div>

      <Card className="linkedin-card">
        <CardHeader className="pb-6">
          <CardTitle className="font-source-sans font-bold text-2xl flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-primary" />
            LinkedIn Professional Growth Funnel
          </CardTitle>
          <p className="text-base text-muted-foreground">
            Track how your LinkedIn activities convert to professional outcomes
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
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
                  className="linkedin-card p-6 hover-lift"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-muted rounded-xl">
                        <Icon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-source-sans font-bold text-foreground text-lg">
                          {stage.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-foreground">
                        {stage.value.toLocaleString()}
                      </div>
                      {stage.conversionRate && (
                        <div className="text-sm text-green-600 font-medium mt-1">
                          {stage.conversionRate}% conversion
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Funnel Bar */}
                  <div className="relative">
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPercentage}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>
                </motion.div>
                
                {/* Arrow connector */}
                {!isLast && (
                  <motion.div 
                    className="flex justify-center py-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <ArrowDown className="h-5 w-5 text-muted-foreground" />
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
            className="mt-8 p-6 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-border"
          >
            <h4 className="font-source-sans font-bold text-foreground text-xl mb-4">
              Funnel Performance Summary
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Overall Conversion</p>
                <p className="text-2xl font-bold text-primary">4.5%</p>
                <p className="text-xs text-muted-foreground">Comments → Partnerships</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Best Stage</p>
                <p className="text-2xl font-bold text-green-600">30.4%</p>
                <p className="text-xs text-muted-foreground">Calls → Partnerships</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Connections</p>
                <p className="text-2xl font-bold text-foreground">2.1K</p>
                <p className="text-xs text-muted-foreground">Network growth</p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </section>
  );
}