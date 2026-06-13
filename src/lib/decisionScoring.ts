import type { DecisionResult, DecisionStyleScore } from '../data/decisionData';
export type { DecisionResult } from '../data/decisionData';
import { decisionStyles } from '../data/decisionData';
import { decisionQuestions } from '../data/decisionQuestions';

// Q1-8: Analytical, Q9-16: Intuitive, Q17-22: Dependent, Q23-30: Avoidant
const styleMapping: { id: string; startIdx: number; count: number }[] = [
  { id: 'analytical', startIdx: 0, count: 8 },
  { id: 'intuitive', startIdx: 8, count: 8 },
  { id: 'dependent', startIdx: 16, count: 6 },
  { id: 'avoidant', startIdx: 22, count: 8 },
];

export function computeDecisionResults(answers: Map<string, number>): DecisionResult {
  const styles: DecisionStyleScore[] = decisionStyles.map(style => {
    const mapping = styleMapping.find(m => m.id === style.id)!;
    let rawScore = 0;
    let maxScore = 0;

    for (let i = 0; i < mapping.count; i++) {
      const qId = `DC_${mapping.startIdx + i + 1}`;
      const answer = answers.get(qId);
      if (answer == null) continue;
      maxScore += 7;
      const question = decisionQuestions.find(q => q.id === qId);
      const isReverse = question?.reverse ?? false;
      rawScore += isReverse ? 8 - answer : answer;
    }

    const percentage = maxScore > 0 ? Math.round((rawScore / maxScore) * 100) : 50;

    return { ...style, percentage };
  });

  styles.sort((a, b) => b.percentage - a.percentage);

  return { styles, primary: styles[0], timestamp: Date.now() };
}
