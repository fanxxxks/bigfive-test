import type { OverthinkingResult, OverthinkingStyleScore, OverthinkingDimension } from '../data/overthinkingData';
import { overthinkingStyles, overthinkingDimensions } from '../data/overthinkingData';
import { overthinkingQuestions } from '../data/overthinkingQuestions';

export function computeOverthinkingResults(answers: Map<string, number>): OverthinkingResult {
  const dims: OverthinkingDimension[] = overthinkingDimensions.map(d => {
    let raw = 0, max = 0;
    for (const q of overthinkingQuestions) {
      if (q.facet !== d.id) continue;
      const ans = answers.get(q.id); if (ans == null) continue;
      max += 7; raw += q.reverse ? 8 - ans : ans;
    }
    const pct = max > 0 ? Math.round((raw / max) * 100) : 50;
    let interp = '';
    if (pct >= 70) interp = '偏高——这是你的主要内耗来源，需要关注和主动管理。';
    else if (pct >= 40) interp = '中等——偶尔会有内耗，但在可控范围内。';
    else interp = '偏低——你在这方面比较轻松，不太容易陷入内耗。';
    return { ...d, percentage: pct, interpretation: interp };
  });

  const totalPct = Math.round(dims.reduce((s, d) => s + d.percentage, 0) / dims.length);

  // Style mapping
  const stylePcts: Record<string, number> = {};
  const avgHigh = Math.max(0, ...dims.map(d => d.percentage));
  const variance = dims.reduce((s, d) => s + (d.percentage - totalPct) ** 2, 0) / dims.length;

  if (totalPct >= 65 && variance < 400) { stylePcts['full-speed'] = 80; stylePcts['selective'] = 20; stylePcts['clear-mind'] = 0; stylePcts['intermittent-overthink'] = 0; }
  else if (totalPct >= 65 && variance >= 400) { stylePcts['intermittent-overthink'] = 75; stylePcts['full-speed'] = 25; stylePcts['selective'] = 0; stylePcts['clear-mind'] = 0; }
  else if (totalPct < 65 && totalPct >= 40 && variance >= 400) { stylePcts['selective'] = 70; stylePcts['intermittent-overthink'] = 30; stylePcts['full-speed'] = 0; stylePcts['clear-mind'] = 0; }
  else if (totalPct < 40) { stylePcts['clear-mind'] = 80; stylePcts['selective'] = 20; stylePcts['full-speed'] = 0; stylePcts['intermittent-overthink'] = 0; }
  else { stylePcts['selective'] = 50; stylePcts['intermittent-overthink'] = 30; stylePcts['full-speed'] = 10; stylePcts['clear-mind'] = 10; }

  const normSum = Object.values(stylePcts).reduce((s, v) => s + v, 0);
  const scale = normSum > 0 ? 100 / normSum : 1;
  const styles: OverthinkingStyleScore[] = overthinkingStyles.map(s => ({ ...s, percentage: Math.round((stylePcts[s.id] || 0) * scale) }));
  styles.sort((a, b) => b.percentage - a.percentage);

  let level: string, levelEmoji: string;
  if (totalPct >= 70) { level = '严重内耗'; levelEmoji = '🔋'; }
  else if (totalPct >= 45) { level = '中度内耗'; levelEmoji = '🎯'; }
  else { level = '轻度内耗'; levelEmoji = '🧊'; }

  return { dimensions: dims, styles, primary: styles[0], totalPct, level, levelEmoji, timestamp: Date.now() };
}
