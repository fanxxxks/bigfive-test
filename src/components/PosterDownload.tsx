import { useRef, useCallback } from 'react';
import type ReactECharts from 'echarts-for-react';
import { downloadPoster, type PosterData } from '../lib/posterExport';

/**
 * Hook that provides a ref for an echarts-for-react component and a
 * `downloadPosterFromChart` callback.  Call the callback with poster metadata
 * and it will capture the current chart as an image, compose a poster, and
 * trigger a PNG download.
 */
export function usePosterDownload(filename: string) {
  const chartRef = useRef<ReactECharts>(null);

  const download = useCallback(
    async (data: PosterData) => {
      const instance = chartRef.current?.getEchartsInstance();
      if (!instance) return;
      try {
        const dataUrl = instance.getDataURL({
          type: 'png',
          pixelRatio: 2,
          backgroundColor: 'transparent',
        });
        await downloadPoster(dataUrl, data, filename);
      } catch {
        // Silently fail — the chart may not be ready
      }
    },
    [filename],
  );

  return { chartRef, downloadPoster: download };
}
