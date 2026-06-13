// Markdown export utility — generates .md report files for each quiz type

import type { PersonalityResult } from './types';
import { generateReport } from './reportText';
import type { PhilosophyResult } from './philosophyScoring';
import type { ValuesResult } from './valuesScoring';
import type { AttachmentResult } from '../data/attachmentData';
import type { EQResult } from '../data/eqData';
import { eqLevels } from '../data/eqData';
import type { AnimalResult } from './animalScoring';
import type { DecisionResult } from './decisionScoring';
import type { SocialResult } from './socialScoring';
import type { StressResult } from './stressScoring';
import type { MoneyResult } from './moneyScoring';

/** Trigger a file download in the browser */
export function downloadMarkdown(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function ts(date: number) {
  return new Date(date).toLocaleString('zh-CN');
}

// ─── Big Five Full ───────────────────────────────────────────
export function generateBigFiveMD(result: PersonalityResult): string {
  const report = generateReport(result);
  const lines: string[] = [];
  lines.push('# 大五人格测评报告（完整版）');
  lines.push('');
  lines.push(`> 报告生成时间：${ts(result.timestamp)}`);
  if (!result.consistencyCheck.passed) {
    lines.push(`> ⚠️ ${result.consistencyCheck.message}`);
  }
  lines.push('');
  lines.push('## 总体概述');
  lines.push('');
  lines.push(report.summary);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 五大维度百分位排名');
  lines.push('');
  for (const d of result.domains) {
    lines.push(`- **${d.name}**（${d.label}）：${d.percentile}% — ${d.level === 'high' ? '偏高' : d.level === 'low' ? '偏低' : '中等'}`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 深度解读');
  lines.push('');
  for (const block of report.domainBlocks) {
    lines.push(`### ${block.title}`);
    lines.push('');
    lines.push(block.content);
    lines.push('');
  }
  lines.push('---');
  lines.push('');
  lines.push('## 职场风格');
  lines.push('');
  lines.push(report.career);
  lines.push('');
  lines.push('## 人际交往');
  lines.push('');
  lines.push(report.interpersonal);
  lines.push('');
  lines.push('## 抗压能力');
  lines.push('');
  lines.push(report.stress);
  lines.push('');
  lines.push('## 成长建议');
  lines.push('');
  for (const s of report.growthSuggestions) {
    lines.push(`- ${s}`);
  }
  lines.push('');
  lines.push('> 本报告基于 IPIP-NEO-120 量表生成，仅供个人参考，不构成临床诊断。');
  return lines.join('\n');
}

// ─── Big Five Short ──────────────────────────────────────────
export function generateShortMD(result: PersonalityResult): string {
  const report = generateReport(result);
  const lines: string[] = [];
  lines.push('# 大五人格测评报告（简洁版）');
  lines.push('');
  lines.push(`> 报告生成时间：${ts(result.timestamp)}  ·  基于 IPIP-50 量表`);
  lines.push('> ⚠️ 简洁版结果仅供参考，如需更精确结果请使用完整版（140题）。');
  lines.push('');
  lines.push('## 总体概述');
  lines.push('');
  lines.push(report.summary);
  lines.push('');
  lines.push('## 五大维度得分');
  lines.push('');
  for (const d of result.domains) {
    lines.push(`- **${d.name}**：${d.percentile}% (${d.level === 'high' ? '偏高' : d.level === 'low' ? '偏低' : '中等'})`);
  }
  lines.push('');
  lines.push('## 深度解读');
  for (const block of report.domainBlocks) {
    lines.push('');
    lines.push(`### ${block.title}`);
    lines.push('');
    lines.push(block.content);
  }
  lines.push('');
  lines.push('## 职场风格');
  lines.push('');
  lines.push(report.career);
  lines.push('');
  lines.push('## 人际交往');
  lines.push('');
  lines.push(report.interpersonal);
  lines.push('');
  lines.push('## 抗压能力');
  lines.push('');
  lines.push(report.stress);
  lines.push('');
  lines.push('## 成长建议');
  for (const s of report.growthSuggestions) {
    lines.push(`- ${s}`);
  }
  lines.push('');
  lines.push('> 建议使用完整版（140题）获取更精确的测评结果。');
  return lines.join('\n');
}

// ─── Philosophy ──────────────────────────────────────────────
export function generatePhilosophyMD(result: PhilosophyResult): string {
  const lines: string[] = [];
  lines.push('# 哲学气质测评报告');
  lines.push('');
  lines.push(`> 报告生成时间：${ts(result.timestamp)}`);
  lines.push('');
  lines.push(`## 最匹配流派：${result.topSchool.emoji} ${result.topSchool.name}`);
  lines.push('');
  lines.push(result.topSchool.longDescription);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 18流派完整匹配度');
  lines.push('');
  for (const s of result.schools) {
    lines.push(`- ${s.emoji} **${s.name}**：${s.percentage}%`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 前5流派深度解读');
  lines.push('');
  for (let i = 0; i < Math.min(5, result.schools.length); i++) {
    const s = result.schools[i];
    lines.push(`### #${i + 1} ${s.name}（${s.label}）— 匹配度 ${s.percentage}%`);
    lines.push('');
    lines.push(s.longDescription);
    lines.push('');
    lines.push(`> "${s.keyQuote}" — ${s.keyQuoteAuthor}`);
    lines.push('');
    lines.push('**核心理念：**');
    for (const idea of s.coreIdeas) {
      lines.push(`- ${idea}`);
    }
    lines.push('');
    lines.push(`**生活启示：** ${s.lifeImplication}`);
    lines.push('');
  }
  lines.push('> 哲学气质测评旨在帮助您了解自己的思想倾向，不构成任何形式的标签或定论。');
  return lines.join('\n');
}

// ─── Values ──────────────────────────────────────────────────
export function generateValuesMD(result: ValuesResult): string {
  const lines: string[] = [];
  lines.push('# 核心价值观测评报告');
  lines.push('');
  lines.push(`> 报告生成时间：${ts(result.timestamp)}`);
  lines.push('');
  lines.push(`## 最核心价值：${result.values[0].emoji} ${result.values[0].name}`);
  lines.push('');
  lines.push(`> "${result.values[0].motto}"`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 10种价值观完整排序');
  lines.push('');
  for (const v of result.values) {
    lines.push(`- ${v.emoji} **${v.name}**：${v.percentage}%`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 全部价值观深度解读');
  lines.push('');
  for (const v of result.values) {
    lines.push(`### ${v.emoji} ${v.name} — ${v.percentage}%`);
    lines.push('');
    lines.push(`> "${v.motto}"`);
    lines.push('');
    lines.push(v.longDescription);
    lines.push('');
    lines.push(`**生活场景：** ${v.lifeExample}`);
    lines.push('');
  }
  lines.push('> 基于 Schwartz 的10种基本价值观理论。价值观没有对错，只有是否适合你。');
  return lines.join('\n');
}

// ─── Attachment ──────────────────────────────────────────────
export function generateAttachmentMD(result: AttachmentResult): string {
  const { style, anxiety, avoidance } = result;
  const lines: string[] = [];
  lines.push('# 依恋风格测评报告');
  lines.push('');
  lines.push(`> 报告生成时间：${ts(result.timestamp)}`);
  lines.push('');
  lines.push(`## 主导风格：${style.emoji} ${style.name}`);
  lines.push('');
  lines.push(`- 焦虑维度：${anxiety}%`);
  lines.push(`- 回避维度：${avoidance}%`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 深度解读');
  lines.push('');
  lines.push(style.longDescription || style.description);
  lines.push('');
  lines.push('### 依恋风格的形成');
  lines.push('');
  lines.push(style.childhoodRoots);
  lines.push('');
  lines.push('## 优势');
  for (const s of style.strengths) {
    lines.push(`- ${s}`);
  }
  lines.push('');
  lines.push('## 挑战');
  for (const c of style.challenges) {
    lines.push(`- ${c}`);
  }
  lines.push('');
  lines.push('## 在亲密关系中');
  lines.push('');
  lines.push(style.relationships);
  lines.push('');
  lines.push('## 成长与改变的方向');
  lines.push('');
  lines.push(style.changePath);
  lines.push('');
  lines.push('> 依恋风格并非一成不变。通过自我觉察和安全的关系体验，依恋风格可以发生积极改变。');
  return lines.join('\n');
}

// ─── EQ ──────────────────────────────────────────────────────
export function generateEQMD(result: EQResult): string {
  const levelMeta = eqLevels.find(l => l.level === result.level);
  const lines: string[] = [];
  lines.push('# 情商EQ测评报告');
  lines.push('');
  lines.push(`> 报告生成时间：${ts(result.timestamp)}`);
  lines.push('');
  lines.push(`## 综合得分：${result.totalScore} — ${result.level} ${result.levelEmoji}`);
  lines.push('');
  if (levelMeta) {
    lines.push(levelMeta.description);
    lines.push('');
  }
  lines.push('---');
  lines.push('');
  lines.push('## 5维度得分');
  lines.push('');
  for (const d of result.dimensions) {
    lines.push(`- ${d.emoji} **${d.name}**：${d.percentage}%`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 各维度深度分析');
  lines.push('');
  for (const d of result.dimensions) {
    const level = d.percentage >= 70 ? 'high' : d.percentage >= 40 ? 'moderate' : 'low';
    const interp = level === 'high' ? d.highInterpretation : level === 'moderate' ? d.moderateInterpretation : d.lowInterpretation;
    lines.push(`### ${d.emoji} ${d.name} — ${d.percentage}%`);
    lines.push('');
    lines.push(d.longDescription);
    lines.push('');
    lines.push(interp);
    lines.push('');
  }
  lines.push('> 基于 Goleman 情商模型。情商是可以通过练习提升的——了解自己是第一步。');
  return lines.join('\n');
}

// ─── Animal ──────────────────────────────────────────────────
export function generateAnimalMD(result: AnimalResult): string {
  const { top, animals } = result;
  const lines: string[] = [];
  lines.push('# 性格动物匹配报告');
  lines.push('');
  lines.push(`> 报告生成时间：${ts(result.timestamp)}`);
  lines.push('');
  lines.push(`## 你的精神动物：${top.emoji} ${top.name} — "${top.tagline}"`);
  lines.push('');
  lines.push(`> 匹配度：${top.percentage}%`);
  lines.push('');
  lines.push(top.kinship);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 深度性格分析');
  lines.push('');
  lines.push(top.longDescription);
  lines.push('');
  lines.push('## 核心优势');
  for (const s of top.strengths) {
    lines.push(`- ${s}`);
  }
  lines.push('');
  lines.push('## 成长课题');
  for (const c of top.challenges) {
    lines.push(`- ${c}`);
  }
  lines.push('');
  lines.push('## 适合的职业方向');
  lines.push('');
  lines.push(top.suitableCareers);
  lines.push('');
  lines.push('## 亲密关系风格');
  lines.push('');
  lines.push(top.relationshipStyle);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 8种动物完整匹配度');
  lines.push('');
  for (const a of animals) {
    lines.push(`- ${a.emoji} **${a.name}**：${a.percentage}%`);
  }
  lines.push('');
  lines.push('> 性格动物匹配是一种投射性人格测评，旨在提供一个有趣又富有洞察力的视角来了解自己。');
  return lines.join('\n');
}

// ─── Decision ────────────────────────────────────────────────
export function generateDecisionMD(result: DecisionResult): string {
  const lines: string[] = [];
  lines.push('# 决策风格测评报告');
  lines.push('');
  lines.push(`> 报告生成时间：${ts(result.timestamp)}`);
  lines.push('');
  lines.push(`## 主导风格：${result.primary.emoji} ${result.primary.name}`);
  lines.push('');
  lines.push(result.primary.description);
  lines.push('');
  lines.push('## 优势');
  for (const s of result.primary.strengths) {
    lines.push(`- ${s}`);
  }
  lines.push('');
  lines.push('## 需要注意');
  for (const w of result.primary.weaknesses) {
    lines.push(`- ${w}`);
  }
  lines.push('');
  lines.push('## 改善建议');
  lines.push('');
  lines.push(result.primary.tip);
  lines.push('');
  lines.push('## 4种决策风格完整排序');
  for (const s of result.styles) {
    lines.push(`- ${s.emoji} **${s.name}**：${s.percentage}%`);
  }
  return lines.join('\n');
}

// ─── Social ──────────────────────────────────────────────────
export function generateSocialMD(result: SocialResult): string {
  const lines: string[] = [];
  lines.push('# 社交风格测评报告');
  lines.push('');
  lines.push(`> 报告生成时间：${ts(result.timestamp)}`);
  lines.push('');
  lines.push(`## 主导风格：${result.primary.emoji} ${result.primary.name}`);
  lines.push('');
  lines.push(result.primary.description);
  lines.push('');
  lines.push('## 沟通改善建议');
  lines.push('');
  lines.push(result.primary.tip);
  lines.push('');
  lines.push('## 4种社交风格完整排序');
  for (const s of result.styles) {
    lines.push(`- ${s.emoji} **${s.name}**：${s.percentage}%`);
  }
  return lines.join('\n');
}

// ─── Stress ──────────────────────────────────────────────────
export function generateStressMD(result: StressResult): string {
  const lines: string[] = [];
  lines.push('# 压力应对方式测评报告');
  lines.push('');
  lines.push(`> 报告生成时间：${ts(result.timestamp)}`);
  lines.push('');
  lines.push(`## 主导应对方式：${result.primary.emoji} ${result.primary.name}`);
  lines.push('');
  lines.push(result.primary.description);
  lines.push('');
  lines.push('## 改善建议');
  lines.push('');
  lines.push(result.primary.tip);
  lines.push('');
  lines.push('## 4种应对方式完整排序');
  for (const s of result.styles) {
    lines.push(`- ${s.emoji} **${s.name}**：${s.percentage}%`);
  }
  return lines.join('\n');
}

// ─── Money ───────────────────────────────────────────────────
export function generateMoneyMD(result: MoneyResult): string {
  const lines: string[] = [];
  lines.push('# 金钱观念测评报告');
  lines.push('');
  lines.push(`> 报告生成时间：${ts(result.timestamp)}`);
  lines.push('');
  lines.push(`## 主导金钱人格：${result.primary.emoji} ${result.primary.name}`);
  lines.push('');
  lines.push(`> "${result.primary.motto}"`);
  lines.push('');
  lines.push(result.primary.description);
  lines.push('');
  lines.push('## 5种金钱人格完整排序');
  for (const s of result.styles) {
    lines.push(`- ${s.emoji} **${s.name}**：${s.percentage}%`);
  }
  return lines.join('\n');
}
