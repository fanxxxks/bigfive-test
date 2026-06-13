import type { Question } from '../lib/types';

// 社交风格测试 — 30 questions, 4 styles: 驱动型/表达型/亲和型/分析型
export const socialQuestions: Question[] = [
  // Driver 驱动型 (1-8)
  { id: 'SC_1', text: '和人交流时，我倾向于直奔主题，不喜欢绕弯子。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_2', text: '在讨论中我通常主导节奏，推动大家做决定。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_3', text: '我对效率很看重，冗长的闲聊让我不耐烦。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_4', text: '讨论问题时我直接指出漏洞，不怕得罪人。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_5', text: '比起关注人的感受，我更关注任务有没有完成。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_6', text: '我不需要所有人都喜欢我，把事情做对更重要。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_7', text: '讨论时我倾向于快速下结论，不喜欢拖泥带水。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_8', text: '有人说我说话太直接，但我觉得坦诚比委婉重要。', domain: 'O', facet: 'S', reverse: false },

  // Expressive 表达型 (9-15)
  { id: 'SC_9', text: '在社交场合我是活跃气氛的人，喜欢讲故事和开玩笑。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_10', text: '我喜欢成为关注的焦点，在众人面前表达让我兴奋。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_11', text: '我用丰富的表情和肢体语言来表达自己。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_12', text: '我经常凭一时冲动做决定，跟着感觉走。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_13', text: '我的情绪很容易感染周围的人，是好是坏都很明显。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_14', text: '我喜欢尝试新鲜事物，对一成不变感到厌倦。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_15', text: '头脑风暴时我的想法一个接一个地冒出来。', domain: 'O', facet: 'S', reverse: false },

  // Amiable 亲和型 (16-23)
  { id: 'SC_16', text: '在团队中我更关注大家相处得是否愉快。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_17', text: '发生冲突时我通常是主动缓和气氛的那个人。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_18', text: '我很少说不，即使自己很忙也会帮别人的忙。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_19', text: '别人说我很好相处、脾气好。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_20', text: '做重要决定前，我会考虑对周围人的影响。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_21', text: '我宁可委屈自己也不想让关系变得紧张。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_22', text: '与人合作时我重视共识多于效率。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_23', text: '当有人不高兴时，我能敏锐地感知到并去关心。', domain: 'O', facet: 'S', reverse: false },

  // Analytical 分析型 (24-30)
  { id: 'SC_24', text: '和人交流时我更注重信息的准确性和逻辑。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_25', text: '在给出意见前，我会先收集足够的数据和证据。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_26', text: '我比较内向安静，在社交中喜欢观察多于参与。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_27', text: '我不太擅长闲聊，更喜欢有深度的对话。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_28', text: '做决定前我会反复权衡利弊，不急于下结论。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_29', text: '我注重秩序和规则，不喜欢混乱和即兴发挥。', domain: 'O', facet: 'S', reverse: false },
  { id: 'SC_30', text: '别人有时觉得我太严肃，但我觉得严谨很重要。', domain: 'O', facet: 'S', reverse: false },
];

export const SOCIAL_ITEMS_PER_PAGE = 6;
