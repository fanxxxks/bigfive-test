import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { MeritocracyResult, MeritocracyStyleScore, MeritocracyDimension } from '../data/meritocracyData';
import { usePosterDownload } from './PosterDownload';

function downloadMD(r: MeritocracyResult) {
  const p = r.primary;
  const lines = ['# 优绩主义程度测评报告', '', `> ${new Date(r.timestamp).toLocaleString('zh-CN')}`, '',
    `## 你的优绩主义类型：${p.emoji} ${p.name}`, '', `综合优绩主义指数：${r.totalPct}%`, '',
    '## 6维度分析', ...r.dimensions.map((d: MeritocracyDimension) => `- ${d.emoji} ${d.name}: ${d.percentage}%`), '',
    '## 各类型匹配度', ...r.styles.map((s: MeritocracyStyleScore) => `- ${s.emoji} ${s.name}: ${s.percentage}%`), '',
    '## 深度解读', '', p.longDescription, '', '### 文化分析', p.culturalAnalysis, '', '### 平衡建议', p.balanceAdvice, '',
    '---', '*本测评仅供个人了解与参考。*',
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = '优绩主义程度测评报告.md'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}

export default function MeritocracyResultsReport() {
  const [r, setR] = useState<MeritocracyResult | null>(null);
  useEffect(() => { const s = sessionStorage.getItem('meritocracy_result'); if (s) { try { const p = JSON.parse(s); if (p?.dimensions?.length) setR(p); } catch {} } }, []);
  if (!r) return (<div className="text-center py-20"><p className="text-gray-400 text-lg">未找到测评结果。</p><a href={`${import.meta.env.BASE_URL}meritocracy`} className="btn-primary inline-block mt-4">去测评</a></div>);
  const { primary, styles, dimensions, totalPct } = r;
  const { chartRef, downloadPoster } = usePosterDownload('优绩主义雷达图.png');

  return (<div className="space-y-8">
    <div className="card text-center"><div className="text-7xl mb-4">{primary.emoji}</div><h1 className="text-2xl font-bold text-gray-900 mb-2">你的优绩主义报告</h1><p className="text-3xl font-bold mb-2" style={{ color: primary.color }}>{primary.name}</p><p className="text-sm text-gray-500">综合优绩主义指数：{totalPct}%</p><p className="text-xs text-gray-400 mt-3">报告生成时间：{new Date(r.timestamp).toLocaleString('zh-CN')}</p></div>
    <div className="card"><h2 className="text-lg font-bold text-gray-800 mb-4">6维度雷达图</h2><div style={{ height: 400 }}><ReactECharts ref={chartRef} option={radarOpt(r)} style={{ height: '100%' }} /></div></div>
    <div className="card"><h2 className="text-lg font-bold text-gray-800 mb-4">四种优绩主义类型匹配度</h2><div style={{ height: 300 }}><ReactECharts option={barOpt(r)} style={{ height: '100%' }} /></div></div>
    <div className="card" style={{ borderLeftColor: primary.color, borderLeftWidth: '5px' }}>
      <div className="flex items-center gap-3 mb-4"><span className="text-5xl">{primary.emoji}</span><div><h2 className="text-2xl font-bold" style={{ color: primary.color }}>{primary.name}</h2><p className="text-sm text-gray-400">匹配度 {primary.percentage}%</p></div></div>
      <p className="text-gray-700 leading-relaxed mb-6" style={{ whiteSpace: 'pre-wrap' }}>{primary.longDescription}</p>
      <div className="space-y-3">
        <div className="bg-amber-50 rounded-lg p-4"><h4 className="font-bold text-amber-700 text-sm mb-2">🏛️ 文化分析</h4><p className="text-sm text-amber-800">{primary.culturalAnalysis}</p></div>
        <div className="bg-blue-50 rounded-lg p-4"><h4 className="font-bold text-blue-700 text-sm mb-2">🌱 平衡建议</h4><p className="text-sm text-blue-800">{primary.balanceAdvice}</p></div>
      </div>
    </div>
    <div><h2 className="text-lg font-bold text-gray-800 mb-4">6维度详细分析</h2><div className="space-y-4">{dimensions.map((d: MeritocracyDimension) => (<div key={d.id} className="card"><div className="flex items-center gap-3 mb-3"><span className="text-2xl">{d.emoji}</span><div className="flex-1"><div className="flex items-center gap-2"><span className="font-bold">{d.name}</span><span className="font-bold text-sm ml-auto" style={{ color: d.color }}>{d.percentage}%</span></div><div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mt-1"><div className="h-full rounded-full" style={{ width: `${d.percentage}%`, backgroundColor: d.color }} /></div></div></div><p className="text-sm text-gray-600">{d.percentage >= 60 ? d.highInterpretation : d.lowInterpretation}</p></div>))}</div></div>
    <div className="space-y-3"><h2 className="text-lg font-bold text-gray-800">全部优绩主义类型</h2>{styles.map((s: MeritocracyStyleScore, idx: number) => (<div key={s.id} className="card"><div className="flex items-start gap-4"><div className="text-3xl">{s.emoji}</div><div className="flex-1"><div className="flex items-center gap-2 mb-1"><h3 className="font-bold" style={{ color: s.color }}>#{idx + 1} {s.name}</h3><span className="font-bold text-sm" style={{ color: s.color }}>{s.percentage}%</span></div><p className="text-sm text-gray-600 mb-2">{s.description}</p><div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${s.percentage}%`, backgroundColor: s.color }} /></div></div></div></div>))}</div>
    <div className="card bg-gray-50 border-dashed"><p className="text-xs text-gray-500 text-center">优绩主义程度测评基于归因理论和成功观念研究。本测评旨在帮助你了解自己对"努力与成功"关系的信念模式，不构成任何价值判断。</p></div>
    <div className="text-center pb-10"><div className="flex items-center justify-center gap-4 flex-wrap">
      <a href={`${import.meta.env.BASE_URL}meritocracy`} className="btn-primary inline-block">重新测评</a>
      <button onClick={() => downloadMD(r)} className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">📥 下载MD报告</button>
      <button onClick={() => downloadPoster({ title: '优绩主义程度图谱', subtitle: `${primary.emoji} ${primary.name} · 指数${totalPct}%`, emoji: primary.emoji, highlights: dimensions.slice(0, 6).map((d: MeritocracyDimension) => ({ label: d.name, value: `${d.percentage}%`, color: d.color })), footer: '自我探索平台 · bigfive-test', timestamp: new Date(r.timestamp).toLocaleString('zh-CN') })} className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200">🎨 生成分享海报</button>
    </div></div>
  </div>);
}

function radarOpt(r: MeritocracyResult) { return { tooltip: {}, radar: { indicator: r.dimensions.map((d: MeritocracyDimension) => ({ name: d.name, max: 100 })), center: ['50%', '55%'], radius: '70%' }, series: [{ type: 'radar', data: [{ value: r.dimensions.map((d: MeritocracyDimension) => d.percentage), name: '你的得分', areaStyle: { color: 'rgba(37, 99, 235, 0.15)' }, lineStyle: { color: '#2563eb', width: 2 }, itemStyle: { color: '#2563eb' } }] }] }; }
function barOpt(r: MeritocracyResult) { return { tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } }, grid: { left: '3%', right: '10%', containLabel: true }, xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%', color: '#6b7280' } }, yAxis: { type: 'category', data: r.styles.map((s: MeritocracyStyleScore) => `${s.emoji} ${s.name}`), axisLabel: { fontSize: 13, color: '#374151' }, inverse: true }, series: [{ type: 'bar', data: r.styles.map((s: MeritocracyStyleScore) => ({ value: s.percentage, itemStyle: { color: s.color, borderRadius: [0, 6, 6, 0] } })), barWidth: 20, label: { show: true, position: 'right', formatter: '{c}%', color: '#6b7280' } }] }; }
