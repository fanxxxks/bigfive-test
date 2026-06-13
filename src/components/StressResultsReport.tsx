import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { StressResult } from '../lib/stressScoring';

export default function StressResultsReport() {
  const [result, setResult] = useState<StressResult | null>(null);
  useEffect(() => {
    const s = sessionStorage.getItem('stress_result');
    if (s) { try { const p = JSON.parse(s); if (p?.styles?.length) setResult(p); } catch {} }
  }, []);
  if (!result) return (<div className="text-center py-20"><p className="text-gray-400 text-lg">未找到测评结果。</p><a href={`${import.meta.env.BASE_URL}stress`} className="btn-primary inline-block mt-4">去测评</a></div>);

  const { primary, styles } = result;
  return (
    <div className="space-y-8">
      <div className="card text-center">
        <div className="text-5xl mb-4">{primary.emoji}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">您的压力应对风格报告</h1>
        <p className="text-xl font-bold mb-2" style={{ color: primary.color }}>{primary.name}</p>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">{primary.description}</p>
        <p className="text-xs text-gray-400 mt-3">报告生成时间：{new Date(result.timestamp).toLocaleString('zh-CN')}</p>
      </div>
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">💡 改善建议</h3>
        <p className="text-sm text-blue-700 leading-relaxed">{primary.tip}</p>
      </div>
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">4种应对方式完整排序</h2>
        <div style={{ height: 300 }}>
          <ReactECharts option={buildBarOption(result)} style={{ height: '100%' }} />
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">全部应对方式解读</h2>
        {styles.map((s, idx) => (
          <div key={s.id} className="card"><div className="flex items-start gap-4">
            <div className="flex-shrink-0 text-3xl">{s.emoji}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1"><h3 className="font-bold" style={{ color: s.color }}>#{idx + 1} {s.name}</h3><span className="font-bold text-sm" style={{ color: s.color }}>{s.percentage}%</span></div>
              <p className="text-sm text-gray-600 mb-2">{s.description}</p>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${s.percentage}%`, backgroundColor: s.color }} /></div>
            </div>
          </div></div>
        ))}
      </div>
      <div className="text-center pb-10"><a href={`${import.meta.env.BASE_URL}stress`} className="btn-primary inline-block">重新测评</a></div>
    </div>
  );
}

function buildBarOption(r: StressResult) {
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '10%', top: '3%', bottom: '3%', containLabel: true },
    xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%', color: '#6b7280' } },
    yAxis: { type: 'category', data: r.styles.map(s => `${s.emoji} ${s.name}`), axisLabel: { fontSize: 13, color: '#374151' }, inverse: true },
    series: [{ type: 'bar', data: r.styles.map(s => ({ value: s.percentage, itemStyle: { color: s.color, borderRadius: [0, 6, 6, 0] } })), barWidth: 20, label: { show: true, position: 'right', formatter: '{c}%', color: '#6b7280' } }],
  };
}
