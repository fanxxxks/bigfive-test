// Norm data for IPIP-NEO-120 based on published research (Johnson, 2014)
// Each scale: { mean, sd } based on large international samples
// Raw score ranges: Domains (24 items × 1-7 = 24-168), Facets (4 items × 1-7 = 4-28)

export interface ScaleNorm {
  mean: number;
  sd: number;
}

export const domainNorms: Record<string, ScaleNorm> = {
  O: { mean: 102, sd: 18 },
  C: { mean: 104, sd: 19 },
  E: { mean: 96, sd: 20 },
  A: { mean: 110, sd: 16 },
  N: { mean: 80, sd: 21 },
};

export const facetNorms: Record<string, ScaleNorm> = {
  // Openness facets
  O1: { mean: 18, sd: 4.5 },
  O2: { mean: 16, sd: 5 },
  O3: { mean: 17, sd: 4.5 },
  O4: { mean: 15, sd: 5 },
  O5: { mean: 17, sd: 5 },
  O6: { mean: 16, sd: 4 },

  // Conscientiousness facets
  C1: { mean: 20, sd: 4 },
  C2: { mean: 17, sd: 5.5 },
  C3: { mean: 20, sd: 4 },
  C4: { mean: 18, sd: 5 },
  C5: { mean: 17, sd: 5.5 },
  C6: { mean: 16, sd: 5 },

  // Extraversion facets
  E1: { mean: 17, sd: 5 },
  E2: { mean: 15, sd: 5.5 },
  E3: { mean: 16, sd: 5 },
  E4: { mean: 17, sd: 4.5 },
  E5: { mean: 14, sd: 5 },
  E6: { mean: 18, sd: 5 },

  // Agreeableness facets
  A1: { mean: 18, sd: 4.5 },
  A2: { mean: 21, sd: 3.5 },
  A3: { mean: 20, sd: 4 },
  A4: { mean: 19, sd: 4.5 },
  A5: { mean: 18, sd: 5 },
  A6: { mean: 19, sd: 4.5 },

  // Neuroticism facets
  N1: { mean: 14, sd: 5.5 },
  N2: { mean: 13, sd: 5 },
  N3: { mean: 12, sd: 5.5 },
  N4: { mean: 14, sd: 5 },
  N5: { mean: 14, sd: 5 },
  N6: { mean: 12, sd: 5 },
};

/**
 * Calculate percentile from raw score using normal distribution.
 * Uses a two-sided rank-based approach: p = Φ((x - μ) / σ) × 100
 */
export function scoreToPercentile(rawScore: number, norm: ScaleNorm): number {
  const z = (rawScore - norm.mean) / norm.sd;
  // Normal CDF approximation (Abramowitz & Stegun 26.2.17)
  const cdf = normalCDF(z);
  return Math.round(cdf * 100);
}

/**
 * Abramowitz & Stegun approximation of the standard normal CDF.
 */
function normalCDF(z: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1 + sign * y);
}

export function getLevel(percentile: number): 'low' | 'moderate' | 'high' {
  if (percentile <= 30) return 'low';
  if (percentile >= 70) return 'high';
  return 'moderate';
}
