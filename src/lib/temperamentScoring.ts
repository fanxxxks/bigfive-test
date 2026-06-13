import type { TemperamentResult, TemperamentTypeScore } from '../data/temperamentData';
export type { TemperamentResult } from '../data/temperamentData';
import { temperamentTypes } from '../data/temperamentData';
import { temperamentQuestions } from '../data/temperamentQuestions';

/**
 * 淡人/浓人气质鉴定计分
 * 双维度模型：情绪唤醒度(Arousal) × 情绪反应性(Reactivity)
 *
 * 高唤醒 + 高反应 → 100%超浓缩 (尖叫土拨鼠)
 * 高唤醒 + 低反应 → 外淡内浓 (保温杯)
 * 低唤醒 + 高反应 → 间歇性浓人 (薛定谔的疯批)
 * 低唤醒 + 低反应 → 100%纯血淡人 (水豚卡皮巴拉)
 */

// Q1-10: arousal, Q11-20: reactivity
const AROUSAL_COUNT = 10;
const REACTIVITY_COUNT = 10;

export function computeTemperamentResults(answers: Map<string, number>): TemperamentResult {
  // Calculate arousal score (0-100)
  let arousalRaw = 0;
  let arousalMax = 0;
  for (let i = 1; i <= AROUSAL_COUNT; i++) {
    const qId = `TM_${i}`;
    const answer = answers.get(qId);
    if (answer == null) continue;
    arousalMax += 7;
    const question = temperamentQuestions.find(q => q.id === qId);
    arousalRaw += question?.reverse ? 8 - answer : answer;
  }
  const arousal = arousalMax > 0 ? Math.round((arousalRaw / arousalMax) * 100) : 50;

  // Calculate reactivity score (0-100)
  let reactivityRaw = 0;
  let reactivityMax = 0;
  for (let i = AROUSAL_COUNT + 1; i <= AROUSAL_COUNT + REACTIVITY_COUNT; i++) {
    const qId = `TM_${i}`;
    const answer = answers.get(qId);
    if (answer == null) continue;
    reactivityMax += 7;
    const question = temperamentQuestions.find(q => q.id === qId);
    reactivityRaw += question?.reverse ? 8 - answer : answer;
  }
  const reactivity = reactivityMax > 0 ? Math.round((reactivityRaw / reactivityMax) * 100) : 50;

  // Determine quadrant → type percentages
  // Each type's "percentage" = proximity to the 4 corners of the quadrant
  // pure-bland: (0,0) corner → score = 100 - (arousal + reactivity)/2
  // pure-intense: (100,100) corner → score = (arousal + reactivity)/2
  // outside-bland-inside-intense: (100,0) corner → score = (arousal + (100-reactivity))/2
  // intermittent-intense: (0,100) corner → score = ((100-arousal) + reactivity)/2

  const typeScores: TemperamentTypeScore[] = temperamentTypes.map(t => {
    let percentage: number;
    switch (t.id) {
      case 'pure-bland':
        percentage = Math.round(100 - (arousal + reactivity) / 2);
        break;
      case 'pure-intense':
        percentage = Math.round((arousal + reactivity) / 2);
        break;
      case 'outside-bland-inside-intense':
        percentage = Math.round((arousal + (100 - reactivity)) / 2);
        break;
      case 'intermittent-intense':
        percentage = Math.round(((100 - arousal) + reactivity) / 2);
        break;
      default:
        percentage = 50;
    }
    return { ...t, percentage: Math.max(0, Math.min(100, percentage)) };
  });

  typeScores.sort((a, b) => b.percentage - a.percentage);

  return {
    types: typeScores,
    primary: typeScores[0],
    arousal,
    reactivity,
    timestamp: Date.now(),
  };
}
