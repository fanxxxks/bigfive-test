import type { Question } from '../lib/types';

// EQ Test — 25 questions, 5 dimensions (5 each)
export const eqQuestions: Question[] = [
  // Self-awareness 自我觉察 (1-5)
  { id: 'EQ_1', text: '我清楚地知道自己在什么情况下容易情绪失控。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_2', text: '我能准确地说出自己当下的情绪是什么（比如是愤怒还是失望）。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_3', text: '我常常不知道为什么自己突然心情不好。', domain: 'O', facet: 'E', reverse: true },
  { id: 'EQ_4', text: '回顾一天，我能清晰地分辨哪些事影响了我的情绪。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_5', text: '朋友经常比我自己更早发现我的情绪变化。', domain: 'O', facet: 'E', reverse: true },

  // Self-regulation 情绪管理 (6-10)
  { id: 'EQ_6', text: '生气时我能够控制自己不说出伤人的话。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_7', text: '即使压力很大，我也能保持冷静并继续工作。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_8', text: '情绪上来时我很难控制自己的冲动行为。', domain: 'O', facet: 'E', reverse: true },
  { id: 'EQ_9', text: '遇到挫折后我能很快调整心态，重新投入工作。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_10', text: '被人批评时我第一反应通常是防御或反驳。', domain: 'O', facet: 'E', reverse: true },

  // Empathy 同理心 (11-15)
  { id: 'EQ_11', text: '我能通过语气和表情来判断别人的真实感受。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_12', text: '当朋友心情不好时，即使他们不说我也能感知到。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_13', text: '我不太擅长站在别人的角度看问题。', domain: 'O', facet: 'E', reverse: true },
  { id: 'EQ_14', text: '听别人倾诉烦恼时我会不自觉地感到难过。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_15', text: '别人说我不太关心他们的感受。', domain: 'O', facet: 'E', reverse: true },

  // Social skills 社交技巧 (16-20)
  { id: 'EQ_16', text: '我能够化解团队中的紧张气氛，让大家重新合作。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_17', text: '和新认识的人建立融洽关系对我来说很容易。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_18', text: '在需要别人帮忙时，我不太知道怎么开口。', domain: 'O', facet: 'E', reverse: true },
  { id: 'EQ_19', text: '我善于表达自己的需求而不让对方感到被冒犯。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_20', text: '我常常在社交场合不知道说什么好。', domain: 'O', facet: 'E', reverse: true },

  // Self-motivation 自我激励 (21-25)
  { id: 'EQ_21', text: '即使没有外部奖励，我也能保持高度的工作热情。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_22', text: '面对失败我把它当作学习机会，而不是打击。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_23', text: '遇到困难我很容易失去动力，需要别人推一把。', domain: 'O', facet: 'E', reverse: true },
  { id: 'EQ_24', text: '我会为自己设立有挑战性的目标并努力达成。', domain: 'O', facet: 'E', reverse: false },
  { id: 'EQ_25', text: '遇到连续挫折后我常常想要放弃。', domain: 'O', facet: 'E', reverse: true },
];

export const EQ_ITEMS_PER_PAGE = 5;
