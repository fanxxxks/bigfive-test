import GenericQuizEngine from './GenericQuizEngine';
import { valuesQuestions, VALUES_ITEMS_PER_PAGE } from '../data/valuesQuestions';
import { computeValuesResults } from '../lib/valuesScoring';

const BASE = import.meta.env.BASE_URL;

export default function ValuesQuizEngine() {
  return (
    <GenericQuizEngine
      config={{
        id: 'values',
        title: '核心价值观测评',
        questions: valuesQuestions,
        itemsPerPage: VALUES_ITEMS_PER_PAGE,
        likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
        resultKey: 'values_result',
        resultUrl: `${BASE}values-results`,
        startScreen: {
          emoji: '💎',
          title: '核心价值观测评',
          description: '40道题 · 约5分钟 · 探索你内心最看重的价值',
          features: [
            '基于 <strong>Schwartz 的10种基本价值观理论</strong>',
            '共 <strong>40</strong> 道题目，预计耗时 <strong>约5分钟</strong>',
            '涵盖权力、成就、享乐、刺激、自主、普世关怀、仁爱、传统、遵从、安全',
            '即时生成价值观排序和深度解读',
            '了解你的价值观有助于做出更符合内心的职业和人生选择',
          ],
          tip: '选择你<strong>真实看重</strong>的东西，而不是你认为"应该"看重的。价值观没有对错，只有是否适合你。',
        },
      }}
      computeResult={computeValuesResults}
    />
  );
}
