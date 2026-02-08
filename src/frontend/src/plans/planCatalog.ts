export interface VPSPlan {
  id: string;
  name: string;
  tier: 'free' | 'basic' | 'pro' | 'advanced' | 'gold';
  ram: number;
  cpu: number;
  storage: number;
  price: number;
  currency: string;
  features: string[];
  processor: string;
  storageType: string;
}

export const PLAN_CATALOG: VPSPlan[] = [
  {
    id: 'free',
    name: 'Free Server',
    tier: 'free',
    ram: 8,
    cpu: 2,
    storage: 10,
    price: 0,
    currency: '₹',
    features: [
      '8 GB RAM',
      'Auto-stop after 30 min inactivity',
      'Community support',
      'Basic DDoS protection'
    ],
    processor: 'Shared',
    storageType: 'SSD'
  },
  {
    id: 'starter',
    name: 'Auracloud Starter VPS',
    tier: 'basic',
    ram: 4,
    cpu: 2,
    storage: 25,
    price: 199,
    currency: '₹',
    features: [
      '99.9% Uptime Guarantee',
      'Full Root Access',
      'DDoS Protected Network',
      '24/7 Ticket Support'
    ],
    processor: 'Intel Xeon E5-2680 v2',
    storageType: 'SATA SSD'
  },
  {
    id: 'basic',
    name: 'Auracloud Basic VPS',
    tier: 'basic',
    ram: 8,
    cpu: 4,
    storage: 50,
    price: 299,
    currency: '₹',
    features: [
      '99.9% Uptime Guarantee',
      'Full Root Access',
      'DDoS Protected Network',
      '24/7 Ticket Support'
    ],
    processor: 'Intel Xeon E5-2680 v2',
    storageType: 'SATA SSD'
  },
  {
    id: 'pro',
    name: 'Auracloud Pro VPS',
    tier: 'pro',
    ram: 16,
    cpu: 4,
    storage: 80,
    price: 499,
    currency: '₹',
    features: [
      'DDR4 + NVMe Optimized',
      '99.9% Uptime Guarantee',
      'Full Root Access',
      'Advanced DDoS Protection',
      '24/7 Ticket Support'
    ],
    processor: 'Intel Xeon E5-2667 v4',
    storageType: 'NVMe SSD'
  },
  {
    id: 'power',
    name: 'Auracloud Power VPS',
    tier: 'pro',
    ram: 32,
    cpu: 8,
    storage: 128,
    price: 1499,
    currency: '₹',
    features: [
      'DDR4 + NVMe Optimized',
      '99.9% Uptime Guarantee',
      'Full Root Access',
      'Advanced DDoS Protection',
      '24/7 Priority Support'
    ],
    processor: 'Intel Xeon E5-2667 v4',
    storageType: 'NVMe SSD'
  },
  {
    id: 'advanced-starter',
    name: 'Auracloud Starter Advanced VPS',
    tier: 'advanced',
    ram: 4,
    cpu: 2,
    storage: 25,
    price: 599,
    currency: '₹',
    features: [
      'Enterprise Intel Platinum CPUs',
      'Ultra-Fast NVMe Storage',
      '99.9% Uptime Guarantee',
      'Full Root Access',
      'Advanced DDoS Protection',
      '24/7 Priority Support'
    ],
    processor: 'Intel Platinum 8160',
    storageType: 'NVMe SSD'
  },
  {
    id: 'gold-starter',
    name: 'Auracloud Starter Gold VPS',
    tier: 'gold',
    ram: 4,
    cpu: 2,
    storage: 25,
    price: 350,
    currency: '₹',
    features: [
      'Intel Xeon Gold Series CPUs',
      'High-Throughput NVMe Storage',
      '99.9% Uptime Guarantee',
      'Full Root Access',
      'Advanced DDoS Protection',
      '24/7 Priority Support',
      '⚠️ Pre-order (7 days deployment)'
    ],
    processor: 'Intel Gold 5120',
    storageType: 'NVMe SSD'
  },
  {
    id: 'gold-basic',
    name: 'Auracloud Basic Gold VPS',
    tier: 'gold',
    ram: 8,
    cpu: 4,
    storage: 50,
    price: 550,
    currency: '₹',
    features: [
      'Intel Xeon Gold Series CPUs',
      'High-Throughput NVMe Storage',
      '99.9% Uptime Guarantee',
      'Full Root Access',
      'Advanced DDoS Protection',
      '24/7 Priority Support',
      '⚠️ Pre-order (7 days deployment)'
    ],
    processor: 'Intel Gold 5120',
    storageType: 'NVMe SSD'
  },
  {
    id: 'enterprise',
    name: 'Auracloud Enterprise VPS',
    tier: 'gold',
    ram: 64,
    cpu: 16,
    storage: 256,
    price: 3000,
    currency: '₹',
    features: [
      'Intel Xeon Gold Series CPUs',
      'High-Throughput NVMe Storage',
      '99.9% Uptime Guarantee',
      'Full Root Access',
      'Advanced DDoS Protection',
      '24/7 Priority Support',
      'Dedicated Resources'
    ],
    processor: 'Intel Gold 5120',
    storageType: 'NVMe SSD'
  }
];
