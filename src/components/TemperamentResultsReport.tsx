import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { TemperamentResult } from '../lib/temperamentScoring';
import { generateTemperamentMD, downloadMarkdown } from '../lib/markdownExport';
import { usePosterDownload } from './PosterDownload';

export default function TemperamentResultsReport() {
  const [result, setResult] = useState<TemperamentResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('temperament_result');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.types) && parsed.types.length > 0) {
          setResult(parsed);
        }
      } catch { /* ignore */ }
    }
  }, []);

  if (!result) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">未找到测评结果。</p>
        <a href={`${import.meta.env.BASE_URL}temperament`} className="btn-primary inline-block mt-4">去测评</a>
      </div>
    );
  }

  const { primary, types, arousal, reactivity } = result;
  const { chartRef, downloadPoster } = usePosterDownload('淡人浓人气质图谱.png');

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="card text-center">
        <div className="text-6xl mb-4">{primary.emoji}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">你的淡/浓气质鉴定报告</h1>
        <p className="text-3xl font-bold mb-2" style={{ color: primary.color }}>{primary.name}</p>
        <p className="text-lg text-gray-500 italic mb-3">「{primary.tagline}」</p>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">{primary.description}</p>
        {/* Dimension badges */}
        <div className="flex justify-center gap-4 mt-4">
          <div className="bg-gray-50 rounded-xl px-5 py-3">
            <p className="text-xs text-gray-400">情绪唤醒度</p>
            <p className="text-xl font-bold" style={{ color: arousal > 50 ? '#ef5350' : '#66bb6a' }}>
              {arousal}%
            </p>
            <p className="text-xs text-gray-400">{arousal > 50 ? '偏高·容易被激活' : '偏低·不易被扰动'}</p>
          </div>
          <div className="bg-gray-50 rounded-xl px-5 py-3">
            <p className="text-xs text-gray-400">情绪反应性</p>
            <p className="text-xl font-bold" style={{ color: reactivity > 50 ? '#ef5350' : '#66bb6a' }}>
              {reactivity}%
            </p>
            <p className="text-xs text-gray-400">{reactivity > 50 ? '偏高·表达强度大' : '偏低·内敛克制'}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          报告生成时间：{new Date(result.timestamp).toLocaleString('zh-CN')}
        </p>
      </div>

      {/* Quadrant Scatter Chart */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">双维度四象限定位</h2>
        <p className="text-sm text-gray-500 mb-3">
          横轴=情绪唤醒度（容易被激活← →不易被扰动），纵轴=情绪反应性（内敛克制← →强烈外显）。
          红点🔴是你的位置。
        </p>
        <div style={{ height: 420 }}>
          <ReactECharts ref={chartRef} option={buildQuadrantOption(result)} style={{ height: '100%' }} />
        </div>
      </div>

      {/* Type Bar Chart */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">四种气质类型匹配度</h2>
        <div style={{ height: 280 }}>
          <ReactECharts option={buildBarOption(result)} style={{ height: '100%' }} />
        </div>
      </div>

      {/* Primary Type Deep Dive */}
      <div className="card" style={{ borderLeftColor: primary.color, borderLeftWidth: '5px' }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{primary.emoji}</span>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: primary.color }}>{primary.name}——{primary.tagline}</h2>
            <p className="text-sm text-gray-400">匹配度 {primary.percentage}%</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">{primary.longDescription}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-bold text-green-700 text-sm mb-2">💪 核心优势</h4>
            <ul className="text-sm space-y-1">
              {primary.strengths.map((s: string, i: number) => (
                <li key={i} className="text-green-800 flex items-start gap-1.5"><span className="text-green-500 mt-0.5">•</span> {s}</li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-bold text-amber-700 text-sm mb-2">⚠️ 成长课题</h4>
            <ul className="text-sm space-y-1">
              {primary.challenges.map((c: string, i: number) => (
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

        <div className="mt-4 bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-700 text-sm mb-2">🧘 自我调节建议</h4>
          <p className="text-sm text-purple-800 leading-relaxed">{primary.selfRegulation}</p>
        </div>
      </div>

      {/* All Types Overview */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">全部气质类型解读</h2>
        {types.map((t, idx) => (
          <div key={t.id} className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-4xl">{t.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold" style={{ color: t.color }}>#{idx + 1} {t.name} — {t.tagline}</h3>
                  <span className="font-bold text-sm" style={{ color: t.color }}>{t.percentage}%</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{t.longDescription.slice(0, 200)}...</p>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${t.percentage}%`, backgroundColor: t.color }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="card bg-gray-50 border-dashed">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          淡人/浓人气质鉴定基于情绪唤醒与反应性双维度模型，旨在帮助你了解自己的情绪"出厂配置"。
          淡和浓没有好坏之分——每种气质都有独特的优势和挑战。了解自己的气质类型，
          不是为了"改变"自己，而是为了更好地"驾驭"自己的情绪系统。
        </p>
      </div>

      {/* Retake */}
      <div className="text-center pb-10">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href={`${import.meta.env.BASE_URL}temperament`} className="btn-primary inline-block">重新测评</a>
          <button
            onClick={() => downloadMarkdown(generateTemperamentMD(result), '淡人浓人气质鉴定报告.md')}
            className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            📥 下载MD报告
          </button>
          <button
            onClick={() => downloadPoster({
              title: '淡/浓气质图谱',
              subtitle: `${primary.emoji} ${primary.name} · 唤醒度${arousal}% 反应性${reactivity}%`,
              emoji: primary.emoji,
              highlights: types.map(t => ({
                label: t.name,
                value: `${t.percentage}%`,
                color: t.color,
              })),
              footer: '自我探索平台 · bigfive-test',
              timestamp: new Date(result.timestamp).toLocaleString('zh-CN'),
            })}
            className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
          >
            🎨 生成分享海报
          </button>
        </div>
      </div>
    </div>
  );
}

/** Quadrant scatter chart */
function buildQuadrantOption(r: TemperamentResult) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: { name: string; value: number[] }) =>
        `${params.name}<br/>唤醒度: ${params.value[0]}%<br/>反应性: ${params.value[1]}%`,
      backgroundColor: '#fff',
      borderColor: '#e5e7eb',
      textStyle: { color: '#1f2937' },
    },
    grid: { left: 50, right: 30, top: 30, bottom: 50 },
    xAxis: {
      name: '情绪唤醒度 →',
      nameLocation: 'center',
      nameGap: 35,
      nameTextStyle: { fontSize: 13, color: '#6b7280' },
      min: -5,
      max: 105,
      axisLabel: { formatter: '{value}%', color: '#9ca3af' },
      splitLine: { lineStyle: { color: '#f3f4f6', type: 'dashed' as const } },
      axisLine: { lineStyle: { color: '#d1d5db' } },
    },
    yAxis: {
      name: '情绪反应性 →',
      nameLocation: 'center',
      nameGap: 40,
      nameTextStyle: { fontSize: 13, color: '#6b7280' },
      min: -5,
      max: 105,
      axisLabel: { formatter: '{value}%', color: '#9ca3af' },
      splitLine: { lineStyle: { color: '#f3f4f6', type: 'dashed' as const } },
      axisLine: { lineStyle: { color: '#d1d5db' } },
    },
    series: [
      // Quadrant dividing lines (50%)
      {
        type: 'line',
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { color: '#e5e7eb', type: 'dashed' },
          data: [
            { xAxis: 50, label: { show: false } },
            { yAxis: 50, label: { show: false } },
          ],
        },
        data: [],
      },
      // User's dot
      {
        type: 'scatter',
        symbolSize: 18,
        data: [[r.arousal, r.reactivity]],
        itemStyle: { color: r.primary.color, shadowBlur: 10, shadowColor: r.primary.color },
        label: {
          show: true,
          formatter: '你在这里',
          position: 'top',
          distance: 12,
          fontSize: 13,
          fontWeight: 'bold',
          color: r.primary.color,
        },
        zlevel: 1,
      },
    ],
  };
}

/** Bar chart for 4 types */
function buildBarOption(r: TemperamentResult) {
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '10%', top: '3%', bottom: '3%', containLabel: true },
    xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%', color: '#6b7280', fontSize: 12 } },
    yAxis: {
      type: 'category',
      data: r.types.map(t => `${t.emoji} ${t.name}`),
      axisLabel: { fontSize: 12, fontWeight: 500, color: '#374151' },
      inverse: true,
    },
    series: [{
      type: 'bar',
      data: r.types.map(t => ({
        value: t.percentage,
        itemStyle: { color: t.color, borderRadius: [0, 6, 6, 0] },
      })),
      barWidth: 22,
      label: { show: true, position: 'right', formatter: '{c}%', color: '#6b7280', fontSize: 12 },
    }],
  };
}
