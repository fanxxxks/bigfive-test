import type { DomainScore, PersonalityResult } from './types';
import { domainMeta } from '../data/domainMeta';
import { domainNorms, scoreToPercentile, getLevel } from '../data/norms';
import { shortQuestions } from '../data/shortQuestions';
import { itemScore } from './scoring';

// Full version: 24 items per domain, Short version: 10 items per domain.
// Scale short-version raw scores to full-version equivalent for norm comparison.
// NOTE: DomainScore.rawScore holds the *scaled* value here (not the literal item sum),
// because short-version scores must be projected to full-version range for percentile lookups.
const SCALE_RATIO = 24 / 10; // 2.4

export function computeShortResults(answersMap: Map<string, number>): PersonalityResult {
  const domains: DomainScore[] = domainMeta.map(dm => {
    const dqs = shortQuestions.filter(q => q.domain === dm.key);
    let literalRawScore = 0;
    for (const q of dqs) {
      const answer = answersMap.get(q.id);
      if (answer != null) {
        literalRawScore += itemScore(q.reverse, answer);
      }
    }
    const maxScore = dqs.length * 7;

    // Scale to full-version equivalent for norm comparison
    const scaledScore = literalRawScore * SCALE_RATIO;
    const scaledMax = maxScore * SCALE_RATIO;
    const norm = domainNorms[dm.key];
    const percentile = norm ? scoreToPercentile(scaledScore, norm) : 50;
    const level = getLevel(percentile);

    return {
      key: dm.key,
      name: dm.name,
      label: dm.label,
      color: dm.color,
      rawScore: Math.round(scaledScore), // scaled to full-version equivalent
      maxScore: Math.round(scaledMax),
      percentile,
      level,
      facets: [], // short version has no facets
      interpretation: dm.description,
    };
  });

  return {
    domains,
    consistencyCheck: {
      passed: true,
      inconsistentPairs: 0,
      totalPairs: 0,
      message: '简洁版不包含一致性检验，请确保诚实作答。',
    },
    timestamp: Date.now(),
  };
}
