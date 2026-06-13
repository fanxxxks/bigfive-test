import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EQResult, EQLevelMeta } from '../data/eqData';
import { eqLevels } from '../data/eqData';
import { generateEQMD, downloadMarkdown } from '../lib/markdownExport';
import { usePosterDownload } from './PosterDownload';

export default function EQResultsReport() {
  const [r, setR] = useState<EQResult | null>(null);
  useEffect(() => {
    const s = sessionStorage.getItem('eq_result');
    if (s) { try { const p = JSON.parse(s); if (p?.dimensions?.length) setR(p); } catch {} }
  }, []);
  if (!r) return (<div className="text-center py-20"><p className="text-gray-400 text-lg">未找到测评结果。</p><a href={`${import.meta.env.BASE_URL}eq`} className="btn-primary inline-block mt-4">去测评</a></div>);

  const levelMeta: EQLevelMeta | undefined = eqLevels.find(l => l.level === r.level);
  const { chartRef, downloadPoster } = usePosterDownload('情商EQ雷达图.png');

  return (<div className="space-y-8">
    {/* Header */}
    <div className="card text-center">
      <div className="text-5xl mb-4">{r.levelEmoji}</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">您的情商EQ报告</h1>
      <div className="text-4xl font-bold text-primary-600 mb-2">{r.totalScore}</div>
      <p className="text-lg text-gray-600 mb-2">{r.level} · EQ综合得分</p>
      <p className="text-sm text-gray-500 max-w-md mx-auto">基于Goleman情商模型的5维度综合评估</p>
      <p className="text-xs text-gray-400 mt-3">报告生成时间：{new Date(r.timestamp).toLocaleString('zh-CN')}</p>
    </div>

    {/* Level Interpretation */}
    {levelMeta && (
      <div className="card border-l-4 border-primary-500">
        <h2 className="text-xl font-bold text-gray-900 mb-3">{levelMeta.title}</h2>
        <p className="text-gray-700 leading-relaxed mb-4">{levelMeta.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-bold text-green-700 text-sm mb-2">✅ 你的优势</h3>
            <ul className="text-sm space-y-1.5">
              {levelMeta.strengths.map((s, i) => (
                <li key={i} className="text-green-800 flex items-start gap-2"><span className="text-green-500">•</span> {s}</li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-bold text-blue-700 text-sm mb-2">🌱 成长方向</h3>
            <ul className="text-sm space-y-1.5">
              {levelMeta.growthAreas.map((g, i) => (
                <li key={i} className="text-blue-800 flex items-start gap-2"><span className="text-blue-500">•</span> {g}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )}

    {/* Radar Chart */}
    <div className="card">
      <h2 className="text-lg font-bold text-gray-800 mb-4">5维度能力雷达图</h2>
      <div style={{ height: 380 }}><ReactECharts ref={chartRef} option={radarOpt(r)} style={{ height: '100%' }} /></div>
    </div>

    {/* Dimensions Detail */}
    <div className="card">
      <h2 className="text-lg font-bold text-gray-800 mb-4">各维度深度分析</h2>
      <div className="space-y-6">
        {r.dimensions.map(d => {
          const level = d.percentage >= 70 ? 'high' : d.percentage >= 40 ? 'moderate' : 'low';
          const interp = level === 'high' ? d.highInterpretation : level === 'moderate' ? d.moderateInterpretation : d.lowInterpretation;
          return (
            <div key={d.id} className="border border-gray-100 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{d.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg">{d.name}</span>
                    <span className="text-sm font-bold ml-auto" style={{ color: d.color }}>{d.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${d.percentage}%`, backgroundColor: d.color }} />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{d.longDescription}</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{interp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Improvement Suggestions */}
    <div className="card bg-blue-50 border-blue-200">
      <h3 className="font-bold text-blue-800 mb-2">💡 情商提升建议</h3>
      <div className="text-sm text-blue-700 leading-relaxed space-y-2">
        {suggestions(r).map((s, i) => (<p key={i} className="flex items-start gap-2"><span className="text-blue-400">•</span> {s}</p>))}
      </div>
    </div>

    <div className="text-center pb-10">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <a href={`${import.meta.env.BASE_URL}eq`} className="btn-primary inline-block">重新测评</a>
        <button
          onClick={() => downloadMarkdown(generateEQMD(r), '情商EQ测评报告.md')}
          className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          📥 下载MD报告
        </button>
        <button
          onClick={() => downloadPoster({
            title: '情商EQ雷达图',
            subtitle: `综合得分 ${r.totalScore} · ${r.level}`,
            emoji: r.levelEmoji,
            highlights: r.dimensions.map(d => ({
              label: d.name,
              value: `${d.percentage}%`,
              color: d.color,
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

  // Dynamic suggestion map based on actual dimension IDs from the result
  const suggestionMap: Record<string, string> = {};
  for (const d of r.dimensions) {
    // Generate suggestions based on dimension characteristics rather than hardcoded IDs
    const name = d.name;
    if (d.id.includes('aware') || name.includes('觉察') || name.includes('自知')) {
      suggestionMap[d.id] = '每天花5分钟记录你的情绪和触发因素，坚持两周就能显著提升自我觉察能力。';
    } else if (d.id.includes('regulat') || name.includes('调节') || name.includes('管理')) {
      suggestionMap[d.id] = '尝试"暂停6秒"法则——在情绪激动时先深呼吸6秒再回应，这个简单的习惯能改变很多。';
    } else if (d.id.includes('empath') || name.includes('同理') || name.includes('共情')) {
      suggestionMap[d.id] = '在对话中练习"先复述再回应"：用自己的话复述对方的感受，确认理解后再给出你的看法。';
    } else if (d.id.includes('social') || name.includes('社交') || name.includes('人际')) {
      suggestionMap[d.id] = '从小范围开始练习社交：每周主动和一个不太熟的人聊5分钟，慢慢扩大你的社交舒适区。';
    } else if (d.id.includes('motiv') || name.includes('动机') || name.includes('驱动')) {
      suggestionMap[d.id] = '为自己设立具体的、可衡量的小目标（而非模糊的"努力"），每完成一个就给自己一个小奖励。';
    }
  }

  for (const d of weak) {
    const tip = suggestionMap[d.id];
    if (tip) {
      tips.push(tip);
    }
  }
  if (tips.length === 0) tips.push('你的情商各方面都比较均衡，继续保持并寻求在优势维度上的精进。');
  tips.push('📚 推荐阅读：Daniel Goleman《情商》——了解情商的科学基础和系统提升方法。');
  return tips;
}
