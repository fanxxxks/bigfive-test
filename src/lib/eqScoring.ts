import type { EQResult, EQDimension } from '../data/eqData';
export type { EQResult } from '../data/eqData';
import { eqDimensions } from '../data/eqData';
import { eqQuestions } from '../data/eqQuestions';

const m = [
  { id: 'awareness', s: 0 }, { id: 'regulation', s: 5 },
  { id: 'empathy', s: 10 }, { id: 'social', s: 15 }, { id: 'motivation', s: 20 },
];

export function computeEQResults(answers: Map<string, number>): EQResult {
  const dims: EQDimension[] = eqDimensions.map(d => {
    const mm = m.find(x => x.id === d.id)!;
    let raw = 0, max = 0;
    for (let i = 0; i < 5; i++) {
      const qId = `EQ_${mm.s + i + 1}`;
      const ans = answers.get(qId); if (ans == null) continue;
      max += 7;
      const q = eqQuestions.find(z => z.id === qId);
      raw += q?.reverse ? 8 - ans : ans;
    }
    const pct = max > 0 ? Math.round((raw / max) * 100) : 50;
    return { ...d, rawScore: raw, maxScore: max, percentage: pct };
  });

  const totalScore = Math.round(dims.reduce((s, d) => s + d.percentage, 0) / dims.length);
  let level: string, levelEmoji: string;
  if (totalScore >= 80) { level = '情商高手'; levelEmoji = '🌟'; }
  else if (totalScore >= 65) { level = '情商良好'; levelEmoji = '👍'; }
  else if (totalScore >= 50) { level = '情商中等'; levelEmoji = '📊'; }
  else if (totalScore >= 35) { level = '情商有待提升'; levelEmoji = '📖'; }
  else { level = '情商需要关注'; levelEmoji = '🌱'; }

  return { dimensions: dims, totalScore, level, levelEmoji, timestamp: Date.now() };
}
