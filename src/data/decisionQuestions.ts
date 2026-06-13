import type { Question } from '../lib/types';

// 决策风格测试 — 30 questions
// 4 dimensions: analytical (分析), intuitive (直觉), dependent (依赖), avoidant (回避)
export const decisionQuestions: Question[] = [
  // Analytical 分析型 (1-8)
  { id: 'DC_1', text: '做重要决定前，我会列出所有选项的优缺点进行对比。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_2', text: '我倾向于用数据和事实来支持我的决策，而不是凭感觉。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_3', text: '面对选择时，我通常会花足够的时间收集信息再做决定。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_4', text: '我相信"三思而后行"是明智的做法。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_5', text: '买大件商品前，我会花很多时间在网上比价和看评测。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_6', text: '我常常因为分析太久而错过了最佳决策时机。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_7', text: '我很少凭第一印象做决定，总觉得需要更多信息。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_8', text: '朋友说我做决定时像个精算师，太谨慎了。', domain: 'O', facet: 'D', reverse: false },

  // Intuitive 直觉型 (9-16)
  { id: 'DC_9', text: '我经常跟着"直觉"或"第六感"做决定，而且通常是对的。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_10', text: '比起冗长的分析，我更相信自己的第一反应。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_11', text: '做决定时，内心的感觉比外部的数据更重要。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_12', text: '我经常能快速做出决定，而且事后很少后悔。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_13', text: '面试一个人时，见面的前三分钟我就基本有判断了。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_14', text: '当一件事"感觉不对"时，即使数据支持我也会犹豫。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_15', text: '我在压力下反而能做出更准确的判断。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_16', text: '我不需要完美的信息，80%的把握就足够让我行动了。', domain: 'O', facet: 'D', reverse: false },

  // Dependent 依赖型 (17-22)
  { id: 'DC_17', text: '做重要决定前，我一定会征求家人或朋友的意见。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_18', text: '如果我要换工作，我会先和身边信任的人深入讨论。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_19', text: '当我拿不定主意时，我倾向于让别人帮我做决定。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_20', text: '参考他人的经验能让我对自己的决定更有信心。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_21', text: '我害怕独自承担决策失败的后果，所以需要别人的背书。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_22', text: '一个人做决定时，我常常感到不安和犹豫。', domain: 'O', facet: 'D', reverse: false },

  // Avoidant 回避型 (23-30)
  { id: 'DC_23', text: '面对艰难的决定，我常常一拖再拖，希望问题自己消失。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_24', text: '当面临两个都不太好的选项时，我宁愿不做选择。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_25', text: '做决定让我感到焦虑，我经常会想"如果选错了怎么办"。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_26', text: '重大决定面前，我有时会感到"瘫痪"，无法行动。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_27', text: '即使是日常小事（如点菜、选电影），我也经常纠结很久。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_28', text: '我宁愿让别人来决定，因为我不想承担选错的责任。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_29', text: '回顾过去，有很多决定我因为拖延而错过了好机会。', domain: 'O', facet: 'D', reverse: false },
  { id: 'DC_30', text: '我常常在做决定前反复摇摆，今天觉得A好明天又觉得B好。', domain: 'O', facet: 'D', reverse: false },
];

export const DECISION_ITEMS_PER_PAGE = 6;
