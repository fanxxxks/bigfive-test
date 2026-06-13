import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { BoundaryResult, BoundaryScore } from '../data/boundaryData';
import { usePosterDownload } from './PosterDownload';
import { generateBoundaryMD, downloadMarkdown } from '../lib/markdownExport';


export default function BoundaryResultsReport() {
  const [r, setR] = useState<BoundaryResult | null>(null);
  useEffect(() => {
    const s = sessionStorage.getItem('boundary_result');
    if (s) { try { const p = JSON.parse(s); if (p?.styles?.length) setR(p); } catch {} }
  }, []);
  if (!r) return (<div className="text-center py-20"><p className="text-gray-400 text-lg">未找到测评结果。</p><a href={`${import.meta.env.BASE_URL}boundary`} className="btn-primary inline-block mt-4">去测评</a></div>);

  const { primary, styles, assertPct, pleasePct } = r;
  const { chartRef, downloadPoster } = usePosterDownload('社交边界图谱.png');

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="card text-center">
        <div className="text-7xl mb-4">{primary.emoji}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">你的社交边界报告</h1>
        <p className="text-3xl font-bold mb-2" style={{ color: primary.color }}>{primary.name}</p>
        <p className="text-lg text-gray-500 italic mb-3">"{primary.tagline}"</p>
        <p className="text-sm text-gray-400">{primary.personalityTraits}</p>
        <p className="text-xs text-gray-400 mt-3">报告生成时间：{new Date(r.timestamp).toLocaleString('zh-CN')}</p>
      </div>

      {/* Two Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="card text-center">
          <h3 className="font-bold text-gray-800 mb-2">🛡️ 坚定性指数</h3>
          <p className="text-xs text-gray-500 mb-3">能够坚持自己的立场和拒绝不合理要求</p>
          <div className="text-4xl font-bold mb-2" style={{ color: assertPct > 50 ? '#7e57c2' : '#f06292' }}>{assertPct}%</div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${assertPct}%`, backgroundColor: assertPct > 50 ? '#7e57c2' : '#f06292' }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {assertPct <= 30 ? '低坚定 — 你倾向于妥协和让步' : assertPct <= 50 ? '中低坚定 — 在某些场景下能坚持' : assertPct <= 70 ? '中高坚定 — 多数时候能捍卫自己的立场' : '高坚定 — 你是自己的最佳代言人'}
          </p>
        </div>
        <div className="card text-center">
          <h3 className="font-bold text-gray-800 mb-2">🎭 讨好倾向指数</h3>
          <p className="text-xs text-gray-500 mb-3">习惯性取悦他人和寻求认可的倾向</p>
          <div className="text-4xl font-bold mb-2" style={{ color: pleasePct > 50 ? '#f06292' : '#7e57c2' }}>{pleasePct}%</div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${pleasePct}%`, backgroundColor: pleasePct > 50 ? '#f06292' : '#7e57c2' }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {pleasePct <= 30 ? '低讨好 — 你的价值感来自内在而非他人认可' : pleasePct <= 50 ? '中低讨好 — 你能够平衡自我和他人需求' : pleasePct <= 70 ? '中高讨好 — 你比较在意他人的看法' : '高讨好 — 你习惯性地把他人的需求放在自己前面'}
          </p>
        </div>
      </div>

      {/* Quadrant Chart */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">双维度象限定位图</h2>
        <p className="text-sm text-gray-500 mb-3">横轴=坚定性，纵轴=讨好倾向。你的位置决定了你的社交边界类型。</p>
        <div style={{ height: 420 }}><ReactECharts ref={chartRef} option={scatterOpt(r)} style={{ height: '100%' }} /></div>
      </div>

      {/* Type Bar */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">四种社交边界类型匹配度</h2>
        <div style={{ height: 300 }}><ReactECharts option={barOpt(r)} style={{ height: '100%' }} /></div>
      </div>

      {/* Primary Deep Dive */}
      <div className="card" style={{ borderLeftColor: primary.color, borderLeftWidth: '5px' }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{primary.emoji}</span>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: primary.color }}>{primary.name}</h2>
            <p className="text-sm text-gray-400">匹配度 {primary.percentage}% · {primary.personalityTraits}</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6" style={{ whiteSpace: 'pre-wrap' }}>{primary.longDescription}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 rounded-lg p-4"><h4 className="font-bold text-green-700 text-sm mb-2">💪 核心优势</h4><ul className="text-sm space-y-1">{primary.strengths.map((s: string, i: number) => (<li key={i} className="text-green-800 flex items-start gap-1.5"><span className="text-green-500 mt-0.5">•</span> {s}</li>))}</ul></div>
          <div className="bg-amber-50 rounded-lg p-4"><h4 className="font-bold text-amber-700 text-sm mb-2">⚠️ 成长课题</h4><ul className="text-sm space-y-1">{primary.challenges.map((c: string, i: number) => (<li key={i} className="text-amber-800 flex items-start gap-1.5"><span className="text-amber-500 mt-0.5">•</span> {c}</li>))}</ul></div>
        </div>
        <div className="space-y-3">
          <div className="bg-purple-50 rounded-lg p-4"><h4 className="font-bold text-purple-700 text-sm mb-2">🛡️ 边界建立建议</h4><p className="text-sm text-purple-800 leading-relaxed">{primary.boundaryAdvice}</p></div>
          <div className="bg-red-50 rounded-lg p-4"><h4 className="font-bold text-red-700 text-sm mb-2">⚔️ 冲突应对风格</h4><p className="text-sm text-red-800 leading-relaxed">{primary.conflictStyle}</p></div>
          <div className="bg-blue-50 rounded-lg p-4"><h4 className="font-bold text-blue-700 text-sm mb-2">💼 职场策略</h4><p className="text-sm text-blue-800 leading-relaxed">{primary.workplaceAdvice}</p></div>
        </div>
      </div>

      {/* All Types */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800">全部社交边界类型一览</h2>
        {styles.map((s: BoundaryScore, idx: number) => (
          <div key={s.id} className="card"><div className="flex items-start gap-4"><div className="flex-shrink-0 text-3xl">{s.emoji}</div><div className="flex-1"><div className="flex items-center gap-2 mb-1"><h3 className="font-bold" style={{ color: s.color }}>#{idx + 1} {s.name}</h3><span className="font-bold text-sm" style={{ color: s.color }}>{s.percentage}%</span><span className="text-xs text-gray-400">{s.personalityTraits}</span></div><p className="text-sm text-gray-600 mb-2">{s.description}</p><div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${s.percentage}%`, backgroundColor: s.color }} /></div></div></div></div>
        ))}
      </div>

      <div className="card bg-gray-50 border-dashed"><p className="text-xs text-gray-500 text-center leading-relaxed">讨好型/不好惹指数测评基于社交边界与坚定性双维度模型。每种社交边界类型都有其独特的优势和适用场景——重要的是了解自己的模式，在需要的时候做出有意识的选择。</p></div>

      <div className="text-center pb-10">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href={`${import.meta.env.BASE_URL}boundary`} className="btn-primary inline-block">重新测评</a>
          <button onClick={() => downloadMarkdown(generateBoundaryMD(r), '讨好型不好惹指数报告.md')} className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">📥 下载MD报告</button>
          <button onClick={() => downloadPoster({ title: '社交边界图谱', subtitle: `${primary.emoji} ${primary.name} · ${primary.tagline}`, emoji: primary.emoji, highlights: styles.map((s: BoundaryScore) => ({ label: s.name, value: `${s.percentage}%`, color: s.color })), footer: '自我探索平台 · bigfive-test', timestamp: new Date(r.timestamp).toLocaleString('zh-CN') })} className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200">🎨 生成分享海报</button>
        </div>
      </div>
    </div>
  );
}

function scatterOpt(r: BoundaryResult) {
  return {
    tooltip: { trigger: 'item', formatter: () => `你在这里<br/>坚定性 ${r.assertPct}% · 讨好倾向 ${r.pleasePct}%`, backgroundColor: '#fff', borderColor: '#e5e7eb', textStyle: { color: '#1f2937' } },
    grid: { left: 50, right: 30, top: 30, bottom: 50 },
    xAxis: { name: '坚定性 →', nameLocation: 'middle', nameGap: 35, nameTextStyle: { fontSize: 13, color: '#6b7280' }, min: 0, max: 100, axisLabel: { formatter: '{value}%', color: '#9ca3af', fontSize: 10 }, splitLine: { lineStyle: { color: '#f3f4f6' } }, axisLine: { lineStyle: { color: '#d1d5db' } } },
    yAxis: { name: '讨好倾向 →', nameLocation: 'middle', nameGap: 40, nameTextStyle: { fontSize: 13, color: '#6b7280' }, min: 0, max: 100, axisLabel: { formatter: '{value}%', color: '#9ca3af', fontSize: 10 }, splitLine: { lineStyle: { color: '#f3f4f6' } }, axisLine: { lineStyle: { color: '#d1d5db' } } },
    series: [
      { type: 'line', markLine: { silent: true, symbol: 'none', lineStyle: { color: '#d1d5db', type: 'dashed', width: 1 }, data: [{ xAxis: 50 }] }, data: [] },
      { type: 'line', markLine: { silent: true, symbol: 'none', lineStyle: { color: '#d1d5db', type: 'dashed', width: 1 }, data: [{ yAxis: 50 }] }, data: [] },
      { type: 'scatter', symbolSize: 0, data: [{ value: [15, 85], label: { show: true, formatter: '🍬 软糖型', fontSize: 12, color: '#f06292', position: 'inside' } }, { value: [85, 15], label: { show: true, formatter: '🦔 刺猬型', fontSize: 12, color: '#7e57c2', position: 'inside' } }, { value: [90, 10], label: { show: true, formatter: '🦡 平头哥型', fontSize: 12, color: '#ff7043', position: 'inside' } }, { value: [55, 50], label: { show: true, formatter: '🦎 变色龙型', fontSize: 12, color: '#66bb6a', position: 'inside' } }] },
      { type: 'scatter', symbolSize: 20, itemStyle: { color: r.primary.color, shadowBlur: 10, shadowColor: r.primary.color }, data: [{ value: [r.assertPct, r.pleasePct], name: '你' }], label: { show: true, formatter: '你', position: 'top', fontSize: 13, fontWeight: 'bold', color: r.primary.color } },
    ],
  };
}

function barOpt(r: BoundaryResult) {
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '10%', top: '3%', bottom: '3%', containLabel: true },
    xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%', color: '#6b7280' } },
    yAxis: { type: 'category', data: r.styles.map((s: BoundaryScore) => `${s.emoji} ${s.name}`), axisLabel: { fontSize: 13, color: '#374151' }, inverse: true },
    series: [{ type: 'bar', data: r.styles.map((s: BoundaryScore) => ({ value: s.percentage, itemStyle: { color: s.color, borderRadius: [0, 6, 6, 0] } })), barWidth: 20, label: { show: true, position: 'right', formatter: '{c}%', color: '#6b7280' } }],
  };
}
