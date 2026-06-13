import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { AnimalResult } from '../lib/animalScoring';
import { generateAnimalMD, downloadMarkdown } from '../lib/markdownExport';
import { usePosterDownload } from './PosterDownload';

export default function AnimalResultsReport() {
  const [r, setR] = useState<AnimalResult | null>(null);
  useEffect(() => {
    const s = sessionStorage.getItem('animal_result');
    if (s) { try { const p = JSON.parse(s); if (p?.animals?.length) setR(p); } catch {} }
  }, []);
  if (!r) return (<div className="text-center py-20"><p className="text-gray-400 text-lg">未找到测评结果。</p><a href={`${import.meta.env.BASE_URL}animal`} className="btn-primary inline-block mt-4">去测评</a></div>);

  const { top, animals } = r;
  const { chartRef, downloadPoster } = usePosterDownload('性格动物雷达图.png');
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="card text-center">
        <div className="text-7xl mb-4">{top.emoji}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">你的精神动物</h1>
        <p className="text-4xl font-bold mb-2" style={{ color: top.color }}>{top.name}</p>
        <p className="text-lg text-gray-500 italic mb-3">"{top.tagline}"</p>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">{top.kinship}</p>
        <p className="text-xs text-gray-400 mt-3">报告生成时间：{new Date(r.timestamp).toLocaleString('zh-CN')}</p>
      </div>

      {/* Top Animal Deep Dive */}
      <div className="card" style={{ borderLeftColor: top.color, borderLeftWidth: '5px' }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{top.emoji}</span>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: top.color }}>{top.name}——{top.tagline}</h2>
            <p className="text-sm text-gray-400">匹配度 {top.percentage}%</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">{top.longDescription}</p>

        {/* Strengths & Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-bold text-green-700 text-sm mb-2">💪 核心优势</h4>
            <ul className="text-sm space-y-1">
              {top.strengths.map((s, i) => (
                <li key={i} className="text-green-800 flex items-start gap-1.5"><span className="text-green-500 mt-0.5">•</span> {s}</li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-bold text-amber-700 text-sm mb-2">⚠️ 成长课题</h4>
            <ul className="text-sm space-y-1">
              {top.challenges.map((c, i) => (
                <li key={i} className="text-amber-800 flex items-start gap-1.5"><span className="text-amber-500 mt-0.5">•</span> {c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Career & Relationships */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-bold text-blue-700 text-sm mb-2">💼 适合的职业方向</h4>
            <p className="text-sm text-blue-800">{top.suitableCareers}</p>
          </div>
          <div className="bg-pink-50 rounded-lg p-4">
            <h4 className="font-bold text-pink-700 text-sm mb-2">💕 亲密关系风格</h4>
            <p className="text-sm text-pink-800">{top.relationshipStyle}</p>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">8种动物完整匹配度</h2>
        <div style={{ height: 420 }}><ReactECharts ref={chartRef} option={barOption(r)} style={{ height: '100%' }} /></div>
      </div>

      {/* All Animals */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">全部动物解读</h2>
        {animals.map((a, idx) => (
          <div key={a.id} className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-4xl">{a.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold" style={{ color: a.color }}>#{idx + 1} {a.name} — {a.tagline}</h3>
                  <span className="font-bold text-sm" style={{ color: a.color }}>{a.percentage}%</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{a.longDescription.slice(0, 200)}...</p>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${a.percentage}%`, backgroundColor: a.color }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="card bg-gray-50 border-dashed">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          性格动物匹配是一种投射性人格测评，旨在提供一个有趣又富有洞察力的视角来了解自己。
          它不构成任何科学诊断或标签。每个人的性格都是独特的——你可能同时与多种动物有共鸣，
          这正是人格复杂性和丰富性的体现。
        </p>
      </div>

      <div className="text-center pb-10">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href={`${import.meta.env.BASE_URL}animal`} className="btn-primary inline-block">重新测评</a>
          <button
            onClick={() => downloadMarkdown(generateAnimalMD(r), '性格动物匹配报告.md')}
            className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            📥 下载MD报告
          </button>
          <button
            onClick={() => downloadPoster({
              title: '性格动物图谱',
              subtitle: `${top.emoji} ${top.name} · ${top.tagline}`,
              emoji: top.emoji,
              highlights: animals.slice(0, 5).map(a => ({
                label: a.name,
                value: `${a.percentage}%`,
                color: a.color,
              })),
              footer: '自我探索平台 · bigfive-test',
              timestamp: new Date(r.timestamp).toLocaleString('zh-CN'),
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
function barOption(r: AnimalResult) {
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '10%', top: '3%', bottom: '3%', containLabel: true },
    xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%', color: '#6b7280' } },
    yAxis: { type: 'category', data: r.animals.map(a => `${a.emoji} ${a.name}`), axisLabel: { fontSize: 13, color: '#374151' }, inverse: true },
    series: [{ type: 'bar', data: r.animals.map(a => ({ value: a.percentage, itemStyle: { color: a.color, borderRadius: [0, 6, 6, 0] } })), barWidth: 20, label: { show: true, position: 'right', formatter: '{c}%', color: '#6b7280' } }],
  };
}
