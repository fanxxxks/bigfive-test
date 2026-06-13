import type { DomainScore, FacetScore, PersonalityResult, Question } from './types';
import { questions } from '../data/questions';
import { domainMeta } from '../data/domainMeta';
import { domainNorms, facetNorms, scoreToPercentile, getLevel } from '../data/norms';

/**
 * Shuffle an array using Fisher-Yates algorithm.
 */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Group shuffled questions into pages of ITEMS_PER_PAGE each.
 */
export function paginateQuestions(
  itemsPerPage: number,
): Question[][] {
  const shuffled = shuffle(questions);
  const pages: Question[][] = [];
  for (let i = 0; i < shuffled.length; i += itemsPerPage) {
    pages.push(shuffled.slice(i, i + itemsPerPage));
  }
  return pages;
}

/**
 * Calculate the score for a single question.
 * Reverse-scored items get 8 - score.
 */
function itemScore(q: Question, answer: number): number {
  return q.reverse ? 8 - answer : answer;
}

/**
 * Run consistency check: compare answers on paired items.
 * Returns { passed, inconsistentPairs, totalPairs, message }.
 * A pair is flagged if the absolute difference ≥ 3.
 */
function consistencyCheck(answers: Map<string, number>): {
  passed: boolean;
  inconsistentPairs: number;
  totalPairs: number;
  message: string;
} {
  const pairs = new Map<string, { qA: Question; qB: Question }>();
  for (const q of questions) {
    if (!q.pairId) continue;
    const existing = pairs.get(q.pairId);
    if (existing) {
      const scoreA = answers.get(existing.qA.id);
      const scoreB = answers.get(q.id);
      if (scoreA != null && scoreB != null) {
        const diff = Math.abs(
          itemScore(existing.qA, scoreA) - itemScore(q, scoreB),
        );
        if (diff >= 3) {
          // Flag this pair as inconsistent
          const flagged = pairs.get('__flagged__' + q.pairId);
          if (!flagged) {
            pairs.set('__flagged__' + q.pairId, { qA: existing.qA, qB: q });
          }
        }
      }
    } else {
      pairs.set(q.pairId, { qA: q, qB: null! });
    }
  }

  let inconsistentPairs = 0;
  for (const [key] of pairs) {
    if (key.startsWith('__flagged__')) inconsistentPairs++;
  }

  const totalPairs = 10;
  const passed = inconsistentPairs <= 3;

  let message: string;
  if (inconsistentPairs === 0) {
    message = '您的回答高度一致，数据可信度非常高。';
  } else if (inconsistentPairs <= 2) {
    message = '您的回答基本一致，数据可信度良好。';
  } else if (inconsistentPairs <= 3) {
    message = '您的回答存在一定的不一致，但仍在可接受范围内。';
  } else {
    message = `您的回答中存在 ${inconsistentPairs} 对明显不一致的答案，数据可信度较低。建议您认真重新作答以获得更准确的结果。`;
  }

  return { passed, inconsistentPairs, totalPairs, message };
}

/**
 * Main scoring function: compute domain scores, facet scores,
 * percentiles, and consistency check from raw answers.
 */
export function computeResults(answersMap: Map<string, number>): PersonalityResult {
  // Group questions by domain and facet
  const domainQuestions = new Map<string, Question[]>();
  const facetQuestions = new Map<string, Question[]>();

  for (const q of questions) {
    if (q.pairId) continue; // skip consistency items from scoring

    const dq = domainQuestions.get(q.domain) || [];
    dq.push(q);
    domainQuestions.set(q.domain, dq);

    const key = `${q.domain}_${q.facet}`;
    const fq = facetQuestions.get(key) || [];
    fq.push(q);
    facetQuestions.set(key, fq);
  }

  // Compute facet scores
  const facetScoresMap = new Map<string, FacetScore>();
  for (const [key, fqs] of facetQuestions) {
    const [domain, facetName] = key.split('_');
    let rawScore = 0;
    for (const q of fqs) {
      const answer = answersMap.get(q.id);
      if (answer != null) {
        rawScore += itemScore(q, answer);
      }
    }
    const maxScore = fqs.length * 7; // each item max 7
    const norm = facetNorms[facetName];
    const percentile = norm ? scoreToPercentile(rawScore, norm) : 50;
    const meta = domainMeta.find(d => d.key === domain)?.facets.find(f => f.name === facetName);

    facetScoresMap.set(key, {
      name: facetName,
      label: meta?.label || facetName,
      rawScore,
      maxScore,
      percentile,
    });
  }

  // Compute domain scores
  const domains: DomainScore[] = domainMeta.map(dm => {
    const dqs = domainQuestions.get(dm.key) || [];
    let rawScore = 0;
    for (const q of dqs) {
      const answer = answersMap.get(q.id);
      if (answer != null) {
        rawScore += itemScore(q, answer);
      }
    }
    const maxScore = dqs.length * 7;
    const norm = domainNorms[dm.key];
    const percentile = norm ? scoreToPercentile(rawScore, norm) : 50;
    const level = getLevel(percentile);

    // Gather facets for this domain
    const facets: FacetScore[] = [];
    for (const [key, fs] of facetScoresMap) {
      if (key.startsWith(dm.key + '_')) {
        facets.push(fs);
      }
    }

    return {
      key: dm.key,
      name: dm.name,
      label: dm.label,
      color: dm.color,
      rawScore,
      maxScore,
      percentile,
      level,
      facets,
      interpretation: dm.description,
    };
  });

  const consistency = consistencyCheck(answersMap);

  return {
    domains,
    consistencyCheck: consistency,
    timestamp: Date.now(),
  };
}
