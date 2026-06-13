import type { AnimalResult, AnimalScore } from '../data/animalData';
export type { AnimalResult } from '../data/animalData';
import { animalList } from '../data/animalData';
import { animalQuestions } from '../data/animalQuestions';

const mapping: { id: string; start: number; count: number }[] = [
  { id: 'lion', start: 0, count: 4 }, { id: 'owl', start: 4, count: 4 },
  { id: 'dolphin', start: 8, count: 4 }, { id: 'fox', start: 12, count: 4 },
  { id: 'bear', start: 16, count: 4 }, { id: 'deer', start: 20, count: 4 },
  { id: 'eagle', start: 24, count: 3 }, { id: 'wolf', start: 27, count: 3 },
];

export function computeAnimalResults(answers: Map<string, number>): AnimalResult {
  const animals: AnimalScore[] = animalList.map(a => {
    const m = mapping.find(x => x.id === a.id)!;
    let raw = 0, max = 0;
    for (let i = 0; i < m.count; i++) {
      const qId = `AN_${m.start + i + 1}`;
      const ans = answers.get(qId); if (ans == null) continue;
      max += 7;
      const q = animalQuestions.find(x => x.id === qId);
      raw += q?.reverse ? 8 - ans : ans;
    }
    const pct = max > 0 ? Math.round((raw / max) * 100) : 50;
    return { ...a, percentage: pct };
  });
  animals.sort((a, b) => b.percentage - a.percentage);
  return { animals, top: animals[0], timestamp: Date.now() };
}
