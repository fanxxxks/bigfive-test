import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { PersonalityResult } from '../lib/types';
import { generateReport } from '../lib/reportText';

export default function ShortResultsReport() {
  const [result, setResult] = useState<PersonalityResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('bigfive_short_result');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.domains) && parsed.domains.length > 0) {
          setResult(parsed);
        }
      } catch { /* ignore */ }
    }
  }, []);

  if (!result) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">未找到测评结果。</p>
        <a href={`${import.meta.env.BASE_URL}short`} className="btn-primary inline-block mt-4">去测评</a>
      </div>
    );
  }

  const report = generateReport(result);

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="card">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">⚡</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">您的大五人格报告（简洁版）</h1>
            <p className="text-xs text-gray-400">基于 IPIP-50 量表 · 约 5-8 分钟完成</p>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed">{report.summary}</p>
        <p className="text-xs text-gray-400 mt-3">
          报告生成时间：{new Date(result.timestamp).toLocaleString('zh-CN')}
          <span className="ml-2 text-yellow-600">⚠ 简洁版结果仅供参考，如需更精确结果请使用完整版（140题）</span>
        </p>
        <a href={`${import.meta.env.BASE_URL}quiz`} className="inline-block mt-3 text-sm text-primary-600 hover:text-primary-700 underline">
          前往完整版测评 →
        </a>
      </div>

      {/* Radar Chart */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">人格轮廓雷达图</h2>
        <div style={{ height: 400 }}>
          <ReactECharts option={buildRadarOption(result)} style={{ height: '100%' }} />
        </div>
      </div>

      {/* Percentile Bar Chart */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">百分位排名</h2>
        <p className="text-sm text-gray-500 mb-3">
          百分位表示您在人群中的相对位置——例如 75% 意味着您在此维度上高于 75% 的人群。
        </p>
        <div style={{ height: 280 }}>
          <ReactECharts option={buildBarOption(result)} style={{ height: '100%' }} />
        </div>
      </div>

      {/* Domain Cards */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">五大维度概览</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.domains.map(domain => (
            <div key={domain.key} className="card text-center">
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: domain.color }}
              >
                {domain.percentile}%
              </div>
              <h3 className="font-bold text-gray-800">{domain.name}</h3>
              <p className="text-xs text-gray-400 mb-2">{domain.label}</p>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                  domain.level === 'high'
                    ? 'bg-red-50 text-red-600'
                    : domain.level === 'low'
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {domain.level === 'high' ? '偏高' : domain.level === 'low' ? '偏低' : '中等'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Text Report */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">深度解读报告</h2>
        <div className="space-y-8">
          {report.domainBlocks.map((block, i) => (
            <div key={i}>
              <h3 className="font-bold text-lg mb-2">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: result.domains[i].color }}
                />
                {block.title}
                <span className="ml-2 text-sm font-normal text-gray-400">
                  — 百分位 {result.domains[i].percentile}%
                </span>
              </h3>
              <p className="text-gray-700 leading-relaxed">{block.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Career & Interpersonal & Stress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-3">💼 职场风格</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{report.career}</p>
        </div>
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-3">🤝 人际交往</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{report.interpersonal}</p>
        </div>
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-3">🧘 抗压能力</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{report.stress}</p>
        </div>
      </div>

      {/* Growth Suggestions */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🌱 成长建议</h2>
        <ul className="space-y-3">
          {report.growthSuggestions.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <span className="text-green-500 mt-0.5">▸</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Retake */}
      <div className="text-center pb-10 space-y-3">
        <a href={`${import.meta.env.BASE_URL}short`} className="btn-primary inline-block">重新测评（简洁版）</a>
        <br />
        <a href={`${import.meta.env.BASE_URL}quiz`} className="text-sm text-primary-600 hover:text-primary-700 underline">
          想要更精准的结果？试试完整版（140题）→
        </a>
      </div>
    </div>
  );
}

function buildRadarOption(result: PersonalityResult) {
  const domains = result.domains;
  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: { name: string; value: number }) =>
        `${params.name}: 百分位 ${params.value}%`,
      backgroundColor: '#fff',
      borderColor: '#e5e7eb',
      textStyle: { color: '#1f2937' },
    },
    legend: { show: false },
    radar: {
      center: ['50%', '55%'],
      radius: '70%',
      indicator: domains.map(d => ({ name: d.name, max: 100, color: '#6b7280' })),
      axisName: { fontSize: 13, fontWeight: 500 },
      splitArea: {
        areaStyle: { color: ['rgba(59,130,246,0.02)', 'rgba(59,130,246,0.02)'] },
      },
    },
    series: [{
      type: 'radar',
      data: [{
        value: domains.map(d => d.percentile),
        name: '您的人格轮廓',
        areaStyle: { color: 'rgba(59,130,246,0.2)' },
        lineStyle: { color: '#3b82f6', width: 2.5 },
        itemStyle: { color: '#3b82f6' },
        symbol: 'circle',
        symbolSize: 6,
      }],
    }],
  };
}

function buildBarOption(result: PersonalityResult) {
  const sorted = [...result.domains].sort((a, b) => b.percentile - a.percentile);
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: { name: string; value: number }[]) =>
        `${params[0].name}: 百分位 <strong>${params[0].value}%</strong>`,
      backgroundColor: '#fff',
      borderColor: '#e5e7eb',
      textStyle: { color: '#1f2937' },
    },
    grid: { left: '3%', right: '8%', top: '3%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'value', max: 100,
      axisLabel: { formatter: '{value}%', color: '#6b7280', fontSize: 12 },
      splitLine: { lineStyle: { color: '#f3f4f6' } },
    },
    yAxis: {
      type: 'category', data: sorted.map(d => d.name),
      axisLabel: { fontSize: 13, fontWeight: 500, color: '#374151' },
      axisLine: { show: false }, axisTick: { show: false },
    },
    series: [{
      type: 'bar',
      data: sorted.map(d => ({
        value: d.percentile,
        itemStyle: { color: d.color, borderRadius: [0, 6, 6, 0] },
      })),
      barWidth: 24,
      label: { show: true, position: 'right', formatter: '{c}%', color: '#6b7280', fontSize: 12 },
    }],
  };
}
