// Schwartz's 10 Basic Human Values
export interface ValueItem {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  motto: string;
}

export const valuesList: ValueItem[] = [
  {
    id: 'power',
    name: '权力',
    emoji: '👑',
    color: '#d32f2f',
    description: '追求社会地位和威望，希望对他人和资源拥有控制力。您重视影响力、权威和财富。',
    motto: '影响力就是一切。',
  },
  {
    id: 'achievement',
    name: '成就',
    emoji: '🏆',
    color: '#f57c00',
    description: '通过符合社会标准的能力展现个人成功。您重视卓越、抱负和努力带来的认可。',
    motto: '设定目标，然后实现它。',
  },
  {
    id: 'hedonism',
    name: '享乐',
    emoji: '🎉',
    color: '#e91e63',
    description: '追求感官的愉悦和满足。您重视快乐、享受生活、让自己开心。',
    motto: '人生苦短，及时行乐。',
  },
  {
    id: 'stimulation',
    name: '刺激',
    emoji: '🎢',
    color: '#ff9800',
    description: '追求新奇、变化和挑战以维持最佳的激活水平。您重视冒险、刺激和新鲜体验。',
    motto: '生活需要一点心跳加速。',
  },
  {
    id: 'self-direction',
    name: '自主',
    emoji: '🧭',
    color: '#2196f3',
    description: '独立思考和行动——选择、创造、探索。您重视自由、创造力和独立判断。',
    motto: '我的生活我做主。',
  },
  {
    id: 'universalism',
    name: '普世关怀',
    emoji: '🌍',
    color: '#4caf50',
    description: '理解、欣赏、宽容和保护所有人和自然的福祉。您重视社会正义、平等和环境保护。',
    motto: '我们都是地球的一部分。',
  },
  {
    id: 'benevolence',
    name: '仁爱',
    emoji: '💝',
    color: '#e91e8c',
    description: '维护和增进亲密他人的福祉。您重视忠诚、责任、友谊和关心身边的人。',
    motto: '真心对待身边每一个重要的人。',
  },
  {
    id: 'tradition',
    name: '传统',
    emoji: '🏮',
    color: '#795548',
    description: '尊重、承诺和接受传统文化或宗教的习俗和观念。您重视谦逊、虔诚和传承。',
    motto: '不忘来时路。',
  },
  {
    id: 'conformity',
    name: '遵从',
    emoji: '🤝',
    color: '#607d8b',
    description: '克制可能伤害他人或违反社会期望的行动和冲动。您重视自律、礼貌和遵守规则。',
    motto: '做对的事，守规矩。',
  },
  {
    id: 'security',
    name: '安全',
    emoji: '🛡️',
    color: '#37474f',
    description: '追求社会、人际关系和个人的安全与稳定。您重视秩序、健康和归属感。',
    motto: '安全是第一位的。',
  },
];
