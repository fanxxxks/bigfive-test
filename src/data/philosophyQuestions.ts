import type { Question } from '../lib/types';

// 60 questions covering 18 philosophy schools
// Each question maps to 2-3 schools with direction (+1 = agree favors this school, -1 = disagree favors)
// The mapping is stored in a separate scoring module to keep questions clean

export const philosophyQuestions: Question[] = [
  // Block 1: Life Meaning & Purpose (1-10)
  { id: 'PH_1', text: '人生的意义不是被发现的，而是由每个人自己创造的。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_2', text: '人应该超越传统的善恶标准，创造属于自己的人生价值。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_3', text: '追求心灵的宁静和精神的自由，比追求世俗的成功更重要。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_4', text: '人生的本质是痛苦的，快乐只是痛苦之间的短暂喘息。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_5', text: '即使在绝望中，人也应该像推石上山的西西弗一样，在反抗中找到幸福。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_6', text: '修身齐家治国平天下——个人的道德修养应该层层递进，最终惠及社会。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_7', text: '世界本无意义，但正因为如此，我们才获得了完全的自由。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_8', text: '人生的最高境界是顺应自然，不刻意作为——无为而无不为。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_9', text: '幸福就是灵魂合乎德性的活动，在适度中生活。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_10', text: '我认为物质生活的生产方式是决定社会一切方面的基础。', domain: 'O', facet: 'P', reverse: false },

  // Block 2: Morality & Ethics (11-20)
  { id: 'PH_11', text: '一个行为的对错取决于它的结果——是否增进了最大多数人的幸福。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_12', text: '只按照你同时愿意它成为普遍法则的准则去行动。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_13', text: '己所不欲，勿施于人——这是做人最基本的原则。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_14', text: '道德不是来自理性推理，而是来自人类的情感——尤其是同情。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_15', text: '每个人内心都有辨别善恶的良知，不需要向外寻求道德答案。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_16', text: '道德善恶的观念本质上是强者意志的产物，弱者把"善良"强加给强者。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_17', text: '人应当永远把他人当作目的，而不仅仅是手段。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_18', text: '仁者爱人，以一颗仁爱之心对待世间万物。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_19', text: '道德和正义最终取决于经济基础和阶级立场。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_20', text: '我并不认为存在客观的道德真理——道德只是一种习惯和情感。', domain: 'O', facet: 'P', reverse: false },

  // Block 3: Knowledge & Truth (21-30)
  { id: 'PH_21', text: '一切可靠的知识最终都来源于感官经验。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_22', text: '存在着超越感官世界的永恒真理——理念、形式或道。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_23', text: '我思故我在——只有思维本身是无法怀疑的确定性。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_24', text: '所谓的因果规律，其实不过是人类心理上的习惯联想。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_25', text: '终极的真理是无法用语言表达的——道可道，非常道。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_26', text: '真知必然能付诸行动，不能行动的就不是真知。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_27', text: '我们应该对所有超出经验范围的断言保持怀疑。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_28', text: '知识就是回忆——灵魂在进入身体前曾见过真理的本来面目。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_29', text: '实践是检验真理的唯一标准。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_30', text: '以心观物，万物皆备于我——真理不在外部世界，而在人心之中。', domain: 'O', facet: 'P', reverse: false },

  // Block 4: Freedom & Choice (31-40)
  { id: 'PH_31', text: '人是绝对自由的——在每一个时刻你都在选择，包括选择"不选择"。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_32', text: '决定论是真实的——人的每一个选择都是由先前的条件决定的。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_33', text: '真正的自由是精神的自由——身体可以被束缚，心灵永远自由。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_34', text: '选择并不意味着随心所欲——你必须为自己的每一个选择负责。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_35', text: '人并不是自由的——我们的选择被社会关系和物质条件所决定。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_36', text: '自由不是做想做的事，而是有能力不做不想做的事。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_37', text: '超越二元对立——当你不区分自由和束缚时，才是真正的逍遥。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_38', text: '无知是自由的障碍——运用自己的理性去认识世界，这就是启蒙。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_39', text: '快乐就是身体无痛苦、灵魂无纷扰。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_40', text: '放下执着，不被欲望所奴役，才是真正的自由。', domain: 'O', facet: 'P', reverse: false },

  // Block 5: Suffering & Happiness (41-50)
  { id: 'PH_41', text: '苦难使人更强大——不要逃避痛苦，而要在痛苦中锻造自己。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_42', text: '人生本质上就是痛苦的——欲望不满足则痛苦，满足则无聊。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_43', text: '使我们烦恼的不是事件本身，而是我们对事件的看法和判断。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_44', text: '一切痛苦源于欲望和执着——放下，才能解脱。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_45', text: '简单的快乐才是最好的快乐——一顿好饭、好友相伴、内心安宁。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_46', text: '受苦的人没有悲观的权利——与其抱怨世界，不如努力改变它。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_47', text: '在事上磨练——在具体的生活事务中修炼心性，而非远离尘世。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_48', text: '幸福不是感觉的结果，而是理性行为的结果——做对的事自然会幸福。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_49', text: '我们应该接受生活中有许多不可控之事，只把精力放在可控之事上。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_50', text: '痛苦来源于把自我看得太重——无我，则无苦。', domain: 'O', facet: 'P', reverse: false },

  // Block 6: Society & Relationships (51-60)
  { id: 'PH_51', text: '人是政治的动物——只有在良好的社群中，人才能实现完整的德性。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_52', text: '他人即地狱——他人的目光总是在审判着你，使你失去本真。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_53', text: '礼的本质是建立和谐的人际秩序，让每个人各安其位。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_54', text: '世界上不存在脱离社会关系的孤立的个人。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_55', text: '与其改变世界，不如改变自己看世界的方式。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_56', text: '应当追求一种精神上的贵族主义——远离庸众，与少数精英为伍。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_57', text: '当权者必须有智慧——政治与哲学应该合二为一。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_58', text: '真正智慧的人不与人争——上善若水，利万物而不争。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_59', text: '每一个人都应该有权追求自己的幸福，只要不妨碍他人。', domain: 'O', facet: 'P', reverse: false },
  { id: 'PH_60', text: '一个行为是否正当，只看它带来的总体幸福是否大于不幸。', domain: 'O', facet: 'P', reverse: false },
];

export const PHILOSOPHY_ITEMS_PER_PAGE = 6;
