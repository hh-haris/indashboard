import { LinkedInHeader } from "@/components/dashboard/LinkedInHeader";
import { WeeklyWinsCard } from "@/components/dashboard/WeeklyWinsCard";
import { EngagementTrends } from "@/components/dashboard/EngagementTrends";
import { GrowthFunnel } from "@/components/dashboard/GrowthFunnel";
import { DetailedMetricCards } from "@/components/dashboard/DetailedMetricCards";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LinkedInHeader />
      
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* This Week's Wins - Expandable Cards */}
        <WeeklyWinsCard />
        
        {/* Engagement Trends - Interactive Charts */}
        <EngagementTrends />
        
        {/* Growth Funnel - Conversion Pipeline */}
        <GrowthFunnel />
        
        {/* Detailed Metric Cards - Comprehensive Grid */}
        <DetailedMetricCards />
      </main>
    </div>
  );
};

export default Index;
