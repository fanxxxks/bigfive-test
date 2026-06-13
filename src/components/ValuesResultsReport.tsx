import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { ValuesResult } from '../lib/valuesScoring';
import { generateValuesMD, downloadMarkdown } from '../lib/markdownExport';

export default function ValuesResultsReport() {
  const [result, setResult] = useState<ValuesResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('values_result');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.values) && parsed.values.length > 0) {
          setResult(parsed);
        }
      } catch { /* ignore */ }
    }
  }, []);

  if (!result) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">未找到测评结果。</p>
        <a href={`${import.meta.env.BASE_URL}values`} className="btn-primary inline-block mt-4">去测评</a>
      </div>
    );
  }

  const top3 = result.values.slice(0, 3);
  const bottom3 = result.values.slice(-3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card text-center">
        <div className="text-5xl mb-4">{top3[0].emoji}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">您的核心价值观报告</h1>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
          您最核心的价值观是 <strong style={{ color: top3[0].color }}>{top3[0].name}</strong>。
          价值观是您做出重大选择时的内在指南针，了解自己的价值观有助于做出更符合内心的人生决策。
        </p>
        <p className="text-xs text-gray-400 mt-3">
          报告生成时间：{new Date(result.timestamp).toLocaleString('zh-CN')}
        </p>
      </div>

      {/* Top 3 Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {top3.map((val) => (
          <div key={val.id} className="card text-center" style={{ borderTopColor: val.color, borderTopWidth: '4px' }}>
            <div className="text-4xl mb-2">{val.emoji}</div>
            <div className="text-2xl font-bold mb-1" style={{ color: val.color }}>{val.name}</div>
            <div className="font-bold text-3xl mb-2" style={{ color: val.color }}>{val.percentage}%</div>
            <p className="text-sm text-gray-500 italic mb-3">"{val.motto}"</p>
            <p className="text-xs text-gray-600 leading-relaxed">{val.description}</p>
          </div>
        ))}
      </div>

      {/* Full Bar Chart */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">10种价值观完整排序</h2>
        <p className="text-sm text-gray-500 mb-4">基于 Schwartz 的10种基本价值观理论</p>
        <div style={{ height: 400 }}>
          <ReactECharts option={buildBarOption(result)} style={{ height: '100%' }} />
        </div>
      </div>

      {/* All Values Detail */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">全部价值观深度解读</h2>
        {result.values.map((val, idx) => (
          <div key={val.id} className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-3xl">{val.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold" style={{ color: val.color }}>
                    #{idx + 1} {val.name}
                  </h3>
                  <span className="font-bold text-sm" style={{ color: val.color }}>{val.percentage}%</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{val.longDescription}</p>
                <div className="bg-gray-50 rounded-lg p-3 mb-2">
                  <p className="text-xs text-gray-500"><strong>🏠 在你的生活中：</strong>{val.lifeExample}</p>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${val.percentage}%`, backgroundColor: val.color }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Value Compatibility & Conflict */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-3">🔄 价值观的协同与张力</h2>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          您的核心价值观并非孤立存在——它们之间存在着相互促进和相互制约的关系。
          了解这些动态，可以帮助您理解内心的某些矛盾感——它们通常不是你的"问题"，而是价值观之间自然的张力。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-bold text-green-700 text-sm mb-2">🤝 价值观协同</h4>
            <div className="text-sm text-green-800 space-y-2">
              {top3.map(v => (
                <p key={v.id}><strong>{v.emoji} {v.name}：</strong>{v.compatibleWith.join('；')}</p>
              ))}
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-bold text-orange-700 text-sm mb-2">⚡ 可能的价值观张力</h4>
            <div className="text-sm text-orange-800 space-y-2">
              {top3.map(v => (
                <p key={v.id}><strong>{v.emoji} {v.name}：</strong>{v.mayConflictWith.join('；')}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shadow Values */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-3">🌓 你的"影子价值观"</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          排在后三位的价值观——<strong>{bottom3.map(v => v.name).join('、')}</strong>——虽然在你的价值体系中优先级较低，
          但它们同样值得关注。当你与高度重视这些价值观的人发生分歧时，理解"这不是对错问题，而是优先级差异"会让沟通更加顺畅。
          有时候，我们在最不重视的价值观中反而能找到成长的机会——它们代表了我们可能忽略的视角和维度。
        </p>
      </div>

      {/* Application */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-3">💡 价值观与生活应用</h2>
        <div className="text-sm text-gray-700 leading-relaxed space-y-3">
          <p>您的核心价值观排序中，<strong>{top3.map(v => v.name).join('、')}</strong> 排在前列——它们揭示了你最看重的生命方向。</p>
          <p>当面临重要决策（职业选择、关系取舍、生活方式转变）时，尝试问自己："这个选择是否与我最核心的价值观一致？"如果不一致，即使短期内有利可图，长期来看可能让你感到空虚。</p>
          <p>同时请注意：没有哪种价值观组合是"正确"的。每个人的价值观都独一无二，反映了你的成长经历、性格特质和人生追求。了解自己的核心价值观不是给自己贴标签，而是给未来的每一个重要选择提供一个可靠的参考系。</p>
        </div>
      </div>

      <div className="text-center pb-10">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href={`${import.meta.env.BASE_URL}values`} className="btn-primary inline-block">重新测评</a>
          <button
            onClick={() => downloadMarkdown(generateValuesMD(result), '核心价值观测评报告.md')}
            className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            📥 下载MD报告
          </button>
        </div>
      </div>
    </div>
  );
}

function buildBarOption(result: ValuesResult) {
  const values = result.values;
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: { name: string; value: number }[]) =>
        `${params[0].name}: <strong>${params[0].value}%</strong>`,
      backgroundColor: '#fff',
      borderColor: '#e5e7eb',
      textStyle: { color: '#1f2937' },
    },
    grid: { left: '3%', right: '10%', top: '3%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'value', max: 100,
      axisLabel: { formatter: '{value}%', color: '#6b7280', fontSize: 11 },
      splitLine: { lineStyle: { color: '#f3f4f6' } },
    },
    yAxis: {
      type: 'category',
      data: values.map(v => `${v.emoji} ${v.name}`),
      axisLabel: { fontSize: 13, fontWeight: 500, color: '#374151' },
      axisLine: { show: false }, axisTick: { show: false },
      inverse: true,
    },
    series: [{
      type: 'bar',
      data: values.map(v => ({
        value: v.percentage,
        itemStyle: { color: v.color, borderRadius: [0, 6, 6, 0] },
      })),
      barWidth: 20,
      label: { show: true, position: 'right', formatter: '{c}%', color: '#6b7280', fontSize: 11 },
    }],
  };
}
