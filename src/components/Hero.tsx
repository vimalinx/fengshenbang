import { tx, UI, type Lang } from "@/lib/i18n";

/**
 * 首页揭榜 Hero：敕令卷轴 + 超大衬线金榜题名。
 * 星象背景在 body 上（globals.css），这里加轴杆与榜文。
 */
export default function Hero({ lang }: { lang: Lang }) {
  const name = tx(UI.site.name, lang);
  return (
    <section className="fade-up relative overflow-hidden px-4 pb-12 pt-14 text-center sm:pt-20">
      {/* 敕令上轴杆 */}
      <div className="scroll-rod mx-auto max-w-3xl" aria-hidden />

      {/* 榜文小引 */}
      <p className="mt-8 font-title text-xs tracking-[0.5em] text-gold-400/80 sm:text-sm">
        {lang === "zh" ? "奉天敕封 · 夜观星象" : "BY IMPERIAL DECREE · READING THE STARS"}
      </p>

      {/* 金榜题名 */}
      <h1
        className={`text-gold-gradient font-display mt-4 font-black leading-none ${
          lang === "zh"
            ? "text-[clamp(72px,16vw,144px)] tracking-[0.18em]"
            : "text-[clamp(48px,10vw,104px)] tracking-[0.08em]"
        }`}
      >
        {name}
      </h1>

      {/* 敕令横幅 */}
      <div className="edict-panel mx-auto mt-8 max-w-2xl px-6 py-4">
        <p className="font-title text-sm tracking-[0.25em] text-parchment sm:text-base">
          {lang === "zh" ? "大模型 × Harness 战力榜" : tx(UI.site.tagline, lang)}
        </p>
        <p className="mt-1.5 text-[11px] uppercase tracking-[0.3em] text-muted">
          Investiture of the Models
        </p>
      </div>

      {/* 敕令下轴杆 */}
      <div className="scroll-rod mx-auto mt-8 max-w-3xl" aria-hidden />
    </section>
  );
}
