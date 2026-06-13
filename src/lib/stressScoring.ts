import type { StressResult, StressStyleScore } from '../data/stressData';
export type { StressResult } from '../data/stressData';
import { stressStyles } from '../data/stressData';
import { stressQuestions } from '../data/stressQuestions';

const mapping = [
  { id: 'problem', start: 0, count: 6 },
  { id: 'emotion', start: 6, count: 6 },
  { id: 'support', start: 12, count: 6 },
  { id: 'avoidant', start: 18, count: 6 },
];

export function computeStressResults(answers: Map<string, number>): StressResult {
  const styles: StressStyleScore[] = stressStyles.map(style => {
    const m = mapping.find(x => x.id === style.id)!;
    let raw = 0, max = 0;
    for (let i = 0; i < m.count; i++) {
      const qId = `ST_${m.start + i + 1}`;
      const a = answers.get(qId); if (a == null) continue;
      max += 7;
      const q = stressQuestions.find(x => x.id === qId);
      raw += q?.reverse ? 8 - a : a;
    }
    const pct = max > 0 ? Math.round((raw / max) * 100) : 50;
    return { ...style, percentage: pct };
  });
  styles.sort((a, b) => b.percentage - a.percentage);
  return { styles, primary: styles[0], timestamp: Date.now() };
}
