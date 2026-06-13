import type { Question } from '../lib/types';

// 淡人/浓人气质鉴定 — 20题
// 双维度：唤醒度（Arousal, 题1-10）× 反应性（Reactivity, 题11-20）
// R后缀 = 反向计分

export const temperamentQuestions: Question[] = [
  // ─── 唤醒度 Arousal (1-10) ───
  { id: 'TM_1', text: '别人总是对我说"你看起来好淡定"，即使我心里其实有波动。', domain: 'arousal', facet: 'threshold', reverse: false },
  { id: 'TM_2', text: '相比热闹的派对，我更享受一个人安安静静地待着。', domain: 'arousal', facet: 'stimulus', reverse: false },
  { id: 'TM_3', text: '周围人都很激动的时候，我往往是最后一个被感染的人。', domain: 'arousal', facet: 'contagion', reverse: false },
  { id: 'TM_4', text: '我的朋友们觉得我太"佛系"了——好像对什么都不太在意。', domain: 'arousal', facet: 'threshold', reverse: false },
  { id: 'TM_5', text: '我很容易被新鲜事物吸引，看到有趣的东西就会立刻兴奋起来。', domain: 'arousal', facet: 'stimulus', reverse: true },
  { id: 'TM_6', text: '排队时有人插队我会立刻不爽，但大多数时候懒得跟人发生冲突。', domain: 'arousal', facet: 'contagion', reverse: false },
  { id: 'TM_7', text: '刷到感人的视频时我很容易掉眼泪，即使旁边有人也控制不住。', domain: 'arousal', facet: 'threshold', reverse: true },
  { id: 'TM_8', text: '在生活中我是一个"节能主义者"——能不折腾的事情绝不折腾。', domain: 'arousal', facet: 'stimulus', reverse: false },
  { id: 'TM_9', text: '朋友觉得我是一个情绪丰富、表情包一样的人。', domain: 'arousal', facet: 'contagion', reverse: true },
  { id: 'TM_10', text: '遇到开心的事我可能只是微微一笑，很少会兴奋得跳起来。', domain: 'arousal', facet: 'threshold', reverse: false },

  // ─── 反应性 Reactivity (11-20) ───
  { id: 'TM_11', text: '别人说我"雷声大雨点小"——生气的时候动静很大，但很快就消了。', domain: 'reactivity', facet: 'intensity', reverse: false },
  { id: 'TM_12', text: '即使我心里已经翻江倒海，表面上我仍然可以保持冷静镇定。', domain: 'reactivity', facet: 'expression', reverse: false },
  { id: 'TM_13', text: '吵架的时候我一激动就会飙高音量和语速，情绪上来完全压不住。', domain: 'reactivity', facet: 'intensity', reverse: true },
  { id: 'TM_14', text: '被误解时我会立刻解释，而不是默默憋着让误会发酵。', domain: 'reactivity', facet: 'expression', reverse: true },
  { id: 'TM_15', text: '看完一部好电影我可以回味好几天，情绪久久不能平复。', domain: 'reactivity', facet: 'recovery', reverse: true },
  { id: 'TM_16', text: '发生不愉快的事情后，我很快就能调整过来，不会影响太久。', domain: 'reactivity', facet: 'recovery', reverse: false },
  { id: 'TM_17', text: '我不会把喜怒哀乐写在脸上——周围的人常常猜不到我在想什么。', domain: 'reactivity', facet: 'expression', reverse: false },
  { id: 'TM_18', text: '朋友遇到困难时我的情绪会跟着崩溃，比当事人还激动。', domain: 'reactivity', facet: 'intensity', reverse: true },
  { id: 'TM_19', text: '情绪来了就让它来——我不压抑情绪，哭完笑完很快就好了。', domain: 'reactivity', facet: 'recovery', reverse: true },
  { id: 'TM_20', text: '即使是最激动人心的消息，我的反应通常也比别人慢半拍、冷半度。', domain: 'reactivity', facet: 'expression', reverse: false },
];

export const TEMPERAMENT_ITEMS_PER_PAGE = 5;
