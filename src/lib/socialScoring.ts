import type { SocialResult, SocialStyleScore } from '../data/socialData';
export type { SocialResult } from '../data/socialData';
import { socialStyles } from '../data/socialData';
import { socialQuestions } from '../data/socialQuestions';
const m = [{ id: 'driver', s: 0, c: 8 },{ id: 'expressive', s: 8, c: 7 },{ id: 'amiable', s: 15, c: 8 },{ id: 'analytical', s: 23, c: 7 }];
export function computeSocialResults(a: Map<string, number>): SocialResult {
  const ss: SocialStyleScore[] = socialStyles.map(st => {
    const x = m.find(y => y.id === st.id)!; let r = 0, mx = 0;
    for (let i = 0; i < x.c; i++) {
      const qId = `SC_${x.s + i + 1}`; const ans = a.get(qId); if (ans == null) continue;
      mx += 7; const q = socialQuestions.find(z => z.id === qId);
      r += q?.reverse ? 8 - ans : ans;
    }
    return { ...st, percentage: mx > 0 ? Math.round((r / mx) * 100) : 50 };
  });
  ss.sort((a, b) => b.percentage - a.percentage);
  return { styles: ss, primary: ss[0], timestamp: Date.now() };
}
