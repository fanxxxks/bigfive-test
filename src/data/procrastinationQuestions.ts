import type { Question } from '../lib/types';

// 拖延症类型鉴定 — 20题，5维度各4题
export const procrastinationQuestions: Question[] = [
  // deadline依赖 (1-4)
  { id: 'PR_1', text: '不到deadline前一天，我很难真正投入地去做一件事。', domain: 'pr', facet: 'deadline_dependence', reverse: false },
  { id: 'PR_2', text: 'deadline越近我的效率越高——最后关头的压力让我超常发挥。', domain: 'pr', facet: 'deadline_dependence', reverse: false },
  { id: 'PR_3', text: '我通常会提前完成任务，留出充足的缓冲时间。', domain: 'pr', facet: 'deadline_dependence', reverse: true },
  { id: 'PR_4', text: '即使没有外部deadline，我也能按计划推进工作。', domain: 'pr', facet: 'deadline_dependence', reverse: true },
  // 完美主义 (5-8)
  { id: 'PR_5', text: '我迟迟不开始是因为觉得自己还没有准备好——需要再做一点研究。', domain: 'pr', facet: 'perfectionism', reverse: false },
  { id: 'PR_6', text: '如果我觉得做出来不够好，我宁愿先不做。', domain: 'pr', facet: 'perfectionism', reverse: false },
  { id: 'PR_7', text: '"完成比完美更重要"——我认同这个理念并且在实践中应用。', domain: 'pr', facet: 'perfectionism', reverse: true },
  { id: 'PR_8', text: '我能接受第一版的粗糙——先做出来再修改。', domain: 'pr', facet: 'perfectionism', reverse: true },
  // 任务厌恶 (9-12)
  { id: 'PR_9', text: '有些任务光是想到就让我想拖延——比如报税、整理票据、填表格。', domain: 'pr', facet: 'task_aversion', reverse: false },
  { id: 'PR_10', text: '当面对不喜欢但必须做的事时，我会找各种其他事情来填充时间。', domain: 'pr', facet: 'task_aversion', reverse: false },
  { id: 'PR_11', text: '即使是无聊的任务，我也能比较快地完成它——反正都得做。', domain: 'pr', facet: 'task_aversion', reverse: true },
  { id: 'PR_12', text: '我不会因为某件事很枯燥就一直拖着不做。', domain: 'pr', facet: 'task_aversion', reverse: true },
  // 时间感知 (13-16)
  { id: 'PR_13', text: '我经常低估完成任务所需的时间——以为一小时能做完结果花了三小时。', domain: 'pr', facet: 'time_perception', reverse: false },
  { id: 'PR_14', text: '别人说我"没有时间观念"——虽然我不太愿意承认。', domain: 'pr', facet: 'time_perception', reverse: false },
  { id: 'PR_15', text: '我对完成任务需要多长时间有比较准确的估计。', domain: 'pr', facet: 'time_perception', reverse: true },
  { id: 'PR_16', text: '我会提前规划好时间，很少因为时间不够而手忙脚乱。', domain: 'pr', facet: 'time_perception', reverse: true },
  // 启动困难 (17-20)
  { id: 'PR_17', text: '从"想做"到"开始做"之间的那段心理距离对我来说特别难跨越。', domain: 'pr', facet: 'initiation', reverse: false },
  { id: 'PR_18', text: '即使知道任务很重要，我也常常需要挣扎很久才能开始。', domain: 'pr', facet: 'initiation', reverse: false },
  { id: 'PR_19', text: '一旦决定要做一件事，我能迅速进入状态开始执行。', domain: 'pr', facet: 'initiation', reverse: true },
  { id: 'PR_20', text: '对我来说"开始"不是问题——一旦我想做就会马上行动。', domain: 'pr', facet: 'initiation', reverse: true },
];
export const PROCRASTINATION_ITEMS_PER_PAGE = 5;
