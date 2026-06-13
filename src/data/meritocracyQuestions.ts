import type { Question } from '../lib/types';

// 优绩主义程度 — 24题，6个子维度各4题

export const meritocracyQuestions: Question[] = [
  // 努力归因 (1-4)
  { id: 'MR_1', text: '我认为一个人成功与否，最关键的因素是他有多努力。', domain: 'merit', facet: 'effort_attribution', reverse: false },
  { id: 'MR_2', text: '我取得的成就，基本上是靠自己的努力和付出换来的。', domain: 'merit', facet: 'effort_attribution', reverse: false },
  { id: 'MR_3', text: '大部分人的失败，归根结底是因为他们不够努力。', domain: 'merit', facet: 'effort_attribution', reverse: false },
  { id: 'MR_4', text: '在这个社会上，只要足够拼命，就一定有出头的机会。', domain: 'merit', facet: 'effort_attribution', reverse: false },
  // 运气认知 (5-8)
  { id: 'MR_5', text: '我觉得自己是一个幸运的人——很多好事发生在我身上不完全是因为我努力。', domain: 'merit', facet: 'luck_acknowledgment', reverse: false },
  { id: 'MR_6', text: '相比同龄人，我的家庭环境和出身给了我很大的助力。', domain: 'merit', facet: 'luck_acknowledgment', reverse: false },
  { id: 'MR_7', text: '我不认为幸运在我人生的成功中占了多大比例。', domain: 'merit', facet: 'luck_acknowledgment', reverse: true },
  { id: 'MR_8', text: '很多事情的结果其实并不在我的掌控之中——运气经常起到决定性作用。', domain: 'merit', facet: 'luck_acknowledgment', reverse: false },
  // 结构批判 (9-12)
  { id: 'MR_9', text: '我觉得现在的社会基本是公平的——有能力的人总能脱颖而出。', domain: 'merit', facet: 'structure_critique', reverse: true },
  { id: 'MR_10', text: '贫富差距很大程度是因为富人和穷人的努力程度不同。', domain: 'merit', facet: 'structure_critique', reverse: true },
  { id: 'MR_11', text: '我认为社会制度对一个人的成功有比个人努力更大的影响。', domain: 'merit', facet: 'structure_critique', reverse: false },
  { id: 'MR_12', text: '很多有才华的人之所以没有成功，是因为制度环境对他们不利。', domain: 'merit', facet: 'structure_critique', reverse: false },
  // 成功焦虑 (13-16)
  { id: 'MR_13', text: '看到同龄人比我更成功，我会感到强烈的焦虑和不安。', domain: 'merit', facet: 'success_anxiety', reverse: false },
  { id: 'MR_14', text: '我经常觉得自己做得不够好，即使别人已经觉得我很优秀了。', domain: 'merit', facet: 'success_anxiety', reverse: false },
  { id: 'MR_15', text: '我对自己的职业发展没有太大的焦虑——顺其自然就好。', domain: 'merit', facet: 'success_anxiety', reverse: true },
  { id: 'MR_16', text: '我觉得"三十而立"这类社会时钟给了我很大的心理压力。', domain: 'merit', facet: 'success_anxiety', reverse: false },
  // 自我问责 (17-20)
  { id: 'MR_17', text: '当我遭遇失败时，我的第一反应是反思自己哪里做得不够好。', domain: 'merit', facet: 'self_blame', reverse: false },
  { id: 'MR_18', text: '如果一件事没有做成，那一定是我付出得还不够。', domain: 'merit', facet: 'self_blame', reverse: false },
  { id: 'MR_19', text: '我能比较客观地分析失败——有些原因是我自己的，有些是外部的。', domain: 'merit', facet: 'self_blame', reverse: true },
  { id: 'MR_20', text: '我不太会因为失败而责备自己——很多事情本来就不在掌控之内。', domain: 'merit', facet: 'self_blame', reverse: true },
  // 失败羞耻 (21-24)
  { id: 'MR_21', text: '失败让我感到羞耻，我不太愿意让别人知道我的失败经历。', domain: 'merit', facet: 'failure_shame', reverse: false },
  { id: 'MR_22', text: '如果公开尝试一件事然后失败了，我会觉得很丢脸。', domain: 'merit', facet: 'failure_shame', reverse: false },
  { id: 'MR_23', text: '我觉得失败是成长的一部分，不值得为此感到羞耻。', domain: 'merit', facet: 'failure_shame', reverse: true },
  { id: 'MR_24', text: '我愿意分享自己的失败经历——这些经历塑造了现在的我。', domain: 'merit', facet: 'failure_shame', reverse: true },
];

export const MERITOCRACY_ITEMS_PER_PAGE = 6;
