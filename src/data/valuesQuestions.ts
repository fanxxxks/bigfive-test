import type { Question } from '../lib/types';

// 40 questions — 4 items per Schwartz value, rewritten with everyday life scenarios
export const valuesQuestions: Question[] = [
  // =========================================================================
  // Power 权力 (1-4) — 追求社会地位、影响力、财富
  // =========================================================================
  { id: 'VL_1', text: '在团队讨论中，我喜欢主导话题并让其他人听从我的方向。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_2', text: '如果有一个能让我管理团队的职位，即使薪水差不多我也会争取。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_3', text: '我觉得当领导太累了，做个普通成员就挺好。', domain: 'values', facet: 'values', reverse: true },
  { id: 'VL_4', text: '朋友聚会时，我不在乎谁来拍板决定去哪里吃饭。', domain: 'values', facet: 'values', reverse: true },

  // =========================================================================
  // Achievement 成就 (5-8) — 追求成功、能力、抱负
  // =========================================================================
  { id: 'VL_5', text: '看到朋友圈里别人晒升职或获奖，我会感到竞争压力并激励自己更努力。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_6', text: '我会给自己设定具体的目标（比如一年内学会一项新技能），并定期检查进度。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_7', text: '我觉得人生不一定要取得多大成就，过得舒服自在才是最重要的。', domain: 'values', facet: 'values', reverse: true },
  { id: 'VL_8', text: '当别人夸奖我的工作成果时，我会感到由衷的满足和自豪。', domain: 'values', facet: 'values', reverse: false },

  // =========================================================================
  // Hedonism 享乐 (9-12) — 追求快乐、享受、感官满足
  // =========================================================================
  { id: 'VL_9', text: '辛苦工作一段时间后，我一定会给自己安排一次"犒劳"（美食、旅行、购物等）。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_10', text: '周末我更愿意和朋友出去吃喝玩乐，而不是宅在家做家务。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_11', text: '我常常因为太忙而忽略了自己的娱乐和放松需求。', domain: 'values', facet: 'values', reverse: true },
  { id: 'VL_12', text: '看到想买的东西，我通常会先考虑是不是必需品，而不是当下开心。', domain: 'values', facet: 'values', reverse: true },

  // =========================================================================
  // Stimulation 刺激 (13-16) — 追求新奇、变化、挑战
  // =========================================================================
  { id: 'VL_13', text: '周末我更愿意去尝试一家没去过的新餐厅，而不是去熟悉的老地方。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_14', text: '旅行时我喜欢自由探索未知的路线，而不是严格按攻略走。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_15', text: '我对蹦极、跳伞这类极限运动毫无兴趣，觉得太危险了。', domain: 'values', facet: 'values', reverse: true },
  { id: 'VL_16', text: '我的生活已经够充实了，不需要刻意寻找新鲜感。', domain: 'values', facet: 'values', reverse: true },

  // =========================================================================
  // Self-Direction 自主 (17-20) — 追求独立思考、创造力、选择自由
  // =========================================================================
  { id: 'VL_17', text: '在选择职业或专业时，我更看重自己的兴趣，而不是家人或社会的期望。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_18', text: '遇到问题我喜欢自己摸索解决方案，而不是直接问别人要答案。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_19', text: '在做重要决定时，我通常会先听取长辈或权威的意见再决定。', domain: 'values', facet: 'values', reverse: true },
  { id: 'VL_20', text: '我觉得按部就班地完成任务比天马行空地创新更靠谱。', domain: 'values', facet: 'values', reverse: true },

  // =========================================================================
  // Universalism 普世关怀 (21-24) — 追求社会正义、平等、环保
  // =========================================================================
  { id: 'VL_21', text: '去超市购物时，我会优先选择环保包装或可持续生产的产品。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_22', text: '看到社会不公的新闻（如歧视、贫困），我会感到愤怒并想为此做点什么。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_23', text: '我觉得地球环境的问题是政府和企业的责任，个人能做的有限。', domain: 'values', facet: 'values', reverse: true },
  { id: 'VL_24', text: '与其关注远方的苦难，我更愿意把精力放在自己身边的事情上。', domain: 'values', facet: 'values', reverse: true },

  // =========================================================================
  // Benevolence 仁爱 (25-28) — 维护亲近他人的福祉、忠诚、友谊
  // =========================================================================
  { id: 'VL_25', text: '当好朋友遇到困难时，即使我自己很忙也会抽出时间去陪他/她。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_26', text: '我经常主动联系家人和朋友，关心他们的近况。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_27', text: '每个人都有自己的生活要过，没必要总是为别人的事操心。', domain: 'values', facet: 'values', reverse: true },
  { id: 'VL_28', text: '当一个朋友总是向我倾诉烦恼时，时间久了我确实会感到不耐烦。', domain: 'values', facet: 'values', reverse: true },

  // =========================================================================
  // Tradition 传统 (29-32) — 尊重和接受传统文化、宗教习俗
  // =========================================================================
  { id: 'VL_29', text: '过年时遵循传统习俗（如拜年、祭祖、吃年夜饭）对我来说很有意义。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_30', text: '在重要的人生选择上（如结婚、择业），我会认真考虑父母的意见和家族的传统。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_31', text: '我觉得很多传统节日习俗已经过时了，应该与时俱进地简化。', domain: 'values', facet: 'values', reverse: true },
  { id: 'VL_32', text: '我不太理解为什么有人愿意花大量时间精力遵守繁琐的传统礼仪。', domain: 'values', facet: 'values', reverse: true },

  // =========================================================================
  // Conformity 遵从 (33-36) — 克制违规冲动、遵守规则和规范
  // =========================================================================
  { id: 'VL_33', text: '即使没有人监督，我也会自觉遵守交通规则（如等红灯、不超速）。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_34', text: '在公共场合（如图书馆、电影院），我会很注意自己的行为不影响他人。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_35', text: '有时候遵守规则太死板了，灵活变通才是聪明做法。', domain: 'values', facet: 'values', reverse: true },
  { id: 'VL_36', text: '如果看到有人插队，我一般不会出声制止，多一事不如少一事。', domain: 'values', facet: 'values', reverse: true },

  // =========================================================================
  // Security 安全 (37-40) — 追求稳定、秩序、健康、归属感
  // =========================================================================
  { id: 'VL_37', text: '找工作时，稳定性（如公务员、国企）比高收入但风险大的工作更吸引我。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_38', text: '我习惯提前规划好下一周的工作和行程，不喜欢临时变动。', domain: 'values', facet: 'values', reverse: false },
  { id: 'VL_39', text: '我对未来的不确定性并不焦虑，走一步看一步挺好的。', domain: 'values', facet: 'values', reverse: true },
  { id: 'VL_40', text: '即使存款不多，我也会先满足当下的消费欲望，钱以后再赚。', domain: 'values', facet: 'values', reverse: true },
];

export const VALUES_ITEMS_PER_PAGE = 8;
