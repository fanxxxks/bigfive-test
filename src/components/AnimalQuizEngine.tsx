import GenericQuizEngine from './GenericQuizEngine';
import { animalQuestions, ANIMAL_ITEMS_PER_PAGE } from '../data/animalQuestions';
import { computeAnimalResults } from '../lib/animalScoring';
const B = import.meta.env.BASE_URL;
export default function AnimalQuizEngine() {
  return (<GenericQuizEngine config={{
    id: 'animal', title: '性格动物匹配', questions: animalQuestions, itemsPerPage: ANIMAL_ITEMS_PER_PAGE,
    likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
    resultKey: 'animal_result', resultUrl: `${B}animal-results`,
    startScreen: {
      emoji: '🦁', title: '性格动物匹配', description: '30道题 · 约3-5分钟 · 找到你的精神动物',
      features: ['匹配<strong>8种动物原型</strong>：狮子、猫头鹰、海豚、狐狸、熊、鹿、鹰、狼','共 <strong>30</strong> 道题目，预计耗时 <strong>约3-5分钟</strong>','每种动物代表一种独特的性格气质','即时生成你的最佳匹配动物和完整排序','有趣又富有洞察力——发现你内心深处的动物本能'],
      tip: '凭<strong>第一直觉</strong>作答，不要去猜"哪个动物更好"。每种动物都有独特的魅力，做真实的自己最重要。',
    },
  }} computeResult={computeAnimalResults} />);
}
