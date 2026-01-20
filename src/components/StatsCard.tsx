import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

export function StatsCard({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: StatsCardProps) {
  return (
    <div className={cn(
      "glass-card p-5 transition-all duration-300 hover:border-primary/30",
      variant === 'primary' && "border-primary/20 glow-primary",
      variant === 'success' && "border-success/20 glow-success",
    )}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">{title}</span>
          <span className={cn(
            "stat-value mt-1",
            variant === 'primary' && "text-primary",
            variant === 'success' && "text-success",
            variant === 'warning' && "text-warning",
          )}>
            {value}
          </span>
          {subtitle && (
            <span className="text-xs text-muted-foreground mt-1">{subtitle}</span>
          )}
        </div>
        
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          variant === 'default' && "bg-secondary text-muted-foreground",
          variant === 'primary' && "bg-primary/20 text-primary",
          variant === 'success' && "bg-success/20 text-success",
          variant === 'warning' && "bg-warning/20 text-warning",
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      {trend && (
        <div className={cn(
          "flex items-center gap-1 mt-3 text-xs",
          trend.isPositive ? "text-success" : "text-destructive"
        )}>
          <span>{trend.isPositive ? '↑' : '↓'} {trend.value}</span>
          <span className="text-muted-foreground">vs last hour</span>
        </div>
      )}
    </div>
  );
}
