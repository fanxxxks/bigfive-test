// Poster / radar-chart image export utility.
// Composes a beautiful shareable poster with the radar chart + key results,
// then triggers a PNG download — all client-side via Canvas.

export interface PosterData {
  /** Display title, e.g. "大五人格雷达图" */
  title: string;
  /** Optional subtitle, e.g. quiz name */
  subtitle?: string;
  /** Optional hero emoji */
  emoji?: string;
  /** Key metrics to display below the chart (label → value pairs) */
  highlights: { label: string; value: string; color?: string }[];
  /** Optional footer note */
  footer?: string;
  /** Optional timestamp string */
  timestamp?: string;
}

/**
 * Compose a poster PNG from an ECharts radar chart image and metadata,
 * then trigger a browser download.
 *
 * @param chartImageDataUrl - Result of calling `echartsInstance.getDataURL({ type: 'png', pixelRatio: 2 })`
 * @param data - Poster text metadata
 * @param filename - Download filename (default: 'radar-poster.png')
 */
export async function downloadPoster(
  chartImageDataUrl: string,
  data: PosterData,
  filename = 'radar-poster.png',
): Promise<void> {
  const W = 800;
  const H = 1100;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // ── Background gradient ──────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0f0c29');
  bg.addColorStop(0.45, '#302b63');
  bg.addColorStop(1, '#24243e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle decorative circles
  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(680, 120, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(100, 950, 180, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // ── Header section ───────────────────────────────────────
  const padX = 48;
  let y = 56;

  if (data.emoji) {
    ctx.font = '48px "Noto Sans SC", "Inter", sans-serif';
    ctx.fillText(data.emoji, padX, y + 42);
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px "Noto Sans SC", "Inter", sans-serif';
  ctx.fillText(data.title, padX, y + 80);

  if (data.subtitle) {
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '16px "Noto Sans SC", "Inter", sans-serif';
    ctx.fillText(data.subtitle, padX, y + 108);
    y += 36;
  }
  y += 110;

  // ── Chart image ──────────────────────────────────────────
  const chartImg = await loadImage(chartImageDataUrl);
  const chartW = W - padX * 2;
  const chartH = Math.round(chartW * (chartImg.height / chartImg.width));
  ctx.drawImage(chartImg, padX, y, chartW, chartH);
  y += chartH + 32;

  // ── Highlights ───────────────────────────────────────────
  const cols = Math.min(data.highlights.length, 5);
  const colW = (W - padX * 2) / cols;

  for (let i = 0; i < data.highlights.length; i++) {
    const h = data.highlights[i];
    const cx = padX + colW * i;

    // Value
    ctx.fillStyle = h.color || '#ffffff';
    ctx.font = 'bold 28px "Noto Sans SC", "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(h.value, cx + colW / 2, y + 28);

    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '13px "Noto Sans SC", "Inter", sans-serif';
    ctx.fillText(h.label, cx + colW / 2, y + 52);
  }
  ctx.textAlign = 'left';
  y += 76;

  // ── Footer ───────────────────────────────────────────────
  if (data.timestamp) {
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '12px "Noto Sans SC", "Inter", sans-serif';
    ctx.fillText(`生成时间：${data.timestamp}`, padX, y);
  }

  if (data.footer) {
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = '12px "Noto Sans SC", "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(data.footer, W - padX, y);
    ctx.textAlign = 'left';
  }

  // ── Download ─────────────────────────────────────────────
  canvas.toBlob(blob => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 'image/png');
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
