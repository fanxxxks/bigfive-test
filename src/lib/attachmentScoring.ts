import type { AttachmentResult } from '../data/attachmentData';
export type { AttachmentResult } from '../data/attachmentData';
import { attachmentStyles } from '../data/attachmentData';
import { attachmentQuestions } from '../data/attachmentQuestions';

// Questions 1-18 = Anxiety, 19-36 = Avoidance
const ANXIETY_COUNT = 18;
const AVOIDANCE_COUNT = 18;

export function computeAttachmentResults(answers: Map<string, number>): AttachmentResult {
  let anxietyRaw = 0;
  let avoidanceRaw = 0;

  for (let i = 1; i <= 36; i++) {
    const qId = `AT_${i}`;
    const answer = answers.get(qId);
    if (answer == null) continue;

    const question = attachmentQuestions.find(q => q.id === qId);
    const score = question?.reverse ? 8 - answer : answer;

    if (i <= ANXIETY_COUNT) {
      anxietyRaw += score;
    } else {
      avoidanceRaw += score;
    }
  }

  const anxietyMax = ANXIETY_COUNT * 7;
  const avoidanceMax = AVOIDANCE_COUNT * 7;

  const anxiety = Math.round((anxietyRaw / anxietyMax) * 100);
  const avoidance = Math.round((avoidanceRaw / avoidanceMax) * 100);

  // Determine style based on both dimensions
  // High = >50%, Low = ≤50%
  let styleId: string;
  if (anxiety <= 50 && avoidance <= 50) {
    styleId = 'secure';
  } else if (anxiety > 50 && avoidance <= 50) {
    styleId = 'anxious';
  } else if (anxiety <= 50 && avoidance > 50) {
    styleId = 'avoidant';
  } else {
    styleId = 'fearful';
  }

  // Calculate percentages for each style (proximity-based)
  const stylePercentages = {
    secure: Math.round(100 - (anxiety + avoidance) / 2),
    anxious: Math.round(((anxiety) + (100 - avoidance)) / 2),
    avoidant: Math.round(((100 - anxiety) + (avoidance)) / 2),
    fearful: Math.round((anxiety + avoidance) / 2),
  };

  return {
    anxiety,
    avoidance,
    style: attachmentStyles[styleId],
    stylePercentages,
    timestamp: Date.now(),
  };
}
