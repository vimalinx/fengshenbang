import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Noto_Serif_SC } from "next/font/google";
import "../globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { UI, isLang, tx, type Lang } from "@/lib/i18n";

/** 内容在请求时读取 content/*.json，不做构建期固化。 */
export const dynamic = "force-dynamic";

/**
 * 中文衬线标题字体。构建期从 Google Fonts 下载并自托管；
 * 若构建环境下载失败，请改用 <link> 引入并保留 --font-zh-serif 变量约定，
 * globals.css 的 --font-title 已有系统衬线回退栈兜底。
 */
const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-zh-serif",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l: Lang = isLang(lang) ? lang : "zh";
  return {
    title: {
      default: `${tx(UI.site.name, l)} — ${tx(UI.site.tagline, l)}`,
      template: `%s | ${tx(UI.site.name, l)}`,
    },
    description: tx(UI.site.tagline, l),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  /** 只允许 /zh 与 /en，其他前缀直接 404。 */
  if (!isLang(lang)) notFound();
  const l: Lang = lang;
  return (
    <html lang={l === "zh" ? "zh-CN" : "en"} className={notoSerifSC.variable}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader lang={l} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
        <SiteFooter lang={l} />
      </body>
    </html>
  );
}
