export interface SocialResult { styles: SocialStyleScore[]; primary: SocialStyleScore; timestamp: number; }
export interface SocialStyleScore { id: string; name: string; emoji: string; color: string; description: string; tip: string; percentage: number; }
export const socialStyles: SocialStyleScore[] = [
  { id: 'driver', name: '驱动型', emoji: '🎯', color: '#f44336', description: '你是一个结果导向的沟通者。你说话直接、行动迅速、注重效率。你不喜欢浪费时间在无关紧要的细节上，习惯快速抓住重点并推动行动。', tip: '你是天生的领导者，但要注意：不是所有人都像你一样快节奏。在与人沟通时，偶尔放慢脚步，倾听他人的感受，会让你更有影响力。', percentage: 0 },
  { id: 'expressive', name: '表达型', emoji: '🎭', color: '#ff9800', description: '你是人群中的焦点，充满能量和感染力。你善于用生动的方式表达自己的想法，喜欢头脑风暴和创意碰撞。你的热情能够激励身边的人。', tip: '你的魅力是你的超能力。需要注意的是，有时候你需要静下心来关注细节和执行力——光有想法是不够的，落地同样重要。', percentage: 0 },
  { id: 'amiable', name: '亲和型', emoji: '🤗', color: '#4caf50', description: '你是一个温暖的合作者。你重视人际关系，善于倾听和理解他人。你相信团队的力量，在冲突中你通常是那个缓和气氛的人。', tip: '你的善良和包容让团队充满安全感。但请记住：设立个人边界不是自私。学会在适当的时候说"不"，你对自己的善待也是对他人的善待。', percentage: 0 },
  { id: 'analytical', name: '分析型', emoji: '📐', color: '#2196f3', description: '你是一个严谨的思考者。你注重事实、逻辑和准确性，在表达前会深思熟虑。你不急于表态，但一旦开口，你的观点往往是经过仔细推敲的。', tip: '你的严谨是宝贵的品质。但在需要快速决策或人际互动的场景中，试着放松一点——不是所有事都需要完美的数据支持。', percentage: 0 },
];
