import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { PhilosophyResult, PhilosophySchoolScore } from '../lib/philosophyScoring';
import { generatePhilosophyMD, downloadMarkdown } from '../lib/markdownExport';
import { usePosterDownload } from './PosterDownload';

export default function PhilosophyResultsReport() {
  const [result, setResult] = useState<PhilosophyResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('philosophy_result');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.schools) && parsed.schools.length > 0) {
          setResult(parsed);
        }
      } catch { /* ignore */ }
    }
  }, []);

  if (!result) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">未找到测评结果。</p>
        <a href={`${import.meta.env.BASE_URL}philosophy`} className="btn-primary inline-block mt-4">去测评</a>
      </div>
    );
  }

  const top5 = result.schools.slice(0, 5);
  const top3 = result.schools.slice(0, 3);
  const { chartRef, downloadPoster } = usePosterDownload('哲学气质雷达图.png');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card text-center">
        <div className="text-5xl mb-4">{top3[0].emoji}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">您的哲学气质报告</h1>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
          在18个哲学流派中，您最接近 <strong style={{ color: top3[0].color }}>{top3[0].name}</strong>——
          但这并不意味着您"属于"某一个流派。每个人都有独特的哲学气质，是多种思想的融合。
        </p>
        <p className="text-xs text-gray-400 mt-3">
          报告生成时间：{new Date(result.timestamp).toLocaleString('zh-CN')}
        </p>
      </div>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {top3.map((school, idx) => (
          <div
            key={school.id}
            className="card text-center relative overflow-hidden"
            style={{ borderTopColor: school.color, borderTopWidth: '4px' }}
          >
            {idx === 0 && (
              <span className="absolute top-3 right-3 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                最匹配
              </span>
            )}
            <div className="text-4xl mb-2">{school.emoji}</div>
            <h3 className="font-bold text-xl" style={{ color: school.color }}>
              {school.name}
            </h3>
            <p className="text-xs text-gray-400 mb-2">{school.label}</p>
            <div className="text-3xl font-bold mb-1" style={{ color: school.color }}>
              {school.percentage}%
            </div>
            <p className="text-xs text-gray-400">匹配度</p>
          </div>
        ))}
      </div>

      {/* Full Bar Chart */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">18流派匹配全景图</h2>
        <div style={{ height: 520 }}>
          <ReactECharts ref={chartRef} option={buildBarOption(result)} style={{ height: '100%' }} />
        </div>
      </div>

      {/* Top 5 Detailed with long description */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">前5流派深度解读</h2>
        <div className="space-y-5">
          {top5.map((school, idx) => (
            <div key={school.id} className="card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: school.color + '18' }}>
                  {school.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg" style={{ color: school.color }}>
                      #{idx + 1} {school.name}
                    </h3>
                    <span className="text-xs text-gray-400">{school.label}</span>
                    <span className="ml-auto font-bold text-lg" style={{ color: school.color }}>
                      {school.percentage}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {school.longDescription}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <p className="text-sm text-gray-600 italic">
                      "{school.keyQuote}"
                      <span className="text-xs text-gray-400 ml-1">— {school.keyQuoteAuthor}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {school.coreIdeas.map((idea, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: school.color + '14', color: school.color }}>
                        {idea}
                      </span>
                    ))}
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                    <h4 className="text-xs font-bold text-amber-700 mb-1">🧭 如果这种思想是你的生活指南</h4>
                    <p className="text-sm text-amber-800 leading-relaxed">{school.lifeImplication}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Synthesis */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-3">🧩 您的哲学气质合成</h2>
        <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: generateSynthesis(top3) }} />
        <p className="text-xs text-gray-400 mt-4">
          以上分析基于您在60道哲学观点题上的回答。哲学气质测评旨在帮助您了解自己的思想倾向，不构成任何形式的标签或定论。
          每个人都在不断变化和成长，今天的哲学气质只是您思想旅程中的一个快照。
        </p>
      </div>

      {/* Retake */}
      <div className="text-center pb-10">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href={`${import.meta.env.BASE_URL}philosophy`} className="btn-primary inline-block">
            重新测评
          </a>
          <button
            onClick={() => downloadMarkdown(generatePhilosophyMD(result), '哲学气质测评报告.md')}
            className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            📥 下载MD报告
          </button>
          <button
            onClick={() => downloadPoster({
              title: '哲学气质图谱',
              subtitle: `最匹配：${top3[0].name} ${top3[0].percentage}%`,
              emoji: top3[0].emoji,
              highlights: top3.map(s => ({
                label: s.name,
                value: `${s.percentage}%`,
                color: s.color,
              })),
              footer: '自我探索平台 · bigfive-test',
              timestamp: new Date(result.timestamp).toLocaleString('zh-CN'),
            })}
            className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
          >
            🎨 生成分享海报
          </button>
        </div>
      </div>
    </div>
  );
}

function generateSynthesis(top3: PhilosophySchoolScore[]): string {
  if (top3.length < 2) {
    return `您的哲学气质以<strong>${top3[0]?.name || '未知'}</strong>为主要特征。`;
  }
  const [first, second, third] = top3;

  const syntheses: Record<string, Record<string, string>> = {
    nietzsche: {
      camus: '尼采的强力意志与加缪的荒诞反抗在您身上交汇——您相信生命虽无外在意义，但人可以通过自我超越和反抗创造价值。您是一个勇敢面对现实、不依赖外在安慰的人。这种组合赋予您一种"悲剧性的乐观"：您直面人生的艰难，同时选择在其中自我超越。',
      stoicism: '尼采的力量哲学与斯多葛的内心平静在您身上形成有趣的张力——您既渴望超越和力量，又追求内心的宁静。这种组合使您成为一个既积极进取又不失理性克制的人。这两种思想相互制衡：尼采防止斯多葛退化为消极接受，斯多葛防止尼采滑向不计后果的激进。',
      sartre: '尼采的自我超越与萨特的自由选择在您身上融合——您深信人必须自己定义自己的价值，不受传统和他人期待的束缚。您是一个彻底的自我主宰者。这两种思想共同构成了"自我创造"的哲学：你的人生是你自己的作品。',
      buddhism: '尼采的权力意志与佛学的放下执着形成对比——您内心可能有一种张力：既想超越和征服，又明白执着的痛苦。这种矛盾使您富有深度。您可能在行动时充满力量，在反思时又渴望宁静——两种看似矛盾的方向，在您身上可以互补而非冲突。',
      confucius: '尼采的反传统与儒家的伦理秩序形成碰撞——您在独立思考和尊重传统之间寻找自己的平衡点。您可能在某些领域大胆突破，在另一些领域珍视传承——这种选择性本身就是一种成熟的智慧。',
      laozi: '尼采的超人哲学与老子的无为之道形成奇妙的对比——一个主张强力超越，一个主张顺应自然。在您身上，这两种思想不是矛盾，而是互补：您知道什么时候该奋力拼搏，什么时候该顺势而为。这种智慧使您既不会过度强求，也不会消极逃避。',
      marx: '尼采的个体超越与马克思的集体解放形成张力——您既珍视个人的独立和创造力，又关注社会的公平和正义。这种组合使您既不是原子化的个人主义者，也不是消融个性的集体主义者。',
    },
    camus: {
      nietzsche: '加缪的荒诞反抗与尼采的强力意志在您身上共鸣——您直面世界的无意义，却选择在荒诞中创造自己的幸福。这两种思想共同构成了一种"无宗教的信仰"：不依靠天堂的承诺，只在人间创造意义。',
      sartre: '加缪与萨特共享存在主义根基——世界虚无，但人可以通过行动赋予生活以意义。您是一个活在当下、注重体验的人。您不太为宏大叙事所动，相信生活的意义在于每一个具体的投入和选择。',
      stoicism: '加缪的反抗精神与斯多葛的接纳态度融合——您知道有些事无法改变，但您选择积极面对而非消极接受。您区分可控与不可控之事，但对可控之事绝不轻易放弃。',
      buddhism: '加缪的荒诞与佛学的空性有微妙的呼应——您既认识到世界的虚幻本质，又不愿放弃在此世的积极生活。这种组合使您成为一个"入世的出世人"：看透了，但依然热爱。',
    },
    stoicism: {
      epicurus: '斯多葛的内心平静与伊壁鸠鲁的简单快乐结合——您追求的不是奢华与刺激，而是内心的安宁和简单生活的满足。您知道真正的幸福不在于拥有更多，而在于需要更少。',
      buddhism: '斯多葛与佛学都指向内心的修炼——您相信痛苦的根源在于自己的看法，改变内心就能改变世界。这两种东方-西方智慧的融合使您拥有强大的心理韧性。',
      aristotle: '斯多葛的理性克制与亚里士多德的中道思想互补——您相信德性在于适中，情绪和行为的平衡是幸福的关键。您不是一个极端主义者，而是生活的炼金师——将各种元素混合到恰到好处的比例。',
    },
    sartre: {
      marx: '萨特的个体自由与马克思的社会分析结合——您既重视个人的选择自由，又清醒地看到社会结构对个体的制约。您是一个"现实的理想主义者"：不否认结构的不公，但坚持个体的能动性。',
      camus: '萨特与加缪——存在主义的两翼。您深深理解人的自由和世界的荒诞，在虚无中寻找属于自己的意义。您可能是朋友圈中那个最常质疑"这有什么意义"但也最认真地生活的人。',
    },
    buddhism: {
      laozi: '佛学与道家在您身上交汇——放下执着，顺应自然，不争而胜。您的气质中有一种东方式的宁静和智慧。您知道什么时候该行动，什么时候该"无为"，这种判断力是您最宝贵的智慧。',
      schopenhauer: '佛学的解脱观与叔本华的悲观主义共鸣——您对人生的痛苦有深刻的体认，但您选择以放下而非绝望来应对。您看到了黑暗，但选择点亮心中的灯，而非诅咒黑暗。',
      zhuangzi: '佛学的空性与庄子的齐物在您身上融合——您看破二元对立，在超脱中寻找精神的自由。您不太被"对错""成败"的二分法所困，能够从更高的维度理解和接纳。',
    },
    confucius: {
      aristotle: '儒家与亚里士多德的中道思想不谋而合——您重视德性修养，相信在具体的人际关系和社会角色中实现自我。东方和西方最伟大的德性伦理传统在您身上汇合。',
      wangyangming: '儒家与心学一脉相承——您既重视外在的礼仪规范，又相信内心的良知是最终的判断标准。外礼内仁，知行合一，这是您的人格底色。',
    },
    laozi: {
      zhuangzi: '老子与庄子——道家的完整传承。您的气质中有一种天然的洒脱和智慧，不争不抢，顺应本心。您是人群中最不显眼但最从容的那个——水善利万物而不争，说的就是您。',
      buddhism: '道家与佛学的融合——无为与放下，自然与空性，您的气质体现了东方哲学的精髓。这种融合使您既超脱又慈悲，既有智慧又有温度。',
    },
    marx: {
      sartre: '马克思的实践哲学与萨特的行动哲学结合——您不满足于解释世界，您要改变它，无论是社会还是自身。您是行动派的思想家——思考的目的是为了改变，而非止于理解。',
      utilitarianism: '马克思的集体关怀与功利主义的幸福计算有共同之处——您关心最大多数人的福祉，注重实际结果。您的理想主义是务实的：关注的是"什么真正有效"而非"什么听起来最好"。',
      confucius: '马克思的社会关怀与儒家的仁爱思想有深层共鸣——您关心的是如何在现实中实现人与人之间的公正与和谐。您既重视制度建设，也重视人的品德修养——二者缺一不可。',
    },
    kant: {
      stoicism: '康德的道德理性与斯多葛的内在修炼结合——您相信通过理性可以找到正确的行动准则，并以此指导人生。这种组合使您成为一个具有原则性但不失弹性的道德行动者。',
      aristotle: '康德的义务论与亚里士多德的德性伦理互补——您既重视原则，也重视在具体情境中的判断。您不是一个"照搬规则"的人，而是在原则的指导下灵活地应对生活。',
      buddhism: '康德的道德律令与佛学的慈悲智慧在您身上融汇——您相信道德有客观的基础，而这种基础与对众生苦难的深切体认是一致的。理性与慈悲在您这里不是对立面，而是同一条道路的两个方向。',
    },
    zhuangzi: {
      nietzsche: '庄子的逍遥与尼采的自我超越在您身上形成奇妙的交响——东方和西方最具颠覆性的思想在您身上相遇。您既不被传统束缚，也不被现代性裹挟——您是真正的自由思想者。',
    },
    epicurus: {
      stoicism: '伊壁鸠鲁的宁静快乐与斯多葛的内心理性结合——您知道幸福不在于外界拥有多少，而在于内心如何感受。您是一个在简朴中找到丰富、在安静中找到力量的人。',
    },
    descartes: {
      hume: '笛卡尔的理性主义与休谟的经验主义在您身上形成哲学史上最经典的张力——您既相信清晰的理性推理，又对经验的局限性保持清醒。这种组合使您成为一个既严谨又务实的思想者：您用理性搭建框架，用经验检验结论。',
      kant: '笛卡尔与康德——理性主义的传承。您相信理性具有认识世界和指导行动的力量，不轻易被感性和权威左右。您的思维方式系统而深刻，善于从第一原理出发分析问题。',
      plato: '笛卡尔与柏拉图共享对理性和确定性的追求。您相信表面现象之下存在着更本质的真理，而这种真理可以通过理性思维来把握。您是一个不满足于"常识"的深度思考者。',
    },
    hume: {
      descartes: '休谟的经验怀疑与笛卡尔的理性主义在您身上碰撞——这是哲学史上最伟大的张力之一。您既重视实际经验，又不放弃清晰思考。这种组合让您成为一个"温和的理性主义者"：用经验来约束理性，用理性来组织经验。',
      kant: '休谟的怀疑论据说是"把康德从独断论的迷梦中唤醒"的力量。您的哲学气质体现了这种觉醒：您既意识到理性的局限性，又不愿放弃对普遍真理的追求。您是那个在坚信和怀疑之间找到平衡的人。',
    },
    aristotle: {
      kant: '亚里士多德的德性伦理与康德的义务论在您身上互补——您既重视品格的培养，也重视原则的坚守。您知道，"做一个好人"和"做正确的事"虽然在大多数情况下一致，但张力出现时，您能够在两者之间找到平衡。',
      confucius: '亚里士多德与孔子——东西方德性伦理的伟大交汇。您相信良好生活不是遵循抽象规则，而是在具体情境中做出恰当的判断和行动。您的道德感扎根于现实生活，而非天空中的理念。',
    },
    wangyangming: {
      kant: '王阳明的心学与康德的道德哲学在您身上交汇——您相信内心的良知是道德判断的最终来源，而这种良知与理性是相通的。知行合一的理念使您不仅思考"什么是对的"，更努力去做到它。',
      nietzsche: '王阳明与尼采——看似迥异的思想在您身上形成创造性的张力。心学强调良知本有，尼采强调价值自创。您既相信内心有真实的道德声音，又不愿意被任何外在的道德体系所束缚。这种组合使您成为既真诚又自由的人。',
    },
  };

  const synth = syntheses[first.id]?.[second.id] || syntheses[second.id]?.[first.id];

  if (synth) return synth;

  return `您的哲学气质以<strong>${first.name}</strong>（${first.percentage}%）、<strong>${second.name}</strong>（${second.percentage}%）${third ? `和<strong>${third.name}</strong>（${third.percentage}%）` : ''}为主要特征。${third ? '这三种思想在您身上并非矛盾，而是构成了您独特的世界观——一种融合了多种智慧的个人哲学。这种多元性本身就是一种力量：您能够在不同情境下灵活运用不同的思想资源，而非局限于单一教条。您是一个"哲学上的世界公民"——不归属于任何一个思想阵营，却能在各种智慧传统中汲取营养。' : '您的哲学气质较为集中，这使您有一个清晰而一致的思想内核，在面对复杂问题时能够从稳定的哲学立场出发做出判断。'}`;
}

function buildBarOption(result: PhilosophyResult) {
  const schools = result.schools;

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: { name: string; value: number }[]) =>
        `${params[0].name}: 匹配度 <strong>${params[0].value}%</strong>`,
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
      data: schools.map(s => `${s.emoji} ${s.name}`),
      axisLabel: { fontSize: 12, fontWeight: 400, color: '#374151' },
      axisLine: { show: false },
      axisTick: { show: false },
      inverse: true,
    },
    series: [{
      type: 'bar',
      data: schools.map(s => ({
        value: s.percentage,
        itemStyle: { color: s.color, borderRadius: [0, 6, 6, 0] },
      })),
      barWidth: 18,
      label: {
        show: true, position: 'right',
        formatter: '{c}%', color: '#6b7280', fontSize: 11,
      },
    }],
  };
}
