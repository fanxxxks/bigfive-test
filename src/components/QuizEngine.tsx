import { useState, useMemo, useCallback, useEffect } from 'react';
import { questions, ITEMS_PER_PAGE } from '../data/questions';
import { paginateQuestions, computeResults } from '../lib/scoring';
import LikertScale from './LikertScale';
import ProgressBar from './ProgressBar';
import type { PersonalityResult } from '../lib/types';

const LIKERT_LABELS = [
  '非常不同意',
  '不同意',
  '有点不同意',
  '中立',
  '有点同意',
  '同意',
  '非常同意',
];

export default function QuizEngine() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Map<string, number>>(new Map());
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [started, setStarted] = useState(false);

  const pages = useMemo(() => paginateQuestions(ITEMS_PER_PAGE), []);
  const totalPages = pages.length;

  const currentQuestions = pages[currentPage] || [];
  const allAnswered = currentQuestions.every(q => answers.has(q.id));

  const progress = Math.round(
    ((currentPage + (allAnswered ? 1 : 0)) / totalPages) * 100,
  );

  const handleAnswer = useCallback((questionId: string, score: number) => {
    setAnswers(prev => {
      const next = new Map(prev);
      next.set(questionId, score);
      return next;
    });
  }, []);

  const handleNext = () => {
    if (!allAnswered) return;
    if (currentPage >= totalPages - 1) {
      setShowConfirm(true);
    } else {
      setCurrentPage(p => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(p => p - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    const res = computeResults(answers);
    setResult(res);
    setShowConfirm(false);
  };

  // Keyboard shortcut: 1-7 to select answer
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (result) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= 7 && currentQuestions.length === 1) {
        handleAnswer(currentQuestions[0].id, num);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentQuestions, handleAnswer, result]);

  // Pass results
  useEffect(() => {
    if (result) {
      // Store in sessionStorage for the results page
      sessionStorage.setItem('bigfive_result', JSON.stringify(result));
      window.location.href = '/results';
    }
  }, [result]);

  if (!started) {
    return <StartScreen onStart={() => setStarted(true)} />;
  }

  if (result) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-500">正在生成您的个性化报告…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold text-gray-800">
            大五人格测评
          </h1>
          <span className="text-sm text-gray-400">
            {currentPage + 1} / {totalPages} 页
          </span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {currentQuestions.map((q, idx) => (
          <div key={q.id} className="card">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center text-sm font-bold">
                {currentPage * ITEMS_PER_PAGE + idx + 1}
              </span>
              <div className="flex-1">
                <p className="text-gray-800 leading-relaxed mb-4">{q.text}</p>
                <LikertScale
                  labels={LIKERT_LABELS}
                  value={answers.get(q.id) ?? null}
                  onChange={(v) => handleAnswer(q.id, v)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="card flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg
                     hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← 上一页
        </button>

        <span className="text-sm text-gray-400">
          {allAnswered
            ? '✓ 本页已全部作答'
            : `还有 ${currentQuestions.filter(q => !answers.has(q.id)).length} 题未答`}
        </span>

        <button
          onClick={handleNext}
          disabled={!allAnswered}
          className="btn-primary text-sm"
        >
          {currentPage >= totalPages - 1 ? '提交答卷' : '下一页 →'}
        </button>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-3">确认提交？</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              您已完成全部 <strong>{questions.length}</strong> 道题目。
              提交后将无法修改答案，确定要提交吗？
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                继续检查
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-3 text-sm font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors"
              >
                确认提交
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="card text-center py-12 space-y-6">
      <div className="text-6xl">🧠</div>
      <h1 className="text-3xl font-bold text-gray-900">大五人格科学测评</h1>
      <div className="max-w-md mx-auto text-gray-600 space-y-3 text-left">
        <div className="flex items-start gap-3">
          <span className="text-green-500 mt-0.5">✓</span>
          <span>基于国际公认的 <strong>IPIP-NEO-120</strong> 科学量表</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-500 mt-0.5">✓</span>
          <span>共 <strong>140</strong> 道题目，预计耗时 <strong>15-20 分钟</strong></span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-500 mt-0.5">✓</span>
          <span>采用 <strong>7 点李克特量表</strong>，精准捕捉人格特质</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-500 mt-0.5">✓</span>
          <span>内置一致性检验，确保结果真实可靠</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-500 mt-0.5">✓</span>
          <span>即时生成 <strong>多维度深度分析报告</strong></span>
        </div>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-md mx-auto text-sm text-yellow-800">
        💡 <strong>提示：</strong>请在一个安静的环境中，根据您的<strong>真实感受</strong>（而非理想中的自己）诚实作答。
        没有「正确」或「错误」的答案。
      </div>
      <button onClick={onStart} className="btn-primary text-lg px-10 py-4">
        开始测评
      </button>
    </div>
  );
}
