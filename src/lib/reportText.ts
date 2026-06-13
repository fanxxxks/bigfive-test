import type { DomainScore, PersonalityResult } from './types';
import { domainMeta } from '../data/domainMeta';
import { matchPositions, type PositionMatch } from './football';

interface InterpretationBlock {
  title: string;
  content: string;
}

// Domain-level high/moderate/low text interpretations
const domainInterpretations: Record<string, Record<string, string>> = {
  O: {
    high: '您在开放性维度上得分较高（高于 70% 的人群）。这表明您是一个充满好奇心、富有想象力和创造力的人。您喜欢探索新事物，对艺术、哲学和抽象思想有浓厚的兴趣。您不太拘泥于传统，愿意接受不同的观点和生活方式。在职场上，您可能擅长创意类工作和需要创新思维的岗位；在人际交往中，您的开放态度使您容易与各种背景的人建立联系。建议：注意平衡理想与现实，有时候过于追求新奇可能会忽略眼前的实际需求。',
    moderate: '您在开放性维度上得分处于中等水平（介于 30%-70% 人群之间）。您既能欣赏新想法，又能保持务实的态度。您对新事物持开放态度，但不会盲目追新；您既尊重传统，也愿意在必要时接受改变。这种平衡使您在大多数环境中都能良好适应。建议：可以尝试在感兴趣的领域更深入地探索，发掘潜在的创造力。',
    low: '您在开放性维度上得分较低（低于 30% 的人群）。这表明您是一个务实、脚踏实地的人，偏好熟悉和可预测的环境。您倾向于依赖经过验证的方法而非尝试新的途径，在传统和常规中感到舒适。在职场上，您可能是团队中稳定可靠的力量，擅长执行具体和操作性任务。建议：偶尔尝试走出舒适区，接触一些新鲜事物，可能会给您带来意想不到的收获。',
  },
  C: {
    high: '您在尽责性维度上得分较高。您是一个高度自律、有条理且目标明确的人。您做事认真负责，言出必行，善于规划和执行长期目标。在职场上，您是典型的"靠谱型"人才——上级可以放心地把重要任务交给您。您的成就动机强烈，不断追求卓越。建议：注意适当放松，过于追求完美可能会给自己和身边的人带来不必要的压力。学会享受过程，而不仅仅是结果。',
    moderate: '您在尽责性维度上得分处于中等水平。您能够在有条理和灵活性之间找到平衡。您通常能够完成任务，但不会过度执着于细节和计划。您既能遵守承诺，也懂得适时调整。这种灵活性使您能够适应不同的工作和生活环境。建议：如果有重要的长期目标，可以尝试制定更具体的计划和里程碑。',
    low: '您在尽责性维度上得分较低。您倾向于灵活、随性的生活方式，不喜欢被严格的计划和规则束缚。您可能更擅长应对突发情况和需要即兴发挥的场景。然而，有时可能会在长期目标的达成上遇到挑战，容易拖延或半途而废。建议：尝试建立一些简单但持续的日常习惯，使用待办清单等工具帮助自己保持专注。从小处着手，逐步培养自律。',
  },
  E: {
    high: '您在外向性维度上得分较高。您是一个健谈、精力充沛且喜欢社交的人。在人群中您感到如鱼得水，善于表达自己的想法和情感，积极情绪体验丰富。在职场上，您可能擅长需要频繁人际互动的岗位，如销售、管理、公关等。您是团队中的"气氛制造者"。建议：注意倾听他人的需求，有时候给对方留出表达的空间同样重要。同时也要学会享受独处的时光。',
    moderate: '您在外向性维度上得分处于中等水平。您既能享受社交的乐趣，也懂得独处的价值。您不是人群中最吵闹的那个，但也不会回避必要的社交场合。这种"中向性格"使您在不同场景中都能自如切换。建议：根据自己的能量状态灵活安排社交和独处时间，找到最适合自己的节奏。',
    low: '您在外向性维度上得分较低（即偏内向）。您是一个安静、内敛的人，更享受独处或与少数密友相处的时光。您倾向于深入思考而非广泛社交，在安静的环境中能够发挥出最佳状态。在职场上，您可能是那种"少说话多做事"的类型，在需要深度专注的岗位上表现出色。建议：内向并不是弱点，而是另一种力量。不过，适度的社交对于职业发展和身心健康同样有益，找到让自己舒适的社交方式即可。',
  },
  A: {
    high: '您在宜人性维度上得分较高。您是一个富有同情心、乐于助人且重视人际和谐的人。您倾向于信任他人，愿意为团队利益做出妥协和牺牲。在人际冲突中，您通常扮演调解者的角色。在职场上，您是出色的团队合作者，在需要协作和服务的岗位上尤为出色。建议：注意保护自己的边界，过度迎合他人可能会导致自己感到疲惫或被利用。学会在适当的时候说"不"。',
    moderate: '您在宜人性维度上得分处于中等水平。您能够在关心他人和照顾自己之间保持平衡。您既愿意合作和帮助他人，也能在必要时坚持自己的立场。这种平衡使您在人际交往中既受欢迎又不失原则。建议：继续保持这种健康的平衡状态，在关键时刻既展现温暖也不失坚定。',
    low: '您在宜人性维度上得分较低。您是一个独立、直率且富有竞争精神的人。您不会轻易被他人的意见左右，敢于表达不同观点。您更注重客观事实而非人际和谐，在需要做出艰难决策时不会犹豫。在职场上，您可能擅长需要独立判断和坚定立场的岗位。建议：注意表达方式，同样的观点用不同的方式表达会产生截然不同的效果。尝试在坚持原则的同时多一份同理心。',
  },
  N: {
    high: '您在神经质维度上得分较高（即情绪稳定性较低）。您可能比大多数人更容易感受到焦虑、压力和负面情绪。您对周围环境的变化非常敏感，容易为小事担忧。在压力情境下，您可能会感到难以应对。这并不意味着弱点——您的情感丰富且深刻，对艺术和美可能有更强的感受力。建议：学习和练习情绪管理技巧（如正念冥想、深呼吸、规律运动），建立健康的生活习惯和压力释放渠道。必要时可以寻求专业心理咨询的帮助。',
    moderate: '您在神经质维度上得分处于中等水平。您的情绪稳定性处于健康范围。面对压力时您通常能够有效应对，但也会在某些情况下感到焦虑或烦躁。这种适度的情绪反应是正常且健康的。建议：保持现有的情绪管理习惯，在感到压力增大时及时调整，避免情绪累积。',
    low: '您在神经质维度上得分较低（即情绪稳定性高）。您是一个情绪稳定、心态平和的人。即使面对压力和挑战，您也能保持冷静和理性。您不容易被负面情绪困扰，这使您在高压环境中（如危机处理、紧急决策等）表现出色。建议：您的情绪稳定性是一笔宝贵的心理资产。同时也要理解，身边的人可能不像您这样轻松应对压力，给予他们更多的耐心和理解。',
  },
};

// Career style observations based on domain combinations
function careerInsights(domains: DomainScore[]): string {
  const get = (key: string) => domains.find(d => d.key === key)!;
  const parts: string[] = [];

  // O + C combo
  const O = get('O');
  const C = get('C');
  if (O.level === 'high' && C.level === 'high') {
    parts.push('您在开放性和尽责性上双高，这意味着您不仅富有创意，还能将想法付诸实践——这是创新型领导者的典型特质。');
  } else if (O.level === 'high' && C.level === 'low') {
    parts.push('您创意丰富但执行力稍弱，建议在团队中与擅长执行和规划的同事搭档，将灵感落地。');
  }

  // E + A combo
  const E = get('E');
  const A = get('A');
  if (E.level === 'high' && A.level === 'high') {
    parts.push('外向性和宜人性双高使您在人际交往中如鱼得水，特别适合需要频繁与人打交道并维护良好关系的工作。');
  } else if (E.level === 'low' && A.level === 'low') {
    parts.push('您偏向独立工作风格，可能在需要深度专注和独立判断的工作中表现出色，如研究、分析、技术开发等。');
  }

  // N insights
  const N = get('N');
  if (N.level === 'low') {
    parts.push('您的情绪稳定性很强，这在高压工作环境中是一个巨大的优势——您能够在他人慌乱时保持冷静，做出理性决策。');
  } else if (N.level === 'high') {
    parts.push('您对压力较为敏感，建议选择工作环境相对稳定、节奏可控的岗位，避免长期处于高压状态。');
  }

  // C + N combo
  if (C.level === 'low' && N.level === 'high') {
    parts.push('尽责性偏低配合较高的神经质，可能导致拖延与焦虑的恶性循环。建议从建立简单日常习惯开始，逐步提升自我管理能力。');
  }

  return parts.length > 0 ? parts.join('') : '您的五大人格特质组合比较均衡，在不同类型的职业环境中都能找到适合自己的位置。建议根据各维度的具体得分进一步探索最适合的发展方向。';
}

function interpersonalInsights(domains: DomainScore[]): string {
  const get = (key: string) => domains.find(d => d.key === key)!;
  const parts: string[] = [];

  const E = get('E');
  const A = get('A');
  const N = get('N');

  if (E.level === 'high' && A.level === 'high') {
    parts.push('在人际交往中，您热情开朗且善解人意，是朋友圈中的"人气王"。您善于建立和维护社交关系，但也需注意避免过度迎合他人。');
  } else if (E.level === 'high' && A.level === 'low') {
    parts.push('您活跃外向但不太迁就他人，在社交中可能直言不讳。您在群体中引人注目，但有时可能无意中忽略他人的感受。');
  } else if (E.level === 'low' && A.level === 'high') {
    parts.push('您虽然不善言辞，但为人真诚友善。您的朋友圈可能不大，但每一段关系都深厚而持久。人们信任您，因为您是一个好的倾听者。');
  } else if (E.level === 'low' && A.level === 'low') {
    parts.push('您在人际关系中保持独立和距离感，不依赖社交来获得满足。您珍视个人空间，倾向于与少数志同道合的人建立深入的联系。');
  }

  if (N.level === 'high') {
    parts.push('您对他人的言行较为敏感，有时可能过度解读他人的意图。在人际交往中，建议学会区分"事实"和"自己的猜测"，遇到疑虑时主动沟通而非暗自揣测。');
  } else if (N.level === 'low') {
    parts.push('您在人际交往中情绪稳定，不容易因为他人的言行而波动。这种稳定性使您成为朋友中的"定海神针"。');
  }

  return parts.join('');
}

function stressInsights(domains: DomainScore[]): string {
  const N = domains.find(d => d.key === 'N')!;
  const C = domains.find(d => d.key === 'C')!;

  if (N.level === 'low' && C.level === 'high') {
    return '您拥有出色的抗压能力——情绪稳定性高配合高尽责性，使您在压力下不仅保持冷静，还能有条不紊地推进工作。您是团队在危机时刻可以依靠的人。继续保持健康的生活习惯，您的抗压"免疫力"将持久强大。';
  } else if (N.level === 'low') {
    return '您的情绪稳定性使您在多数压力情境下都能保持良好状态。您是天生的"冷静派"，不易被外界干扰。建议将这份稳定转化为团队中的积极影响力，在他人慌乱时提供理性支持。';
  } else if (N.level === 'high' && C.level === 'high') {
    return '虽然您容易感受到压力，但高尽责性使您倾向于"硬扛"——这可能导致长期的心理消耗。建议学会识别自己的压力信号，在感到不堪重负时主动寻求帮助或调整节奏。定期锻炼、充足睡眠和正念练习对您尤为重要。';
  } else if (N.level === 'high') {
    return '您对压力的敏感性较高，这是需要特别关注的方面。建议将"自我关怀"纳入日常生活：规律运动（每周至少 3 次，每次 30 分钟以上）、保持充足睡眠、练习正念冥想。建立稳定的支持网络，在感到困难时不要独自承受。';
  } else {
    return '您的抗压能力处于中等水平。建议关注自己在不同情境下的压力反应模式，识别触发因素，并建立适合自己的应对策略库。';
  }
}

function growthSuggestions(domains: DomainScore[]): string[] {
  const suggestions: string[] = [];
  const N = domains.find(d => d.key === 'N')!;
  const C = domains.find(d => d.key === 'C')!;
  const O = domains.find(d => d.key === 'O')!;
  const E = domains.find(d => d.key === 'E')!;
  const A = domains.find(d => d.key === 'A')!;

  if (N.level === 'high') {
    suggestions.push('📿 尝试每天 10 分钟正念冥想，研究表明这能显著降低焦虑水平。');
    suggestions.push('🏃 建立规律运动习惯——运动是天然的"抗焦虑药"，每周 3-5 次有氧运动对情绪管理极有帮助。');
  }

  if (C.level === 'low') {
    suggestions.push('📝 使用"番茄工作法"（25 分钟专注 + 5 分钟休息）来提升工作效率。');
    suggestions.push('🎯 每天设定 1-3 个"必须完成"的小目标，逐步培养成就感和自律能力。');
  }

  if (C.level === 'high') {
    suggestions.push('☯️ 学会"战略性放弃"——并非所有事情都需要做到完美，把精力分配给最重要的事情。');
  }

  if (O.level === 'low') {
    suggestions.push('🌍 每月尝试一件从未做过的事（品尝新菜系、阅读不同类型的书、学习新技能），拓展舒适区边界。');
  }

  if (O.level === 'high') {
    suggestions.push('🎯 从众多兴趣中选择 1-2 个深入发展，将广度转化为深度。');
  }

  if (E.level === 'low') {
    suggestions.push('💬 内向是优势而非劣势。尝试在舒适的小范围内（如 2-3 人的小组）练习主动表达。');
  }

  if (A.level === 'high') {
    suggestions.push('🛡️ 学习设立健康的个人边界，记住：照顾好自己才能更好地帮助他人。');
  }

  if (A.level === 'low') {
    suggestions.push('👂 练习"主动倾听"——在表达观点前，先完整听完对方的意见并用自己的话复述确认。');
  }

  // General suggestions
  suggestions.push('📚 推荐阅读《安静：内向性格的竞争力》《情绪智商》《刻意练习》等书籍，深入了解人格与成长。');

  return suggestions;
}

export function generateReport(result: PersonalityResult): {
  summary: string;
  domainBlocks: InterpretationBlock[];
  career: string;
  interpersonal: string;
  stress: string;
  growthSuggestions: string[];
  football: PositionMatch[];
} {
  const domains = result.domains;

  const domainBlocks: InterpretationBlock[] = domains.map(d => {
    const meta = domainMeta.find(m => m.key === d.key)!;
    return {
      title: `${meta.name}（${meta.label}）`,
      content: domainInterpretations[d.key]?.[d.level] || '该维度得分处于平均水平，请参考详细数据了解具体分数。',
    };
  });

  const sorted = [...domains].sort((a, b) => b.percentile - a.percentile);
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];

  const summary = `根据您的回答，您在五大维度中得分最突出的是「${top.name}」（百分位 ${top.percentile}），而得分相对较低的是「${bottom.name}」（百分位 ${bottom.percentile}）。您的整体人格轮廓呈现出独特的个人特质组合，以下将逐维度为您详细解读。`;

  return {
    summary,
    domainBlocks,
    career: careerInsights(domains),
    interpersonal: interpersonalInsights(domains),
    stress: stressInsights(domains),
    growthSuggestions: growthSuggestions(domains),
    football: matchPositions(domains),
  };
}
