import GenericQuizEngine from './GenericQuizEngine';
import { philosophyQuestions, PHILOSOPHY_ITEMS_PER_PAGE } from '../data/philosophyQuestions';
import { computePhilosophyResults } from '../lib/philosophyScoring';

const BASE = import.meta.env.BASE_URL;

export default function PhilosophyQuizEngine() {
  return (
    <GenericQuizEngine
      config={{
        id: 'philosophy',
        title: '哲学气质测评',
        questions: philosophyQuestions,
        itemsPerPage: PHILOSOPHY_ITEMS_PER_PAGE,
        likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
        resultKey: 'philosophy_result',
        resultUrl: `${BASE}philosophy-results`,
        startScreen: {
          emoji: '🏛️',
          title: '哲学气质测评',
          description: '60道题 · 约8-10分钟 · 探索你的哲学DNA',
          features: [
            '涵盖<strong>18个哲学流派</strong>，横跨东西方思想史',
            '共 <strong>60</strong> 道观点判断题，预计耗时 <strong>8-10 分钟</strong>',
            '尼采、叔本华、孔子、庄子、萨特、加缪、斯多葛……',
            '即时生成流派匹配百分比和深度解读',
            '发现你的哲学气质组合——每个人都融合了多种思想',
          ],
          tip: '没有正确答案，选择你<strong>真实认同</strong>的观点。你可能同时认同看似矛盾的哲学——这完全正常且有趣。',
        },
      }}
      computeResult={computePhilosophyResults}
    />
  );
}
