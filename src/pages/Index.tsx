import { Header } from "@/components/Header";
import { AlertFeed } from "@/components/AlertFeed";
import { Leaderboard } from "@/components/Leaderboard";
import { StatsCard } from "@/components/StatsCard";
import { useWhaleAlerts } from "@/hooks/useWhaleAlerts";
import { formatCurrency } from "@/lib/mockData";
import { DollarSign, Activity, TrendingUp, Zap } from "lucide-react";

const Index = () => {
  const { bets, traders, newBetIds, stats } = useWhaleAlerts();
  
  return (
    <div className="min-h-screen bg-background">
      <Header alertCount={newBetIds.size} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Volume Tracked"
            value={formatCurrency(stats.totalVolume)}
            subtitle="From whale bets"
            icon={DollarSign}
            variant="primary"
            trend={{ value: "+12.5%", isPositive: true }}
          />
          <StatsCard
            title="Whale Bets"
            value={stats.totalBets.toString()}
            subtitle="Above $50K threshold"
            icon={Activity}
            trend={{ value: "+3", isPositive: true }}
          />
          <StatsCard
            title="Avg Bet Size"
            value={formatCurrency(stats.avgBetSize)}
            icon={TrendingUp}
            variant="success"
          />
          <StatsCard
            title="Largest Bet"
            value={formatCurrency(stats.largestBet)}
            subtitle="Today"
            icon={Zap}
            variant="warning"
          />
        </div>
        
        {/* Volume Split Bar */}
        <div className="glass-card p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Volume Distribution</span>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-success"></span>
                YES {formatCurrency(stats.yesVolume)}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-destructive"></span>
                NO {formatCurrency(stats.noVolume)}
              </span>
            </div>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden flex">
            <div 
              className="h-full bg-success transition-all duration-500"
              style={{ 
                width: stats.totalVolume > 0 
                  ? `${(stats.yesVolume / stats.totalVolume) * 100}%` 
                  : '50%' 
              }}
            />
            <div 
              className="h-full bg-destructive transition-all duration-500"
              style={{ 
                width: stats.totalVolume > 0 
                  ? `${(stats.noVolume / stats.totalVolume) * 100}%` 
                  : '50%' 
              }}
            />
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Alert Feed - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <AlertFeed bets={bets} newBetIds={newBetIds} />
          </div>
          
          {/* Leaderboard - Takes 3 columns on large screens */}
          <div className="lg:col-span-3">
            <Leaderboard traders={traders} />
          </div>
        </div>
      </main>
      
      {/* Threshold Indicator */}
      <div className="fixed bottom-4 left-4 glass-card px-4 py-2 flex items-center gap-2 text-sm">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        <span className="text-muted-foreground">Monitoring bets</span>
        <span className="font-mono text-primary font-semibold">&gt; $50,000</span>
      </div>
    </div>
  );
};

export default Index;
