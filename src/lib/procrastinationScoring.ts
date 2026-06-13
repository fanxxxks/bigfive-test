import type { ProcrastinationResult, ProcrastinationStyleScore, ProcrastinationDimension } from '../data/procrastinationData';
import { procrastinationStyles, procrastinationDimensions } from '../data/procrastinationData';
import { procrastinationQuestions } from '../data/procrastinationQuestions';

export function computeProcrastinationResults(answers: Map<string, number>): ProcrastinationResult {
  const dims: ProcrastinationDimension[] = procrastinationDimensions.map(d => {
    let raw = 0, max = 0;
    for (const q of procrastinationQuestions) {
      if (q.facet !== d.id) continue;
      const ans = answers.get(q.id); if (ans == null) continue;
      max += 7; raw += q.reverse ? 8 - ans : ans;
    }
    const pct = max > 0 ? Math.round((raw / max) * 100) : 50;
    let interp = '';
    if (pct >= 70) interp = '偏高——这是你拖延的主要驱动力。';
    else if (pct >= 40) interp = '中等——在某些情境下会有影响。';
    else interp = '偏低——这不太是你拖延的原因。';
    return { ...d, percentage: pct, interpretation: interp };
  });

  // Map to styles based on dimension patterns
  const dd = dims.find(d => d.id === 'deadline_dependence')!.percentage;
  const pf = dims.find(d => d.id === 'perfectionism')!.percentage;
  const ta = dims.find(d => d.id === 'task_aversion')!.percentage;
  const in_ = dims.find(d => d.id === 'initiation')!.percentage;

  const stylePcts: Record<string, number> = {};
  if (dd >= 60) { stylePcts['deadline-warrior'] = 80; stylePcts['perfectionist-paralysis'] = 10; stylePcts['task-avoider'] = 5; stylePcts['free-spirit'] = 5; }
  else if (pf >= 60) { stylePcts['perfectionist-paralysis'] = 80; stylePcts['deadline-warrior'] = 10; stylePcts['task-avoider'] = 5; stylePcts['free-spirit'] = 5; }
  else if (ta >= 60) { stylePcts['task-avoider'] = 80; stylePcts['deadline-warrior'] = 10; stylePcts['perfectionist-paralysis'] = 5; stylePcts['free-spirit'] = 5; }
  else if (Math.max(dd, pf, ta, in_) < 40) { stylePcts['free-spirit'] = 80; stylePcts['deadline-warrior'] = 10; stylePcts['perfectionist-paralysis'] = 5; stylePcts['task-avoider'] = 5; }
  else { stylePcts['deadline-warrior'] = 35; stylePcts['perfectionist-paralysis'] = 30; stylePcts['task-avoider'] = 25; stylePcts['free-spirit'] = 10; }

  const normSum = Object.values(stylePcts).reduce((s, v) => s + v, 0);
  const scale = normSum > 0 ? 100 / normSum : 1;
  const styles: ProcrastinationStyleScore[] = procrastinationStyles.map(s => ({ ...s, percentage: Math.round((stylePcts[s.id] || 0) * scale) }));
  styles.sort((a, b) => b.percentage - a.percentage);

  return { dimensions: dims, styles, primary: styles[0], timestamp: Date.now() };
}
