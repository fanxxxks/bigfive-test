import { philosophySchools } from '../data/philosophyData';

export interface PhilosophyResult {
  schools: PhilosophySchoolScore[];
  topSchool: PhilosophySchoolScore;
  timestamp: number;
}

export interface PhilosophySchoolScore {
  id: string;
  name: string;
  label: string;
  emoji: string;
  color: string;
  description: string;
  coreIdeas: string[];
  keyQuote: string;
  keyQuoteAuthor: string;
  /** Raw accumulated score */
  rawScore: number;
  /** Normalized percentage (0-100), higher = stronger alignment */
  percentage: number;
}

// Map each question ID to schools it aligns with (+1) or opposes (-1)
type QuestionMapping = { school: string; direction: 1 | -1 }[];

const questionMap: Record<string, QuestionMapping> = {
  // Block 1: Life Meaning & Purpose
  PH_1: [{ school: 'sartre', direction: 1 }, { school: 'camus', direction: 1 }],
  PH_2: [{ school: 'nietzsche', direction: 1 }, { school: 'sartre', direction: 1 }],
  PH_3: [{ school: 'stoicism', direction: 1 }, { school: 'zhuangzi', direction: 1 }, { school: 'laozi', direction: 1 }],
  PH_4: [{ school: 'schopenhauer', direction: 1 }, { school: 'buddhism', direction: 1 }],
  PH_5: [{ school: 'camus', direction: 1 }, { school: 'nietzsche', direction: 1 }],
  PH_6: [{ school: 'confucius', direction: 1 }],
  PH_7: [{ school: 'sartre', direction: 1 }, { school: 'camus', direction: 1 }],
  PH_8: [{ school: 'laozi', direction: 1 }, { school: 'zhuangzi', direction: 1 }],
  PH_9: [{ school: 'aristotle', direction: 1 }, { school: 'confucius', direction: 1 }],
  PH_10: [{ school: 'marx', direction: 1 }],

  // Block 2: Morality & Ethics
  PH_11: [{ school: 'utilitarianism', direction: 1 }],
  PH_12: [{ school: 'kant', direction: 1 }],
  PH_13: [{ school: 'confucius', direction: 1 }],
  PH_14: [{ school: 'hume', direction: 1 }, { school: 'schopenhauer', direction: 1 }],
  PH_15: [{ school: 'wangyangming', direction: 1 }],
  PH_16: [{ school: 'nietzsche', direction: 1 }],
  PH_17: [{ school: 'kant', direction: 1 }],
  PH_18: [{ school: 'confucius', direction: 1 }],
  PH_19: [{ school: 'marx', direction: 1 }],
  PH_20: [{ school: 'hume', direction: 1 }],

  // Block 3: Knowledge & Truth
  PH_21: [{ school: 'hume', direction: 1 }],
  PH_22: [{ school: 'plato', direction: 1 }, { school: 'laozi', direction: 1 }],
  PH_23: [{ school: 'descartes', direction: 1 }],
  PH_24: [{ school: 'hume', direction: 1 }],
  PH_25: [{ school: 'laozi', direction: 1 }, { school: 'zhuangzi', direction: 1 }],
  PH_26: [{ school: 'wangyangming', direction: 1 }, { school: 'marx', direction: 1 }],
  PH_27: [{ school: 'hume', direction: 1 }, { school: 'descartes', direction: -1 }],
  PH_28: [{ school: 'plato', direction: 1 }],
  PH_29: [{ school: 'marx', direction: 1 }],
  PH_30: [{ school: 'wangyangming', direction: 1 }, { school: 'zhuangzi', direction: 1 }],

  // Block 4: Freedom & Choice
  PH_31: [{ school: 'sartre', direction: 1 }],
  PH_32: [{ school: 'schopenhauer', direction: 1 }, { school: 'marx', direction: 1 }],
  PH_33: [{ school: 'stoicism', direction: 1 }, { school: 'zhuangzi', direction: 1 }],
  PH_34: [{ school: 'sartre', direction: 1 }, { school: 'kant', direction: 1 }],
  PH_35: [{ school: 'marx', direction: 1 }],
  PH_36: [{ school: 'stoicism', direction: 1 }, { school: 'buddhism', direction: 1 }],
  PH_37: [{ school: 'zhuangzi', direction: 1 }, { school: 'laozi', direction: 1 }],
  PH_38: [{ school: 'kant', direction: 1 }],
  PH_39: [{ school: 'epicurus', direction: 1 }],
  PH_40: [{ school: 'buddhism', direction: 1 }, { school: 'schopenhauer', direction: 1 }],

  // Block 5: Suffering & Happiness
  PH_41: [{ school: 'nietzsche', direction: 1 }],
  PH_42: [{ school: 'schopenhauer', direction: 1 }],
  PH_43: [{ school: 'stoicism', direction: 1 }],
  PH_44: [{ school: 'buddhism', direction: 1 }, { school: 'schopenhauer', direction: 1 }],
  PH_45: [{ school: 'epicurus', direction: 1 }],
  PH_46: [{ school: 'marx', direction: 1 }, { school: 'camus', direction: 1 }],
  PH_47: [{ school: 'wangyangming', direction: 1 }, { school: 'confucius', direction: 1 }],
  PH_48: [{ school: 'aristotle', direction: 1 }, { school: 'kant', direction: 1 }],
  PH_49: [{ school: 'stoicism', direction: 1 }],
  PH_50: [{ school: 'buddhism', direction: 1 }, { school: 'laozi', direction: 1 }],

  // Block 6: Society & Relationships
  PH_51: [{ school: 'aristotle', direction: 1 }, { school: 'confucius', direction: 1 }],
  PH_52: [{ school: 'sartre', direction: 1 }],
  PH_53: [{ school: 'confucius', direction: 1 }],
  PH_54: [{ school: 'marx', direction: 1 }],
  PH_55: [{ school: 'stoicism', direction: 1 }, { school: 'buddhism', direction: 1 }],
  PH_56: [{ school: 'nietzsche', direction: 1 }],
  PH_57: [{ school: 'plato', direction: 1 }],
  PH_58: [{ school: 'laozi', direction: 1 }, { school: 'zhuangzi', direction: 1 }],
  PH_59: [{ school: 'utilitarianism', direction: 1 }, { school: 'epicurus', direction: 1 }],
  PH_60: [{ school: 'utilitarianism', direction: 1 }],
};

export function computePhilosophyResults(answers: Map<string, number>): PhilosophyResult {
  // Initialize scores for each school
  const scoreMap = new Map<string, number>();
  for (const school of philosophySchools) {
    scoreMap.set(school.id, 0);
  }

  // Accumulate scores from answers
  for (const [qId, answer] of answers) {
    const mappings = questionMap[qId];
    if (!mappings) continue;
    for (const { school, direction } of mappings) {
      const current = scoreMap.get(school) || 0;
      // For positive mapping: agreement (1-7) adds points
      // For negative mapping: disagreement (8-answer) adds points
      const points = direction === 1 ? answer : 8 - answer;
      scoreMap.set(school, current + points);
    }
  }

  // Calculate max possible score per school
  const schoolMaxScores = new Map<string, number>();
  for (const school of philosophySchools) {
    let maxScore = 0;
    for (const mappings of Object.values(questionMap)) {
      for (const m of mappings) {
        if (m.school === school.id) {
          maxScore += 7; // max agreement per question
        }
      }
    }
    schoolMaxScores.set(school.id, maxScore);
  }

  // Build result array with percentages
  const schools: PhilosophySchoolScore[] = philosophySchools.map(school => {
    const rawScore = scoreMap.get(school.id) || 0;
    const maxScore = schoolMaxScores.get(school.id) || 1;
    const percentage = Math.round((rawScore / maxScore) * 100);

    return {
      id: school.id,
      name: school.name,
      label: school.label,
      emoji: school.emoji,
      color: school.color,
      description: school.description,
      coreIdeas: school.coreIdeas,
      keyQuote: school.keyQuote,
      keyQuoteAuthor: school.keyQuoteAuthor,
      rawScore,
      percentage,
    };
  });

  // Sort descending
  schools.sort((a, b) => b.percentage - a.percentage);

  return {
    schools,
    topSchool: schools[0],
    timestamp: Date.now(),
  };
}
