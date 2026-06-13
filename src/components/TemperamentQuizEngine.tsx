import GenericQuizEngine from './GenericQuizEngine';
import { temperamentQuestions, TEMPERAMENT_ITEMS_PER_PAGE } from '../data/temperamentQuestions';
import { computeTemperamentResults } from '../lib/temperamentScoring';

const BASE = import.meta.env.BASE_URL;

export default function TemperamentQuizEngine() {
  return (
    <GenericQuizEngine
      config={{
        id: 'temperament',
        title: '淡人/浓人气质鉴定',
        questions: temperamentQuestions,
        itemsPerPage: TEMPERAMENT_ITEMS_PER_PAGE,
        likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
        resultKey: 'temperament_result',
        resultUrl: `${BASE}temperament-results`,
        startScreen: {
          emoji: '🍵',
          title: '淡人/浓人气质鉴定',
          description: '20题 · 约2-3分钟 · 测测你的淡/浓浓度比例',
          features: [
            '基于<strong>情绪唤醒与反应性</strong>双维度模型',
            '共 <strong>20</strong> 道题目，预计耗时 <strong>约2-3分钟</strong>',
            '你是心如止水的"古希腊掌管淡定的神"，还是热烈抓马的"浓缩火药桶"？',
            '即时生成双维度散点图和四种类型匹配百分比',
            '含深度个性解读、职场适配、亲密关系分析和自我调节建议',
          ],
          tip: '请根据你的<strong>真实日常状态</strong>作答（而非理想中的自己）。淡和浓没有好坏之分——每种气质都有其独特的优势和魅力。',
        },
      }}
      computeResult={computeTemperamentResults}
    />
  );
}
