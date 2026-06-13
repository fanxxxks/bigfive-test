import type { Question } from '../lib/types';

// Money Mindset Test — 20 questions, 5 money personalities
export const moneyQuestions: Question[] = [
  // Saver 储蓄家 (1-4)
  { id: 'MN_1', text: '每个月发工资后，我会先把一部分存起来再考虑消费。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_2', text: '看到银行余额增长给我一种强烈的安全感。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_3', text: '看到打折商品即使不需要我也会买，因为觉得"省钱"。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_4', text: '和朋友们一起吃饭，我会计算每人应付多少钱。', domain: 'O', facet: 'M', reverse: false },

  // Spender 享受派 (5-8)
  { id: 'MN_5', text: '遇到喜欢的东西，只要在预算内我就会毫不犹豫地买。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_6', text: '我觉得赚钱的目的就是为了享受生活，而不是存起来。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_7', text: '和朋友出去玩，我不会太计较花了多少钱。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_8', text: '我经常因为"奖励自己"而超出当月预算。', domain: 'O', facet: 'M', reverse: false },

  // Investor 投资者 (9-12)
  { id: 'MN_9', text: '我乐意把钱投入到股票、基金或其他理财渠道中让它增值。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_10', text: '我愿意承担一定的财务风险以换取更高的长期回报。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_11', text: '把大量现金存在银行里"吃利息"让我觉得在浪费机会。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_12', text: '我会主动学习投资理财知识来管理自己的资产。', domain: 'O', facet: 'M', reverse: false },

  // Minimalist 极简者 (13-16)
  { id: 'MN_13', text: '我并不需要太多物质的东西来感到快乐。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_14', text: '我买东西之前会问自己"没有这个我能活吗？"。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_15', text: '相比拥有更多物品，我更看重体验和时间的自由。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_16', text: '我不太关注工资的数字，只要能满足基本生活就好。', domain: 'O', facet: 'M', reverse: false },

  // Giver 分享者 (17-20)
  { id: 'MN_17', text: '给家人和朋友买礼物让我比自己收到礼物更开心。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_18', text: '我会定期捐款给公益组织或帮助需要帮助的人。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_19', text: '如果我有足够多的钱，我会捐出相当一部分来回馈社会。', domain: 'O', facet: 'M', reverse: false },
  { id: 'MN_20', text: '和朋友相处时，我请客的次数比别人请我的多。', domain: 'O', facet: 'M', reverse: false },
];

export const MONEY_ITEMS_PER_PAGE = 5;
