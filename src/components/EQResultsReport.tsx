import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EQResult } from '../lib/eqScoring';

export default function EQResultsReport() {
  const [r, setR] = useState<EQResult | null>(null);
  useEffect(() => {
    const s = sessionStorage.getItem('eq_result');
    if (s) { try { const p = JSON.parse(s); if (p?.dimensions?.length) setR(p); } catch {} }
  }, []);
  if (!r) return (<div className="text-center py-20"><p className="text-gray-400 text-lg">未找到测评结果。</p><a href={`${import.meta.env.BASE_URL}eq`} className="btn-primary inline-block mt-4">去测评</a></div>);

  return (<div className="space-y-8">
    <div className="card text-center"><div className="text-5xl mb-4">{r.levelEmoji}</div><h1 className="text-2xl font-bold text-gray-900 mb-2">您的情商EQ报告</h1><div className="text-4xl font-bold text-primary-600 mb-2">{r.totalScore}</div><p className="text-lg text-gray-600 mb-2">{r.level} · EQ综合得分</p><p className="text-sm text-gray-500 max-w-md mx-auto">基于Goleman情商模型的5维度综合评估</p><p className="text-xs text-gray-400 mt-3">报告生成时间：{new Date(r.timestamp).toLocaleString('zh-CN')}</p></div>

    <div className="card"><h2 className="text-lg font-bold text-gray-800 mb-4">5维度能力雷达图</h2><div style={{ height: 380 }}><ReactECharts option={radarOpt(r)} style={{ height: '100%' }} /></div></div>

    <div className="card"><h2 className="text-lg font-bold text-gray-800 mb-4">各维度详细得分</h2><div className="space-y-4">
      {r.dimensions.map(d => (<div key={d.id}><div className="flex items-center gap-2 mb-1"><span className="text-xl">{d.emoji}</span><span className="font-bold text-sm">{d.name}</span><span className="text-sm ml-auto font-bold" style={{ color: d.color }}>{d.percentage}%</span></div><p className="text-xs text-gray-500 mb-1.5">{d.description}</p><div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${d.percentage}%`, backgroundColor: d.color }} /></div></div>))}
    </div></div>

    <div className="card bg-blue-50 border-blue-200"><h3 className="font-bold text-blue-800 mb-2">💡 情商提升建议</h3><div className="text-sm text-blue-700 leading-relaxed space-y-2">{suggestions(r).map((s,i) => (<p key={i} className="flex items-start gap-2"><span className="text-blue-400">•</span> {s}</p>))}</div></div>

    <div className="text-center pb-10"><a href={`${import.meta.env.BASE_URL}eq`} className="btn-primary inline-block">重新测评</a></div>
  </div>);
}

function radarOpt(r: EQResult) {
  return {
    tooltip: {},
    radar: { indicator: r.dimensions.map(d => ({ name: d.name, max: 100 })), center: ['50%', '55%'], radius: '70%' },
    series: [{ type: 'radar', data: [{ value: r.dimensions.map(d => d.percentage), name: '你的得分', areaStyle: { color: 'rgba(37, 99, 235, 0.15)' }, lineStyle: { color: '#2563eb', width: 2 }, itemStyle: { color: '#2563eb' } }] }],
  };
}

function suggestions(r: EQResult): string[] {
  const tips: string[] = [];
  const lowest = [...r.dimensions].sort((a, b) => a.percentage - b.percentage);
  const weak = lowest.slice(0, 2);
  for (const d of weak) {
    if (d.id === 'awareness') tips.push('每天花5分钟记录你的情绪和触发因素，坚持两周就能显著提升自我觉察能力。');
    if (d.id === 'regulation') tips.push('尝试"暂停6秒"法则——在情绪激动时先深呼吸6秒再回应，这个简单的习惯能改变很多。');
    if (d.id === 'empathy') tips.push('在对话中练习"先复述再回应"：用自己的话复述对方的感受，确认理解后再给出你的看法。');
    if (d.id === 'social') tips.push('从小范围开始练习社交：每周主动和一个不太熟的人聊5分钟，慢慢扩大你的社交舒适区。');
    if (d.id === 'motivation') tips.push('为自己设立具体的、可衡量的小目标（而非模糊的"努力"），每完成一个就给自己一个小奖励。');
  }
  if (tips.length === 0) tips.push('你的情商各方面都比较均衡，继续保持并寻求在优势维度上的精进。');
  return tips;
}
