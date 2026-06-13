import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { AttachmentResult } from '../lib/attachmentScoring';
import { attachmentStyles } from '../data/attachmentData';
import { generateAttachmentMD, downloadMarkdown } from '../lib/markdownExport';

export default function AttachmentResultsReport() {
  const [result, setResult] = useState<AttachmentResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('attachment_result');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.anxiety === 'number' && typeof parsed.avoidance === 'number' && parsed.style) {
          setResult(parsed);
        }
      } catch { /* ignore */ }
    }
  }, []);

  if (!result) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">未找到测评结果。</p>
        <a href={`${import.meta.env.BASE_URL}attachment`} className="btn-primary inline-block mt-4">去测评</a>
      </div>
    );
  }

  const { style, anxiety, avoidance, stylePercentages } = result;
  const allStyles = Object.values(attachmentStyles);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card text-center">
        <div className="text-5xl mb-4">{style.emoji}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">您的依恋风格报告</h1>
        <p className="text-xl font-bold" style={{ color: style.color }}>
          您的主导风格：{style.name}
        </p>
        <p className="text-xs text-gray-400 mt-3">
          报告生成时间：{new Date(result.timestamp).toLocaleString('zh-CN')}
        </p>
      </div>

      {/* Two Dimensions Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="card text-center">
          <h3 className="font-bold text-gray-800 mb-2">😰 焦虑维度</h3>
          <p className="text-xs text-gray-500 mb-3">害怕被抛弃、需要反复确认的程度</p>
          <div className="text-4xl font-bold mb-2" style={{ color: anxiety > 50 ? '#ff9800' : '#4caf50' }}>
            {anxiety}%
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${anxiety}%`,
                backgroundColor: anxiety > 50 ? '#ff9800' : '#4caf50',
              }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {anxiety <= 30 ? '低焦虑 — 你对自己的关系有较高的安全感' :
             anxiety <= 50 ? '中等偏低 — 大多数时候你是安心的' :
             anxiety <= 70 ? '中等偏高 — 你有时会担心关系的稳定性' :
             '高焦虑 — 你常常为关系感到担忧'}
          </p>
        </div>
        <div className="card text-center">
          <h3 className="font-bold text-gray-800 mb-2">🛡️ 回避维度</h3>
          <p className="text-xs text-gray-500 mb-3">对亲密感到不适、保持情感距离的程度</p>
          <div className="text-4xl font-bold mb-2" style={{ color: avoidance > 50 ? '#2196f3' : '#4caf50' }}>
            {avoidance}%
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${avoidance}%`,
                backgroundColor: avoidance > 50 ? '#2196f3' : '#4caf50',
              }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {avoidance <= 30 ? '低回避 — 你愿意与他人亲近和分享' :
             avoidance <= 50 ? '中等偏低 — 你基本能享受亲密关系' :
             avoidance <= 70 ? '中等偏高 — 你有时需要保持情感距离' :
             '高回避 — 亲密关系对你来说是个挑战'}
          </p>
        </div>
      </div>

      {/* 4-Style Comparison */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">四种依恋风格匹配度</h2>
        <div style={{ height: 320 }}>
          <ReactECharts option={buildStyleChart(stylePercentages)} style={{ height: '100%' }} />
        </div>
      </div>

      {/* Main Style Deep Dive */}
      <div className="card" style={{ borderLeftColor: style.color, borderLeftWidth: '5px' }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{style.emoji}</span>
          <div>
            <h2 className="text-xl font-bold" style={{ color: style.color }}>{style.name}</h2>
            <p className="text-xs text-gray-400">{style.label}</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">{style.longDescription || style.description}</p>

        {/* Childhood Roots */}
        <div className="bg-purple-50 rounded-lg p-4 mb-4">
          <h4 className="font-bold text-purple-700 text-sm mb-2">🌱 依恋风格的形成</h4>
          <p className="text-sm text-purple-800 leading-relaxed">{style.childhoodRoots}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-bold text-green-700 text-sm mb-2">💪 优势</h4>
            <ul className="text-sm space-y-1">
              {style.strengths.map((s: string, i: number) => (
                <li key={i} className="text-green-800">• {s}</li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-bold text-amber-700 text-sm mb-2">⚠️ 挑战</h4>
            <ul className="text-sm space-y-1">
              {style.challenges.map((c: string, i: number) => (
                <li key={i} className="text-amber-800">• {c}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="font-bold text-gray-700 text-sm mb-2">💕 在亲密关系中</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{style.relationships}</p>
        </div>

        {/* Change Path */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h4 className="font-bold text-blue-700 text-sm mb-2">🛤️ 成长与改变的方向</h4>
          <p className="text-sm text-blue-800 leading-relaxed">{style.changePath}</p>
        </div>
      </div>

      {/* All Styles Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allStyles.map(s => (
          <div key={s.id} className={`card ${s.id === style.id ? 'ring-2' : ''}`}
            style={{ borderColor: s.id === style.id ? s.color : 'transparent' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{s.emoji}</span>
              <h3 className="font-bold text-sm" style={{ color: s.color }}>{s.name}</h3>
              {s.id === style.id && (
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: s.color }}>
                  您
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>

      {/* Important Note */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">📌 重要提示</h3>
        <p className="text-sm text-blue-700 leading-relaxed">
          依恋风格并非一成不变的性格标签。研究表明，通过自我觉察、安全的关系体验和心理治疗，依恋风格可以在一定程度上发生改变。
          此测评旨在帮助您更好地理解自己在亲密关系中的模式和倾向，而非对您的人格做出终极判断。
          每个人的依恋经历都是独特的，无论您的风格是什么，都值得被理解和尊重。
        </p>
      </div>

      <div className="text-center pb-10">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href={`${import.meta.env.BASE_URL}attachment`} className="btn-primary inline-block">重新测评</a>
          <button
            onClick={() => downloadMarkdown(generateAttachmentMD(result), '依恋风格测评报告.md')}
            className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            📥 下载MD报告
          </button>
        </div>
      </div>
    </div>
  );
}

function buildStyleChart(sp: { secure: number; anxious: number; avoidant: number; fearful: number }) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#fff',
      borderColor: '#e5e7eb',
      textStyle: { color: '#1f2937' },
    },
    grid: { left: '3%', right: '8%', top: '5%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'value', max: 100,
      axisLabel: { formatter: '{value}%', color: '#6b7280' },
      splitLine: { lineStyle: { color: '#f3f4f6' } },
    },
    yAxis: {
      type: 'category',
      data: ['💚 安全型', '💛 焦虑型', '💙 回避型', '💜 恐惧型'],
      axisLabel: { fontSize: 13, fontWeight: 500, color: '#374151' },
      axisLine: { show: false }, axisTick: { show: false },
    },
    series: [{
      type: 'bar',
      data: [
        { value: sp.secure, itemStyle: { color: '#4caf50', borderRadius: [0, 6, 6, 0] } },
        { value: sp.anxious, itemStyle: { color: '#ff9800', borderRadius: [0, 6, 6, 0] } },
        { value: sp.avoidant, itemStyle: { color: '#2196f3', borderRadius: [0, 6, 6, 0] } },
        { value: sp.fearful, itemStyle: { color: '#9c27b0', borderRadius: [0, 6, 6, 0] } },
      ],
      barWidth: 24,
      label: { show: true, position: 'right', formatter: '{c}%', color: '#6b7280', fontSize: 12 },
    }],
  };
}
