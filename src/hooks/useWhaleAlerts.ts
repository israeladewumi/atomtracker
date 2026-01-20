import { useState, useEffect, useCallback } from 'react';
import { WhaleBet, generateWhaleBet, generateTraders, Trader } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export function useWhaleAlerts() {
  const [bets, setBets] = useState<WhaleBet[]>([]);
  const [traders, setTraders] = useState<Trader[]>([]);
  const [newBetIds, setNewBetIds] = useState<Set<string>>(new Set());
  const [isLive, setIsLive] = useState(true);
  const { toast } = useToast();
  
  // Initialize with some historical data
  useEffect(() => {
    const initialBets = Array.from({ length: 5 }, (_, i) => generateWhaleBet(i));
    setBets(initialBets);
    setTraders(generateTraders());
  }, []);
  
  // Simulate real-time whale alerts
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      const newBet = generateWhaleBet(Date.now());
      newBet.timestamp = new Date();
      
      setBets(prev => [newBet, ...prev].slice(0, 50));
      setNewBetIds(prev => new Set([...prev, newBet.id]));
      
      toast({
        title: "🐋 Whale Alert!",
        description: `${newBet.trader} bet $${(newBet.amount / 1000).toFixed(0)}K on "${newBet.market.slice(0, 30)}..."`,
      });
      
      // Remove "new" status after animation
      setTimeout(() => {
        setNewBetIds(prev => {
          const next = new Set(prev);
          next.delete(newBet.id);
          return next;
        });
      }, 5000);
    }, 8000 + Math.random() * 7000); // Random interval 8-15 seconds
    
    return () => clearInterval(interval);
  }, [isLive, toast]);
  
  // Calculate stats
  const stats = {
    totalVolume: bets.reduce((sum, bet) => sum + bet.amount, 0),
    totalBets: bets.length,
    avgBetSize: bets.length > 0 ? bets.reduce((sum, bet) => sum + bet.amount, 0) / bets.length : 0,
    largestBet: bets.length > 0 ? Math.max(...bets.map(b => b.amount)) : 0,
    yesVolume: bets.filter(b => b.type === 'YES').reduce((sum, bet) => sum + bet.amount, 0),
    noVolume: bets.filter(b => b.type === 'NO').reduce((sum, bet) => sum + bet.amount, 0),
  };
  
  const toggleLive = useCallback(() => {
    setIsLive(prev => !prev);
  }, []);
  
  return {
    bets,
    traders,
    newBetIds,
    stats,
    isLive,
    toggleLive,
  };
}
