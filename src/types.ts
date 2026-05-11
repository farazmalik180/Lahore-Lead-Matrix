export interface Lead {
  id: string;
  name: string;
  category: 'Fitness' | 'Cafe' | 'Co-working' | 'Tech' | 'Retail' | 'Lifestyle';
  currentMainBranch: string;
  expansionScore: number;
  gapReason: string;
  contact: string;
  priority: 'High' | 'Medium';
}

export interface Sector {
  id: string;
  name: string;
  center: { lat: number; lng: number };
}
