import { Trader, formatCurrency, formatPercentage } from "@/lib/mockData";
import { Trophy, TrendingUp, TrendingDown, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardProps {
  traders: Trader[];
}

export function Leaderboard({ traders }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-warning" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-warning/60" />;
    return <span className="text-muted-foreground font-mono text-sm w-5 text-center">{rank}</span>;
  };

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Top Traders</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Ranked by volume & win rate</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border/50">
              <th className="text-left p-4 font-medium">Rank</th>
              <th className="text-left p-4 font-medium">Trader</th>
              <th className="text-right p-4 font-medium">Volume</th>
              <th className="text-right p-4 font-medium">Win %</th>
              <th className="text-right p-4 font-medium">Bets</th>
              <th className="text-right p-4 font-medium">PnL</th>
            </tr>
          </thead>
          <tbody>
            {traders.map((trader, index) => {
              const rank = index + 1;
              const isProfitable = trader.pnl >= 0;
              
              return (
                <tr
                  key={trader.id}
                  className={cn(
                    "border-b border-border/30 transition-colors hover:bg-secondary/30",
                    rank <= 3 && "bg-secondary/20"
                  )}
                >
                  <td className="p-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(rank)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{trader.displayName}</span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {trader.address.slice(0, 6)}...{trader.address.slice(-4)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="data-cell text-primary font-semibold">
                      {formatCurrency(trader.totalVolume)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className={cn(
                      "data-cell font-semibold",
                      trader.winPercentage >= 50 ? "text-success" : "text-destructive"
                    )}>
                      {formatPercentage(trader.winPercentage)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="data-cell text-foreground">{trader.totalBets}</span>
                      <span className="text-xs text-muted-foreground">
                        {trader.totalWins}W / {trader.totalBets - trader.totalWins}L
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {isProfitable ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <span className={cn(
                        "data-cell font-semibold",
                        isProfitable ? "text-success" : "text-destructive"
                      )}>
                        {isProfitable ? '+' : ''}{formatCurrency(trader.pnl)}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
