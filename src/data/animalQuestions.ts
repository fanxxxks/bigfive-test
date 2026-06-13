import type { Question } from '../lib/types';

// 性格动物匹配 — 30 questions, 8 animal archetypes
export const animalQuestions: Question[] = [
  // Lion 狮子-领袖型 (1-4)
  { id: 'AN_1', text: '在团队中，我自然而然地会站出来带领大家。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_2', text: '我喜欢做决定并为之负责，即使有风险。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_3', text: '在竞争环境中我反而会更加兴奋和投入。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_4', text: '我说话直接，不喜欢拐弯抹角。', domain: 'animal', facet: 'match', reverse: false },

  // Owl 猫头鹰-智慧型 (5-8)
  { id: 'AN_5', text: '我倾向于先观察和分析，然后才发表意见。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_6', text: '我对事物的原理和逻辑有强烈的好奇心。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_7', text: '我享受独自研究和深入思考一个问题的过程。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_8', text: '朋友们经常来找我分析问题或寻求建议。', domain: 'animal', facet: 'match', reverse: false },

  // Dolphin 海豚-社交型 (9-12)
  { id: 'AN_9', text: '在人群中我感到充满能量，喜欢热闹的氛围。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_10', text: '我能很快和陌生人聊起来，社交对我来说很自然。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_11', text: '朋友心情不好时，我通常第一个察觉到并去安慰。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_12', text: '我享受组织聚会，把大家聚在一起让我很开心。', domain: 'animal', facet: 'match', reverse: false },

  // Fox 狐狸-机智型 (13-16)
  { id: 'AN_13', text: '面对突发状况，我总能快速想出变通的方案。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_14', text: '我善于在不同的场合展现不同的面貌来适应环境。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_15', text: '当正路走不通时，我会找一些"捷径"来达成目标。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_16', text: '谈判和协商中我总能找到对自己有利的方案。', domain: 'animal', facet: 'match', reverse: false },

  // Bear 熊-稳重型 (17-20)
  { id: 'AN_17', text: '我是朋友眼中的"定海神针"，很少慌乱。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_18', text: '我做事喜欢按部就班，一步一个脚印。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_19', text: '我很看重承诺，答应的事一定会做到。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_20', text: '比起追求刺激，我更喜欢稳定和熟悉的生活。', domain: 'animal', facet: 'match', reverse: false },

  // Deer 鹿-温柔型 (21-24)
  { id: 'AN_21', text: '看到别人受苦或难过，我会感同身受。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_22', text: '在冲突中我通常是主动退让、寻求和解的一方。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_23', text: '我很容易信任和接纳别人，相信大多数人都是善良的。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_24', text: '帮助别人让我感到由衷的快乐和满足。', domain: 'animal', facet: 'match', reverse: false },

  // Eagle 鹰-远见型 (25-27)
  { id: 'AN_25', text: '我经常思考未来5年、10年后的事情和趋势。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_26', text: '我不太在意眼前的得失，更看重长期的发展。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_27', text: '我善于从全局角度看问题，不被小细节绊住。', domain: 'animal', facet: 'match', reverse: false },

  // Wolf 狼-独立型 (28-30)
  { id: 'AN_28', text: '我更喜欢独立完成任务而不是和一群人协作。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_29', text: '我不需要很多社交，独处时我最有创造力。', domain: 'animal', facet: 'match', reverse: false },
  { id: 'AN_30', text: '我有强烈的个人边界，不喜欢别人干涉我的事。', domain: 'animal', facet: 'match', reverse: false },
];

export const ANIMAL_ITEMS_PER_PAGE = 6;
