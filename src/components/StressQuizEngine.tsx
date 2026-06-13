import GenericQuizEngine from './GenericQuizEngine';
import { stressQuestions, STRESS_ITEMS_PER_PAGE } from '../data/stressQuestions';
import { computeStressResults } from '../lib/stressScoring';
const BASE = import.meta.env.BASE_URL;

export default function StressQuizEngine() {
  return (
    <GenericQuizEngine config={{
      id: 'stress', title: '压力应对方式测评', questions: stressQuestions, itemsPerPage: STRESS_ITEMS_PER_PAGE,
      likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
      resultKey: 'stress_result', resultUrl: `${BASE}stress-results`,
      startScreen: {
        emoji: '💪', title: '压力应对方式测评', description: '24道题 · 约2-3分钟 · 了解你如何应对压力',
        features: ['涵盖<strong>4种压力应对方式</strong>：问题解决、情绪调节、寻求支持、回避拖延','共 <strong>24</strong> 道题目，预计耗时 <strong>约2-3分钟</strong>','从工作、生活、人际关系等多场景测试你的应对模式','即时生成应对风格分析和实用改善建议','了解自己的压力应对方式，建立更健康的心理调适机制'],
        tip: '请根据你在压力下的<strong>真实反应</strong>作答，而不是理想中的自己。没有"正确"的应对方式，只有是否适合你。',
      },
    }} computeResult={computeStressResults} />
  );
}
