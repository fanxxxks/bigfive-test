import GenericQuizEngine from './GenericQuizEngine';
import { decisionQuestions, DECISION_ITEMS_PER_PAGE } from '../data/decisionQuestions';
import { computeDecisionResults } from '../lib/decisionScoring';

const BASE = import.meta.env.BASE_URL;

export default function DecisionQuizEngine() {
  return (
    <GenericQuizEngine
      config={{
        id: 'decision',
        title: '决策风格测评',
        questions: decisionQuestions,
        itemsPerPage: DECISION_ITEMS_PER_PAGE,
        likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
        resultKey: 'decision_result',
        resultUrl: `${BASE}decision-results`,
        startScreen: {
          emoji: '🧭',
          title: '决策风格测评',
          description: '30道题 · 约3-5分钟 · 了解你的决策模式',
          features: [
            '涵盖<strong>4种决策风格</strong>：分析型、直觉型、集思广益型、审慎型',
            '共 <strong>30</strong> 道题目，预计耗时 <strong>约3-5分钟</strong>',
            '从日常选择到重大决策，全面扫描你的决策习惯',
            '即时生成决策风格分析和改善建议',
            '了解自己的决策模式，让你在关键时刻做出更好的选择',
          ],
          tip: '请根据你的<strong>真实习惯</strong>作答，而不是你"应该"怎么做。每个人的决策风格都是独特的，没有标准答案。',
        },
      }}
      computeResult={computeDecisionResults}
    />
  );
}
