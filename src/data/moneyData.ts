export interface MoneyResult { styles: MoneyStyleScore[]; primary: MoneyStyleScore; timestamp: number; }
export interface MoneyStyleScore { id: string; name: string; emoji: string; color: string; description: string; motto: string; percentage: number; }
export const moneyStyles: MoneyStyleScore[] = [
  { id: 'saver', name: '储蓄家', emoji: '🐿️', color: '#4caf50', description: '你对金钱有着强烈的安全感需求。你喜欢看着账户余额稳步增长，这会给你带来内心的平静。你善于规划和预算，是朋友圈中最会理财的人。', motto: '未雨绸缪，积谷防饥', percentage: 0 },
  { id: 'spender', name: '享受派', emoji: '🎉', color: '#e91e63', description: '你相信金钱是用来提升生活品质的工具。你乐于在美食、旅行、体验上花钱，因为你深知"人生苦短"。你活在当下，享受每一刻。', motto: '钱是赚来花的，不是存来数的', percentage: 0 },
  { id: 'investor', name: '投资者', emoji: '📈', color: '#ff9800', description: '你把金钱视为可以增值的资产。你具有长远的财务眼光，愿意承担一定风险来获取更高回报。你对金融市场有浓厚兴趣，相信"钱生钱"的力量。', motto: '让钱为你工作，而不是你为钱工作', percentage: 0 },
  { id: 'minimalist', name: '极简者', emoji: '🌿', color: '#607d8b', description: '你对物质的需求不高，更看重精神层面的满足。你不被消费主义裹挟，过着简单而富足的生活。对你来说，自由和时间比金钱更珍贵。', motto: '少即是多，简单即富足', percentage: 0 },
  { id: 'giver', name: '分享者', emoji: '🎁', color: '#9c27b0', description: '你把金钱看作传递爱与关怀的媒介。你乐于用金钱来帮助他人、表达感激和创造美好的共同体验。对你来说，分享带来的快乐远超独享。', motto: '施比受更有福', percentage: 0 },
];
