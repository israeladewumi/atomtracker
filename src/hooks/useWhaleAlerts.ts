import { useState, useEffect, useCallback } from 'react';
import { WhaleBet, generateWhaleBet, generateTraders, Trader } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function useWhaleAlerts() {
  const [bets, setBets] = useState<WhaleBet[]>([]);
  const [traders, setTraders] = useState<Trader[]>([]);
  const [newBetIds, setNewBetIds] = useState<Set<string>>(new Set());
  const [isLive, setIsLive] = useState(true);
  const [telegramEnabled, setTelegramEnabled] = useState(true);
  const { toast } = useToast();

  // Send Telegram notification for whale bet
  const sendTelegramAlert = useCallback(async (bet: WhaleBet) => {
    if (!telegramEnabled) return;
    
    try {
      const { error } = await supabase.functions.invoke('send-telegram-alert', {
        body: {
          id: bet.id,
          market: bet.market,
          amount: bet.amount,
          position: bet.type,
          trader: bet.trader,
          timestamp: bet.timestamp.toISOString(),
          odds: bet.odds,
        },
      });
      
      if (error) {
        console.error('Failed to send Telegram alert:', error);
      } else {
        console.log('Telegram alert sent for bet:', bet.id);
      }
    } catch (err) {
      console.error('Error sending Telegram alert:', err);
    }
  }, [telegramEnabled]);
  
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
      
      // Send Telegram notification
      sendTelegramAlert(newBet);
      
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
  }, [isLive, toast, sendTelegramAlert]);
  
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

  const toggleTelegram = useCallback(() => {
    setTelegramEnabled(prev => !prev);
  }, []);
  
  return {
    bets,
    traders,
    newBetIds,
    stats,
    isLive,
    toggleLive,
    telegramEnabled,
    toggleTelegram,
  };
}
