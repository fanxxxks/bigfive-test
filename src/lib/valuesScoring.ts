import { valuesList } from '../data/valuesData';
import { valuesQuestions } from '../data/valuesQuestions';

export interface ValuesResult {
  values: ValueScore[];
  timestamp: number;
}

export interface ValueScore {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  motto: string;
  rawScore: number;
  maxScore: number;
  percentage: number;
}

export function computeValuesResults(answers: Map<string, number>): ValuesResult {
  const values: ValueScore[] = valuesList.map((val, idx) => {
    const baseIdx = idx * 4;
    let rawScore = 0;
    let maxScore = 0;

    for (let i = 0; i < 4; i++) {
      const qId = `VL_${baseIdx + i + 1}`;
      const answer = answers.get(qId);
      if (answer == null) continue;
      maxScore += 7;
      const question = valuesQuestions.find(q => q.id === qId);
      const isReverse = question?.reverse ?? (i === 2); // fallback to position heuristic
      rawScore += isReverse ? 8 - answer : answer;
    }

    const percentage = maxScore > 0 ? Math.round((rawScore / maxScore) * 100) : 50;

    return {
      id: val.id,
      name: val.name,
      emoji: val.emoji,
      color: val.color,
      description: val.description,
      motto: val.motto,
      rawScore,
      maxScore,
      percentage,
    };
  });

  // Sort descending
  values.sort((a, b) => b.percentage - a.percentage);

  return { values, timestamp: Date.now() };
}
