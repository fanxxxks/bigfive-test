import type { MoneyResult, MoneyStyleScore } from '../data/moneyData';
export type { MoneyResult } from '../data/moneyData';
import { moneyStyles } from '../data/moneyData';
import { moneyQuestions } from '../data/moneyQuestions';
const m = [{ id: 'saver', s: 0 },{ id: 'spender', s: 4 },{ id: 'investor', s: 8 },{ id: 'minimalist', s: 12 },{ id: 'giver', s: 16 }];
export function computeMoneyResults(a: Map<string, number>): MoneyResult {
  const ss: MoneyStyleScore[] = moneyStyles.map(st => {
    const x = m.find(y => y.id === st.id)!; let r = 0, mx = 0;
    for (let i = 0; i < 4; i++) {
      const qId = `MN_${x.s + i + 1}`; const ans = a.get(qId); if (ans == null) continue;
      mx += 7; const q = moneyQuestions.find(z => z.id === qId);
      r += q?.reverse ? 8 - ans : ans;
    }
    return { ...st, percentage: mx > 0 ? Math.round((r / mx) * 100) : 50 };
  });
  ss.sort((a, b) => b.percentage - a.percentage);
  return { styles: ss, primary: ss[0], timestamp: Date.now() };
}
