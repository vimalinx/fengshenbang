"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n";

/** 语言切换：保持当前路径，只替换 /zh|en 前缀。 */
export default function LangSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname() || `/${lang}`;
  const other: Lang = lang === "zh" ? "en" : "zh";
  const href = pathname.replace(/^\/(zh|en)(?=\/|$)/, `/${other}`);
  return (
    <Link
      href={href}
      className="rounded border border-white/15 px-2 py-1 text-xs text-muted transition-colors hover:border-gold-400/50 hover:text-gold-300"
    >
      {other === "zh" ? "中文" : "EN"}
    </Link>
  );
}
