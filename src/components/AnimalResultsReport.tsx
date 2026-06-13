import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { AnimalResult } from '../lib/animalScoring';

export default function AnimalResultsReport() {
  const [r, setR] = useState<AnimalResult | null>(null);
  useEffect(() => {
    const s = sessionStorage.getItem('animal_result');
    if (s) { try { const p = JSON.parse(s); if (p?.animals?.length) setR(p); } catch {} }
  }, []);
  if (!r) return (<div className="text-center py-20"><p className="text-gray-400 text-lg">未找到测评结果。</p><a href={`${import.meta.env.BASE_URL}animal`} className="btn-primary inline-block mt-4">去测评</a></div>);

  const { top, animals } = r;
  return (
    <div className="space-y-8">
      <div className="card text-center">
        <div className="text-7xl mb-4">{top.emoji}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">你的精神动物</h1>
        <p className="text-4xl font-bold mb-2" style={{ color: top.color }}>{top.name}</p>
        <p className="text-lg text-gray-500 italic mb-3">"{top.tagline}"</p>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">{top.kinship}</p>
        <p className="text-xs text-gray-400 mt-3">报告生成时间：{new Date(r.timestamp).toLocaleString('zh-CN')}</p>
      </div>
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">8种动物完整匹配度</h2>
        <div style={{ height: 420 }}><ReactECharts option={barOption(r)} style={{ height: '100%' }} /></div>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">全部动物解读</h2>
        {animals.map((a, idx) => (
          <div key={a.id} className="card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-4xl">{a.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1"><h3 className="font-bold" style={{ color: a.color }}>#{idx + 1} {a.name}</h3><span className="font-bold text-sm" style={{ color: a.color }}>{a.percentage}%</span></div>
                <p className="text-sm text-gray-600 mb-2">{a.description}</p>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${a.percentage}%`, backgroundColor: a.color }} /></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center pb-10"><a href={`${import.meta.env.BASE_URL}animal`} className="btn-primary inline-block">重新测评</a></div>
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
