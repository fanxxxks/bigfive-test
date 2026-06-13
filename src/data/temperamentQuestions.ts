import type { Question } from '../lib/types';

// 淡人/浓人气质鉴定 — 20 questions
// 2 dimensions: 情绪唤醒度(arousal, 1-10) + 情绪反应性(reactivity, 11-20)
export const temperamentQuestions: Question[] = [
  // ─── 情绪唤醒度 Arousal (Q1-10) ───
  // 高分 = 高唤醒（容易被刺激激活，偏向"浓人"）
  { id: 'TM_1', text: '朋友发消息说"有事跟你说"，我会立刻心跳加速、各种猜测。', domain: '', facet: '', reverse: false },
  { id: 'TM_2', text: '即使在安静的环境中，我的脑子里也总是有很多想法在跑。', domain: '', facet: '', reverse: false },
  { id: 'TM_3', text: '看到别人吵架或争执，即使与我无关我也会感到紧张。', domain: '', facet: '', reverse: false },
  { id: 'TM_4', text: '一点点小的惊喜（比如收到一杯奶茶）就能让我的情绪明显波动。', domain: '', facet: '', reverse: false },
  { id: 'TM_5', text: '我对周围环境的变化非常敏感——灯光、噪音、气味都容易影响我的状态。', domain: '', facet: '', reverse: false },
  { id: 'TM_6', text: '大多数时候我都处于一种"心如止水"的状态，不太容易被扰动。', domain: '', facet: '', reverse: true },
  { id: 'TM_7', text: '身边的人紧张焦虑时，我通常能保持自己的节奏不受影响。', domain: '', facet: '', reverse: true },
  { id: 'TM_8', text: '遇到突发状况时，我的第一反应是冷静地想解决方案，而不是慌。', domain: '', facet: '', reverse: true },
  { id: 'TM_9', text: '很多事情到了别人口中是"大新闻"，在我这里就是"哦，知道了"。', domain: '', facet: '', reverse: true },
  { id: 'TM_10', text: '我很少因为外界的事情而打乱自己的情绪节奏。', domain: '', facet: '', reverse: true },

  // ─── 情绪反应性 Reactivity (Q11-20) ───
  // 高分 = 高反应（情绪表达强度大，偏向"浓人"）
  { id: 'TM_11', text: '开心的时候我会笑得很大声，不开心的时候整个人都写在脸上。', domain: '', facet: '', reverse: false },
  { id: 'TM_12', text: '看电影或听音乐时，我经常被感动到流泪或起鸡皮疙瘩。', domain: '', facet: '', reverse: false },
  { id: 'TM_13', text: '生气时我很难掩饰——我的表情、语气和身体语言都会出卖我。', domain: '', facet: '', reverse: false },
  { id: 'TM_14', text: '当我很兴奋时，说话语速会变快、音量会变大，整个人都"燃"起来。', domain: '', facet: '', reverse: false },
  { id: 'TM_15', text: '我的情绪就像天气——来的时候很猛烈，去得也快。', domain: '', facet: '', reverse: false },
  { id: 'TM_16', text: '即使内心有强烈情绪，我也能保持外表的平静——别人看不出我在想什么。', domain: '', facet: '', reverse: true },
  { id: 'TM_17', text: '和不熟的人在一起时，我习惯保持克制的表情和语调。', domain: '', facet: '', reverse: true },
  { id: 'TM_18', text: '别人常说我"喜怒不形于色"，很难猜我在想什么。', domain: '', facet: '', reverse: true },
  { id: 'TM_19', text: '遇到让我愤怒的事，我会选择沉默或离开，而非当场发作。', domain: '', facet: '', reverse: true },
  { id: 'TM_20', text: '我是一个情绪内敛的人——感受很深，但不习惯向外表达。', domain: '', facet: '', reverse: true },
];

export const TEMPERAMENT_ITEMS_PER_PAGE = 5;
