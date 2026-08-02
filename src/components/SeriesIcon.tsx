import { DEFAULT_SERIES_BADGE, SERIES_META } from "@/lib/content";
import { tx, type Lang } from "@/lib/i18n";

/** 系列（元素/体系）文字徽章，不依赖外部图片。 */
export default function SeriesIcon({
  series,
  lang,
}: {
  series?: string;
  lang: Lang;
}) {
  if (!series) return null;
  const meta = SERIES_META[series];
  const label = meta ? tx(meta.label, lang) : series;
  const badgeClass = meta?.badgeClass ?? DEFAULT_SERIES_BADGE;
  return (
    <span
      className={`inline-block rounded border px-1.5 py-0.5 text-[11px] leading-4 ${badgeClass}`}
    >
      {label}
    </span>
  );
}
