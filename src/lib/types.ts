export interface Question {
  id: string;
  text: string;
  domain: string;
  facet: string;
  reverse: boolean;
  pairId?: string; // for consistency check pairs
}

export interface FacetScore {
  name: string;
  label: string;
  rawScore: number;
  maxScore: number;
  percentile: number;
}

export interface DomainScore {
  key: DomainKey;
  name: string;
  label: string;
  color: string;
  rawScore: number;
  maxScore: number;
  percentile: number;
  level: 'low' | 'moderate' | 'high';
  facets: FacetScore[];
  interpretation: string;
}

export interface PersonalityResult {
  domains: DomainScore[];
  consistencyCheck: {
    passed: boolean;
    inconsistentPairs: number;
    totalPairs: number;
    message: string;
  };
  timestamp: number;
}

export type DomainKey = 'O' | 'C' | 'E' | 'A' | 'N';

export interface DomainMeta {
  key: DomainKey;
  name: string;
  label: string;
  color: string;
  description: string;
  facets: FacetMeta[];
}

export interface FacetMeta {
  name: string;
  label: string;
  description: string;
}


