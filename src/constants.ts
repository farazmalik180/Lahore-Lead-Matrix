import { Lead, Sector } from './types';

export const DHA_PHASE_4_SECTORS: Sector[] = [
  { id: 'AA', name: 'Sector AA', center: { lat: 31.4783, lng: 74.3751 } },
  { id: 'BB', name: 'Sector BB', center: { lat: 31.4745, lng: 74.3792 } },
  { id: 'CC', name: 'Sector CC', center: { lat: 31.4718, lng: 74.3735 } },
  { id: 'DD', name: 'Sector DD', center: { lat: 31.4685, lng: 74.3768 } }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Structure Health & Fitness',
    category: 'Fitness',
    currentMainBranch: 'Gulberg III, Lahore',
    expansionScore: 9,
    gapReason: 'Strong demand for premium fitness in Phase 4; closest high-end branch is in Phase 5 but often over-capacity.',
    contact: 'www.structure.pk',
    priority: 'High'
  },
  {
    id: '2',
    name: 'Colabs',
    category: 'Co-working',
    currentMainBranch: 'Gulberg (Headquarters)',
    expansionScore: 9,
    gapReason: 'DHA Phase 4 has a high density of remote-working professionals but zero specialized coworking spaces.',
    contact: 'www.colabs.pk',
    priority: 'High'
  },
  {
    id: '3',
    name: 'Third Wave Coffee',
    category: 'Cafe',
    currentMainBranch: 'Gulberg (New Opening)',
    expansionScore: 10,
    gapReason: 'Specialty coffee market in Phase 4 is currently dominated by generic chains. Strong gap for boutique roasters.',
    contact: 'thirdwave.coffee',
    priority: 'High'
  },
  {
    id: '4',
    name: 'Aimfit',
    category: 'Fitness',
    currentMainBranch: 'DHA Phase 5, Lahore',
    expansionScore: 7,
    gapReason: 'Medium Priority due to Phase 5 proximity, but their high-intensity classes (HIC) would capture the Sector XX market.',
    contact: 'www.aimfit.pk',
    priority: 'Medium'
  },
  {
    id: '5',
    name: 'Ammar\'s Bakery',
    category: 'Lifestyle',
    currentMainBranch: 'Gulberg II, Lahore',
    expansionScore: 8,
    gapReason: 'Phase 4 lacks a gourmet, small-batch bakery. Most residents currently drive to Gulberg for high-quality sourdough.',
    contact: 'ammarbakery.com',
    priority: 'High'
  },
  {
    id: '6',
    name: 'Baskin Robbins',
    category: 'Lifestyle',
    currentMainBranch: 'Gulberg / Phase 6',
    expansionScore: 6,
    gapReason: 'Moderate gap; Phase 3 has a branch, but Phase 4 central commercial (AA) is under-served for premium dessert.',
    contact: 'baskinrobbins.pk',
    priority: 'Medium'
  }
];
