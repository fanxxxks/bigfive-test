import GenericQuizEngine from './GenericQuizEngine';
import { overthinkingQuestions, OVERTHINKING_ITEMS_PER_PAGE } from '../data/overthinkingQuestions';
import { computeOverthinkingResults } from '../lib/overthinkingScoring';
const B = import.meta.env.BASE_URL;
export default function OverthinkingQuizEngine() {
  return (<GenericQuizEngine config={{
    id: 'overthinking', title: '精神内耗指数测评', questions: overthinkingQuestions, itemsPerPage: OVERTHINKING_ITEMS_PER_PAGE,
    likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
    resultKey: 'overthinking_result', resultUrl: `${B}overthinking-results`,
    startScreen: {
      emoji: '🌀', title: '精神内耗指数测评', description: '20题 · 约2-3分钟 · 测测你的心理带宽被消耗了多少',
      features: ['涵盖<strong>5个内耗维度</strong>：反刍思维、决策纠结、自我怀疑、过度自省、睡前思维奔逸','共 <strong>20</strong> 道题目，预计耗时 <strong>约2-3分钟</strong>','你是"内耗永动机"还是"人间清醒"？','即时生成5维度雷达图与个性化内耗分析','含实用反内耗策略和CBT认知行为技巧'],
      tip: '请根据你<strong>最近一个月的真实状态</strong>作答。内耗水平会随生活阶段波动——今天的结果不代表永久的你。',
    },
  }} computeResult={computeOverthinkingResults} />);
}
