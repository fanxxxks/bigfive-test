import GenericQuizEngine from './GenericQuizEngine';
import { procrastinationQuestions, PROCRASTINATION_ITEMS_PER_PAGE } from '../data/procrastinationQuestions';
import { computeProcrastinationResults } from '../lib/procrastinationScoring';
const B = import.meta.env.BASE_URL;
export default function ProcrastinationQuizEngine() {
  return (<GenericQuizEngine config={{
    id: 'procrastination', title: '拖延症类型鉴定', questions: procrastinationQuestions, itemsPerPage: PROCRASTINATION_ITEMS_PER_PAGE,
    likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
    resultKey: 'procrastination_result', resultUrl: `${B}procrastination-results`,
    startScreen: {
      emoji: '⏳', title: '拖延症类型鉴定', description: '20题 · 约2-3分钟 · 找到你拖延的根源',
      features: ['涵盖<strong>5个拖延维度</strong>：deadline依赖、完美主义、任务厌恶、时间感知、启动困难','共 <strong>20</strong> 道题目，预计耗时 <strong>约2-3分钟</strong>','你是"死线战神"、"完美主义瘫痪"还是"任务恐惧逃兵"？','即时生成5维度雷达图和个性化反拖延策略','含番茄工作法适配度分析和实用行动建议'],
      tip: '请根据你的<strong>真实行为模式</strong>作答。拖延不是道德缺陷——它是人类共有的行为倾向，了解自己的类型是改变的第一步。',
    },
  }} computeResult={computeProcrastinationResults} />);
}
