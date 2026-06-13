import type { MeritocracyResult, MeritocracyStyleScore, MeritocracyDimension } from '../data/meritocracyData';
import { meritocracyStyles, meritocracyDimensions } from '../data/meritocracyData';
import { meritocracyQuestions } from '../data/meritocracyQuestions';

export function computeMeritocracyResults(answers: Map<string, number>): MeritocracyResult {
  const dims: MeritocracyDimension[] = meritocracyDimensions.map(d => {
    let raw = 0, max = 0;
    for (const q of meritocracyQuestions) {
      if (q.facet !== d.id) continue;
      const ans = answers.get(q.id); if (ans == null) continue;
      max += 7;
      raw += q.reverse ? 8 - ans : ans;
    }
    const pct = max > 0 ? Math.round((raw / max) * 100) : 50;
    return { ...d, rawScore: raw, maxScore: max, percentage: pct };
  });

  // Compute composite: average of effort_attribution and self_blame minus luck_acknowledgment and structure_critique
  const effortIdx = dims.findIndex(d => d.id === 'effort_attribution');
  const luckIdx = dims.findIndex(d => d.id === 'luck_acknowledgment');
  const structIdx = dims.findIndex(d => d.id === 'structure_critique');
  const blameIdx = dims.findIndex(d => d.id === 'self_blame');

  const meritPct = Math.round((dims[effortIdx].percentage + dims[blameIdx].percentage + (100 - dims[luckIdx].percentage) + (100 - dims[structIdx].percentage)) / 4);
  const totalPct = Math.max(0, Math.min(100, meritPct));

  // Map to styles using proximity
  const ideal: Record<string, number> = { 'self-made': 85, 'awake-striver': 55, 'buddha-lying': 15, 'conflicted': 45 };
  const styleScores = meritocracyStyles.map(s => {
    const diff = Math.abs(totalPct - ideal[s.id]);
    const pct = Math.max(0, Math.min(100, 100 - (diff / 70) * 100));
    return { ...s, percentage: Math.round(pct) };
  });
  const normSum = styleScores.reduce((acc, s) => acc + s.percentage, 0);
  const scale = normSum > 0 ? 100 / normSum : 1;
  const styles: MeritocracyStyleScore[] = styleScores.map(s => ({ ...s, percentage: Math.max(0, Math.min(100, Math.round(s.percentage * scale))) }));
  styles.sort((a, b) => b.percentage - a.percentage);

  return { dimensions: dims, styles, primary: styles[0], totalScore: meritPct, totalPct, timestamp: Date.now() };
}
