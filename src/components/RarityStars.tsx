import type { Lang } from "@/lib/i18n";
import type { Rarity } from "@/lib/types";

const RARITY_COLOR: Record<Rarity, string> = {
  4: "text-rarity-4",
  5: "text-gold-300",
  6: "text-rarity-6",
};

/** 稀有度星级：★ 文本符号着色实现，不依赖图片。6 星附带朱红「敕」印。 */
export default function RarityStars({
  rarity,
  lang,
  size = "",
  className = "",
}: {
  rarity: Rarity;
  lang?: Lang;
  size?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${size} ${className}`}
      aria-label={`${rarity} stars`}
    >
      <span
        className={`${RARITY_COLOR[rarity]} tracking-[0.12em] [text-shadow:0_0_10px_currentColor]`}
      >
        {"★".repeat(rarity)}
      </span>
      {rarity >= 6 && lang && (
        <span className="seal h-6 px-1 text-[10px] leading-4">
          {lang === "zh" ? "敕" : "APEX"}
        </span>
      )}
    </span>
  );
}
