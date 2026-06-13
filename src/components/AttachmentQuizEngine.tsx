import GenericQuizEngine from './GenericQuizEngine';
import { attachmentQuestions, ATTACHMENT_ITEMS_PER_PAGE } from '../data/attachmentQuestions';
import { computeAttachmentResults } from '../lib/attachmentScoring';

const BASE = import.meta.env.BASE_URL;

export default function AttachmentQuizEngine() {
  return (
    <GenericQuizEngine
      config={{
        id: 'attachment',
        title: '爱情依恋风格测评',
        questions: attachmentQuestions,
        itemsPerPage: ATTACHMENT_ITEMS_PER_PAGE,
        likertLabels: ['非常不同意', '不同意', '有点不同意', '中立', '有点同意', '同意', '非常同意'],
        resultKey: 'attachment_result',
        resultUrl: `${BASE}attachment-results`,
        startScreen: {
          emoji: '💕',
          title: '爱情依恋风格测评',
          description: '36道题 · 约4-5分钟 · 探索你的亲密关系模式',
          features: [
            '基于 <strong>成人依恋理论（ECR）</strong>',
            '共 <strong>36</strong> 道题目，预计耗时 <strong>约4-5分钟</strong>',
            '测量<strong>焦虑</strong>和<strong>回避</strong>两个核心维度',
            '判断安全型、焦虑型、回避型或恐惧型依恋风格',
            '获得在亲密关系中的优势和成长方向分析',
          ],
          tip: '请根据您在<strong>亲密关系中的真实感受</strong>（或过往关系中的模式）作答。如果没有恋爱经验，请根据您设想中的反应作答。',
        },
      }}
      computeResult={computeAttachmentResults}
    />
  );
}
