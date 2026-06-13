export interface EQResult { dimensions: EQDimension[]; totalScore: number; level: string; levelEmoji: string; timestamp: number; }
export interface EQDimension { id: string; name: string; emoji: string; color: string; description: string; rawScore: number; maxScore: number; percentage: number; }
export const eqDimensions: EQDimension[] = [
  { id: 'awareness', name: '自我觉察', emoji: '🔍', color: '#e91e63', description: '识别和理解自己情绪的能力。高自我觉察的人能准确说出自己的感受以及情绪产生的原因。', rawScore: 0, maxScore: 35, percentage: 0 },
  { id: 'regulation', name: '情绪管理', emoji: '🧘', color: '#2196f3', description: '管理和调节自己情绪反应的能力。高情绪管理的人能在压力下保持冷静，不被冲动驱使。', rawScore: 0, maxScore: 35, percentage: 0 },
  { id: 'empathy', name: '同理心', emoji: '💝', color: '#4caf50', description: '感知和理解他人情绪的能力。高同理心的人善于换位思考，能敏锐察觉他人的情感需求。', rawScore: 0, maxScore: 35, percentage: 0 },
  { id: 'social', name: '社交技巧', emoji: '🤝', color: '#ff9800', description: '在社交情境中有效互动和建立关系的能力。高社交技巧的人善于沟通、化解冲突和建立融洽关系。', rawScore: 0, maxScore: 35, percentage: 0 },
  { id: 'motivation', name: '自我激励', emoji: '🔥', color: '#9c27b0', description: '内在驱动和目标导向的能力。高自我激励的人能在没有外部压力的情况下保持热情和专注。', rawScore: 0, maxScore: 35, percentage: 0 },
];
