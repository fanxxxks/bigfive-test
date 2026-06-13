// Decision-Making Style Assessment
export interface DecisionResult {
  styles: DecisionStyleScore[];
  primary: DecisionStyleScore;
  timestamp: number;
}

export interface DecisionStyleScore {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  tip: string;
  percentage: number;
}

export const decisionStyles: DecisionStyleScore[] = [
  {
    id: 'analytical',
    name: '分析规划型',
    emoji: '📊',
    color: '#2196f3',
    description: '你做决定时像一位严谨的科学家——收集数据、分析利弊、权衡风险。你相信好的决策来自于充分的信息和理性的思考。',
    strengths: ['决策质量高，很少出错', '善于发现潜在问题和风险', '在复杂问题上表现优异', '能够为决策提供充分理由'],
    weaknesses: ['可能陷入"分析瘫痪"，迟迟不敢拍板', '在时间紧迫时可能感到压力', '有时过于依赖数据而忽略直觉'],
    tip: '尝试给你自己设定一个决策截止时间。记住：80%的信息通常已经足够做出好的决定，追求完美有时会错失良机。',
    percentage: 0,
  },
  {
    id: 'intuitive',
    name: '直觉灵活型',
    emoji: '⚡',
    color: '#ff9800',
    description: '你拥有敏锐的直觉和快速判断力。你相信自己的"第六感"，能够在信息不足的情况下做出果断的决定。你是一个天生的"快刀手"。',
    strengths: ['决策速度极快', '在信息模糊时仍能有效行动', '善于抓住机遇', '适应变化能力强'],
    weaknesses: ['有时过于草率，忽略重要细节', '可能被情绪或偏见影响判断', '在需要严谨分析的场景可能不够深入'],
    tip: '你的直觉是宝贵的资产，但在重大决策前，试着用数据和事实来验证你的直觉。结合理性与直觉，你会更强大。',
    percentage: 0,
  },
  {
    id: 'dependent',
    name: '集思广益型',
    emoji: '🤝',
    color: '#4caf50',
    description: '你相信"众人拾柴火焰高"。做决策时你喜欢听取多方意见，珍视他人的经验和建议。你不急于独自拍板，相信集体智慧。',
    strengths: ['决策具有广泛的群众基础', '能够整合多角度信息', '善于建立共识和团队协作', '决策执行时阻力较小'],
    weaknesses: ['可能过度依赖他人意见而失去自我判断', '在没人可商量时可能感到迷茫', '有时会被他人的意见带偏方向'],
    tip: '倾听他人是智慧，但别忘了你才是最了解自己处境的人。在收集意见后，留出独处时间来消化并形成自己的判断。',
    percentage: 0,
  },
  {
    id: 'avoidant',
    name: '审慎观望型',
    emoji: '🔮',
    color: '#9c27b0',
    description: '你对决策非常谨慎，害怕做出错误的选择。你倾向于推迟决定，希望在最后一刻出现更明确的信息或更好的选项。你对决策后果的敏感性让你格外小心。',
    strengths: ['避免了很多冲动决策带来的错误', '对风险有敏锐的感知', '在危机中可能会等到最佳时机', '考虑问题非常周全'],
    weaknesses: ['经常错过机会的窗口期', '可能因为不断拖延而感到焦虑', '小事上浪费过多精力', '容易给人犹豫不决的印象'],
    tip: '学会区分"可逆"和"不可逆"的决策。大多数日常决定都是可逆的——即使选错了也可以调整。把精力留给真正不可逆的重大决策。',
    percentage: 0,
  },
];
