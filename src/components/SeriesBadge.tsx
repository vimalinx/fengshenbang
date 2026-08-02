import { lt, SERIES_LABELS, type Locale } from "@/lib/i18n";
import type { Series } from "@/lib/types";

/** 系列（模型厂商）文字徽章：细描边小标签，不依赖外部图片。 */
export default function SeriesBadge({
  series,
  lang,
  className = "",
}: {
  series: Series;
  lang: Locale;
  className?: string;
}) {
  const label = SERIES_LABELS[series]
    ? lt(SERIES_LABELS[series], lang)
    : series;
  return (
    <span
      className={`inline-block rounded border border-gold-400/30 px-1.5 py-0.5 text-xs text-gold-300/90 ${className}`}
    >
      {label}
    </span>
  );
}
