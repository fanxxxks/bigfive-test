import type { DomainScore, PersonalityResult } from './types';
import { domainMeta } from '../data/domainMeta';
import { domainNorms, scoreToPercentile, getLevel } from '../data/norms';
import { shortQuestions } from '../data/shortQuestions';

// Full version: 24 items per domain, Short version: 10 items per domain
const SCALE_RATIO = 24 / 10; // 2.4

function itemScore(reverse: boolean, answer: number): number {
  return reverse ? 8 - answer : answer;
}

export function computeShortResults(answersMap: Map<string, number>): PersonalityResult {
  const domains: DomainScore[] = domainMeta.map(dm => {
    const dqs = shortQuestions.filter(q => q.domain === dm.key);
    let rawScore = 0;
    for (const q of dqs) {
      const answer = answersMap.get(q.id);
      if (answer != null) {
        rawScore += itemScore(q.reverse, answer);
      }
    }
    const maxScore = dqs.length * 7;

    // Scale to full-version equivalent for norm comparison
    const scaledScore = rawScore * SCALE_RATIO;
    const scaledMax = maxScore * SCALE_RATIO;
    const norm = domainNorms[dm.key];
    const percentile = norm ? scoreToPercentile(scaledScore, norm) : 50;
    const level = getLevel(percentile);

    return {
      key: dm.key,
      name: dm.name,
      label: dm.label,
      color: dm.color,
      rawScore: Math.round(scaledScore),
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
