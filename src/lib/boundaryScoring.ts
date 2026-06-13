import type { BoundaryResult, BoundaryScore } from '../data/boundaryData';
import { boundaryList } from '../data/boundaryData';
import { boundaryQuestions } from '../data/boundaryQuestions';

// 双维度计分：坚定性(题1-13) + 讨好倾向(题14-25)
// 坚定性: 高分=坚定(不好惹), 低分=不坚定(讨好)
// 讨好倾向: 高分=讨好, 低分=不讨好(不好惹)

const ASSERT_COUNT = 13;
const PLEASE_COUNT = 12;

export function computeBoundaryResults(answers: Map<string, number>): BoundaryResult {
  let assertRaw = 0;
  let pleaseRaw = 0;

  for (const q of boundaryQuestions) {
    const answer = answers.get(q.id);
    if (answer == null) continue;
    const score = q.reverse ? 8 - answer : answer;

    if (q.domain === 'assert') {
      assertRaw += score;
    } else if (q.domain === 'please') {
      pleaseRaw += score;
    }
  }

  const assertMax = ASSERT_COUNT * 7;
  const pleaseMax = PLEASE_COUNT * 7;
  const assertPct = Math.round((assertRaw / assertMax) * 100);
  const pleasePct = Math.round((pleaseRaw / pleaseMax) * 100);

  // Ideal quadrants in normalized 2D space:
  const ideal: Record<string, { a: number; p: number }> = {
    'soft-candy': { a: 15, p: 85 },        // low assert + high please
    'hedgehog': { a: 85, p: 15 },          // high assert + low please
    'chameleon': { a: 55, p: 50 },          // middle both
    'honey-badger': { a: 90, p: 10 },      // very high assert + very low please
  };

  const distances = boundaryList.map(t => {
    const pt = ideal[t.id];
    const dx = assertPct - pt.a;
    const dy = pleasePct - pt.p;
    return { id: t.id, dist: Math.sqrt(dx * dx + dy * dy) };
  });

  const maxDist = 141;
  const rawPcts = distances.map(d => ({
    id: d.id,
    raw: Math.max(0, Math.round(100 - (d.dist / maxDist) * 100)),
  }));

  const rawSum = rawPcts.reduce((s, x) => s + x.raw, 0);
  const scale = rawSum > 0 ? 100 / rawSum : 1;

  const styles: BoundaryScore[] = rawPcts.map(rp => {
    const tmpl = boundaryList.find(t => t.id === rp.id)!;
    return { ...tmpl, percentage: Math.max(0, Math.min(100, Math.round(rp.raw * scale))) };
  });

  styles.sort((a, b) => b.percentage - a.percentage);

  return {
    styles,
    primary: styles[0],
    assertRaw,
    pleaseRaw,
    assertPct,
    pleasePct,
    timestamp: Date.now(),
  };
}
