import type { Question } from '../lib/types';

// 讨好型/不好惹指数 — 25题
// 坚定性(Assertiveness, 题1-13) + 讨好倾向(People-Pleasing, 题14-25)

export const boundaryQuestions: Question[] = [
  // ─── 坚定性 Assertiveness (1-13) ───
  { id: 'BD_1', text: '当我觉得自己受到了不公平对待时，我会直接表达出来。', domain: 'assert', facet: 'speak-up', reverse: false },
  { id: 'BD_2', text: '即使知道对方可能会不高兴，该说的话我仍然会说。', domain: 'assert', facet: 'speak-up', reverse: false },
  { id: 'BD_3', text: '在餐厅如果点的菜明显有问题，我会要求更换或退掉。', domain: 'assert', facet: 'rights', reverse: false },
  { id: 'BD_4', text: '如果有人插队，我通常会选择沉默，不想引起冲突。', domain: 'assert', facet: 'rights', reverse: true },
  { id: 'BD_5', text: '在工作中，我会主动争取自己应得的加薪、晋升或认可。', domain: 'assert', facet: 'workplace', reverse: false },
  { id: 'BD_6', text: '当朋友提出不合理的要求时，我能比较自然地拒绝。', domain: 'assert', facet: 'refusal', reverse: false },
  { id: 'BD_7', text: '我宁愿自己吃亏，也不愿意和别人发生争执。', domain: 'assert', facet: 'conflict', reverse: true },
  { id: 'BD_8', text: '在群体讨论中，即使自己的观点是少数，我也会坚持表达。', domain: 'assert', facet: 'speak-up', reverse: false },
  { id: 'BD_9', text: '别人对我的看法不会改变我对自己的评价。', domain: 'assert', facet: 'self-worth', reverse: false },
  { id: 'BD_10', text: '当被人误解时，我会反复解释直到对方理解，即使这样很累。', domain: 'assert', facet: 'self-worth', reverse: true },
  { id: 'BD_11', text: '我觉得"让别人舒服"比自己坚持立场更重要。', domain: 'assert', facet: 'priority', reverse: true },
  { id: 'BD_12', text: '被领导批评时，即使我觉得不合理，也不太敢反驳。', domain: 'assert', facet: 'workplace', reverse: true },
  { id: 'BD_13', text: '在感情中，我会明确告诉对方我的底线是什么。', domain: 'assert', facet: 'refusal', reverse: false },

  // ─── 讨好倾向 People-Pleasing (14-25) ───
  { id: 'BD_14', text: '我经常为了不让别人失望而勉强自己做一些不愿意做的事。', domain: 'please', facet: 'sacrifice', reverse: false },
  { id: 'BD_15', text: '拒绝别人之后，我会在心里反复纠结很久。', domain: 'please', facet: 'guilt', reverse: false },
  { id: 'BD_16', text: '我倾向于先照顾别人的情绪，再考虑自己的感受。', domain: 'please', facet: 'priority', reverse: false },
  { id: 'BD_17', text: '我经常说"没关系"——即使心里其实很有关系。', domain: 'please', facet: 'suppression', reverse: false },
  { id: 'BD_18', text: '如果有人因为我的拒绝而表现出失望，我会感到很内疚。', domain: 'please', facet: 'guilt', reverse: false },
  { id: 'BD_19', text: '我倾向于通过迎合他人来获得认可和喜欢。', domain: 'please', facet: 'approval', reverse: false },
  { id: 'BD_20', text: '在一段关系中，我通常是付出更多的那一方。', domain: 'please', facet: 'sacrifice', reverse: false },
  { id: 'BD_21', text: '当我的需求和别人的需求冲突时，我通常先满足别人。', domain: 'please', facet: 'priority', reverse: false },
  { id: 'BD_22', text: '别人对我的正面评价会极大地影响我的心情。', domain: 'please', facet: 'approval', reverse: false },
  { id: 'BD_23', text: '即使生气或受伤，我也习惯笑着说"没事"。', domain: 'please', facet: 'suppression', reverse: false },
  { id: 'BD_24', text: '我经常因为他人的负面情绪而感到自己有责任去安抚。', domain: 'please', facet: 'responsibility', reverse: false },
  { id: 'BD_25', text: '我会为了避免冲突而放弃自己真正想要的东西。', domain: 'please', facet: 'sacrifice', reverse: false },
];

export const BOUNDARY_ITEMS_PER_PAGE = 5;
