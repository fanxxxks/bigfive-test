import GenericQuizEngine from './GenericQuizEngine';
import { socialQuestions, SOCIAL_ITEMS_PER_PAGE } from '../data/socialQuestions';
import { computeSocialResults } from '../lib/socialScoring';
const B = import.meta.env.BASE_URL;
export default function SocialQuizEngine() {
  return (<GenericQuizEngine config={{
    id: 'social', title: '社交风格测评', questions: socialQuestions, itemsPerPage: SOCIAL_ITEMS_PER_PAGE,
    likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
    resultKey: 'social_result', resultUrl: `${B}social-results`,
    startScreen: {
      emoji: '💬', title: '社交风格测评', description: '30道题 · 约3-5分钟 · 了解你的沟通风格',
      features: ['涵盖<strong>4种社交风格</strong>：驱动型、表达型、亲和型、分析型','共 <strong>30</strong> 道题目，预计耗时 <strong>约3-5分钟</strong>','从职场沟通到日常社交，多场景评估你的互动模式','即时生成风格分析和沟通改善建议','了解自己的社交风格，让你在人际交往中更加游刃有余'],
      tip: '根据你在日常生活中的<strong>真实沟通方式</strong>作答。每种社交风格都有其独特的优势，做真实的自己最重要。',
    },
  }} computeResult={computeSocialResults} />);
}
