export interface StressResult {
  styles: StressStyleScore[];
  primary: StressStyleScore;
  timestamp: number;
}

export interface StressStyleScore {
  id: string; name: string; emoji: string; color: string;
  description: string; tip: string; percentage: number;
}

export const stressStyles: StressStyleScore[] = [
  { id: 'problem', name: '问题解决型', emoji: '🔧', color: '#2196f3', description: '你面对压力时像一个工程师——直接找出问题根源并着手解决。你相信行动是最好的解药，不会被情绪困住太久。', tip: '你的应对方式很健康。记得在解决问题之余，也留出时间照顾自己的情绪需求。偶尔停下来感受一下，而不只是行动。', percentage: 0 },
  { id: 'emotion', name: '情绪调节型', emoji: '🧘', color: '#4caf50', description: '你善于管理自己的情绪反应。面对压力时你会通过运动、放松或积极思考来调整心态，让自己保持平衡。', tip: '你的情绪调节能力是宝贵的资源。可以尝试将这种能力和问题解决结合起来——先安抚情绪，再着手改变局面。', percentage: 0 },
  { id: 'support', name: '寻求支持型', emoji: '🤗', color: '#ff9800', description: '你相信"众人拾柴火焰高"。遇到困难时你善于寻求他人的帮助和情感支持，不习惯一个人硬扛。', tip: '求助是一种智慧而非软弱。同时，也可以练习独立应对，建立自己的"心理工具箱"，在无人可求助时也能自我支撑。', percentage: 0 },
  { id: 'avoidant', name: '回避拖延型', emoji: '🐢', color: '#9c27b0', description: '面对压力你倾向于暂时回避，用各种方式转移注意力。你可能觉得"眼不见心不烦"，但问题往往不会自行消失。', tip: '尝试"5分钟法则"：告诉自己只做5分钟，然后就可以停下来。通常开始后你会发现事情没那么可怕。把大问题拆成小步骤，一次只迈一步。', percentage: 0 },
];
