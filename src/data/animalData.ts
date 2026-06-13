export interface AnimalResult { animals: AnimalScore[]; top: AnimalScore; timestamp: number; }
export interface AnimalScore {
  id: string; name: string; emoji: string; color: string;
  description: string; tagline: string; kinship: string; percentage: number;
}
export const animalList: AnimalScore[] = [
  { id: 'lion', name: '狮子', emoji: '🦁', color: '#f44336', description: '你天生具有领导气质，勇敢果断，不畏挑战。在人群中你自然地成为焦点，敢于承担责任。你喜欢掌控局面，相信自己的判断力，是天生的决策者。', tagline: '天生的领袖', kinship: '如果你是一种动物，你是草原之王——狮子。你勇敢、果断，天生具有吸引他人追随的魅力。', percentage: 0 },
  { id: 'owl', name: '猫头鹰', emoji: '🦉', color: '#5c6bc0', description: '你拥有敏锐的洞察力和深邃的思考能力。你善于观察和分析，在发表意见之前会深思熟虑。你喜欢知识的积累，是团队中不可或缺的"军师"。', tagline: '智慧的观察者', kinship: '你像一只猫头鹰——沉静、睿智，总能在别人还没看清时已经洞察全局。', percentage: 0 },
  { id: 'dolphin', name: '海豚', emoji: '🐬', color: '#00bcd4', description: '你活泼开朗，善于社交，在人群中如鱼得水。你富有感染力，总能带给周围的人快乐和温暖。你重视关系，是朋友圈中的人气王。', tagline: '社交的灵魂', kinship: '你像一只海豚——聪明、友善、充满活力，你的存在让周围的每个人都感到愉快。', percentage: 0 },
  { id: 'fox', name: '狐狸', emoji: '🦊', color: '#ff9800', description: '你机智灵活，应变能力极强。面对复杂局面你能快速找到突破口，善于在规则边缘游走。你适应力强，无论在什么环境都能找到自己的生存之道。', tagline: '机智的策略家', kinship: '你像一只狐狸——聪明、灵活，总能在看似无解的局面中找到巧妙的出路。', percentage: 0 },
  { id: 'bear', name: '熊', emoji: '🐻', color: '#795548', description: '你稳重可靠，是大家信赖的依靠。你做事踏实，不急于求成，相信只要坚持就能达到目标。在危机中你是最冷静的那个人，给人安全感。', tagline: '可靠的守护者', kinship: '你像一头熊——沉稳、可靠，在风暴中你是那座不动的大山。', percentage: 0 },
  { id: 'deer', name: '鹿', emoji: '🦌', color: '#8bc34a', description: '你温柔善良，内心充满了爱与同情。你对他人情绪的感知极为敏锐，是天生抚慰者。你相信世界是美好的，用你的善良感染着每一个人。', tagline: '温柔的治愈者', kinship: '你像一只鹿——优雅、温柔，用你的善良让这个世界更加美好。', percentage: 0 },
  { id: 'eagle', name: '鹰', emoji: '🦅', color: '#607d8b', description: '你拥有非凡的远见和格局。你不纠结于眼前的得失，总是从更高的视角看待问题。你眼光长远，善于战略规划，是真正的远见者。', tagline: '远见的战略家', kinship: '你像一只鹰——翱翔于高空，看到别人看不到的风景和远方。', percentage: 0 },
  { id: 'wolf', name: '狼', emoji: '🐺', color: '#37474f', description: '你独立自主，珍视个人空间。你不依赖他人来定义自己，在自己的世界里安静地强大。你对少数挚友忠诚无比，但不需要广泛的社交来证明自己的价值。', tagline: '独立的独行者', kinship: '你像一匹狼——独立、坚韧，在自己的道路上安静而坚定地前行。', percentage: 0 },
];
