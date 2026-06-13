import type { TemperamentResult, TemperamentScore } from '../data/temperamentData';
import { temperamentList } from '../data/temperamentData';
import { temperamentQuestions } from '../data/temperamentQuestions';

// 双维度计分模型
// 题1-10: 唤醒度(Arousal) — 高分=容易唤醒(浓), 低分=难以唤醒(淡)
// 题11-20: 反应性(Reactivity) — 高分=强烈反应(浓), 低分=克制反应(淡)

// Each dimension: 10 questions × max 7 points = 70 max
const MAX_PER_DIM = 10 * 7;

export function computeTemperamentResults(answers: Map<string, number>): TemperamentResult {
  let arousalRaw = 0;
  let reactivityRaw = 0;

  for (const q of temperamentQuestions) {
    const answer = answers.get(q.id);
    if (answer == null) continue;
    const score = q.reverse ? 8 - answer : answer;

    if (q.domain === 'arousal') {
      arousalRaw += score;
    } else if (q.domain === 'reactivity') {
      reactivityRaw += score;
    }
  }

  const arousalPct = Math.round((arousalRaw / MAX_PER_DIM) * 100);
  const reactivityPct = Math.round((reactivityRaw / MAX_PER_DIM) * 100);

  // Compute proximity to each type (closer in 2D space = higher percentage)
  // Ideal points in normalized space (0-100):
  const ideal: Record<string, { a: number; r: number }> = {
    'pure-bland': { a: 15, r: 15 },             // very low both
    'bland-outside-rich-inside': { a: 25, r: 80 }, // low arousal + high reactivity
    'intermittent-rich': { a: 55, r: 50 },        // middle
    'pure-concentrated': { a: 85, r: 85 },        // very high both
  };

  const distances: { id: string; dist: number }[] = temperamentList.map(t => {
    const pt = ideal[t.id];
    const dx = arousalPct - pt.a;
    const dy = reactivityPct - pt.r;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return { id: t.id, dist };
  });

  // Convert distances to percentages: shorter distance = higher percentage
  // Max possible distance in diagonal ≈ 141
  const maxDist = 141;
  const rawPcts = distances.map(d => ({
    id: d.id,
    raw: Math.max(0, Math.round(100 - (d.dist / maxDist) * 100)),
  }));

  // Normalize so they sum to ~100%
  const rawSum = rawPcts.reduce((s, x) => s + x.raw, 0);
  const scale = rawSum > 0 ? 100 / rawSum : 1;

  const styles: TemperamentScore[] = rawPcts.map(rp => {
    const tmpl = temperamentList.find(t => t.id === rp.id)!;
    const pct = Math.round(rp.raw * scale);
    // Ensure no negative
    const safePct = Math.max(0, Math.min(100, pct));
    return { ...tmpl, percentage: safePct };
  });

  // Sort descending and normalize so top is 100
  styles.sort((a, b) => b.percentage - a.percentage);

  return {
    styles,
    primary: styles[0],
    arousalRaw,
    reactivityRaw,
    arousalPct,
    reactivityPct,
    timestamp: Date.now(),
  };
}
