interface LikertScaleProps {
  labels: string[];
  value: number | null;
  onChange: (value: number) => void;
}

export default function LikertScale({ labels, value, onChange }: LikertScaleProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        {labels.map((label, idx) => {
          const score = idx + 1;
          const selected = value === score;
          return (
            <button
              key={score}
              onClick={() => onChange(score)}
              className={`
                flex-1 py-2.5 px-1 text-xs font-medium rounded-lg border-2 transition-all
                ${
                  selected
                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm scale-105'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              title={`${score} - ${label}`}
            >
              <span className="block text-sm font-bold mb-0.5">{score}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </div>
      {/* Mobile-friendly labels */}
      <div className="flex justify-between text-[10px] text-gray-400 sm:hidden">
        <span>{labels[0]}</span>
        <span>{labels[6]}</span>
      </div>
    </div>
  );
}
