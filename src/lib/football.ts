import type { DomainScore, DomainKey } from './types';

// =========================================================================
// Football position definitions with ideal Big Five profiles
// Each position maps to a "direction" for each domain:
//   +1 = position benefits from HIGH trait, -1 = benefits from LOW trait, 0 = moderate/neutral
//   weight = relative importance of this domain for the position (1-3)
// =========================================================================

export interface PositionProfile {
  id: string;
  name: string;
  label: string;
  emoji: string;
  description: string;
  traits: Record<DomainKey, { direction: number; weight: number }>;
}

export interface PositionMatch {
  rank: number;
  position: PositionProfile;
  score: number; // 0-100, higher = better fit
  interpretation: string;
}

export const positions: PositionProfile[] = [
  {
    id: 'GK',
    name: '门将',
    label: 'Goalkeeper',
    emoji: '🧤',
    description: '球队最后一道防线，需要在孤立中保持专注，在压力下稳定发挥，是场上最具心理韧性的位置。',
    traits: {
      O: { direction: 0, weight: 1 },
      C: { direction: +1, weight: 3 },
      E: { direction: -1, weight: 2 },
      A: { direction: -1, weight: 2 },
      N: { direction: -1, weight: 3 },
    },
  },
  {
    id: 'CB',
    name: '中后卫',
    label: 'Centre Back',
    emoji: '🛡️',
    description: '防守核心，需要出色的组织纪律性和冷静头脑，关键时刻果断决策，是后防线的指挥官。',
    traits: {
      O: { direction: -1, weight: 2 },
      C: { direction: +1, weight: 3 },
      E: { direction: 0, weight: 1 },
      A: { direction: 0, weight: 2 },
      N: { direction: -1, weight: 3 },
    },
  },
  {
    id: 'FB',
    name: '边后卫',
    label: 'Full Back',
    emoji: '🏃',
    description: '需要攻守兼备、体能充沛。防守时纪律严明，进攻时积极套边，是现代足球中要求最全面的位置之一。',
    traits: {
      O: { direction: +1, weight: 1 },
      C: { direction: +1, weight: 3 },
      E: { direction: +1, weight: 2 },
      A: { direction: +1, weight: 1 },
      N: { direction: -1, weight: 2 },
    },
  },
  {
    id: 'CDM',
    name: '后腰',
    label: 'Defensive Midfielder',
    emoji: '🧱',
    description: '中场屏障，需要极强的战术纪律和对抗能力。在破坏对方进攻的同时，也是由守转攻的第一发起点。',
    traits: {
      O: { direction: 0, weight: 1 },
      C: { direction: +1, weight: 3 },
      E: { direction: 0, weight: 1 },
      A: { direction: -1, weight: 2 },
      N: { direction: -1, weight: 3 },
    },
  },
  {
    id: 'CM',
    name: '中前卫',
    label: 'Centre Midfielder',
    emoji: '🔄',
    description: '球队的"肺"，覆盖全场、串联攻防。需要极高的跑动能力和战术理解，是场上最勤劳的角色。',
    traits: {
      O: { direction: +1, weight: 2 },
      C: { direction: +1, weight: 3 },
      E: { direction: +1, weight: 2 },
      A: { direction: +1, weight: 2 },
      N: { direction: -1, weight: 2 },
    },
  },
  {
    id: 'CAM',
    name: '前腰',
    label: 'Attacking Midfielder',
    emoji: '🎨',
    description: '进攻的创造者，需要有天马行空的想象力和精湛的技术。是球队进攻灵感的源泉，经典的"10 号位"。',
    traits: {
      O: { direction: +1, weight: 3 },
      C: { direction: -1, weight: 1 },
      E: { direction: +1, weight: 2 },
      A: { direction: 0, weight: 1 },
      N: { direction: 0, weight: 1 },
    },
  },
  {
    id: 'WG',
    name: '边锋',
    label: 'Winger',
    emoji: '⚡',
    description: '边路的爆点，依靠速度、创造力和个人能力撕开防线。需要自信张扬、敢于突破、富有表演欲。',
    traits: {
      O: { direction: +1, weight: 2 },
      C: { direction: -1, weight: 1 },
      E: { direction: +1, weight: 3 },
      A: { direction: -1, weight: 1 },
      N: { direction: +1, weight: 1 },
    },
  },
  {
    id: 'ST',
    name: '前锋',
    label: 'Striker',
    emoji: '🎯',
    description: '进球机器，需要强烈的得分欲望和"自私"的嗅觉。在错失机会后迅速调整心态，始终相信下一个球会进。',
    traits: {
      O: { direction: 0, weight: 1 },
      C: { direction: 0, weight: 1 },
      E: { direction: +1, weight: 2 },
      A: { direction: -1, weight: 2 },
      N: { direction: -1, weight: 2 },
    },
  },
  {
    id: 'SW',
    name: '清道夫',
    label: 'Sweeper / Libero',
    emoji: '👁️',
    description: '后场的自由人，兼具防守智慧和组织视野。需要出色的阅读比赛能力和冷静出球，是古典足球的艺术大师。',
    traits: {
      O: { direction: +1, weight: 2 },
      C: { direction: +1, weight: 2 },
      E: { direction: 0, weight: 1 },
      A: { direction: 0, weight: 1 },
      N: { direction: -1, weight: 3 },
    },
  },
];

/**
 * Compute how well a user fits a given position.
 * Uses weighted deviation: for each domain, compute how far the user's
 * percentile is from the "ideal" (100 for high, 0 for low, 50 for neutral),
 * multiply by weight, then normalize to a 0-100 fit score.
 */
function positionFitScore(
  domains: DomainScore[],
  pos: PositionProfile,
): number {
  let totalWeight = 0;
  let totalDeviation = 0;

  for (const d of domains) {
    const trait = pos.traits[d.key];
    if (!trait) continue;

    // Ideal percentile: 85 for high traits, 15 for low traits, 50 for neutral
    const ideal = trait.direction > 0 ? 85 : trait.direction < 0 ? 15 : 50;
    const deviation = Math.abs(d.percentile - ideal);
    const weight = trait.weight;

    totalDeviation += deviation * weight;
    totalWeight += weight;
  }

  // Invert deviation to fit score: 100 = perfect fit
  const avgDeviation = totalDeviation / totalWeight;
  const fitScore = Math.max(0, Math.round(100 - avgDeviation * 1.18));
  return fitScore;
}

/**
 * Rank all positions by fit score, return top 3 with interpretations.
 */
export function matchPositions(domains: DomainScore[]): PositionMatch[] {
  const scored = positions.map(pos => ({
    position: pos,
    score: positionFitScore(domains, pos),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map((item, idx) => ({
    rank: idx + 1,
    position: item.position,
    score: item.score,
    interpretation: generatePositionInterpretation(
      item.position,
      item.score,
      domains,
    ),
  }));
}

/**
 * Generate a personalized interpretation for a position match.
 */
function generatePositionInterpretation(
  pos: PositionProfile,
  score: number,
  domains: DomainScore[],
): string {
  const parts: string[] = [];

  parts.push(`根据您的大五人格画像，${pos.name}（${pos.label}）与您的匹配度为 ${score}%。`);

  // Add domain-specific reasoning
  for (const d of domains) {
    const trait = pos.traits[d.key];
    if (!trait || trait.direction === 0) continue;

    if (trait.direction > 0 && d.level === 'high') {
      parts.push(favoredTraitPhrase(d, pos, true));
    } else if (trait.direction < 0 && d.level === 'low') {
      parts.push(favoredTraitPhrase(d, pos, false));
    } else if (trait.direction > 0 && d.level !== 'high') {
      parts.push(unfavoredTraitPhrase(d, pos, '高'));
    } else if (trait.direction < 0 && d.level !== 'low') {
      parts.push(unfavoredTraitPhrase(d, pos, '低'));
    }
  }

  return parts.join('');
}

function favoredTraitPhrase(
  d: DomainScore,
  pos: PositionProfile,
  isHigh: boolean,
): string {
  const traitName = d.name;
  const levelWord = isHigh ? '较高' : '较低';

  const traitMap: Record<string, Record<string, string>> = {
    GK: {
      开放性: '独立思考判断场上形势的能力',
      尽责性: '稳定的发挥和对战术纪律的严格执行',
      外向性: '在孤立的门将位置上保持专注，不受外界干扰',
      宜人性: '在禁区内果断发号施令，不受情面影响',
      神经质: '巨大压力下保持冷静，失误后迅速恢复',
    },
    CB: {
      开放性: '坚持经过验证的防守套路，不冒险',
      尽责性: '极高的战术纪律和防守专注力',
      外向性: '用简洁高效的沟通指挥防线',
      宜人性: '在关键时刻做出强硬防守',
      神经质: '面对高压逼抢时冷静出球',
    },
    FB: {
      开放性: '根据场上形势灵活调整攻防选择',
      尽责性: '攻防两端不知疲倦的奔跑纪律',
      外向性: '积极前插参与进攻，与边锋建立默契',
      宜人性: '与队友密切配合，跑位为团队服务',
      神经质: '在被突破后迅速回追，保持心态平稳',
    },
    CDM: {
      开放性: '快速阅读对方进攻意图并做出预判',
      尽责性: '一丝不苟地执行教练的战术部署',
      外向性: '沉着冷静地在中场进行调度',
      宜人性: '强硬的拦截和对抗，不畏惧身体接触',
      神经质: '中场屏障般的稳定存在，不受情绪波动影响',
    },
    CM: {
      开放性: '在密集的中场区域找到出球路线',
      尽责性: '全场覆盖的超强体能和跑动纪律',
      外向性: '拿球主动组织进攻，大声呼应队友',
      宜人性: '无私奉献，为团队利益牺牲个人数据',
      神经质: '落后时依然保持斗志和战术信心',
    },
    CAM: {
      开放性: '富有创造力的传球和突破想象力',
      尽责性: '摆脱战术约束，自由发挥进攻天赋',
      外向性: '享受聚光灯，在大场面中挺身而出',
      宜人性: '适度的个人主义有助于在关键时刻果断射门',
      神经质: '适度情绪波动为比赛增添激情',
    },
    WG: {
      开放性: '用花哨的假动作和意想不到的方式过掉防守者',
      尽责性: '不拘泥于固定套路，全凭直觉行动',
      外向性: '在边路自信地要球，敢于单挑后卫',
      宜人性: '在前场展现竞争性，"自私"的射门欲望',
      神经质: '适度的情绪化为突破增加侵略性',
    },
    ST: {
      开放性: '在禁区内敏锐捕捉稍纵即逝的机会',
      尽责性: '专注于临门一脚的质量',
      外向性: '进球后霸气的庆祝，持续的信心输出',
      宜人性: '渴望进球的"自私"本能，在门前毫不留情',
      神经质: '错失机会后迅速翻篇，始终相信下一次',
    },
    SW: {
      开放性: '从防线深处洞察全局，传出穿透性直塞',
      尽责性: '精准的站位和补防意识',
      外向性: '从容镇定的后场出球和组织',
      宜人性: '在防守和出球之间做出冷静判断',
      神经质: '天塌下来也不慌乱的大心脏',
    },
  };

  const phrase = traitMap[pos.id]?.[traitName] || `${traitName}方面的特质`;
  return `${traitName}方面，您的得分${levelWord}，这意味着您具备${phrase}。`;
}

function unfavoredTraitPhrase(
  d: DomainScore,
  _pos: PositionProfile,
  target: string,
): string {
  return `${d.name}方面，该位置理想状态为偏${target}，您当前得分居中。如果未来在这方面有所发展，适配度将进一步提升。`;
}
