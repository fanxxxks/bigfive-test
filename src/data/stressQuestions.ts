import type { Question } from '../lib/types';

// 压力应对方式测试 — 24 questions
export const stressQuestions: Question[] = [
  // Problem-focused 问题解决型 (1-6)
  { id: 'ST_1', text: '遇到困难时，我会立刻开始想解决办法，而不是沉浸在情绪中。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_2', text: '面对压力，我会列出待办清单，逐项处理让局面变得可控。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_3', text: '当工作堆积如山时，我会优先处理最重要的事，其他的暂时放一放。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_4', text: '遇到麻烦我习惯先从自己身上找原因并调整行为。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_5', text: '压力大时，我会制定一个详细的行动计划来改变现状。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_6', text: '面对困境，我专注于我能控制的部分，不去纠结无法改变的事。', domain: 'stress', facet: 'stress', reverse: false },

  // Emotion-focused 情绪调节型 (7-12)
  { id: 'ST_7', text: '心情不好时，我会通过运动、听音乐或者电影来调节情绪。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_8', text: '当感到焦虑时，我会通过深呼吸或冥想来让自己平静下来。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_9', text: '我善于用幽默和积极的角度来看待挫折，给自己打气。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_10', text: '遭遇失败时，我会告诉自己"这是暂时的，一切都会好起来"。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_11', text: '压力大的时候，吃一顿好的或好好睡一觉能让我重新振作。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_12', text: '我允许自己在难过时哭一场或发泄出来，这让我感觉好很多。', domain: 'stress', facet: 'stress', reverse: false },

  // Support-seeking 寻求支持型 (13-18)
  { id: 'ST_13', text: '遇到烦心事，我第一时间会找朋友或家人倾诉。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_14', text: '我习惯和信任的人聊聊我的困扰，说出来后心里会舒服很多。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_15', text: '当我感到迷茫时，我会向有经验的人请教建议。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_16', text: '在工作或学习中遇到压力，我会和同事/同学互相支持和鼓励。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_17', text: '有时候仅仅是有人听我倾诉，压力就能减轻一半。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_18', text: '组队应对困难比一个人扛着更有效。', domain: 'stress', facet: 'stress', reverse: false },

  // Avoidance 逃避回避型 (19-24)
  { id: 'ST_19', text: '面对难以解决的问题，我会下意识地刷手机或玩游戏来逃避。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_20', text: '有些麻烦事我干脆不去想它，希望它自己消失。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_21', text: '当情绪很糟糕时，我倾向于一个人闷着，不想让别人知道。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_22', text: '压力大的时候我会睡很多觉来逃避现实。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_23', text: '遇到棘手的事情，我宁愿放一放也不愿意马上去面对。', domain: 'stress', facet: 'stress', reverse: false },
  { id: 'ST_24', text: '心情不好时我有时候会暴饮暴食或冲动消费来发泄。', domain: 'stress', facet: 'stress', reverse: false },
];

export const STRESS_ITEMS_PER_PAGE = 6;
