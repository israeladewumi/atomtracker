export interface WhaleBet {
  id: string;
  trader: string;
  traderAddress: string;
  market: string;
  outcome: string;
  amount: number;
  timestamp: Date;
  odds: number;
  type: 'YES' | 'NO';
}

export interface Trader {
  id: string;
  address: string;
  displayName: string;
  totalVolume: number;
  winPercentage: number;
  totalBets: number;
  totalWins: number;
  pnl: number;
  avatar?: string;
}

const marketNames = [
  "Will Trump win 2024 election?",
  "Bitcoin above $100k by March?",
  "Fed rate cut in Q1 2025?",
  "Ethereum ETF approval?",
  "Tesla stock above $300?",
  "SpaceX Starship success?",
  "ChatGPT-5 release by June?",
  "Apple Vision Pro 2 in 2025?",
  "NFL Super Bowl winner: Chiefs?",
  "Will TikTok be banned in US?",
];

const traderNames = [
  "whalewatch.eth",
  "cryptoqueen",
  "degen_alpha",
  "polyking",
  "based_trader",
  "sigma_grindset",
  "diamond_hands",
  "moon_boy",
  "smart_money",
  "prediction_pro",
];

function generateAddress(): string {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function generateWhaleBet(id: number): WhaleBet {
  const address = generateAddress();
  const traderName = traderNames[Math.floor(Math.random() * traderNames.length)];
  const amount = 50000 + Math.floor(Math.random() * 450000);
  const type = Math.random() > 0.5 ? 'YES' : 'NO';
  
  return {
    id: `bet-${id}`,
    trader: traderName,
    traderAddress: address,
    market: marketNames[Math.floor(Math.random() * marketNames.length)],
    outcome: type,
    amount,
    timestamp: new Date(Date.now() - Math.random() * 3600000),
    odds: 0.1 + Math.random() * 0.8,
    type,
  };
}

export function generateTraders(): Trader[] {
  return traderNames.map((name, index) => {
    const totalBets = 50 + Math.floor(Math.random() * 500);
    const winPercentage = 35 + Math.random() * 45;
    const totalWins = Math.floor(totalBets * (winPercentage / 100));
    const totalVolume = 100000 + Math.random() * 5000000;
    const pnl = (Math.random() - 0.3) * totalVolume * 0.3;
    
    return {
      id: `trader-${index}`,
      address: generateAddress(),
      displayName: name,
      totalVolume,
      winPercentage,
      totalBets,
      totalWins,
      pnl,
    };
  }).sort((a, b) => b.totalVolume - a.totalVolume);
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount.toFixed(0)}`;
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
