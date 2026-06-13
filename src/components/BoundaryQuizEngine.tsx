import GenericQuizEngine from './GenericQuizEngine';
import { boundaryQuestions, BOUNDARY_ITEMS_PER_PAGE } from '../data/boundaryQuestions';
import { computeBoundaryResults } from '../lib/boundaryScoring';

const BASE = import.meta.env.BASE_URL;

export default function BoundaryQuizEngine() {
  return (
    <GenericQuizEngine
      config={{
        id: 'boundary',
        title: '讨好型/不好惹指数测评',
        questions: boundaryQuestions,
        itemsPerPage: BOUNDARY_ITEMS_PER_PAGE,
        likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
        resultKey: 'boundary_result',
        resultUrl: `${BASE}boundary-results`,
        startScreen: {
          emoji: '🦔',
          title: '讨好型/不好惹指数测评',
          description: '25题 · 约3分钟 · 测测你的社交边界与坚定性',
          features: [
            '基于<strong>社交边界与坚定性</strong>双维度模型',
            '共 <strong>25</strong> 道题目，预计耗时 <strong>约3分钟</strong>',
            '你是习惯性委屈自己的"便利贴"，还是自带结界的"带刺玫瑰"？',
            '即时生成双维度象限图和四种类型匹配百分比',
            '含深度边界分析、拒绝话术建议、职场与亲密关系策略',
          ],
          tip: '请根据你在日常生活中的<strong>真实反应</strong>作答。每个人在不同关系中的边界感可能不同——请尽量以总体倾向来回答。',
        },
      }}
      computeResult={computeBoundaryResults}
    />
  );
}
