import type { Question } from '../lib/types';

// 60 questions covering 18 philosophy schools — life-oriented rewrite
// Each question still maps to the same schools as before (scoring in philosophyScoring.ts)

export const philosophyQuestions: Question[] = [
  // Block 1: Life Meaning & Purpose (1-10)
  { id: 'PH_1', text: '人生的意义不是天生注定的，而是靠每个人自己的选择和行动来定义的。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_2', text: '我不认为社会定义的"成功"就是对的——每个人都应该有自己衡量人生的标准。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_3', text: '下班后安安静静地读一本书或散个步，比参加各种社交活动让我更充实。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_4', text: '我发现生活中的烦恼总是比快乐多——快乐往往短暂，烦恼却如影随形。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_5', text: '即使知道某件事可能徒劳无功，只要过程有意义，我仍然愿意全力以赴。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_6', text: '一个人先把自己的品行修好，才能把家庭经营好，进而为社会做出贡献。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_7', text: '人生本来就没有预设的剧本——但这恰恰给了我们完全的自由去书写自己的故事。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_8', text: '很多时候"不去强求"反而能得到更好的结果——顺其自然比使劲折腾更明智。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_9', text: '真正的幸福不是放纵自己，而是在生活中找到适度和平衡——不太多也不太少。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_10', text: '一个人能过上什么样的生活，很大程度上取决于他的经济条件和社会阶层。', domain: 'philosophy', facet: 'philosophy', reverse: false },

  // Block 2: Morality & Ethics (11-20)
  { id: 'PH_11', text: '判断一件事做得对不对，关键是看它最终有没有让大多数人受益。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_12', text: '在做一件事之前，我会问自己：如果所有人都这样做，这个世界会变得更好吗？', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_13', text: '"己所不欲，勿施于人"——这条原则足以指导我大多数的人际交往。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_14', text: '我认为道德更多来自人的同情心和情感，而不是冷冰冰的逻辑推理。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_15', text: '当我面临道德两难时，我最终依靠的是内心的直觉和良知，而不是外部规则。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_16', text: '很多所谓的"道德规范"其实是弱者用来约束强者的工具。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_17', text: '利用别人来达成自己的目的，即使对方不知情，我也觉得这是不对的。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_18', text: '在生活中保持一颗仁爱之心，设身处地为他人着想，这是做人的根本。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_19', text: '一个人的道德观念，说到底是他的社会地位和经济利益决定的。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_20', text: '我不相信有什么永恒的、放之四海皆准的道德——道德不过是特定时代和文化的习惯。', domain: 'philosophy', facet: 'philosophy', reverse: false },

  // Block 3: Knowledge & Truth (21-30)
  { id: 'PH_21', text: '我相信"眼见为实"——真正可靠的知识必须来自实际体验和观察。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_22', text: '有些东西是超越感官世界的——比如数学真理和美的本质，它们不依赖于人的感知而存在。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_23', text: '不管我怀疑什么，"我在思考"这件事本身是无法被怀疑的——这是所有认知的起点。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_24', text: '所谓的"因果关系"可能只是我们习惯性地把先后发生的事情联系在一起罢了。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_25', text: '人生中很多最深刻的道理是"只可意会不可言传"的——说出来反而变味了。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_26', text: '知道该怎么做却不去行动，说明你其实并没有真正理解——真知必然带来行动。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_27', text: '对于那些无法用经验验证的说法（比如星座决定性格），我习惯保持怀疑态度。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_28', text: '有时候学到一个新的深刻道理，我感觉不是"学会"了，而是"想起"了本来就懂的东西。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_29', text: '一个理论对不对，最终要看它在现实中能不能行得通——实践是最好的检验。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_30', text: '很多问题的答案不在外部世界，而在于你用心去感受和体会。', domain: 'philosophy', facet: 'philosophy', reverse: false },

  // Block 4: Freedom & Choice (31-40)
  { id: 'PH_31', text: '人生中的每个时刻我都在主动做出选择——包括"不做选择"本身也是一种选择。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_32', text: '我觉得人的选择很大程度上是由成长经历和外部环境决定的，真正的"自由意志"没有想象中那么多。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_33', text: '身体可以被996的工作束缚，但心灵的独立和自由是任何人都夺不走的。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_34', text: '自由不只是"想做什么就做什么"——真正的自由意味着你要为自己的选择承担后果。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_35', text: '一个人的消费习惯、人生选择，仔细想想其实都是社会环境和阶层决定的。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_36', text: '真正的自由不是想玩手机就玩手机，而是有自控力不被手机绑架。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_37', text: '当我不再纠结什么是"自由"什么是"束缚"时，反而感到了前所未有的轻松。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_38', text: '敢于用自己的理性去思考和判断，而不是盲从权威和大众，这才是真正的成熟。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_39', text: '人生最幸福的状态就是身体健康、心里没有烦恼——其他的都是锦上添花。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_40', text: '放下对名利的执着，不被欲望牵着走，才能获得真正的内心自由。', domain: 'philosophy', facet: 'philosophy', reverse: false },

  // Block 5: Suffering & Happiness (41-50)
  { id: 'PH_41', text: '经历过的挫折和痛苦塑造了现在的我——回忆中最难的日子反而是成长最快的。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_42', text: '人就是这样的：得不到的时候拼命想要，得到了以后很快又觉得无聊。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_43', text: '同样是被上司批评，我可以选择生气一整天，也可以选择反思后继续前进——选择权在我。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_44', text: '大多数烦恼其实源于我想要太多——如果能减少不必要的欲望，生活会轻松很多。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_45', text: '对我来说，幸福不是什么宏大目标——一顿好饭、三五好友、内心安宁就足够了。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_46', text: '与其坐在那里抱怨世界不公平，不如用实际行动去改善哪怕一点点。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_47', text: '真正的成长不是躲在深山修行，而是在日常工作和琐事中磨练自己的心性。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_48', text: '做正确的事自然会带来内心的平静——即使短期内不那么舒服，长期来看是幸福的。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_49', text: '生活中很多事我无法控制（比如堵车、同事的情绪），与其焦虑不如接受这些不可控的部分。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_50', text: '我发现当我不再那么在意"自我"时，很多烦恼就自然消失了。', domain: 'philosophy', facet: 'philosophy', reverse: false },

  // Block 6: Society & Relationships (51-60)
  { id: 'PH_51', text: '人很难孤立地生活——只有在与他人的良好关系中，人才能真正地完善自己。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_52', text: '有时候我觉得别人的眼光像一面镜子，总是在审视和评判我，让我不自在。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_53', text: '礼貌和规矩不是虚伪——它们是让人际交往更顺畅的润滑剂。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_54', text: '一个人的想法、品味和追求，说到底都离不开他所处的社会环境和人际关系。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_55', text: '当现实让我不满意时，我更多会选择调整自己的心态，而不是试图改变世界。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_56', text: '我宁愿和少数有深度的人交往，也不愿在热闹的社交中消耗自己的精力。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_57', text: '一个社会最好的状态，是由最有智慧和德行的人来引领和做决策。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_58', text: '在竞争激烈的职场中，不争不抢、默默做好自己分内事的人往往笑到最后。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_59', text: '在不伤害他人的前提下，每个人都有权利按自己的方式追求快乐。', domain: 'philosophy', facet: 'philosophy', reverse: false },
  { id: 'PH_60', text: '评价一个公司政策或社会制度好不好，就看它有没有让大多数人的生活变得更幸福。', domain: 'philosophy', facet: 'philosophy', reverse: false },
];

export const PHILOSOPHY_ITEMS_PER_PAGE = 6;
