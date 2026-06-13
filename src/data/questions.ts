import type { Question } from '../lib/types';

// IPIP-NEO-120 items (120 items across 30 facets) + consistency check pairs
// Each facet has 4 items. R suffix = reverse scored.
// Items with pairId are consistency check pairs.

export const questions: Question[] = [
  // =========================================================================
  // O: Openness to Experience (开放性) - 6 facets × 4 items = 24 items
  // =========================================================================

  // O1: Imagination (想象力)
  { id: 'O1_1', text: '我拥有生动而丰富的想象力。', domain: 'O', facet: 'O1', reverse: false },
  { id: 'O1_2', text: '我喜欢沉浸在自己的幻想和梦境中。', domain: 'O', facet: 'O1', reverse: false },
  { id: 'O1_3', text: '我不太会花时间做白日梦或幻想。', domain: 'O', facet: 'O1', reverse: true },
  { id: 'O1_4', text: '相比天马行空，我更愿意关注现实问题。', domain: 'O', facet: 'O1', reverse: true },

  // O2: Artistic Interests (艺术兴趣)
  { id: 'O2_1', text: '我对诗歌、音乐和艺术有强烈的感受力。', domain: 'O', facet: 'O2', reverse: false },
  { id: 'O2_2', text: '我经常被美丽的自然景色或艺术作品所打动。', domain: 'O', facet: 'O2', reverse: false },
  { id: 'O2_3', text: '我对艺术和美的事物没有特别的兴趣。', domain: 'O', facet: 'O2', reverse: true },
  { id: 'O2_4', text: '我不太会注意到周围环境中的美。', domain: 'O', facet: 'O2', reverse: true },

  // O3: Emotionality (情绪感受)
  { id: 'O3_1', text: '我能敏锐地感受到自己情绪的变化。', domain: 'O', facet: 'O3', reverse: false },
  { id: 'O3_2', text: '有时一段音乐或一部电影会让我深受感动。', domain: 'O', facet: 'O3', reverse: false },
  { id: 'O3_3', text: '我很少被情绪左右，通常保持理性。', domain: 'O', facet: 'O3', reverse: true },
  { id: 'O3_4', text: '对我来说，情绪体验并不比理性思考重要。', domain: 'O', facet: 'O3', reverse: true },

  // O4: Adventurousness (冒险精神)
  { id: 'O4_1', text: '我喜欢尝试新奇和不同寻常的事物。', domain: 'O', facet: 'O4', reverse: false },
  { id: 'O4_2', text: '去一个陌生的地方旅行让我感到兴奋。', domain: 'O', facet: 'O4', reverse: false },
  { id: 'O4_3', text: '我更倾向于遵循熟悉的日常习惯。', domain: 'O', facet: 'O4', reverse: true },
  { id: 'O4_4', text: '我不喜欢频繁改变已有的生活方式。', domain: 'O', facet: 'O4', reverse: true },

  // O5: Intellect (求知欲)
  { id: 'O5_1', text: '我喜欢思考和探讨深奥的哲学问题。', domain: 'O', facet: 'O5', reverse: false },
  { id: 'O5_2', text: '学习新知识是我生活中最大的乐趣之一。', domain: 'O', facet: 'O5', reverse: false },
  { id: 'O5_3', text: '我对抽象的理论和概念不怎么感兴趣。', domain: 'O', facet: 'O5', reverse: true },
  { id: 'O5_4', text: '我很少深入思考生命的意义这类问题。', domain: 'O', facet: 'O5', reverse: true },

  // O6: Liberalism (自由主义)
  { id: 'O6_1', text: '我认为社会应该更加包容多元的生活方式。', domain: 'O', facet: 'O6', reverse: false },
  { id: 'O6_2', text: '我相信传统价值观有时候需要被挑战和更新。', domain: 'O', facet: 'O6', reverse: false },
  { id: 'O6_3', text: '我认为遵循传统和权威通常是最好的选择。', domain: 'O', facet: 'O6', reverse: true },
  { id: 'O6_4', text: '我不认为现有的社会规范需要大的改变。', domain: 'O', facet: 'O6', reverse: true },

  // =========================================================================
  // C: Conscientiousness (尽责性) - 6 facets × 4 items = 24 items
  // =========================================================================

  // C1: Self-Efficacy (自我效能)
  { id: 'C1_1', text: '我相信自己有能力完成大多数任务。', domain: 'C', facet: 'C1', reverse: false },
  { id: 'C1_2', text: '面对困难时，我通常相信自己能找到解决办法。', domain: 'C', facet: 'C1', reverse: false },
  { id: 'C1_3', text: '我经常怀疑自己是否具备成功所需的能力。', domain: 'C', facet: 'C1', reverse: true },
  { id: 'C1_4', text: '执行复杂任务时，我常常缺乏自信。', domain: 'C', facet: 'C1', reverse: true },

  // C2: Orderliness (条理性)
  { id: 'C2_1', text: '我喜欢保持工作和生活环境的整洁有序。', domain: 'C', facet: 'C2', reverse: false },
  { id: 'C2_2', text: '计划和时间表能让我的生活更有效率。', domain: 'C', facet: 'C2', reverse: false },
  { id: 'C2_3', text: '整洁并不是我生活中的优先事项。', domain: 'C', facet: 'C2', reverse: true },
  { id: 'C2_4', text: '我经常把东西随手乱放，房间也常常很乱。', domain: 'C', facet: 'C2', reverse: true },

  // C3: Dutifulness (责任感)
  { id: 'C3_1', text: '我严格遵守承诺，言出必行。', domain: 'C', facet: 'C3', reverse: false },
  { id: 'C3_2', text: '遵守规则和履行义务对我来说很重要。', domain: 'C', facet: 'C3', reverse: false },
  { id: 'C3_3', text: '有时候我会为了便利而绕过某些规则。', domain: 'C', facet: 'C3', reverse: true },
  { id: 'C3_4', text: '我不认为每一个承诺都必须严格遵守。', domain: 'C', facet: 'C3', reverse: true },

  // C4: Achievement-Striving (成就追求)
  { id: 'C4_1', text: '我会为自己设定高远的目标并努力达成。', domain: 'C', facet: 'C4', reverse: false },
  { id: 'C4_2', text: '卓越的成就感对我而言非常重要。', domain: 'C', facet: 'C4', reverse: false },
  { id: 'C4_3', text: '我对目前的生活状态感到满足，不需要追求更多。', domain: 'C', facet: 'C4', reverse: true },
  { id: 'C4_4', text: '我不太在意成就的高低，过得开心就好。', domain: 'C', facet: 'C4', reverse: true },

  // C5: Self-Discipline (自律性)
  { id: 'C5_1', text: '一旦开始一件事情，我倾向于坚持到底。', domain: 'C', facet: 'C5', reverse: false },
  { id: 'C5_2', text: '即使感到疲倦，我也能督促自己完成任务。', domain: 'C', facet: 'C5', reverse: false },
  { id: 'C5_3', text: '我容易被有趣的事情分散注意力而拖延正事。', domain: 'C', facet: 'C5', reverse: true },
  { id: 'C5_4', text: '完成一个长期计划对我来说相当困难。', domain: 'C', facet: 'C5', reverse: true },

  // C6: Cautiousness (审慎性)
  { id: 'C6_1', text: '在做决定之前，我总是三思而后行。', domain: 'C', facet: 'C6', reverse: false },
  { id: 'C6_2', text: '我倾向于仔细权衡利弊再做出最终选择。', domain: 'C', facet: 'C6', reverse: false },
  { id: 'C6_3', text: '我经常凭直觉快速做出决定，而不是反复权衡。', domain: 'C', facet: 'C6', reverse: true },
  { id: 'C6_4', text: '与其思前想后，我更喜欢当机立断。', domain: 'C', facet: 'C6', reverse: true },

  // =========================================================================
  // E: Extraversion (外向性) - 6 facets × 4 items = 24 items
  // =========================================================================

  // E1: Friendliness (友善性)
  { id: 'E1_1', text: '我很容易与人建立友好关系，交朋友对我而言不是难事。', domain: 'E', facet: 'E1', reverse: false },
  { id: 'E1_2', text: '初次见面时，我会主动与人攀谈。', domain: 'E', facet: 'E1', reverse: false },
  { id: 'E1_3', text: '在社交场合，我通常不会主动接近陌生人。', domain: 'E', facet: 'E1', reverse: true },
  { id: 'E1_4', text: '我需要很长时间才能真正与人亲近。', domain: 'E', facet: 'E1', reverse: true },

  // E2: Gregariousness (合群性)
  { id: 'E2_1', text: '我喜欢身边围绕着一群朋友的感觉。', domain: 'E', facet: 'E2', reverse: false },
  { id: 'E2_2', text: '参加派对和聚会让我感到精力充沛。', domain: 'E', facet: 'E2', reverse: false },
  { id: 'E2_3', text: '我更享受独处而非热闹的社交活动。', domain: 'E', facet: 'E2', reverse: true },
  { id: 'E2_4', text: '大型社交场合常常让我感到疲惫。', domain: 'E', facet: 'E2', reverse: true },

  // E3: Assertiveness (自信性)
  { id: 'E3_1', text: '在团队讨论中，我会积极地发表自己的观点。', domain: 'E', facet: 'E3', reverse: false },
  { id: 'E3_2', text: '如果需要，我愿意在团队中承担领导角色。', domain: 'E', facet: 'E3', reverse: false },
  { id: 'E3_3', text: '在集体讨论中，我通常倾向于倾听而非发言。', domain: 'E', facet: 'E3', reverse: true },
  { id: 'E3_4', text: '领导别人并不是我喜欢做的事情。', domain: 'E', facet: 'E3', reverse: true },

  // E4: Activity Level (活力水平)
  { id: 'E4_1', text: '我的生活节奏很快，总是有很多事情在做。', domain: 'E', facet: 'E4', reverse: false },
  { id: 'E4_2', text: '我精力充沛，很少感到无所事事。', domain: 'E', facet: 'E4', reverse: false },
  { id: 'E4_3', text: '我喜欢悠闲、从容的生活节奏。', domain: 'E', facet: 'E4', reverse: true },
  { id: 'E4_4', text: '人们常说我看起来比较安静、不爱匆忙。', domain: 'E', facet: 'E4', reverse: true },

  // E5: Excitement-Seeking (刺激寻求)
  { id: 'E5_1', text: '我乐于尝试刺激的体验，比如极限运动。', domain: 'E', facet: 'E5', reverse: false },
  { id: 'E5_2', text: '热闹的场合和冒险的活动让我感到兴奋。', domain: 'E', facet: 'E5', reverse: false },
  { id: 'E5_3', text: '我对寻求刺激的活动没有什么兴趣。', domain: 'E', facet: 'E5', reverse: true },
  { id: 'E5_4', text: '比起冒险，我更偏爱安全可靠的环境。', domain: 'E', facet: 'E5', reverse: true },

  // E6: Cheerfulness (积极情绪)
  { id: 'E6_1', text: '大多数时候我都感到快乐和满足。', domain: 'E', facet: 'E6', reverse: false },
  { id: 'E6_2', text: '我对生活始终抱有乐观积极的态度。', domain: 'E', facet: 'E6', reverse: false },
  { id: 'E6_3', text: '我并不像大多数人那样经常感到开心。', domain: 'E', facet: 'E6', reverse: true },
  { id: 'E6_4', text: '我很少有无忧无虑的愉快时刻。', domain: 'E', facet: 'E6', reverse: true },

  // =========================================================================
  // A: Agreeableness (宜人性) - 6 facets × 4 items = 24 items
  // =========================================================================

  // A1: Trust (信任感)
  { id: 'A1_1', text: '总体而言，我相信大多数人都是善良和诚实的。', domain: 'A', facet: 'A1', reverse: false },
  { id: 'A1_2', text: '我愿意相信他人，直到有证据证明他们不可信。', domain: 'A', facet: 'A1', reverse: false },
  { id: 'A1_3', text: '我对他人通常抱有警惕心理。', domain: 'A', facet: 'A1', reverse: true },
  { id: 'A1_4', text: '我认为如果给机会，大多数人都会占你便宜。', domain: 'A', facet: 'A1', reverse: true },

  // A2: Morality (道德感)
  { id: 'A2_1', text: '我不会通过欺骗或操纵他人来达到目的。', domain: 'A', facet: 'A2', reverse: false },
  { id: 'A2_2', text: '诚实正直是我做人的基本原则。', domain: 'A', facet: 'A2', reverse: false },
  { id: 'A2_3', text: '在某些情况下，为了获取利益而欺骗是可以接受的。', domain: 'A', facet: 'A2', reverse: true },
  { id: 'A2_4', text: '有时候为了让事情顺利进行，不得不撒一些善意的谎言。', domain: 'A', facet: 'A2', reverse: true },

  // A3: Altruism (利他性)
  { id: 'A3_1', text: '看到他人需要帮助时，我会毫不犹豫地伸出援手。', domain: 'A', facet: 'A3', reverse: false },
  { id: 'A3_2', text: '帮助别人让我感到真正的心灵满足。', domain: 'A', facet: 'A3', reverse: false },
  { id: 'A3_3', text: '我并不觉得帮助陌生人是一种义务。', domain: 'A', facet: 'A3', reverse: true },
  { id: 'A3_4', text: '我更关注自己的需求而不是他人的需求。', domain: 'A', facet: 'A3', reverse: true },

  // A4: Cooperation (合作性)
  { id: 'A4_1', text: '我倾向于通过合作而非对抗来解决问题。', domain: 'A', facet: 'A4', reverse: false },
  { id: 'A4_2', text: '即使意见不同，我也努力保持友善和包容。', domain: 'A', facet: 'A4', reverse: false },
  { id: 'A4_3', text: '在有分歧时，我不会轻易妥协以换取和平。', domain: 'A', facet: 'A4', reverse: true },
  { id: 'A4_4', text: '我乐于指出他人的错误，即使这会引发不快。', domain: 'A', facet: 'A4', reverse: true },

  // A5: Modesty (谦虚性)
  { id: 'A5_1', text: '即使取得成就，我也不会刻意炫耀。', domain: 'A', facet: 'A5', reverse: false },
  { id: 'A5_2', text: '我认为自己只是一个普通人，没什么了不起的。', domain: 'A', facet: 'A5', reverse: false },
  { id: 'A5_3', text: '我为自己取得的成就感到自豪，值得拿出来说说。', domain: 'A', facet: 'A5', reverse: true },
  { id: 'A5_4', text: '我觉得自己比大多数人更优秀。', domain: 'A', facet: 'A5', reverse: true },

  // A6: Sympathy (同理心)
  { id: 'A6_1', text: '看到他人受苦会让我感同身受。', domain: 'A', facet: 'A6', reverse: false },
  { id: 'A6_2', text: '我总是尽量设身处地地理解他人的感受。', domain: 'A', facet: 'A6', reverse: false },
  { id: 'A6_3', text: '他人的情绪问题很少能影响到我。', domain: 'A', facet: 'A6', reverse: true },
  { id: 'A6_4', text: '我不太容易对别人的遭遇产生同情。', domain: 'A', facet: 'A6', reverse: true },

  // =========================================================================
  // N: Neuroticism (神经质) - 6 facets × 4 items = 24 items
  // =========================================================================

  // N1: Anxiety (焦虑性)
  { id: 'N1_1', text: '我经常为一些小事感到焦虑。', domain: 'N', facet: 'N1', reverse: false },
  { id: 'N1_2', text: '经常会有一种不安的感觉笼罩着我。', domain: 'N', facet: 'N1', reverse: false },
  { id: 'N1_3', text: '我是一个心态平和的人，很少感到紧张。', domain: 'N', facet: 'N1', reverse: true },
  { id: 'N1_4', text: '面对压力情境，我通常能保持冷静。', domain: 'N', facet: 'N1', reverse: true },

  // N2: Anger (愤怒性)
  { id: 'N2_1', text: '我很容易被小事激怒。', domain: 'N', facet: 'N2', reverse: false },
  { id: 'N2_2', text: '有时我会感到怒火中烧，难以控制。', domain: 'N', facet: 'N2', reverse: false },
  { id: 'N2_3', text: '我是一个性情平和、很少发火的人。', domain: 'N', facet: 'N2', reverse: true },
  { id: 'N2_4', text: '不值得为小事生气，这是我的处世之道。', domain: 'N', facet: 'N2', reverse: true },

  // N3: Depression (抑郁性)
  { id: 'N3_1', text: '我时常感到闷闷不乐，情绪低落。', domain: 'N', facet: 'N3', reverse: false },
  { id: 'N3_2', text: '有时我觉得未来看不到什么希望。', domain: 'N', facet: 'N3', reverse: false },
  { id: 'N3_3', text: '我的情绪总体上是稳定和积极的。', domain: 'N', facet: 'N3', reverse: true },
  { id: 'N3_4', text: '我对自己的生活感到满意和充实。', domain: 'N', facet: 'N3', reverse: true },

  // N4: Self-Consciousness (自我意识)
  { id: 'N4_1', text: '在社交场合中，我经常会担心自己说错话或做错事。', domain: 'N', facet: 'N4', reverse: false },
  { id: 'N4_2', text: '我很在意别人怎么看待我。', domain: 'N', facet: 'N4', reverse: false },
  { id: 'N4_3', text: '我不太在意别人对我的评价。', domain: 'N', facet: 'N4', reverse: true },
  { id: 'N4_4', text: '在人多的地方，我也能轻松自在地做自己。', domain: 'N', facet: 'N4', reverse: true },

  // N5: Immoderation (冲动性)
  { id: 'N5_1', text: '我常常难以抵制诱惑（如美食、购物等）。', domain: 'N', facet: 'N5', reverse: false },
  { id: 'N5_2', text: '有时候我会冲动地做一些事后后悔的事情。', domain: 'N', facet: 'N5', reverse: false },
  { id: 'N5_3', text: '我能够很好地控制自己的欲望和冲动。', domain: 'N', facet: 'N5', reverse: true },
  { id: 'N5_4', text: '我在做决定前总是能克制冲动，保持理性。', domain: 'N', facet: 'N5', reverse: true },

  // N6: Vulnerability (脆弱性)
  { id: 'N6_1', text: '当面临巨大压力时，我很容易崩溃。', domain: 'N', facet: 'N6', reverse: false },
  { id: 'N6_2', text: '在危机时刻，我无法有效应对和决策。', domain: 'N', facet: 'N6', reverse: false },
  { id: 'N6_3', text: '无论遇到什么困难，我都能泰然自若地处理。', domain: 'N', facet: 'N6', reverse: true },
  { id: 'N6_4', text: '在压力下，我依然能保持清晰的思维。', domain: 'N', facet: 'N6', reverse: true },

  // =========================================================================
  // Consistency Check Pairs (一致性检验) — 10 pairs embedded
  // Each pair has near-identical meaning to detect inconsistent responding.
  // =========================================================================
  { id: 'CK_1A', text: '我对自己在大多数事情上的能力充满信心。', domain: 'C', facet: 'C1', reverse: false, pairId: 'CK_1' },
  { id: 'CK_1B', text: '我相信自己能胜任大多数需要完成的任务。', domain: 'C', facet: 'C1', reverse: false, pairId: 'CK_1' },
  { id: 'CK_2A', text: '我很少对周围的人发脾气。', domain: 'N', facet: 'N2', reverse: true, pairId: 'CK_2' },
  { id: 'CK_2B', text: '我几乎不会动怒，情绪非常平稳。', domain: 'N', facet: 'N2', reverse: true, pairId: 'CK_2' },
  { id: 'CK_3A', text: '大型社交聚会对我来说充满吸引力。', domain: 'E', facet: 'E2', reverse: false, pairId: 'CK_3' },
  { id: 'CK_3B', text: '我很享受参加各种社交聚会和活动。', domain: 'E', facet: 'E2', reverse: false, pairId: 'CK_3' },
  { id: 'CK_4A', text: '我会设身处地地体谅他人的感受。', domain: 'A', facet: 'A6', reverse: false, pairId: 'CK_4' },
  { id: 'CK_4B', text: '我总是能从别人的角度来理解他们的处境。', domain: 'A', facet: 'A6', reverse: false, pairId: 'CK_4' },
  { id: 'CK_5A', text: '我喜欢探索未知的领域和新颖的想法。', domain: 'O', facet: 'O4', reverse: false, pairId: 'CK_5' },
  { id: 'CK_5B', text: '新的体验和想法总是让我充满好奇。', domain: 'O', facet: 'O4', reverse: false, pairId: 'CK_5' },
  { id: 'CK_6A', text: '我做事总是有条不紊，很少临时抱佛脚。', domain: 'C', facet: 'C2', reverse: false, pairId: 'CK_6' },
  { id: 'CK_6B', text: '我倾向于有计划、有步骤地完成工作。', domain: 'C', facet: 'C2', reverse: false, pairId: 'CK_6' },
  { id: 'CK_7A', text: '我常常感到紧张不安，好像有什么事要发生。', domain: 'N', facet: 'N1', reverse: false, pairId: 'CK_7' },
  { id: 'CK_7B', text: '很多时候我都处于一种莫名的担忧中。', domain: 'N', facet: 'N1', reverse: false, pairId: 'CK_7' },
  { id: 'CK_8A', text: '我不喜欢在人群中引人注目。', domain: 'E', facet: 'E3', reverse: true, pairId: 'CK_8' },
  { id: 'CK_8B', text: '成为众人关注的焦点让我感到不自在。', domain: 'E', facet: 'E3', reverse: true, pairId: 'CK_8' },
  { id: 'CK_9A', text: '我认为大多数人都是值得信赖的。', domain: 'A', facet: 'A1', reverse: false, pairId: 'CK_9' },
  { id: 'CK_9B', text: '总体来说，我对人性持乐观信任的态度。', domain: 'A', facet: 'A1', reverse: false, pairId: 'CK_9' },
  { id: 'CK_10A', text: '我的情绪时常会无缘无故地起伏波动。', domain: 'N', facet: 'N3', reverse: false, pairId: 'CK_10' },
  { id: 'CK_10B', text: '我的心情经常在没有明显原因的情况下变化。', domain: 'N', facet: 'N3', reverse: false, pairId: 'CK_10' },
];

// Total items: 120 core + 20 consistency check = 140 items
// 140 items ÷ 7 per page = 20 pages
export const ITEMS_PER_PAGE = 7;
