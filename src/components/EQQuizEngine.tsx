import GenericQuizEngine from './GenericQuizEngine';
import { eqQuestions, EQ_ITEMS_PER_PAGE } from '../data/eqQuestions';
import { computeEQResults } from '../lib/eqScoring';
const B = import.meta.env.BASE_URL;
export default function EQQuizEngine() {
  return (<GenericQuizEngine config={{
    id: 'eq', title: '情商EQ测评', questions: eqQuestions, itemsPerPage: EQ_ITEMS_PER_PAGE,
    likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
    resultKey: 'eq_result', resultUrl: `${B}eq-results`,
    startScreen: {
      emoji: '🧠', title: '情商EQ测评', description: '25道题 · 约3-5分钟 · 评估你的情商五个维度',
      features: ['涵盖<strong>5个情商维度</strong>：自我觉察、情绪管理、同理心、社交技巧、自我激励','共 <strong>25</strong> 道题目，预计耗时 <strong>约3-5分钟</strong>','基于Goleman情商模型，科学评估你的情绪智力','即时生成各维度分数、总分等级和改善建议','情商是可以通过练习提升的——了解自己是第一步'],
      tip: '请根据你的<strong>真实表现</strong>作答，而不是理想的自己。情商没有满分答案，每个人都有自己的成长空间。',
    },
  }} computeResult={computeEQResults} />);
}
