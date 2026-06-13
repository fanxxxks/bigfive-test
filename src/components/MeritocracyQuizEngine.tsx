import GenericQuizEngine from './GenericQuizEngine';
import { meritocracyQuestions, MERITOCRACY_ITEMS_PER_PAGE } from '../data/meritocracyQuestions';
import { computeMeritocracyResults } from '../lib/meritocracyScoring';
const B = import.meta.env.BASE_URL;
export default function MeritocracyQuizEngine() {
  return (<GenericQuizEngine config={{
    id: 'meritocracy', title: '优绩主义程度测评', questions: meritocracyQuestions, itemsPerPage: MERITOCRACY_ITEMS_PER_PAGE,
    likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
    resultKey: 'meritocracy_result', resultUrl: `${B}meritocracy-results`,
    startScreen: {
      emoji: '🏆', title: '优绩主义程度测评', description: '24题 · 约3-4分钟 · 测测你对"努力=成功"有多相信',
      features: ['涵盖<strong>6个子维度</strong>：努力归因、运气认知、结构批判、成功焦虑、自我问责、失败羞耻','共 <strong>24</strong> 道题目，预计耗时 <strong>约3-4分钟</strong>','探索你对"努力就会成功"这一叙事的信念强度','分析你与"内卷/躺平"文化现象的关系','获得个性化的成功观平衡建议'],
      tip: '请根据你的<strong>真实想法</strong>（而非"应该怎么想"）作答。优绩主义没有绝对的对错——了解自己的信念模式是成长的第一步。',
    },
  }} computeResult={computeMeritocracyResults} />);
}
