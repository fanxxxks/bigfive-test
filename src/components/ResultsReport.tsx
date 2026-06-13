import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { PersonalityResult, DomainScore } from '../lib/types';
import { generateReport } from '../lib/reportText';

export default function ResultsReport() {
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [showFacets, setShowFacets] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('bigfive_result');
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  if (!result) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">未找到测评结果。</p>
        <a href="/quiz" className="btn-primary inline-block mt-4">去测评</a>
      </div>
    );
  }

  const report = generateReport(result);
  const consistency = result.consistencyCheck;

  return (
    <div className="space-y-8">
      {/* Consistency Warning */}
      {!consistency.passed && (
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-5 flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-bold text-yellow-800 mb-1">数据可信度提醒</h3>
            <p className="text-sm text-yellow-700">{consistency.message}</p>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">您的大五人格报告</h1>
        <p className="text-gray-600 leading-relaxed">{report.summary}</p>
        <p className="text-xs text-gray-400 mt-3">
          报告生成时间：{new Date(result.timestamp).toLocaleString('zh-CN')}
          {consistency.passed && consistency.inconsistentPairs === 0
            ? ' · 一致性检验：优秀 ✓'
            : consistency.passed
              ? ' · 一致性检验：通过 ✓'
              : ' · 一致性检验：未通过'}
        </p>
      </div>

      {/* Radar Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">人格轮廓雷达图</h2>
          <button
            onClick={() => setShowFacets(!showFacets)}
            className="text-xs text-primary-600 hover:text-primary-700 underline underline-offset-2"
          >
            {showFacets ? '仅显示五大维度' : '显示 30 子维度'}
          </button>
        </div>
        <div className="w-full" style={{ height: showFacets ? 550 : 400 }}>
          <ReactECharts option={buildRadarOption(result, showFacets)} style={{ height: '100%' }} />
        </div>
      </div>

      {/* Percentile Bar Chart */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">百分位排名</h2>
        <p className="text-sm text-gray-500 mb-3">
          百分位表示您在人群中的相对位置——例如 75% 意味着您在此维度上高于 75% 的人群。
        </p>
        <div style={{ height: 300 }}>
          <ReactECharts option={buildBarOption(result)} style={{ height: '100%' }} />
        </div>
      </div>

      {/* Domain Cards */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">维度详细拆解</h2>
        <div className="space-y-6">
          {result.domains.map((domain) => (
            <DomainCard key={domain.key} domain={domain} />
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
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>💼</span> 职场风格
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">{report.career}</p>
        </div>
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🤝</span> 人际交往
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">{report.interpersonal}</p>
        </div>
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🧘</span> 抗压能力
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">{report.stress}</p>
        </div>
      </div>

      {/* Football Position Analysis */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span>⚽</span> 足球场上的你
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          基于您的大五人格特质，分析您在足球场上最适合踢什么位置。
          这并非专业球探评估，而是一个有趣的性格视角解读。
        </p>

        {/* Football pitch visualization */}
        <div className="relative w-full aspect-[3/4] sm:aspect-[7/4] max-w-2xl mx-auto mb-8 bg-green-700 rounded-xl overflow-hidden border-4 border-white shadow-inner">
          {/* Pitch markings */}
          <div className="absolute inset-0">
            {/* Grass pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-600 via-green-700 to-green-600" />
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/60 -translate-x-1/2" />
            {/* Center circle */}
            <div className="absolute left-1/2 top-1/2 w-1/5 aspect-square border-2 border-white/60 rounded-full -translate-x-1/2 -translate-y-1/2" />
            {/* Center dot */}
            <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-white/80 rounded-full -translate-x-1/2 -translate-y-1/2" />
            {/* Penalty areas */}
            <div className="absolute left-0 top-[15%] bottom-[15%] w-[18%] border-2 border-white/60 border-l-0" />
            <div className="absolute right-0 top-[15%] bottom-[15%] w-[18%] border-2 border-white/60 border-r-0" />
            {/* Goal areas */}
            <div className="absolute left-0 top-[30%] bottom-[30%] w-[8%] border-2 border-white/60 border-l-0" />
            <div className="absolute right-0 top-[30%] bottom-[30%] w-[8%] border-2 border-white/60 border-r-0" />
          </div>

          {/* Position markers for top 3 matches */}
          {report.football.map((match, idx) => {
            const pos = getPitchPosition(match.position.id);
            const sizeClass = idx === 0 ? 'w-8 h-8 text-sm' : idx === 1 ? 'w-7 h-7 text-xs' : 'w-6 h-6 text-xs';
            const colors = ['bg-yellow-400 ring-yellow-300', 'bg-blue-400 ring-blue-300', 'bg-orange-400 ring-orange-300'];
            return (
              <div
                key={match.position.id}
                className={`absolute ${sizeClass} ${colors[idx]} rounded-full ring-4 flex items-center justify-center font-bold text-white shadow-lg z-10 transform -translate-x-1/2 -translate-y-1/2`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                title={`${match.rank}. ${match.position.emoji} ${match.position.name} — ${match.score}%`}
              >
                {idx + 1}
              </div>
            );
          })}
        </div>

        {/* Top 3 position cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {report.football.map((match) => (
            <div
              key={match.position.id}
              className="bg-gray-50 rounded-xl p-5 border-2 border-transparent hover:border-green-300 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{match.position.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900">
                    <span className="text-xs text-gray-400 mr-1">#{match.rank}</span>
                    {match.position.name}
                  </h3>
                  <p className="text-xs text-gray-400">{match.position.label}</p>
                </div>
              </div>

              {/* Fit score bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">适配度</span>
                  <span className="font-bold text-green-600">{match.score}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-700"
                    style={{ width: `${match.score}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                {match.position.description}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {match.interpretation}
              </p>
            </div>
          ))}
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
      <div className="text-center pb-10">
        <a href="/quiz" className="btn-primary inline-block">
          重新测评
        </a>
        <p className="text-xs text-gray-400 mt-2">
          提示：人格具有一定的稳定性，短期内多次测评结果应大致相似。
        </p>
      </div>

      {/* Print styles handled by global CSS */}
    </div>
  );
}

function DomainCard({ domain }: { domain: DomainScore }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg" style={{ color: domain.color }}>
          {domain.name} <span className="text-xs text-gray-400 font-normal">{domain.label}</span>
        </h3>
        <span className="text-sm font-bold" style={{ color: domain.color }}>
          {domain.percentile}%
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{domain.interpretation}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {domain.facets.map(facet => (
          <div key={facet.name} className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-700">{facet.label}</span>
              <span className="text-xs text-gray-400">{facet.percentile}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${facet.percentile}%`,
                  backgroundColor: domain.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function buildRadarOption(result: PersonalityResult, showFacets: boolean) {
  const domains = result.domains;

  if (!showFacets) {
    // 5-domain radar
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
        indicator: domains.map(d => ({
          name: d.name,
          max: 100,
          color: '#6b7280',
        })),
        axisName: { fontSize: 13, fontWeight: 500 },
        splitArea: {
          areaStyle: {
            color: ['rgba(59,130,246,0.02)', 'rgba(59,130,246,0.02)'],
          },
        },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: domains.map(d => d.percentile),
              name: '您的人格轮廓',
              areaStyle: {
                color: 'rgba(59,130,246,0.2)',
              },
              lineStyle: {
                color: '#3b82f6',
                width: 2.5,
              },
              itemStyle: {
                color: '#3b82f6',
              },
              symbol: 'circle',
              symbolSize: 6,
            },
          ],
        },
      ],
    };
  }

  // 30-facet radar
  const allFacets = domains.flatMap(d => d.facets);
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
      radius: '75%',
      indicator: allFacets.map(f => ({
        name: f.label,
        max: 100,
        color: '#6b7280',
      })),
      axisName: { fontSize: 10, fontWeight: 400 },
      splitArea: {
        areaStyle: {
          color: ['rgba(59,130,246,0.02)', 'rgba(59,130,246,0.02)'],
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: allFacets.map(f => f.percentile),
            name: '子维度',
            areaStyle: {
              color: 'rgba(59,130,246,0.15)',
            },
            lineStyle: {
              color: '#3b82f6',
              width: 1.5,
            },
            itemStyle: {
              color: '#3b82f6',
            },
            symbol: 'circle',
            symbolSize: 4,
          },
        ],
      },
    ],
  };
}

/**
 * Map position ID to pitch coordinates (x%, y%) for the football field SVG.
 * The pitch is oriented horizontally (left = opponent goal, right = own goal).
 */
function getPitchPosition(posId: string): { x: number; y: number } {
  const map: Record<string, { x: number; y: number }> = {
    GK:  { x: 5,  y: 50 },  // goalkeeper - near own goal
    CB:  { x: 20, y: 40 },  // center back
    FB:  { x: 22, y: 75 },  // full back - wide
    CDM: { x: 35, y: 50 },  // defensive midfielder
    CM:  { x: 50, y: 50 },  // center midfielder
    CAM: { x: 65, y: 45 },  // attacking midfielder
    WG:  { x: 72, y: 80 },  // winger - wide & forward
    ST:  { x: 85, y: 50 },  // striker
    SW:  { x: 15, y: 50 },  // sweeper
  };
  return map[posId] || { x: 50, y: 50 };
}

function buildBarOption(result: PersonalityResult) {
  const domains = result.domains;
  const sorted = [...domains].sort((a, b) => b.percentile - a.percentile);

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
    grid: {
      left: '3%',
      right: '8%',
      top: '3%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: { formatter: '{value}%', color: '#6b7280', fontSize: 12 },
      splitLine: { lineStyle: { color: '#f3f4f6' } },
    },
    yAxis: {
      type: 'category',
      data: sorted.map(d => d.name),
      axisLabel: {
        fontSize: 13,
        fontWeight: 500,
        color: '#374151',
      },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: sorted.map(d => ({
          value: d.percentile,
          itemStyle: {
            color: d.color,
            borderRadius: [0, 6, 6, 0],
          },
        })),
        barWidth: 24,
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          color: '#6b7280',
          fontSize: 12,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.15)',
          },
        },
      },
    ],
  };
}
