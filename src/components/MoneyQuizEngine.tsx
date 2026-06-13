import GenericQuizEngine from './GenericQuizEngine';
import { moneyQuestions, MONEY_ITEMS_PER_PAGE } from '../data/moneyQuestions';
import { computeMoneyResults } from '../lib/moneyScoring';
const B = import.meta.env.BASE_URL;
export default function MoneyQuizEngine() {
  return (<GenericQuizEngine config={{
    id: 'money', title: '金钱观念测评', questions: moneyQuestions, itemsPerPage: MONEY_ITEMS_PER_PAGE,
    likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
    resultKey: 'money_result', resultUrl: `${B}money-results`,
    startScreen: {
      emoji: '💰', title: '金钱观念测评', description: '20道题 · 约2-3分钟 · 探索你的金钱人格',
      features: ['涵盖<strong>5种金钱人格</strong>：储蓄家、享受派、投资者、极简者、分享者','共 <strong>20</strong> 道题目，预计耗时 <strong>约2-3分钟</strong>','从消费习惯、理财观念到金钱价值观全面测试','即时生成你的金钱人格排序和深度解读','了解你的金钱观，让钱更好地为你的人生目标服务'],
      tip: '请根据你的<strong>真实行为和想法</strong>作答。金钱观没有对错，关键是找到最适合自己的方式。',
    },
  }} computeResult={computeMoneyResults} />);
}
