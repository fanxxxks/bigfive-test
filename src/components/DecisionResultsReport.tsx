import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { DecisionResult } from '../lib/decisionScoring';
import { generateDecisionMD, downloadMarkdown } from '../lib/markdownExport';

export default function DecisionResultsReport() {
  const [result, setResult] = useState<DecisionResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('decision_result');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.styles) && parsed.styles.length > 0) {
          setResult(parsed);
        }
      } catch { /* ignore */ }
    }
  }, []);

  if (!result) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">未找到测评结果。</p>
        <a href={`${import.meta.env.BASE_URL}decision`} className="btn-primary inline-block mt-4">去测评</a>
      </div>
    );
  }

  const { primary, styles } = result;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card text-center">
        <div className="text-5xl mb-4">{primary.emoji}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">您的决策风格报告</h1>
        <p className="text-xl font-bold mb-2" style={{ color: primary.color }}>{primary.name}</p>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">{primary.description}</p>
        <p className="text-xs text-gray-400 mt-3">
          报告生成时间：{new Date(result.timestamp).toLocaleString('zh-CN')}
        </p>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="card border-t-4 border-green-400">
          <h3 className="font-bold text-green-700 mb-3">✅ 你的决策优势</h3>
          <ul className="space-y-2">
            {primary.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">•</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="card border-t-4 border-orange-400">
          <h3 className="font-bold text-orange-700 mb-3">⚠️ 需要注意的方面</h3>
          <ul className="space-y-2">
            {primary.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-orange-500 mt-0.5">•</span> {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tip */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">💡 改善建议</h3>
        <p className="text-sm text-blue-700 leading-relaxed">{primary.tip}</p>
      </div>

      {/* Bar Chart */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">4种决策风格完整排序</h2>
        <div style={{ height: 300 }}>
          <ReactECharts option={buildBarOption(result)} style={{ height: '100%' }} />
        </div>
      </div>

      {/* All Styles Detail */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">全部风格解读</h2>
        {styles.map((style, idx) => (
          <div key={style.id} className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-3xl">{style.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold" style={{ color: style.color }}>
                    #{idx + 1} {style.name}
                  </h3>
                  <span className="font-bold text-sm" style={{ color: style.color }}>{style.percentage}%</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{style.description}</p>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${style.percentage}%`, backgroundColor: style.color }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pb-10">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href={`${import.meta.env.BASE_URL}decision`} className="btn-primary inline-block">重新测评</a>
          <button
            onClick={() => downloadMarkdown(generateDecisionMD(result), '决策风格测评报告.md')}
            className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            📥 下载MD报告
          </button>
        </div>
      </div>
    </div>
  );
}

function buildBarOption(result: DecisionResult) {
  const styles = result.styles;
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '10%', top: '3%', bottom: '3%', containLabel: true },
    xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%', color: '#6b7280' } },
    yAxis: {
      type: 'category',
      data: styles.map(s => `${s.emoji} ${s.name}`),
      axisLabel: { fontSize: 13, color: '#374151' },
      inverse: true,
    },
    series: [{
      type: 'bar',
      data: styles.map(s => ({ value: s.percentage, itemStyle: { color: s.color, borderRadius: [0, 6, 6, 0] } })),
      barWidth: 20,
      label: { show: true, position: 'right', formatter: '{c}%', color: '#6b7280' },
    }],
  };
}
