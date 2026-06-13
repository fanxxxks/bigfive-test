import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { ProcrastinationResult, ProcrastinationStyleScore, ProcrastinationDimension } from '../data/procrastinationData';
import { usePosterDownload } from './PosterDownload';

function downloadMD(r: ProcrastinationResult) {
  const p = r.primary; const lines = ['# 拖延症类型鉴定报告', '', `> ${new Date(r.timestamp).toLocaleString('zh-CN')}`, '', `## 你的拖延类型：${p.emoji} ${p.name}`, '', p.longDescription, '', '## 5维度分析', ...r.dimensions.map((d: ProcrastinationDimension) => `- ${d.emoji} ${d.name}: ${d.percentage}% — ${d.interpretation}`), '', '## 反拖延策略', ...p.strategies.map((s: string) => `- ${s}`), '', '---', '*本测评仅供个人了解与参考。*'];
  const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = '拖延症类型鉴定报告.md'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}

export default function ProcrastinationResultsReport() {
  const [r, setR] = useState<ProcrastinationResult | null>(null);
  useEffect(() => { const s = sessionStorage.getItem('procrastination_result'); if (s) { try { const p = JSON.parse(s); if (p?.dimensions?.length) setR(p); } catch {} } }, []);
  if (!r) return (<div className="text-center py-20"><p className="text-gray-400 text-lg">未找到测评结果。</p><a href={`${import.meta.env.BASE_URL}procrastination`} className="btn-primary inline-block mt-4">去测评</a></div>);
  const { primary, dimensions } = r;
  const { chartRef, downloadPoster } = usePosterDownload('拖延症类型雷达图.png');

  return (<div className="space-y-8">
    <div className="card text-center"><div className="text-7xl mb-4">{primary.emoji}</div><h1 className="text-2xl font-bold text-gray-900 mb-2">你的拖延症类型报告</h1><p className="text-3xl font-bold mb-2" style={{ color: primary.color }}>{primary.name}</p><p className="text-sm text-gray-500">{primary.description}</p><p className="text-xs text-gray-400 mt-3">{new Date(r.timestamp).toLocaleString('zh-CN')}</p></div>
    <div className="card"><h2 className="text-lg font-bold text-gray-800 mb-4">5维度拖延雷达图</h2><div style={{ height: 380 }}><ReactECharts ref={chartRef} option={radarOpt(r)} style={{ height: '100%' }} /></div></div>
    <div className="card"><h2 className="text-lg font-bold text-gray-800 mb-4">四种拖延类型匹配度</h2><div style={{ height: 300 }}><ReactECharts option={barOpt(r)} style={{ height: '100%' }} /></div></div>
    <div className="card" style={{ borderLeftColor: primary.color, borderLeftWidth: '5px' }}>
      <div className="flex items-center gap-3 mb-4"><span className="text-5xl">{primary.emoji}</span><div><h2 className="text-2xl font-bold" style={{ color: primary.color }}>{primary.name}</h2><p className="text-sm text-gray-400">匹配度 {primary.percentage}%</p></div></div>
      <p className="text-gray-700 leading-relaxed mb-6" style={{ whiteSpace: 'pre-wrap' }}>{primary.longDescription}</p>
      <div className="bg-blue-50 rounded-lg p-4"><h4 className="font-bold text-blue-700 text-sm mb-2">🛠️ 专属反拖延策略</h4><ul className="text-sm space-y-1.5">{primary.strategies.map((s: string, i: number) => (<li key={i} className="text-blue-800 flex items-start gap-2"><span className="text-blue-500">•</span> {s}</li>))}</ul></div>
    </div>
    <div><h2 className="text-lg font-bold text-gray-800 mb-4">5维度详细分析</h2><div className="space-y-3">{dimensions.map((d: ProcrastinationDimension) => (<div key={d.id} className="card"><div className="flex items-center gap-3"><span className="text-2xl">{d.emoji}</span><div className="flex-1"><div className="flex items-center gap-2"><span className="font-bold">{d.name}</span><span className="font-bold text-sm ml-auto" style={{ color: d.color }}>{d.percentage}%</span></div><div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-1"><div className="h-full rounded-full" style={{ width: `${d.percentage}%`, backgroundColor: d.color }} /></div></div></div><p className="text-sm text-gray-600 mt-2">{d.interpretation}</p></div>))}</div></div>
    <div className="card bg-gray-50 border-dashed"><p className="text-xs text-gray-500 text-center">拖延症类型鉴定基于执行功能和动机心理学研究。拖延不是懒惰——它是一种情绪调节策略。了解自己的拖延类型是克服它的第一步。</p></div>
    <div className="text-center pb-10"><div className="flex items-center justify-center gap-4 flex-wrap">
      <a href={`${import.meta.env.BASE_URL}procrastination`} className="btn-primary inline-block">重新测评</a>
      <button onClick={() => downloadMD(r)} className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">📥 下载MD报告</button>
      <button onClick={() => downloadPoster({ title: '拖延症类型图谱', subtitle: `${primary.emoji} ${primary.name}`, emoji: primary.emoji, highlights: dimensions.map((d: ProcrastinationDimension) => ({ label: d.name, value: `${d.percentage}%`, color: d.color })), footer: '自我探索平台 · bigfive-test', timestamp: new Date(r.timestamp).toLocaleString('zh-CN') })} className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200">🎨 生成分享海报</button>
    </div></div>
  </div>);
}

function radarOpt(r: ProcrastinationResult) { return { tooltip: {}, radar: { indicator: r.dimensions.map((d: ProcrastinationDimension) => ({ name: d.name, max: 100 })), center: ['50%', '55%'], radius: '70%' }, series: [{ type: 'radar', data: [{ value: r.dimensions.map((d: ProcrastinationDimension) => d.percentage), name: '拖延维度', areaStyle: { color: 'rgba(229, 57, 53, 0.12)' }, lineStyle: { color: '#e53935', width: 2 }, itemStyle: { color: '#e53935' } }] }] }; }
function barOpt(r: ProcrastinationResult) { return { tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } }, grid: { left: '3%', right: '10%', containLabel: true }, xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%', color: '#6b7280' } }, yAxis: { type: 'category', data: r.styles.map((s: ProcrastinationStyleScore) => `${s.emoji} ${s.name}`), axisLabel: { fontSize: 13, color: '#374151' }, inverse: true }, series: [{ type: 'bar', data: r.styles.map((s: ProcrastinationStyleScore) => ({ value: s.percentage, itemStyle: { color: s.color, borderRadius: [0, 6, 6, 0] } })), barWidth: 20, label: { show: true, position: 'right', formatter: '{c}%', color: '#6b7280' } }] }; }
