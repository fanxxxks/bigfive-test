import GenericQuizEngine from './GenericQuizEngine';
import { shortQuestions, SHORT_ITEMS_PER_PAGE } from '../data/shortQuestions';
import { computeShortResults } from '../lib/shortScoring';

const BASE = import.meta.env.BASE_URL;

export default function ShortQuizEngine() {
  return (
    <GenericQuizEngine
      config={{
        id: 'bigfive-short',
        title: '大五人格测评（简洁版）',
        questions: shortQuestions,
        itemsPerPage: SHORT_ITEMS_PER_PAGE,
        likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
        resultKey: 'bigfive_short_result',
        resultUrl: `${BASE}short-results`,
        startScreen: {
          emoji: '⚡',
          title: '大五人格科学测评（简洁版）',
          description: '50道题 · 约5-8分钟 · 快速了解你的人格轮廓',
          features: [
            '基于国际公认的 <strong>IPIP-50</strong> 简版量表',
            '共 <strong>50</strong> 道题目，预计耗时 <strong>5-8 分钟</strong>',
            '覆盖五大维度，快速勾勒人格轮廓',
            '即时生成雷达图和百分位排名',
            '包含职场、人际、抗压等深度解读',
          ],
          tip: '请在一个安静的环境中，根据您的<strong>真实感受</strong>（而非理想中的自己）诚实作答。如需更精确的结果，建议使用完整版（140题）。',
        },
      }}
      computeResult={computeShortResults}
    />
  );
}
