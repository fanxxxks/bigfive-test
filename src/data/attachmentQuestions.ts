import type { Question } from '../lib/types';

// 36 questions — 18 anxiety + 18 avoidance (ECR-R based)
export const attachmentQuestions: Question[] = [
  // Anxiety dimension (18 items)
  { id: 'AT_1', text: '我经常担心我的伴侣会不再爱我。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_2', text: '我担心自己在亲密关系中会被抛弃。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_3', text: '当我的伴侣不在身边时，我会担心他/她可能对别人产生兴趣。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_4', text: '我需要反复确认伴侣对我的感情。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_5', text: '当伴侣不回复我的消息时，我会感到非常焦虑。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_6', text: '我常常希望与伴侣在情感上完全融为一体。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_7', text: '如果发现我感兴趣的人开始对我产生好感，我会害怕对方之后会失望。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_8', text: '我担心在亲密关系中自己不如对方投入。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_9', text: '当伴侣在情感上稍微疏远时，我就会感到恐慌。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_10', text: '我害怕一个人独处，需要有人在身边才感到安心。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_11', text: '我常常感觉伴侣不太想和我像我希望的那样亲近。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_12', text: '当我喜欢一个人时，我会很快地想要推进关系。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_13', text: '如果伴侣对我稍有冷淡，我就会怀疑自己是不是做错了什么。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_14', text: '我需要伴侣不断地表达爱意才能感到安全。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_15', text: '即使在一段稳定的关系中，我仍然会对未来感到不确定。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_16', text: '分手或失去伴侣是我最害怕的事情之一。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_17', text: '我很容易对伴侣产生嫉妒情绪。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_18', text: '我常常觉得自己对关系的在乎程度超过了对方。', domain: 'O', facet: 'A', reverse: false },

  // Avoidance dimension (18 items, some reverse scored)
  { id: 'AT_19', text: '我不太喜欢向伴侣展示内心深处的感受。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_20', text: '当伴侣开始依赖我时，我会感到有些不自在。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_21', text: '保持独立对我来说比拥有亲密的伴侣关系更重要。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_22', text: '我很少向他人寻求帮助，包括我的伴侣。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_23', text: '我不太愿意与伴侣讨论我的问题和困扰。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_24', text: '当伴侣想和我非常亲近时，我会潜意识地想要保持距离。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_25', text: '我觉得自己一个人也能过得很好，不需要亲密关系。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_26', text: '别人对我过于亲近会让我感到压力很大。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_27', text: '我不太容易信任他人，包括伴侣。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_28', text: '我在亲密关系中需要很多个人空间。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_29', text: '伴侣的情绪需求有时会让我感到不堪重负。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_30', text: '向伴侣敞开心扉让我感到脆弱和不舒服。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_31', text: '我会回避过于亲密的肢体接触和情感表达。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_32', text: '在一段关系中，我需要确保自己随时可以抽身退出。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_33', text: '相比亲密关系，我更愿意专注于工作和个人目标。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_34', text: '当伴侣想要长时间待在一起时，我需要独处来"充电"。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_35', text: '我不喜欢在关系中失去自我或变得过于依赖对方。', domain: 'O', facet: 'A', reverse: false },
  { id: 'AT_36', text: '成为伴侣生活中最重要的情感支撑，对我来说压力太大了。', domain: 'O', facet: 'A', reverse: false },
];

export const ATTACHMENT_ITEMS_PER_PAGE = 6;
