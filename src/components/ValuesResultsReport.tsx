import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { ValuesResult } from '../lib/valuesScoring';

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
        <h2 className="text-lg font-bold text-gray-800">全部价值观解读</h2>
        {result.values.map((val, idx) => (
          <div key={val.id} className="card">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 text-3xl">{val.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold" style={{ color: val.color }}>
                    #{idx + 1} {val.name}
                  </h3>
                  <span className="font-bold text-sm" style={{ color: val.color }}>{val.percentage}%</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{val.description}</p>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${val.percentage}%`, backgroundColor: val.color }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-3">💡 价值观与生活应用</h2>
        <div className="text-sm text-gray-700 leading-relaxed space-y-3">
          <p>您的核心价值观排序中，<strong>{top3.map(v => v.name).join('、')}</strong> 排在前列——它们揭示了你最看重的生命方向。</p>
          <p>当面临重要决策（职业选择、关系取舍、生活方式转变）时，尝试问自己："这个选择是否与我最核心的价值观一致？"如果不一致，即使短期内有利可图，长期来看可能让你感到空虚。</p>
          <p>同时请注意：没有哪种价值观组合是"正确"的。每个人的价值观都独一无二，反映了你的成长经历、性格特质和人生追求。</p>
        </div>
      </div>

      <div className="text-center pb-10">
        <a href={`${import.meta.env.BASE_URL}values`} className="btn-primary inline-block">重新测评</a>
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
