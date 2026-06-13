export interface Question {
  id: string;
  text: string;
  domain: DomainKey;
  facet: string;
  reverse: boolean;
  pairId?: string; // for consistency check pairs
}

export interface Answer {
  questionId: string;
  score: number; // 1-7
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

export interface NormRow {
  percentile: number;
  O: number;
  C: number;
  E: number;
  A: number;
  N: number;
  [facet: string]: number;
}

export interface PageState {
  currentPage: number;
  totalPages: number;
  answers: Map<string, number>;
  isSubmitted: boolean;
}
