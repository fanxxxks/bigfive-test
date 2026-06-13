// 精神内耗指数 — 5维度 + 4种结果标签

export interface OverthinkingResult {
  dimensions: OverthinkingDimension[];
  styles: OverthinkingStyleScore[];
  primary: OverthinkingStyleScore;
  totalPct: number;
  level: string;
  levelEmoji: string;
  timestamp: number;
}
export interface OverthinkingDimension {
  id: string; name: string; emoji: string; color: string; percentage: number;
  interpretation: string;
}
export interface OverthinkingStyleScore {
  id: string; name: string; emoji: string; color: string; description: string;
  longDescription: string; strategies: string[]; percentage: number;
}

export const overthinkingStyles: OverthinkingStyleScore[] = [
  {
    id: 'full-speed', name: '内耗永动机', emoji: '🔋', color: '#e53935',
    description: '你的大脑几乎全天候运转——反复咀嚼过去的对话、担忧未来的可能性、在无数个"如果"中打转。内耗是你最熟悉的生存模式。',
    longDescription: '你是"精神内耗"的资深用户——你的大脑似乎自带一个永不停止的背景程序，持续消耗着你的心理能量。反刍思维是你的默认设置：一件事发生了，别人可能已经翻篇了，你还在反复分析"我当时是不是应该那样说？""他那个表情是什么意思？"。决策对你来说是巨大的消耗——你会列出所有选项的所有可能后果，然后被自己的分析压垮。\n\n但"内耗"的另一面是你的深度思考能力——你不会轻易接受表面的解释，你总是试图看到更深层的意义。你的敏感让你成为一个有洞察力的人——你能察觉别人忽略的细节，感知微妙的情绪变化。你需要的不是"别再想了"的粗暴建议——而是学会引导你的思考之河，让它从"内耗的漩涡"变成"创造力的奔流"。\n\n关键转变在于从"反刍"（被动地反复咀嚼）转向"反思"（主动地分析并制定行动计划）。反刍问"为什么会这样？"，反思问"接下来我可以做什么？"。前者把你锚定在过去，后者把你推向未来。',
    strategies: ['设置"担忧时间"：每天给自己15分钟专门担忧，其他时间每当担心出现就告诉自己"等到担忧时间再想"', '练习"最坏情况"写作：把你担心的事写下来，然后问"最坏会怎样？我能承受吗？"——通常你会发现最坏也没那么可怕', '使用"行动→思考"顺序：先做5分钟，然后再分析——行动往往能打破思维的死循环'],
    percentage: 0,
  },
  {
    id: 'selective', name: '选择性内耗', emoji: '🎯', color: '#ff9800',
    description: '你不是在所有事情上都内耗——你有一个"内耗开关"。在工作/学业上你可能极其内耗，但在生活其他方面却很放松。或者相反——你只在感情中内耗。',
    longDescription: '选择性内耗者在特定领域表现出强烈的内耗倾向，而在其他领域相对从容。最常见的模式是：工作/学业上的完美主义导致严重内耗（"这个方案还有没有漏洞？""上司那句话到底是什么意思？"），但生活中却是一个随性洒脱的人。或者相反——职场游刃有余，感情中却患得患失。\n\n这种"选择性"意味着你的内耗不是天生的，而是习得的——通常与你在某个领域的高标准或受过挫折有关。好消息是：习得的模式可以被"去学习"。你的优势在于你有一个"非内耗"的自己作为参照——你知道放松是什么感觉，只是需要在特定领域把那种感觉迁移过来。',
    strategies: ['识别你的"内耗领域"和"轻松领域"之间的差异——是什么让你在该领域如此焦虑？', '把轻松领域的思维方式"借"到内耗领域：如果你在生活中相信"船到桥头自然直"，试着把这句话用在工作上', '设置领域间的"切换仪式"——工作结束后做一些能让你彻底放松的事，帮助大脑完成模式切换'],
    percentage: 0,
  },
  {
    id: 'clear-mind', name: '人间清醒', emoji: '🧊', color: '#43a047',
    description: '你是精神内耗的"绝缘体"——你拥有出色的心理过滤能力，知道什么值得思考、什么该放过。你不会让无关的噪音占用你的心理带宽。',
    longDescription: '人间清醒型是"精神内耗指数"最低的一类——你拥有一种稀有的心理能力：快速判断什么是你能够控制的、什么是你无法控制的，然后把精力只投入前者。这种能力在斯多葛哲学中被称为"控制的二分法"——你似乎天生就懂得这个道理。\n\n你的不内耗不是因为你不在乎——而是因为你有一种清晰的"心理优先级排序"。你知道自己的精力是有限的，所以只把它分配给真正重要的事情。你不是没有担忧——只是你不会让担忧无休止地循环。当担忧出现时，你会做三件事：①判断它是否在我的控制范围内；②如果是，制定行动计划；③如果不是，接受并放手。这个过程对你来说是自然而然的，但对很多人来说需要刻意练习——你在这方面可以成为他人的老师。',
    strategies: ['你已经很好了——但可以更自觉地把你的"不内耗秘诀"分享给身边的人', '在你擅长的"接受不可控之事"上继续精进——范围可以扩大到更复杂的领域', '偶尔允许自己内耗一下——完全没内耗可能意味着你在回避某些重要的问题'],
    percentage: 0,
  },
  {
    id: 'intermittent-overthink', name: '间歇性内耗', emoji: '🌊', color: '#5c6bc0',
    description: '你的内耗像潮汐——有时汹涌而来席卷一切，有时又悄然退去让你恢复平静。周期性发作让你在"想太多"和"恢复正常"之间反复切换。',
    longDescription: '间歇性内耗者经历着周期性的"内耗发作"——可能和压力周期相关（比如项目截止日前内耗飙升）、和生理周期相关、或和季节性情绪波动相关。在非发作期，你是一个正常运作的人——甚至可能效率很高。但当内耗的浪潮袭来时，你会发现自己陷入熟悉的思维漩涡中无法脱身。\n\n你的模式是"波浪型"的——这意味着你的内耗是可以预测的。如果你能识别发作的早期信号（比如：开始频繁检查手机、反复回忆某段对话、入睡困难），你可以在内耗完全席卷你之前采取干预措施。你的优势在于你有一个"基线状态"可以参考——你知道自己正常的时候是什么样，这让恢复变得更容易。',
    strategies: ['建立"内耗日志"：记录每次内耗发作的时间、触发因素、持续时长、恢复方式——找出发作模式', '在非内耗期建立"心理资源储备"：培养正念冥想、运动等日常习惯，增强心理韧性', '发作时使用"3-3-3"锚定法：说出你看到的3样东西、听到的3种声音、感受到的3种身体感觉——把你从思维中拉回当下的感官世界'],
    percentage: 0,
  },
];

export const overthinkingDimensions: OverthinkingDimension[] = [
  { id: 'rumination', name: '反刍思维', emoji: '🔄', color: '#e53935', percentage: 0, interpretation: '' },
  { id: 'decision_paralysis', name: '决策纠结', emoji: '🤔', color: '#ff9800', percentage: 0, interpretation: '' },
  { id: 'self_doubt', name: '自我怀疑', emoji: '🔍', color: '#8e24aa', percentage: 0, interpretation: '' },
  { id: 'over_introspection', name: '过度自省', emoji: '🪞', color: '#5c6bc0', percentage: 0, interpretation: '' },
  { id: 'bedtime_racing', name: '睡前思维奔逸', emoji: '🌙', color: '#1e88e5', percentage: 0, interpretation: '' },
];
