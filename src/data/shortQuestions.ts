import type { Question } from '../lib/types';

// IPIP-50 (Big Five Markers) — 10 items per domain, 5 positive + 5 reverse
// Based on the IPIP representation of the Goldberg (1992) Big Five markers
// Each domain has 10 items, no facet breakdown

export const shortQuestions: Question[] = [
  // =========================================================================
  // O: Openness to Experience (开放性) — 10 items
  // =========================================================================
  { id: 'SO_1', text: '我拥有丰富的想象力。', domain: 'O', facet: 'O', reverse: false },
  { id: 'SO_2', text: '我对抽象的理论和概念有浓厚兴趣。', domain: 'O', facet: 'O', reverse: false },
  { id: 'SO_3', text: '我喜欢尝试新鲜和不同寻常的事物。', domain: 'O', facet: 'O', reverse: false },
  { id: 'SO_4', text: '我对艺术和美有强烈的感受力。', domain: 'O', facet: 'O', reverse: false },
  { id: 'SO_5', text: '我对许多不同的话题都充满好奇。', domain: 'O', facet: 'O', reverse: false },
  { id: 'SO_6', text: '我不太喜欢花时间思考深奥的问题。', domain: 'O', facet: 'O', reverse: true },
  { id: 'SO_7', text: '我更倾向于遵循熟悉的日常习惯。', domain: 'O', facet: 'O', reverse: true },
  { id: 'SO_8', text: '我对艺术或诗歌没有特别的感受。', domain: 'O', facet: 'O', reverse: true },
  { id: 'SO_9', text: '我不喜欢频繁改变已有的生活方式。', domain: 'O', facet: 'O', reverse: true },
  { id: 'SO_10', text: '相比创新，我更喜欢经过验证的传统方法。', domain: 'O', facet: 'O', reverse: true },

  // =========================================================================
  // C: Conscientiousness (尽责性) — 10 items
  // =========================================================================
  { id: 'SC_1', text: '我做事总是有充分的准备和计划。', domain: 'C', facet: 'C', reverse: false },
  { id: 'SC_2', text: '我严格遵守承诺，言出必行。', domain: 'C', facet: 'C', reverse: false },
  { id: 'SC_3', text: '我喜欢保持工作和生活环境的整洁有序。', domain: 'C', facet: 'C', reverse: false },
  { id: 'SC_4', text: '一旦开始做一件事，我会坚持到底。', domain: 'C', facet: 'C', reverse: false },
  { id: 'SC_5', text: '我为自己设定高目标并努力达成。', domain: 'C', facet: 'C', reverse: false },
  { id: 'SC_6', text: '我常常把事情留到最后一刻才做。', domain: 'C', facet: 'C', reverse: true },
  { id: 'SC_7', text: '我有时会忘记把东西放回原位。', domain: 'C', facet: 'C', reverse: true },
  { id: 'SC_8', text: '我不太在意细节和小事。', domain: 'C', facet: 'C', reverse: true },
  { id: 'SC_9', text: '我经常临时改变计划，不太按日程行事。', domain: 'C', facet: 'C', reverse: true },
  { id: 'SC_10', text: '完成长期计划对我来说比较困难。', domain: 'C', facet: 'C', reverse: true },

  // =========================================================================
  // E: Extraversion (外向性) — 10 items
  // =========================================================================
  { id: 'SE_1', text: '我在社交聚会中是活跃的中心人物。', domain: 'E', facet: 'E', reverse: false },
  { id: 'SE_2', text: '我喜欢身边围绕着一群朋友的感觉。', domain: 'E', facet: 'E', reverse: false },
  { id: 'SE_3', text: '我很容易与陌生人展开对话。', domain: 'E', facet: 'E', reverse: false },
  { id: 'SE_4', text: '我的生活节奏很快，总是有很多事情在做。', domain: 'E', facet: 'E', reverse: false },
  { id: 'SE_5', text: '大多数时候我都感到快乐和充满能量。', domain: 'E', facet: 'E', reverse: false },
  { id: 'SE_6', text: '我更喜欢独自一人而不是参加社交活动。', domain: 'E', facet: 'E', reverse: true },
  { id: 'SE_7', text: '在人群中我通常保持低调，不太主动说话。', domain: 'E', facet: 'E', reverse: true },
  { id: 'SE_8', text: '我喜欢悠闲从容的生活节奏。', domain: 'E', facet: 'E', reverse: true },
  { id: 'SE_9', text: '我不太喜欢成为众人关注的焦点。', domain: 'E', facet: 'E', reverse: true },
  { id: 'SE_10', text: '我很少主动发起与陌生人的对话。', domain: 'E', facet: 'E', reverse: true },

  // =========================================================================
  // A: Agreeableness (宜人性) — 10 items
  // =========================================================================
  { id: 'SA_1', text: '我对他人充满同情和关心。', domain: 'A', facet: 'A', reverse: false },
  { id: 'SA_2', text: '我愿意花时间去帮助需要帮助的人。', domain: 'A', facet: 'A', reverse: false },
  { id: 'SA_3', text: '我相信大多数人都是善良和诚实的。', domain: 'A', facet: 'A', reverse: false },
  { id: 'SA_4', text: '我倾向于通过合作而非对抗来解决问题。', domain: 'A', facet: 'A', reverse: false },
  { id: 'SA_5', text: '我总是尽量设身处地地理解他人的感受。', domain: 'A', facet: 'A', reverse: false },
  { id: 'SA_6', text: '我不会轻易被别人的困难所打动。', domain: 'A', facet: 'A', reverse: true },
  { id: 'SA_7', text: '在有分歧时，我坚持己见不轻易妥协。', domain: 'A', facet: 'A', reverse: true },
  { id: 'SA_8', text: '我不太关心别人的问题和烦恼。', domain: 'A', facet: 'A', reverse: true },
  { id: 'SA_9', text: '我对他人通常抱有警惕心理。', domain: 'A', facet: 'A', reverse: true },
  { id: 'SA_10', text: '有时我会说一些刻薄的话。', domain: 'A', facet: 'A', reverse: true },

  // =========================================================================
  // N: Neuroticism (神经质) — 10 items
  // =========================================================================
  { id: 'SN_1', text: '我经常为一些小事感到焦虑。', domain: 'N', facet: 'N', reverse: false },
  { id: 'SN_2', text: '我的情绪时常会无缘无故地起伏波动。', domain: 'N', facet: 'N', reverse: false },
  { id: 'SN_3', text: '我很容易被日常生活中的压力压垮。', domain: 'N', facet: 'N', reverse: false },
  { id: 'SN_4', text: '我经常感到闷闷不乐、情绪低落。', domain: 'N', facet: 'N', reverse: false },
  { id: 'SN_5', text: '我很在意别人怎么看待我。', domain: 'N', facet: 'N', reverse: false },
  { id: 'SN_6', text: '我是一个心态平和、情绪稳定的人。', domain: 'N', facet: 'N', reverse: true },
  { id: 'SN_7', text: '面对压力情境，我通常能保持冷静。', domain: 'N', facet: 'N', reverse: true },
  { id: 'SN_8', text: '我很少感到悲伤或沮丧。', domain: 'N', facet: 'N', reverse: true },
  { id: 'SN_9', text: '我不太在意别人对我的评价。', domain: 'N', facet: 'N', reverse: true },
  { id: 'SN_10', text: '无论遇到什么困难，我都能泰然应对。', domain: 'N', facet: 'N', reverse: true },
];

export const SHORT_ITEMS_PER_PAGE = 5;
