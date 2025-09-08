"use client";

import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Bar, BarChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp, BarChart3, Activity } from "lucide-react";

const chartData = [
  { week: "Week 1", commentImpressions: 8400, postImpressions: 12600, allImpressions: 21000, engagements: 950 },
  { week: "Week 2", commentImpressions: 9200, postImpressions: 13800, allImpressions: 23000, engagements: 1100 },
  { week: "Week 3", commentImpressions: 10100, postImpressions: 15200, allImpressions: 25300, engagements: 1250 },
  { week: "Week 4", commentImpressions: 11800, postImpressions: 16900, allImpressions: 28700, engagements: 1450 },
  { week: "Week 5", commentImpressions: 12400, postImpressions: 18300, allImpressions: 30700, engagements: 1580 },
  { week: "Week 6", commentImpressions: 13600, postImpressions: 19800, allImpressions: 33400, engagements: 1720 },
];

const chartConfig = {
  commentImpressions: {
    label: "Comment Impressions",
    color: "hsl(var(--primary))",
  },
  postImpressions: {
    label: "Post Impressions", 
    color: "hsl(var(--muted-foreground))",
  },
  allImpressions: {
    label: "All Impressions",
    color: "hsl(var(--muted-foreground))",
  },
  engagements: {
    label: "Total Engagements",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig;

type ChartType = 'area' | 'bar';
type MetricType = 'all' | 'comments' | 'posts' | 'engagements';

export function EngagementTrends() {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('all');

  const getChartDataForMetric = () => {
    switch (selectedMetric) {
      case 'comments':
        return chartData.map(d => ({ week: d.week, value: d.commentImpressions }));
      case 'posts':
        return chartData.map(d => ({ week: d.week, value: d.postImpressions }));
      case 'engagements':
        return chartData.map(d => ({ week: d.week, value: d.engagements }));
      default:
        return chartData;
    }
  };

  const getSingleMetricConfig = (): ChartConfig => {
    switch (selectedMetric) {
      case 'comments':
        return { value: { label: "Comment Impressions", color: "hsl(var(--primary))" } };
      case 'posts':
        return { value: { label: "Post Impressions", color: "hsl(var(--muted-foreground))" } };
      case 'engagements':
        return { value: { label: "Total Engagements", color: "hsl(var(--muted-foreground))" } };
      default:
        return chartConfig;
    }
  };

  const renderChart = () => {
    const data = getChartDataForMetric();
    const config = getSingleMetricConfig();

    if (selectedMetric === 'all') {
      // Multi-metric chart
      if (chartType === 'area') {
        return (
          <AreaChart data={chartData} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => value.replace('Week ', 'W')}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tickMargin={12}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillComments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="fillPosts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Area
              dataKey="commentImpressions"
              type="monotone"
              fill="url(#fillComments)"
              fillOpacity={0.4}
              stroke="hsl(var(--primary))"
              strokeWidth={3}
            />
            <Area
              dataKey="postImpressions"
              type="monotone"
              fill="url(#fillPosts)"
              fillOpacity={0.4}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={3}
            />
          </AreaChart>
        );
      } else {
        return (
          <BarChart data={chartData} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => value.replace('Week ', 'W')}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tickMargin={12}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="commentImpressions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="postImpressions" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      }
    } else {
      // Single metric chart
      if (chartType === 'area') {
        return (
          <AreaChart data={data} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => value.replace('Week ', 'W')}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tickMargin={12}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillSingle" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={config.value?.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={config.value?.color} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Area
              dataKey="value"
              type="monotone"
              fill="url(#fillSingle)"
              fillOpacity={0.4}
              stroke={config.value?.color}
              strokeWidth={3}
            />
          </AreaChart>
        );
      } else {
        return (
          <BarChart data={data} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => value.replace('Week ', 'W')}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tickMargin={12}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill={config.value?.color} radius={[6, 6, 0, 0]} />
          </BarChart>
        );
      }
    }
  };

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'comments': return 'Comment Impressions';
      case 'posts': return 'Post Impressions';
      case 'engagements': return 'Total Engagements';
      default: return 'All Metrics';
    }
  };

  const getLatestValue = () => {
    const latest = chartData[chartData.length - 1];
    switch (selectedMetric) {
      case 'comments': return latest.commentImpressions.toLocaleString();
      case 'posts': return latest.postImpressions.toLocaleString();
      case 'engagements': return latest.engagements.toLocaleString();
      default: return latest.allImpressions.toLocaleString();
    }
  };

  return (
    <section className="animate-slide-up">
      <div className="mb-8">
        <h2 className="text-3xl font-source-sans font-bold text-foreground mb-3">
          Engagement Trends
        </h2>
        <p className="text-lg text-muted-foreground">
          Track your LinkedIn engagement performance over time
        </p>
      </div>

      <Card className="linkedin-card">
        <CardHeader className="pb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-source-sans font-bold">
                {getMetricLabel()} Trend
              </CardTitle>
              <CardDescription className="text-base">
                {selectedMetric === 'all' ? 'Showing multiple metrics over 6 weeks' : 'Weekly performance tracking'}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Select value={selectedMetric} onValueChange={(value: MetricType) => setSelectedMetric(value)}>
                <SelectTrigger className="w-[200px] h-11">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Impressions</SelectItem>
                  <SelectItem value="comments">Comment Impressions</SelectItem>
                  <SelectItem value="posts">Post Impressions</SelectItem>
                  <SelectItem value="engagements">Total Engagements</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border border-border rounded-lg p-1 bg-muted/30">
                <Button
                  variant={chartType === 'area' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('area')}
                  className="h-9 px-4"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Area
                </Button>
                <Button
                  variant={chartType === 'bar' ? 'default' : 'ghost'}
                  size="sm"  
                  onClick={() => setChartType('bar')}
                  className="h-9 px-4"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Bar
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[400px] w-full mb-6">
            <ChartContainer config={selectedMetric === 'all' ? chartConfig : getSingleMetricConfig()}>
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="flex w-full items-start gap-2 text-sm pt-4 border-t border-border">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium text-foreground">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Trending up consistently over the past 6 weeks
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                Current week: <span className="font-semibold text-foreground">{getLatestValue()}</span> • 6-week performance overview
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}