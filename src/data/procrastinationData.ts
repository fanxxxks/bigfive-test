// 拖延症类型鉴定 — 5维度 + 4种类型

export interface ProcrastinationResult {
  dimensions: ProcrastinationDimension[];
  styles: ProcrastinationStyleScore[];
  primary: ProcrastinationStyleScore;
  timestamp: number;
}
export interface ProcrastinationDimension {
  id: string; name: string; emoji: string; color: string; percentage: number;
  interpretation: string;
}
export interface ProcrastinationStyleScore {
  id: string; name: string; emoji: string; color: string; description: string;
  longDescription: string; strategies: string[]; percentage: number;
}

export const procrastinationStyles: ProcrastinationStyleScore[] = [
  {
    id: 'deadline-warrior', name: '死线战神', emoji: '⚡', color: '#e53935',
    description: 'deadline是你唯一的动力源。在截止日期到来之前你风平浪静，临近deadline时爆发出惊人效率。压力是你的燃料。',
    longDescription: '死线战神是"拖延但不耽误"的典型——你可能在任务布置后的三周里毫无动静，然后在最后三天爆发出惊人的创造力，最终按时高质量完成（或至少及格）。你的模式是"deadline驱动型"：没有外部压力时你的动力系统几乎休眠，但一旦压力来临你就切换到超频模式。\n\n你可能是团队中令人困惑的存在——前三周大家以为你要翻车了，最后一周你让大家惊叹"他是怎么做到的？"。但这种模式的成本也很高：①最后的冲刺消耗巨大，结束后你往往需要几天来恢复；②这种模式让你无法在早期获得反馈和迭代的机会；③如果遇到意外（生病、技术问题），你没有缓冲时间。\n\n你的核心挑战不是"拖延"本身——而是学会在deadline之前为自己创造"人工deadline"。你不是没有能力，你只是需要压力的催化。',
    strategies: ['给自己设置"假deadline"——比实际deadline提前2-3天，并把它当作真实的', '使用"公开承诺"技巧——告诉同事或朋友你会在某天之前完成，利用社交压力', '尝试"番茄工作法"：25分钟高专注+5分钟休息——短时间的目标比长时间的目标对你更有效'],
    percentage: 0,
  },
  {
    id: 'perfectionist-paralysis', name: '完美主义瘫痪', emoji: '🎨', color: '#7e57c2',
    description: '你不是不想开始——你是害怕做出来的东西不够完美。在"要做得完美"的压力下，你选择了"暂时不做"。完美主义是你拖延的根源。',
    longDescription: '完美主义瘫痪型拖延是最隐蔽的一种——因为你看起来不像是"懒"，更像是"认真"。你在脑中已经规划了完美的方案、想到了每一个细节、甚至预见了成品的美好。但当你真正要开始时，那个"完美的期待"变成了一座大山——你害怕你做出来的东西配不上你脑中的想象。\n\n于是你开始做一些"准备工作"——搜集更多资料、研究更多方案、等待一个"更好的时机"。这些看起来像是"在做事情"，但实际上是在回避真正的任务。你的拖延不是因为不在乎——恰恰相反，是因为太在乎。你的核心信念可能是"如果我做不到完美，那就不值得做"——这个信念需要被挑战。\n\n完美主义的悖论是：追求完美反而让你什么也没做出来。而完成一个"足够好"的作品，永远比一个"完美的空想"更有价值。',
    strategies: ['采用"烂初稿策略"：告诉自己第一版只需要完成到60分——你之后可以改，但必须先有一个东西', '设定时间上限：告诉自己"我只花30分钟做这件事，能做到什么程度算什么程度"', '把"完美"重新定义为"比昨天进步一点点"——这是一个可以每天达到的标准'],
    percentage: 0,
  },
  {
    id: 'task-avoider', name: '任务恐惧逃兵', emoji: '🐢', color: '#ff9800',
    description: '你对特定类型的任务有天然的恐惧和逃避本能——可能是枯燥的行政工作、困难的深度思考、或需要和讨厌的人打交道的事情。对其他事情你可能很高效。',
    longDescription: '任务恐惧型拖延是最"选择性"的一种——你可能在某些领域极其高效（比如你感兴趣的工作、你擅长的技能），但在另一些领域却一再拖延（比如报税、整理文件、回某些邮件）。你的拖延不是全面的——它是"任务特异性"的。\n\n这种拖延通常源于对任务的负面情绪联想：无聊、困难、挫败感、或与不愉快的经历关联。你的大脑把该任务标记为"威胁"，然后激活了回避反应。你可能会用其他"更轻松"的任务来填充时间——看起来很忙，但实际上是在逃避那个真正需要做的事情。\n\n关键突破在于"降低任务的心理成本"——让它开始变得不那么可怕。把大任务拆成微小的第一步（"打开文档"可以是一个目标），把无聊的任务和愉快的事情配对（听喜欢的播客时整理文件）。',
    strategies: ['使用"5分钟规则"：告诉自己只做5分钟——5分钟后你可以停止。通常开始之后你会继续', '将害怕的任务和你喜欢的事情"捆绑"：比如只在整理文件时听你最喜欢的播客', '提前规划"恐惧任务日"——每周固定半天专门处理你最不想做的事，其余时间可以放开做喜欢的'],
    percentage: 0,
  },
  {
    id: 'free-spirit', name: '随性自由人', emoji: '🦋', color: '#43a047',
    description: '你其实不怎么拖延——你只是不喜欢被外界的时间表束缚。你有自己的节奏，你的"拖延"在别人看来可能是"迟到"，在你看来只是"不同的顺序"。',
    longDescription: '随性自由人型可能并不认为自己有拖延问题——而且可能真的没有。你的模式是：你有自己独特的优先级和时间感知方式。别人觉得你在拖延的事情，可能在你的优先级列表中根本不靠前。当一件事对你真正重要时，你可以展现出惊人的专注和执行力。\n\n你的"拖延"更多是一种"节奏不匹配"——社会期待的快节奏和你的内在节奏不一致。你可能在需要创造力、灵活性和自主性的环境中表现出色，但在高度结构化和强制deadline的环境中感到束缚。\n\n你不是需要"治疗拖延"——你需要的是找到适合你节奏的工作和生活方式。同时，你需要注意和他人协调：你的自由节奏可能会给需要你协作的团队成员带来困扰。沟通是关键——让别人知道你的节奏，同时也尊重他人的时间。',
    strategies: ['和团队成员/家人明确沟通你的时间表和节奏——透明可以减少误解', '使用"缓冲时间"策略：给自己预留20%的额外时间应对意外', '找到适合你节奏的工作方式——自由职业、弹性工作制可能比严格打卡更适合你'],
    percentage: 0,
  },
];

export const procrastinationDimensions: ProcrastinationDimension[] = [
  { id: 'deadline_dependence', name: 'deadline依赖', emoji: '⏰', color: '#e53935', percentage: 0, interpretation: '' },
  { id: 'perfectionism', name: '完美主义', emoji: '🎯', color: '#7e57c2', percentage: 0, interpretation: '' },
  { id: 'task_aversion', name: '任务厌恶', emoji: '😣', color: '#ff9800', percentage: 0, interpretation: '' },
  { id: 'time_perception', name: '时间感知', emoji: '⌛', color: '#1e88e5', percentage: 0, interpretation: '' },
  { id: 'initiation', name: '启动困难', emoji: '🚀', color: '#8e24aa', percentage: 0, interpretation: '' },
];
