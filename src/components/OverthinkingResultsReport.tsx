import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { OverthinkingResult, OverthinkingStyleScore, OverthinkingDimension } from '../data/overthinkingData';
import { usePosterDownload } from './PosterDownload';
import { generateOverthinkingMD, downloadMarkdown } from '../lib/markdownExport';


export default function OverthinkingResultsReport() {
  const [r, setR] = useState<OverthinkingResult | null>(null);
  useEffect(() => { const s = sessionStorage.getItem('overthinking_result'); if (s) { try { const p = JSON.parse(s); if (p?.dimensions?.length) setR(p); } catch {} } }, []);
  if (!r) return (<div className="text-center py-20"><p className="text-gray-400 text-lg">未找到测评结果。</p><a href={`${import.meta.env.BASE_URL}overthinking`} className="btn-primary inline-block mt-4">去测评</a></div>);
  const { primary, dimensions, totalPct, level, levelEmoji } = r;
  const { chartRef, downloadPoster } = usePosterDownload('精神内耗雷达图.png');

  return (<div className="space-y-8">
    <div className="card text-center"><div className="text-7xl mb-4">{levelEmoji}</div><h1 className="text-2xl font-bold text-gray-900 mb-2">你的精神内耗报告</h1><div className="text-4xl font-bold text-primary-600 mb-2">{totalPct}%</div><p className="text-lg text-gray-600">{level} · 精神内耗综合指数</p><p className="text-xs text-gray-400 mt-3">{new Date(r.timestamp).toLocaleString('zh-CN')}</p></div>
    <div className="card"><h2 className="text-lg font-bold text-gray-800 mb-4">5维度内耗雷达图</h2><div style={{ height: 380 }}><ReactECharts ref={chartRef} option={radarOpt(r)} style={{ height: '100%' }} /></div></div>
    <div className="card"><h2 className="text-lg font-bold text-gray-800 mb-4">四种内耗类型匹配度</h2><div style={{ height: 300 }}><ReactECharts option={barOpt(r)} style={{ height: '100%' }} /></div></div>
    <div className="card" style={{ borderLeftColor: primary.color, borderLeftWidth: '5px' }}>
      <div className="flex items-center gap-3 mb-4"><span className="text-5xl">{primary.emoji}</span><div><h2 className="text-2xl font-bold" style={{ color: primary.color }}>{primary.name}</h2><p className="text-sm text-gray-400">匹配度 {primary.percentage}%</p></div></div>
      <p className="text-gray-700 leading-relaxed mb-6" style={{ whiteSpace: 'pre-wrap' }}>{primary.longDescription}</p>
      <div className="bg-green-50 rounded-lg p-4"><h4 className="font-bold text-green-700 text-sm mb-2">🛠️ 反内耗策略</h4><ul className="text-sm space-y-1.5">{primary.strategies.map((s: string, i: number) => (<li key={i} className="text-green-800 flex items-start gap-2"><span className="text-green-500">•</span> {s}</li>))}</ul></div>
    </div>
    <div><h2 className="text-lg font-bold text-gray-800 mb-4">5维度详细分析</h2><div className="space-y-3">{dimensions.map((d: OverthinkingDimension) => (<div key={d.id} className="card"><div className="flex items-center gap-3"><span className="text-2xl">{d.emoji}</span><div className="flex-1"><div className="flex items-center gap-2"><span className="font-bold">{d.name}</span><span className="font-bold text-sm ml-auto" style={{ color: d.color }}>{d.percentage}%</span></div><div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-1"><div className="h-full rounded-full" style={{ width: `${d.percentage}%`, backgroundColor: d.color }} /></div></div></div><p className="text-sm text-gray-600 mt-2">{d.interpretation}</p></div>))}</div></div>
    <div className="card bg-gray-50 border-dashed"><p className="text-xs text-gray-500 text-center">精神内耗指数基于反刍思维和认知行为理论研究。内耗水平是可变的——通过练习和自我觉察，你可以显著降低不必要的精神消耗。</p></div>
    <div className="text-center pb-10"><div className="flex items-center justify-center gap-4 flex-wrap">
      <a href={`${import.meta.env.BASE_URL}overthinking`} className="btn-primary inline-block">重新测评</a>
      <button onClick={() => downloadMarkdown(generateOverthinkingMD(r), '精神内耗指数报告.md')} className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">📥 下载MD报告</button>
      <button onClick={() => downloadPoster({ title: '精神内耗雷达图', subtitle: `${levelEmoji} ${level} · 指数${totalPct}%`, emoji: levelEmoji, highlights: dimensions.map((d: OverthinkingDimension) => ({ label: d.name, value: `${d.percentage}%`, color: d.color })), footer: '自我探索平台 · bigfive-test', timestamp: new Date(r.timestamp).toLocaleString('zh-CN') })} className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200">🎨 生成分享海报</button>
    </div></div>
  </div>);
}

function radarOpt(r: OverthinkingResult) { return { tooltip: {}, radar: { indicator: r.dimensions.map((d: OverthinkingDimension) => ({ name: d.name, max: 100 })), center: ['50%', '55%'], radius: '70%' }, series: [{ type: 'radar', data: [{ value: r.dimensions.map((d: OverthinkingDimension) => d.percentage), name: '内耗指数', areaStyle: { color: 'rgba(229, 57, 53, 0.12)' }, lineStyle: { color: '#e53935', width: 2 }, itemStyle: { color: '#e53935' } }] }] }; }
function barOpt(r: OverthinkingResult) { return { tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } }, grid: { left: '3%', right: '10%', containLabel: true }, xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%', color: '#6b7280' } }, yAxis: { type: 'category', data: r.styles.map((s: OverthinkingStyleScore) => `${s.emoji} ${s.name}`), axisLabel: { fontSize: 13, color: '#374151' }, inverse: true }, series: [{ type: 'bar', data: r.styles.map((s: OverthinkingStyleScore) => ({ value: s.percentage, itemStyle: { color: s.color, borderRadius: [0, 6, 6, 0] } })), barWidth: 20, label: { show: true, position: 'right', formatter: '{c}%', color: '#6b7280' } }] }; }
