import type { Question } from '../lib/types';

// 40 questions — 4 items per Schwartz value
export const valuesQuestions: Question[] = [
  // Power 权力 (1-4)
  { id: 'VL_1', text: '成为领导者、拥有权威对我来说很重要。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_2', text: '我希望拥有足够的财富来自由地做任何想做的事。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_3', text: '我不太在意社会地位和头衔。', domain: 'O', facet: 'V', reverse: true },
  { id: 'VL_4', text: '影响他人、让别人听从我的意见让我感到满足。', domain: 'O', facet: 'V', reverse: false },

  // Achievement 成就 (5-8)
  { id: 'VL_5', text: '在别人眼中我是成功的，这对我很重要。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_6', text: '我会不断设定更高的目标并努力实现它们。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_7', text: '我觉得人生不必非要取得什么了不起的成就。', domain: 'O', facet: 'V', reverse: true },
  { id: 'VL_8', text: '获得他人的认可和赞赏让我充满动力。', domain: 'O', facet: 'V', reverse: false },

  // Hedonism 享乐 (9-12)
  { id: 'VL_9', text: '享受生活、让自己开心是最重要的事之一。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_10', text: '我会给自己留出足够的时间做喜欢的事。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_11', text: '我认为过多的享乐会让人变得懒惰和空虚。', domain: 'O', facet: 'V', reverse: true },
  { id: 'VL_12', text: '一场美妙的体验比物质积累更让我快乐。', domain: 'O', facet: 'V', reverse: false },

  // Stimulation 刺激 (13-16)
  { id: 'VL_13', text: '我喜欢尝试从未做过的新鲜事。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_14', text: '冒险和挑战让生活更有滋味。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_15', text: '我更喜欢稳定、可预测的生活方式。', domain: 'O', facet: 'V', reverse: true },
  { id: 'VL_16', text: '不断接触新事物、新想法让我保持活力。', domain: 'O', facet: 'V', reverse: false },

  // Self-Direction 自主 (17-20)
  { id: 'VL_17', text: '独立做出自己的决定、不受他人左右，这对我来说至关重要。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_18', text: '创造力和好奇心是推动我前进的重要力量。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_19', text: '我乐于遵循已有的规则和流程，自己拿主意让我感到不安。', domain: 'O', facet: 'V', reverse: true },
  { id: 'VL_20', text: '自己探索和发现答案，比接受现成答案更有意义。', domain: 'O', facet: 'V', reverse: false },

  // Universalism 普世关怀 (21-24)
  { id: 'VL_21', text: '保护环境、维护生态平衡是每个人的责任。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_22', text: '所有人都应该被平等对待，无论他们的背景如何。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_23', text: '我更关注自己和自己关心的人，而不是全人类的问题。', domain: 'O', facet: 'V', reverse: true },
  { id: 'VL_24', text: '世界和平和社会正义是值得我为之努力的目标。', domain: 'O', facet: 'V', reverse: false },

  // Benevolence 仁爱 (25-28)
  { id: 'VL_25', text: '照顾好家人和亲近的朋友是我生活中最重要的事。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_26', text: '当身边有人需要帮助时，我会放下自己的事去帮助他们。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_27', text: '每个人应该先照顾好自己，帮助他人是其次的。', domain: 'O', facet: 'V', reverse: true },
  { id: 'VL_28', text: '忠诚于朋友和家庭是一种核心美德。', domain: 'O', facet: 'V', reverse: false },

  // Tradition 传统 (29-32)
  { id: 'VL_29', text: '传统文化习俗中有很多值得保留和传承的智慧。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_30', text: '遵循父母和长辈的教诲通常是最好的选择。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_31', text: '我认为传统和习俗往往过时了，需要被更新和改变。', domain: 'O', facet: 'V', reverse: true },
  { id: 'VL_32', text: '谦逊和尊重长辈是很重要的品德。', domain: 'O', facet: 'V', reverse: false },

  // Conformity 遵从 (33-36)
  { id: 'VL_33', text: '遵守社会规则和规范是每个人的义务。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_34', text: '在公共场合，我会特别注意自己的言行举止。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_35', text: '有些社会规则限制了人的自由，不一定要遵守。', domain: 'O', facet: 'V', reverse: true },
  { id: 'VL_36', text: '做一个有礼貌、守规矩的人让我感到安心。', domain: 'O', facet: 'V', reverse: false },

  // Security 安全 (37-40)
  { id: 'VL_37', text: '拥有稳定的工作和生活环境对我来说非常重要。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_38', text: '我会优先考虑经济上的安全感，而非追求高风险高回报。', domain: 'O', facet: 'V', reverse: false },
  { id: 'VL_39', text: '我不太担心未来的不确定性，随遇而安就好。', domain: 'O', facet: 'V', reverse: true },
  { id: 'VL_40', text: '有一个安全可靠的社群归属感，是幸福的基础。', domain: 'O', facet: 'V', reverse: false },
];

export const VALUES_ITEMS_PER_PAGE = 8;
