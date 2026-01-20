import { WhaleBet } from "@/lib/mockData";
import { WhaleAlert } from "./WhaleAlert";
import { AlertCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlertFeedProps {
  bets: WhaleBet[];
  newBetIds: Set<string>;
}

export function AlertFeed({ bets, newBetIds }: AlertFeedProps) {
  return (
    <div className="glass-card overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Whale Alerts</h2>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
            {bets.length}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {bets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No whale bets detected yet</p>
            <p className="text-xs text-muted-foreground mt-1">Watching for bets over $50,000</p>
          </div>
        ) : (
          bets.map((bet) => (
            <WhaleAlert
              key={bet.id}
              bet={bet}
              isNew={newBetIds.has(bet.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
