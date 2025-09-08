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
    color: "hsl(197 100% 35%)",
  },
  allImpressions: {
    label: "All Impressions",
    color: "hsl(var(--linkedin-gray))",
  },
  engagements: {
    label: "Total Engagements",
    color: "hsl(142 76% 36%)",
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
        return { value: { label: "Post Impressions", color: "hsl(197 100% 35%)" } };
      case 'engagements':
        return { value: { label: "Total Engagements", color: "hsl(142 76% 36%)" } };
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
          <AreaChart data={chartData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.replace('Week ', 'W')}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillComments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="fillPosts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(197 100% 35%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(197 100% 35%)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Area
              dataKey="commentImpressions"
              type="monotone"
              fill="url(#fillComments)"
              fillOpacity={0.4}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
            <Area
              dataKey="postImpressions"
              type="monotone"
              fill="url(#fillPosts)"
              fillOpacity={0.4}
              stroke="hsl(197 100% 35%)"
              strokeWidth={2}
            />
          </AreaChart>
        );
      } else {
        return (
          <BarChart data={chartData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.replace('Week ', 'W')}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="commentImpressions" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
            <Bar dataKey="postImpressions" fill="hsl(197 100% 35%)" radius={[2, 2, 0, 0]} />
          </BarChart>
        );
      }
    } else {
      // Single metric chart
      if (chartType === 'area') {
        return (
          <AreaChart data={data} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.replace('Week ', 'W')}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
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
              strokeWidth={2}
            />
          </AreaChart>
        );
      } else {
        return (
          <BarChart data={data} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.replace('Week ', 'W')}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill={config.value?.color} radius={[4, 4, 0, 0]} />
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
      <div className="mb-6">
        <h2 className="text-2xl font-source-sans font-semibold text-foreground mb-2">
          Engagement Trends
        </h2>
        <p className="text-muted-foreground">
          Track your LinkedIn engagement performance over time
        </p>
      </div>

      <Card className="linkedin-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-base font-source-sans">
              {getMetricLabel()} Trend
            </CardTitle>
            <CardDescription>
              {selectedMetric === 'all' ? 'Showing multiple metrics' : 'Weekly performance tracking'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedMetric} onValueChange={(value: MetricType) => setSelectedMetric(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Impressions</SelectItem>
                <SelectItem value="comments">Comment Impressions</SelectItem>
                <SelectItem value="posts">Post Impressions</SelectItem>
                <SelectItem value="engagements">Total Engagements</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border border-border rounded-lg p-1">
              <Button
                variant={chartType === 'area' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('area')}
                className="h-8 px-3"
              >
                <Activity className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === 'bar' ? 'default' : 'ghost'}
                size="sm"  
                onClick={() => setChartType('bar')}
                className="h-8 px-3"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ChartContainer config={selectedMetric === 'all' ? chartConfig : getSingleMetricConfig()}>
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="flex w-full items-start gap-2 text-sm mt-4">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                Trending up consistently <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                Current week: {getLatestValue()} • 6-week trend
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}