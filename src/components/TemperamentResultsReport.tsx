import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { TemperamentResult } from '../data/temperamentData';
import { usePosterDownload } from './PosterDownload';

// MD export helper inline
function downloadMD(r: TemperamentResult) {
  const p = r.primary;
  const lines = [
    '# 淡人/浓人气质鉴定报告',
    '',
    `> 报告生成时间：${new Date(r.timestamp).toLocaleString('zh-CN')}`,
    '',
    `## 你的主导气质：${p.emoji} ${p.name}`,
    '',
    `> "${p.tagline}"`,
    '',
    `### 气质数据`,
    `- 情绪唤醒度：${r.arousalPct}%`,
    `- 情绪反应性：${r.reactivityPct}%`,
    '',
    `### 各类型匹配度`,
    ...r.styles.map(s => `- ${s.emoji} ${s.name}: ${s.percentage}%`),
    '',
    `## 深度解读`,
    '',
    p.longDescription,
    '',
    `### 💪 核心优势`,
    ...p.strengths.map(s => `- ${s}`),
    '',
    `### ⚠️ 成长课题`,
    ...p.challenges.map(c => `- ${c}`),
    '',
    `### 💼 适合的职业方向`,
    p.suitableCareers,
    '',
    `### 💕 亲密关系风格`,
    p.relationshipStyle,
    '',
    `### 🌱 生活建议`,
    p.lifeAdvice,
    '',
    '---',
    '*本测评仅供个人了解与参考，不构成临床诊断。*',
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = '淡人浓人气质鉴定报告.md';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function TemperamentResultsReport() {
  const [r, setR] = useState<TemperamentResult | null>(null);
  useEffect(() => {
    const s = sessionStorage.getItem('temperament_result');
    if (s) { try { const p = JSON.parse(s); if (p?.styles?.length) setR(p); } catch {} }
  }, []);
  if (!r) return (<div className="text-center py-20"><p className="text-gray-400 text-lg">未找到测评结果。</p><a href={`${import.meta.env.BASE_URL}temperament`} className="btn-primary inline-block mt-4">去测评</a></div>);

  const { primary, styles, arousalPct, reactivityPct } = r;
  const { chartRef, downloadPoster } = usePosterDownload('淡人浓人气质图谱.png');

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="card text-center">
        <div className="text-7xl mb-4">{primary.emoji}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">你的气质鉴定结果</h1>
        <p className="text-3xl font-bold mb-2" style={{ color: primary.color }}>{primary.name}</p>
        <p className="text-lg text-gray-500 italic mb-3">"{primary.tagline}"</p>
        <p className="text-sm text-gray-400">{primary.personalityTraits}</p>
        <p className="text-xs text-gray-400 mt-3">报告生成时间：{new Date(r.timestamp).toLocaleString('zh-CN')}</p>
      </div>

      {/* Dual-Dimension Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="card text-center">
          <h3 className="font-bold text-gray-800 mb-2">⚡ 情绪唤醒度</h3>
          <p className="text-xs text-gray-500 mb-3">容易被外界刺激唤醒情绪的程度</p>
          <div className="text-4xl font-bold mb-2" style={{ color: arousalPct > 50 ? '#f56c6c' : '#7eb8a0' }}>
            {arousalPct}%
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${arousalPct}%`, backgroundColor: arousalPct > 50 ? '#f56c6c' : '#7eb8a0' }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {arousalPct <= 30 ? '低唤醒 — 你是"淡"的代表，心如止水' :
             arousalPct <= 50 ? '中低唤醒 — 多数时候淡定从容' :
             arousalPct <= 70 ? '中高唤醒 — 你容易被生活点燃' :
             '高唤醒 — 你是"浓"的化身，情绪雷达全天候开启'}
          </p>
        </div>
        <div className="card text-center">
          <h3 className="font-bold text-gray-800 mb-2">🔥 情绪反应性</h3>
          <p className="text-xs text-gray-500 mb-3">情绪被唤醒后的外显反应强度</p>
          <div className="text-4xl font-bold mb-2" style={{ color: reactivityPct > 50 ? '#f56c6c' : '#7eb8a0' }}>
            {reactivityPct}%
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${reactivityPct}%`, backgroundColor: reactivityPct > 50 ? '#f56c6c' : '#7eb8a0' }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {reactivityPct <= 30 ? '低反应 — 喜怒不形于色' :
             reactivityPct <= 50 ? '中低反应 — 情绪表达较为克制' :
             reactivityPct <= 70 ? '中高反应 — 情绪来了藏不住' :
             '高反应 — 所有情绪都是"高清无码"'}
          </p>
        </div>
      </div>

      {/* Scatter Quadrant Chart */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">双维度象限定位图</h2>
        <p className="text-sm text-gray-500 mb-3">
          你的位置由唤醒度（横轴）和反应性（纵轴）共同决定。四个象限对应四种气质类型。
        </p>
        <div style={{ height: 420 }}>
          <ReactECharts ref={chartRef} option={scatterOption(r)} style={{ height: '100%' }} />
        </div>
      </div>

      {/* Type Bar Chart */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">四种气质类型匹配度</h2>
        <div style={{ height: 300 }}>
          <ReactECharts option={barOption(r)} style={{ height: '100%' }} />
        </div>
      </div>

      {/* Primary Type Deep Dive */}
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
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-bold text-green-700 text-sm mb-2">💪 核心优势</h4>
            <ul className="text-sm space-y-1">
              {primary.strengths.map((s, i) => (
                <li key={i} className="text-green-800 flex items-start gap-1.5"><span className="text-green-500 mt-0.5">•</span> {s}</li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-bold text-amber-700 text-sm mb-2">⚠️ 成长课题</h4>
            <ul className="text-sm space-y-1">
              {primary.challenges.map((c, i) => (
                <li key={i} className="text-amber-800 flex items-start gap-1.5"><span className="text-amber-500 mt-0.5">•</span> {c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-bold text-blue-700 text-sm mb-2">💼 适合的职业方向</h4>
            <p className="text-sm text-blue-800">{primary.suitableCareers}</p>
          </div>
          <div className="bg-pink-50 rounded-lg p-4">
            <h4 className="font-bold text-pink-700 text-sm mb-2">💕 亲密关系风格</h4>
            <p className="text-sm text-pink-800">{primary.relationshipStyle}</p>
          </div>
        </div>
      </div>

      {/* Life Advice */}
      <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2">🌱 给你的生活建议</h3>
        <p className="text-sm text-purple-700 leading-relaxed">{primary.lifeAdvice}</p>
      </div>

      {/* All types overview */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800">全部气质类型一览</h2>
        {styles.map((s, idx) => (
          <div key={s.id} className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-3xl">{s.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold" style={{ color: s.color }}>#{idx + 1} {s.name}</h3>
                  <span className="font-bold text-sm" style={{ color: s.color }}>{s.percentage}%</span>
                  <span className="text-xs text-gray-400">{s.personalityTraits}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{s.description}</p>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.percentage}%`, backgroundColor: s.color }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="card bg-gray-50 border-dashed">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          淡人/浓人气质鉴定基于情绪唤醒与反应性双维度模型，旨在提供一个有趣的视角来了解自己的情绪风格。
          淡和浓没有好坏之分——淡人的平静是力量，浓人的热烈是天赋。每个人的气质都是独特的，既有天生倾向，也受环境和成长经历影响。
        </p>
      </div>

      {/* Actions */}
      <div className="text-center pb-10">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href={`${import.meta.env.BASE_URL}temperament`} className="btn-primary inline-block">重新测评</a>
          <button onClick={() => downloadMD(r)} className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">📥 下载MD报告</button>
          <button onClick={() => downloadPoster({
            title: '淡人/浓人气质图谱',
            subtitle: `${primary.emoji} ${primary.name} · ${primary.tagline}`,
            emoji: primary.emoji,
            highlights: styles.map(s => ({ label: s.name, value: `${s.percentage}%`, color: s.color })),
            footer: '自我探索平台 · bigfive-test',
            timestamp: new Date(r.timestamp).toLocaleString('zh-CN'),
          })} className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200">🎨 生成分享海报</button>
        </div>
      </div>
    </div>
  );
}

// ── Scatter / Quadrant chart ──
function scatterOption(r: TemperamentResult) {
  const { arousalPct, reactivityPct } = r;
  return {
    tooltip: {
      trigger: 'item',
      formatter: () => `你在这里<br/>唤醒度 ${arousalPct}% · 反应性 ${reactivityPct}%`,
      backgroundColor: '#fff',
      borderColor: '#e5e7eb',
      textStyle: { color: '#1f2937' },
    },
    grid: { left: 50, right: 30, top: 30, bottom: 50 },
    xAxis: {
      name: '情绪唤醒度 →',
      nameLocation: 'middle',
      nameGap: 35,
      nameTextStyle: { fontSize: 13, color: '#6b7280' },
      min: 0, max: 100,
      axisLabel: { formatter: '{value}%', color: '#9ca3af', fontSize: 10 },
      splitLine: { lineStyle: { color: '#f3f4f6' } },
      axisLine: { lineStyle: { color: '#d1d5db' } },
    },
    yAxis: {
      name: '情绪反应性 →',
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: { fontSize: 13, color: '#6b7280' },
      min: 0, max: 100,
      axisLabel: { formatter: '{value}%', color: '#9ca3af', fontSize: 10 },
      splitLine: { lineStyle: { color: '#f3f4f6' } },
      axisLine: { lineStyle: { color: '#d1d5db' } },
    },
    // Quadrant dividing lines
    series: [
      // Vertical line at x=50
      {
        type: 'line',
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { color: '#d1d5db', type: 'dashed', width: 1 },
          data: [{ xAxis: 50 }],
        },
        data: [],
      },
      // Horizontal line at y=50
      {
        type: 'line',
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { color: '#d1d5db', type: 'dashed', width: 1 },
          data: [{ yAxis: 50 }],
        },
        data: [],
      },
      // Quadrant labels
      {
        type: 'scatter',
        symbolSize: 0,
        data: [
          { value: [15, 15], label: { show: true, formatter: '🦦 纯血淡人', fontSize: 12, color: '#7eb8a0', position: 'inside' } },
          { value: [15, 85], label: { show: true, formatter: '🧊 外淡内浓', fontSize: 12, color: '#5b9bd5', position: 'inside' } },
          { value: [85, 85], label: { show: true, formatter: '🐿️ 超浓缩', fontSize: 12, color: '#f56c6c', position: 'inside' } },
          { value: [85, 15], label: { show: true, formatter: '混合型', fontSize: 12, color: '#9ca3af', position: 'inside' } },
        ],
      },
      // User's point
      {
        type: 'scatter',
        symbolSize: 20,
        itemStyle: { color: r.primary.color, shadowBlur: 10, shadowColor: r.primary.color },
        data: [{ value: [arousalPct, reactivityPct], name: '你' }],
        label: { show: true, formatter: '你', position: 'top', fontSize: 13, fontWeight: 'bold', color: r.primary.color },
      },
    ],
  };
}

// ── Bar chart ──
function barOption(r: TemperamentResult) {
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '10%', top: '3%', bottom: '3%', containLabel: true },
    xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%', color: '#6b7280' } },
    yAxis: {
      type: 'category',
      data: r.styles.map(s => `${s.emoji} ${s.name}`),
      axisLabel: { fontSize: 13, color: '#374151' },
      inverse: true,
    },
    series: [{
      type: 'bar',
      data: r.styles.map(s => ({ value: s.percentage, itemStyle: { color: s.color, borderRadius: [0, 6, 6, 0] } })),
      barWidth: 20,
      label: { show: true, position: 'right', formatter: '{c}%', color: '#6b7280' },
    }],
  };
}
