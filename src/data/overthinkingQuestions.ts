import type { Question } from '../lib/types';

// 精神内耗指数 — 20题，5个维度各4题
export const overthinkingQuestions: Question[] = [
  // 反刍思维 rumination (1-4)
  { id: 'OT_1', text: '发生了一件不愉快的事后，我会在脑子里反复回放当时的情景。', domain: 'ot', facet: 'rumination', reverse: false },
  { id: 'OT_2', text: '别人无心的一句话，我会反复揣摩很久——他到底是什么意思？', domain: 'ot', facet: 'rumination', reverse: false },
  { id: 'OT_3', text: '事情过去了就过去了，我不会一直抓着不放。', domain: 'ot', facet: 'rumination', reverse: true },
  { id: 'OT_4', text: '我很少会反复回想已经发生的尴尬瞬间。', domain: 'ot', facet: 'rumination', reverse: true },
  // 决策纠结 decision_paralysis (5-8)
  { id: 'OT_5', text: '做决定之前，我会把所有可能的选项和后果都分析一遍，然后还是拿不定主意。', domain: 'ot', facet: 'decision_paralysis', reverse: false },
  { id: 'OT_6', text: '即使是一个不太重要的选择（比如点什么外卖），我也会纠结很久。', domain: 'ot', facet: 'decision_paralysis', reverse: false },
  { id: 'OT_7', text: '我通常能比较快地做出决定——想太多也没什么用。', domain: 'ot', facet: 'decision_paralysis', reverse: true },
  { id: 'OT_8', text: '对于重要的决定，我倾向于相信自己的直觉而不是反复分析。', domain: 'ot', facet: 'decision_paralysis', reverse: true },
  // 自我怀疑 self_doubt (9-12)
  { id: 'OT_9', text: '即使别人说我做得很好，我也会怀疑自己是不是真的做得够好。', domain: 'ot', facet: 'self_doubt', reverse: false },
  { id: 'OT_10', text: '我经常觉得自己不如别人——在能力、外貌或社交方面。', domain: 'ot', facet: 'self_doubt', reverse: false },
  { id: 'OT_11', text: '我对自己在大多数事情上的能力是比较有信心的。', domain: 'ot', facet: 'self_doubt', reverse: true },
  { id: 'OT_12', text: '我很少拿自己和别人比较——每个人都有自己的路。', domain: 'ot', facet: 'self_doubt', reverse: true },
  // 过度自省 over_introspection (13-16)
  { id: 'OT_13', text: '我经常在脑子里复盘过去的事情，想"如果当时我做了不同的选择会怎样"。', domain: 'ot', facet: 'over_introspection', reverse: false },
  { id: 'OT_14', text: '别人可能觉得我想得太多——连我自己也觉得累。', domain: 'ot', facet: 'over_introspection', reverse: false },
  { id: 'OT_15', text: '我很少花时间去想"我为什么是这样的"——接受自己就挺好。', domain: 'ot', facet: 'over_introspection', reverse: true },
  { id: 'OT_16', text: '与其反省过去，我更愿意把精力放在当下和未来。', domain: 'ot', facet: 'over_introspection', reverse: true },
  // 睡前思维奔逸 bedtime_racing (17-20)
  { id: 'OT_17', text: '一躺到床上，脑子里就开始不受控制地播放各种想法和担忧。', domain: 'ot', facet: 'bedtime_racing', reverse: false },
  { id: 'OT_18', text: '我经常因为想太多而难以入睡。', domain: 'ot', facet: 'bedtime_racing', reverse: false },
  { id: 'OT_19', text: '我躺下很快就能睡着——脑子里不会想东想西。', domain: 'ot', facet: 'bedtime_racing', reverse: true },
  { id: 'OT_20', text: '睡觉前是我一天中最放松的时刻，我很少在床上想事情。', domain: 'ot', facet: 'bedtime_racing', reverse: true },
];
export const OVERTHINKING_ITEMS_PER_PAGE = 5;
