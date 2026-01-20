import { WhaleBet, formatCurrency, timeAgo } from "@/lib/mockData";
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhaleAlertProps {
  bet: WhaleBet;
  isNew?: boolean;
}

export function WhaleAlert({ bet, isNew }: WhaleAlertProps) {
  const isYes = bet.type === 'YES';
  
  return (
    <div
      className={cn(
        "glass-card p-4 transition-all duration-300 hover:border-primary/50",
        isNew && "whale-alert-enter border-primary/30 glow-primary"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm",
            isYes 
              ? "bg-success/20 text-success" 
              : "bg-destructive/20 text-destructive"
          )}>
            {isYes ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{bet.trader}</span>
              <span className="text-xs text-muted-foreground font-mono">
                {bet.traderAddress.slice(0, 6)}...{bet.traderAddress.slice(-4)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {bet.market}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className={cn(
            "stat-value text-lg",
            isYes ? "text-success" : "text-destructive"
          )}>
            {formatCurrency(bet.amount)}
          </span>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className={cn(
              "px-2 py-0.5 rounded font-medium",
              isYes 
                ? "bg-success/20 text-success" 
                : "bg-destructive/20 text-destructive"
            )}>
              {bet.type}
            </span>
            <span>@ {(bet.odds * 100).toFixed(0)}¢</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <span className="text-xs text-muted-foreground">{timeAgo(bet.timestamp)}</span>
        <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
          View on Polymarket <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
