// Adult Attachment Styles based on ECR (Experiences in Close Relationships)
// Two dimensions: Anxiety and Avoidance

export interface AttachmentResult {
  /** Anxiety score percentage (0-100), higher = more anxious */
  anxiety: number;
  /** Avoidance score percentage (0-100), higher = more avoidant */
  avoidance: number;
  /** Dominant attachment style */
  style: AttachmentStyle;
  /** Scores for each of the 4 styles */
  stylePercentages: { secure: number; anxious: number; avoidant: number; fearful: number };
  timestamp: number;
}

export interface AttachmentStyle {
  id: string;
  name: string;
  label: string;
  emoji: string;
  color: string;
  description: string;
  strengths: string[];
  challenges: string[];
  relationships: string;
}

export const attachmentStyles: Record<string, AttachmentStyle> = {
  secure: {
    id: 'secure',
    name: '安全型',
    label: 'Secure Attachment',
    emoji: '💚',
    color: '#4caf50',
    description: '您在亲密关系中感到舒适自在，既能够依赖他人，也愿意让他人依赖您。您对自己和他人持有积极的看法，在情感亲近和独立之间找到了健康的平衡。',
    strengths: ['能够建立稳定、信任的长期关系', '善于表达情感和需求', '在冲突中保持建设性态度', '自尊水平通常较高'],
    challenges: ['可能需要理解那些依恋模式不同的人', '有时可能被误认为"不够热情"'],
    relationships: '您的亲密关系通常较为稳定和满意。您能够在需要时寻求支持，也乐于给予对方空间。您相信自己是值得被爱的，也相信他人是可以信任的。',
  },
  anxious: {
    id: 'anxious',
    name: '焦虑型',
    label: 'Anxious-Preoccupied',
    emoji: '💛',
    color: '#ff9800',
    description: '您渴望亲密和情感连接，但常常担心伴侣是否会同样投入。您对关系中的细微变化非常敏感，可能会反复寻求确认和安慰。您对自己可能有些怀疑，但对他人高度投入。',
    strengths: ['对伴侣的情感需求非常敏感', '愿意为关系付出大量精力', '情感体验丰富而深刻', '渴望真正的深度连接'],
    challenges: ['容易过度解读伴侣的行为', '可能因害怕被抛弃而变得粘人', '情绪容易被关系状态左右', '需要学习给自己安全感'],
    relationships: '您对关系有很高的期待和投入。学习在关系之外建立自信和自我价值感，会让您的关系更加轻松。记住：伴侣的独立空间并不等于对你的拒绝。',
  },
  avoidant: {
    id: 'avoidant',
    name: '回避型',
    label: 'Dismissive-Avoidant',
    emoji: '💙',
    color: '#2196f3',
    description: '您高度重视独立和自主，在关系中倾向于保持一定的情感距离。您可能会对过度的亲密感到不适，更习惯于依靠自己而非他人。您对自我通常持积极看法，但对他人可能有所保留。',
    strengths: ['高度独立和自给自足', '在压力下保持冷静', '理性且不易被情绪左右', '尊重自己和他人的边界'],
    challenges: ['可能难以向伴侣敞开心扉', '在亲密关系中可能显得疏离', '可能忽略或压抑自己的情感需求', '伴侣可能感到不被需要'],
    relationships: '您的独立性是宝贵的力量，但亲密关系需要一定程度的相互依赖。尝试在安全的环境中逐渐开放自己，让信任的人看到你的内心世界。',
  },
  fearful: {
    id: 'fearful',
    name: '恐惧型',
    label: 'Fearful-Avoidant',
    emoji: '💜',
    color: '#9c27b0',
    description: '您同时渴望亲密又害怕被伤害。您可能既想靠近又想逃离——对关系既渴望又警惕。这种矛盾的感受源于对自己和他人的双重不信任，常常伴随着强烈的情感波动。',
    strengths: ['情感洞察力强，能察觉关系的微妙变化', '对深刻的情感连接有真实的渴望', '一旦建立信任，关系会非常深厚', '自我反思能力强'],
    challenges: ['在关系中容易陷入"推拉"模式', '情绪波动可能较大', '既怕太近又怕太远', '需要较长时间建立信任'],
    relationships: '您的矛盾感受是可以理解的——害怕被拒绝和被抛弃是人之常情。治疗或深入的内在工作可以帮助您发展更安全的依恋模式。一步一步来，选择值得信赖的人慢慢练习开放。',
  },
};
