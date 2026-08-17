import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import SectionHeader from '@/components/SectionHeader';
import TierSeal from '@/components/TierSeal';
import StarRating from '@/components/StarRating';
import HarnessCard from '@/components/HarnessCard';
import TeamCard from '@/components/TeamCard';
import { Reveal } from '@/components/Reveal';
import { modelMap, systemMap } from '@/data/models';
import { modelDetails, type DanmakuItem, type PlatformId } from '@/data/modelDetails';
import { harnessMap } from '@/data/harnesses';
import { teams } from '@/data/teams';
import { guides, guideCategories } from '@/data/guides';
import { cn } from '@/lib/utils';

const SECTION_BAR = '#B8860B';
const TONE_META = {
  pos: { label: '偏正面', color: '#B8860B' },
  mix: { label: '混合', color: '#A1A1AA' },
  neg: { label: '偏负面', color: '#C03A28' },
} as const;
const CONSENSUS_META = {
  worth: { label: '值得升', color: '#C03A28' },
  wait: { label: '等下版', color: '#52525B' },
  split: { label: '社区分化', color: '#B8860B' },
} as const;

/* ---------- 契合度环 ---------- */
function FitRing({ pct, size = 44 }: { pct: number; size?: number }) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }} title={`契合度 ${pct}%（站点评估，非实测）`}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="#FFFFFF" stroke="#F5F0E6" strokeWidth={4} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#B8860B"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - pct / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-gold">
        {pct}%
      </span>
    </div>
  );
}

/* ---------- 情绪堆叠条 ---------- */
function SentimentBar({ positive, mixed, negative }: { positive: number; mixed: number; negative: number }) {
  return (
    <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-paper">
      <motion.div
        className="h-full"
        style={{ backgroundColor: TONE_META.pos.color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${positive}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.div
        className="h-full"
        style={{ backgroundColor: TONE_META.mix.color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${mixed}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      />
      <motion.div
        className="h-full"
        style={{ backgroundColor: TONE_META.neg.color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${negative}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      />
    </div>
  );
}

/* ---------- 真 3D 柱阵雷达（Canvas 透视投影） ---------- */
function Radar3D({ data }: { data: { axis: string; value: number }[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 640;
    const H = 470;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const n = data.length;
    const cx = W / 2;
    const groundY = 352;
    const R = 172; // 圆阵半径
    const LR = R + 46; // 标签半径
    const maxH = 190; // 满分柱高
    const tilt = 0.3; // 地面倾斜
    const f = 560; // 焦距
    let rot = -Math.PI / 2;
    let raf = 0;
    let last = performance.now();

    const shade = (r: number, g: number, b: number, k: number) =>
      `rgb(${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)})`;

    const render = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      if (!hoverRef.current) rot += dt * 0.00032;
      ctx.clearRect(0, 0, W, H);

      // 地面网格环
      for (const v of [25, 50, 75, 100]) {
        ctx.beginPath();
        ctx.ellipse(cx, groundY, (R * v) / 100, (R * v * tilt) / 100, 0, 0, Math.PI * 2);
        ctx.strokeStyle = '#E7DFCC';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      // 放射轴线
      for (let i = 0; i < n; i++) {
        const a = (i * 2 * Math.PI) / n + rot;
        ctx.beginPath();
        ctx.moveTo(cx, groundY);
        ctx.lineTo(cx + R * Math.cos(a), groundY - R * Math.sin(a) * tilt);
        ctx.strokeStyle = '#EFE7D4';
        ctx.stroke();
      }

      // 按深度排序（远先近后）
      const items = data
        .map((d, i) => {
          const a = (i * 2 * Math.PI) / n + rot;
          return { d, a, z: R * Math.sin(a) };
        })
        .sort((p, q) => q.z - p.z);

      for (const { d, a, z } of items) {
        const near = (R - z) / (2 * R); // 1=最近 0=最远
        const k = 0.42 + 0.58 * near;
        const x = R * Math.cos(a);
        const s = f / (f + z);
        const sx = cx + x * s;
        const sy = groundY - z * tilt * s;
        const h = (d.value / 100) * maxH * s;
        const w = 13 * s;
        const dep = 9 * s;

        // 柱底投影
        ctx.beginPath();
        ctx.ellipse(sx + dep / 2, sy + 2, w * 1.5, w * 0.45, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,134,11,${0.1 + 0.12 * near})`;
        ctx.fill();

        // 正面
        ctx.fillStyle = shade(184, 134, 11, k);
        ctx.fillRect(sx - w, sy - h, 2 * w, h);
        // 顶面
        ctx.beginPath();
        ctx.moveTo(sx - w, sy - h);
        ctx.lineTo(sx - w + dep, sy - h - dep * 0.6);
        ctx.lineTo(sx + w + dep, sy - h - dep * 0.6);
        ctx.lineTo(sx + w, sy - h);
        ctx.closePath();
        ctx.fillStyle = shade(222, 176, 52, Math.min(1, k + 0.12));
        ctx.fill();
        // 侧面
        ctx.beginPath();
        ctx.moveTo(sx + w, sy - h);
        ctx.lineTo(sx + w + dep, sy - h - dep * 0.6);
        ctx.lineTo(sx + w + dep, sy - dep * 0.6);
        ctx.lineTo(sx + w, sy);
        ctx.closePath();
        ctx.fillStyle = shade(143, 106, 8, k);
        ctx.fill();

        // 柱顶数值
        ctx.font = `700 ${Math.max(9, Math.round(11 * s + 1))}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(160,110,8,${0.3 + 0.7 * near})`;
        ctx.fillText(String(d.value), sx + dep / 2, sy - h - dep * 0.6 - 7);

        // 轴标签（外圈，随柱阵旋转）
        const lz = LR * Math.sin(a);
        const ls = f / (f + lz);
        const lNear = (LR - lz) / (2 * LR);
        const lx = cx + LR * Math.cos(a) * ls;
        const ly = groundY - lz * tilt * ls + 14;
        ctx.font = `${Math.max(9, Math.round(11 * ls + 1))}px 'Inter', 'Noto Sans SC', sans-serif`;
        ctx.fillStyle = `rgba(82,82,91,${0.25 + 0.75 * lNear})`;
        ctx.fillText(d.axis, lx, ly);
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      className="h-auto w-full max-w-[560px]"
      style={{ aspectRatio: '640 / 470' }}
      onMouseEnter={() => {
        hoverRef.current = true;
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
      }}
    />
  );
}

/* ---------- 背景弹幕层（前景浮动） ---------- */
const PLATFORM_ICON: Record<PlatformId, string | null> = {
  reddit: '/platform-reddit.svg',
  hn: '/platform-ycombinator.svg',
  x: '/platform-x.svg',
  zhihu: '/platform-zhihu.svg',
  linuxdo: null,
  v2ex: '/platform-v2ex.svg',
  bilibili: '/platform-bilibili.svg',
};
const PLATFORM_NAME: Record<PlatformId, string> = {
  reddit: 'Reddit',
  hn: 'Hacker News',
  x: 'X',
  zhihu: '知乎',
  linuxdo: 'LINUX DO',
  v2ex: 'V2EX',
  bilibili: 'B站',
};

function DanmakuLayer({ items }: { items: DanmakuItem[] }) {
  if (items.length === 0) return null;
  const lanes = items.flatMap((d, i) => [
    { d, key: `${i}-a`, slot: 0, seed: i },
    { d, key: `${i}-b`, slot: 1, seed: i },
  ]);
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
      {lanes.map(({ d, key, slot, seed }) => {
        const icon = PLATFORM_ICON[d.platform];
        return (
          <span
            key={key}
            title={PLATFORM_NAME[d.platform]}
            className={cn(
              'danmaku-item pointer-events-auto absolute flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-white/90 shadow-sm backdrop-blur-[1px]',
              d.main
                ? 'border-gold/50 px-4 py-1.5 text-[13px] font-medium text-ink'
                : 'border-line px-3 py-1 text-sm text-ink-2',
            )}
            style={{
              top: `${(((seed * 137 + slot * 41) % 86) + 4)}%`,
              animationDuration: d.main ? (slot === 0 ? '46s' : '54s') : slot === 0 ? '62s' : '72s',
              animationDelay: `-${(seed * 6.7 + slot * 23.3).toFixed(1)}s`,
            }}
          >
            {icon ? (
              <img src={icon} alt="" className={d.main ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
            ) : (
              <span
                className={cn(
                  'flex items-center justify-center rounded-full bg-gold font-serif font-bold text-white',
                  d.main ? 'h-4 w-4 text-[11px]' : 'h-3.5 w-3.5 text-[9px]',
                )}
              >
                L
              </span>
            )}
            {d.text}
          </span>
        );
      })}
    </div>
  );
}

/* ---------- 版块小标（编辑部分栏题） ---------- */
function SubHead({ children, en }: { children: ReactNode; en: string }) {
  return (
    <h3 className="mb-3 flex items-baseline gap-2 border-b border-line pb-1.5 font-serif text-sm font-semibold text-ink">
      {children}
      <span className="font-mono text-[11px] font-normal tracking-[0.08em] text-ink-3">// {en}</span>
    </h3>
  );
}

/* ---------- 页面 ---------- */
export default function ModelDetail() {
  const { modelId } = useParams();
  const model = modelId ? modelMap[modelId] : undefined;
  const detail = modelId ? modelDetails[modelId] : undefined;
  const community = detail?.community;

  // 主卡雷达：有社区调研用十维体感，否则用六维属性
  const mainRadar: { axis: string; value: number }[] = useMemo(() => {
    if (!model) return [];
    return (
      community?.radar ?? [
        { axis: '代码', value: model.stats.code },
        { axis: '推理', value: model.stats.reasoning },
        { axis: '上下文', value: model.stats.context },
        { axis: '速度', value: model.stats.speed },
        { axis: '多模态', value: model.stats.multimodal },
        { axis: '性价比', value: model.stats.value },
      ]
    );
  }, [community, model]);

  // 词条内锚点标签页（按报纸版面顺序生成）
  const tabs = useMemo(() => {
    const t = [
      { id: 'md-overview', label: '头版' },
      { id: 'md-gear', label: '装备配队' },
    ];
    if (community) t.push({ id: 'md-voice', label: '口碑现场' });
    t.push({ id: 'md-record', label: '数据档案' }, { id: 'md-guides', label: '攻略信源' });
    return t;
  }, [community]);

  const [activeTab, setActiveTab] = useState('md-overview');
  const tabLockRef = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      // 点击触发的平滑滚动期间不做 scrollspy，避免中途标签来回闪
      if (Date.now() - tabLockRef.current < 900) return;
      let cur = tabs[0].id;
      for (const t of tabs) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top <= 160) cur = t.id;
      }
      setActiveTab(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tabs]);

  if (!model || !detail) return <Navigate to="/models" replace />;

  const sys = systemMap[model.system];
  const SYS = sys.color;

  // 规格参数（benchGroups 末组为规格组）移入主卡；榜单表只保留成绩组
  const specRows = detail.benchGroups[detail.benchGroups.length - 1]?.rows ?? [];
  const scoreGroups = detail.benchGroups.slice(0, -1);

  const relatedGuides = detail.guideIds
    .map((id) => guides.find((g) => g.id === id))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  // 压缩版榜单卡（带迷你条 + 榜首朱砂高亮）
  const benchCard = (
    <div className="overflow-hidden rounded-[10px] border border-line bg-white shadow-card">
      {scoreGroups.map((g, gi) => (
        <div key={g.label}>
          <div className={cn('bg-paper-alt px-4 py-1.5 font-serif text-sm font-semibold text-ink-2', gi > 0 && 'border-t border-line')}>
            {g.label}
          </div>
          <table className="w-full">
            <tbody>
              {g.rows.map((r) => {
                const m = r.value.match(/^(\d+(?:\.\d+)?)\s*%/);
                const pct = m ? Math.min(100, parseFloat(m[1])) : null;
                const isTop = /#1|纪录/.test(r.value);
                return (
                  <tr key={r.label} className="border-b border-line transition-colors last:border-0 hover:bg-gold-soft/60">
                    <td className="px-4 py-1.5 text-sm text-ink-2">{r.label}</td>
                    <td className="whitespace-nowrap px-4 py-1.5 text-right">
                      <span className={cn('font-mono text-sm font-bold', isTop ? 'text-cinnabar' : 'text-gold')}>{r.value}</span>
                      {pct != null && (
                        <span className="ml-2 inline-block h-1.5 w-14 overflow-hidden rounded-full bg-paper align-middle">
                          <motion.span
                            className={cn('block h-full rounded-full', isTop ? 'bg-cinnabar' : 'bg-gold')}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                          />
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
      {community?.benchmarkGap && (
        <p className="border-t border-line bg-gold-soft/40 px-4 py-2.5 text-xs leading-relaxed text-ink-2">
          <span className="font-serif font-semibold text-cinnabar">实测落差 · </span>
          {community.benchmarkGap}
        </p>
      )}
    </div>
  );

  // 压缩版思考强度档位卡
  const effortCard = detail.effortBench ? (
    <div className="overflow-x-auto rounded-[10px] border border-line bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-line bg-paper-alt px-4 py-1.5">
        <span className="font-serif text-sm font-semibold text-ink-2">思考强度 · 档位实测</span>
        <span className="font-mono text-[11px] text-ink-3">// EFFORT</span>
      </div>
      <table className="w-full min-w-[400px]">
        <thead>
          <tr className="border-b border-line text-left">
            <th className="px-3 py-1.5 font-serif text-xs font-semibold text-ink-3">Benchmark</th>
            {detail.effortBench.levels.map((lv) => (
              <th key={lv} className="px-3 py-1.5 text-right font-mono text-xs font-semibold text-gold">
                {lv}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {detail.effortBench.rows.map((row) => {
            const nums = row.values.filter((v): v is number => v != null);
            const max = nums.length > 0 ? Math.max(...nums) : null;
            return (
              <tr key={row.name} className="border-b border-line transition-colors last:border-0 hover:bg-gold-soft/60">
                <td className="px-3 py-1.5 text-sm text-ink-2">
                  {row.name}
                  {row.note && <span className="ml-1.5 font-mono text-[11px] text-ink-3">{row.note}</span>}
                </td>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className={cn(
                      'px-3 py-1.5 text-right font-mono text-sm',
                      v == null ? 'text-ink-3' : v === max ? 'font-bold text-cinnabar' : 'text-ink',
                    )}
                  >
                    {v == null ? '—' : `${v}%`}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="border-t border-line px-3 py-1.5 font-mono text-[11px] text-ink-3">
        仅支持 effort 调节的模型展示 · 朱砂加粗为该行最佳档位
      </p>
    </div>
  ) : null;

  return (
    <div className="relative">
      <DanmakuLayer items={community?.danmaku ?? []} />

      {/* S1 报头行：面包屑 + 日期线 */}
      <section className="relative overflow-hidden border-b border-line bg-paper-alt py-5">
        <div className="cloud-line pointer-events-none absolute inset-x-0 bottom-0 h-[20px] opacity-50" aria-hidden />
        <div className="relative mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 md:px-6">
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-sm text-ink-2"
            aria-label="面包屑"
          >
            <Link to="/" className="transition-colors hover:text-cinnabar">首页</Link>
            <span className="text-ink-3">/</span>
            <Link to="/models" className="transition-colors hover:text-cinnabar">角色图鉴</Link>
            <span className="text-ink-3">/</span>
            <span className="text-ink-3">{model.name}</span>
          </motion.nav>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="font-mono text-xs text-ink-3"
          >
            {model.unreleased ? '状态 未发布' : `发布 ${model.releaseDate}`} · 收录 {model.collectedDate} · 本词条持续更新
          </motion.span>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 md:px-6">
        {/* S2 头版：头条 + 导语 + 速览栏 + 柱阵雷达 */}
        <section id="md-overview" className="mt-6 scroll-mt-[130px] overflow-hidden rounded-xl border border-line bg-white shadow-card lg:grid lg:grid-cols-[6fr_5fr]">
          {/* 左：头条文字区 */}
          <div className="flex flex-col p-6 md:p-8">
            {/* 栏题（kicker） */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <span className="shrink-0 font-mono text-[11px] font-semibold tracking-[0.25em] text-gold">MODEL FILE · 角色档案</span>
              <span className="h-px flex-1 bg-gold/40" aria-hidden />
              <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-ink-3">{detail.profile.vendor}</span>
            </motion.div>

            {/* 身份行：徽记 + 段位 + 体系 + 标签 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-4 flex flex-wrap items-center gap-3"
            >
              <div className="gold-sheen animate-gold-shine shrink-0 rounded-full p-[2px]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white">
                  <img src={sys.sigil} alt={`${sys.name}徽记`} className="h-7 w-7 object-contain" />
                </div>
              </div>
              <TierSeal tier={model.tier} size={22} />
              <StarRating stars={model.stars} size={11} />
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-[0.04em] text-white"
                style={{ backgroundColor: SYS }}
              >
                <img src={sys.sigil} alt="" className="h-3 w-3" />
                {sys.name}
              </span>
              {model.tags.map((t) => (
                <span key={t} className="rounded-full bg-paper px-2.5 py-0.5 text-xs tracking-[0.04em] text-ink-2">
                  {t}
                </span>
              ))}
            </motion.div>

            {/* 头条标题 + 封号 */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1"
            >
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">{model.name}</h1>
              <span className="font-brand text-xl text-cinnabar md:text-2xl">「{model.title}」</span>
            </motion.div>

            {/* 导语（lede）：首字下沉，结论先行 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 font-serif text-lg leading-loose text-ink-2 first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-[2.6rem] first-letter:font-bold first-letter:leading-[1.05] first-letter:text-cinnabar"
            >
              {model.verdict}
            </motion.p>

            {/* 速览栏 + 档案注脚 + CTA */}
            <div className="mt-auto pt-6">
              <div className="flex items-center gap-3">
                <span className="shrink-0 font-mono text-[11px] tracking-[0.2em] text-ink-3">速览 // AT A GLANCE</span>
                <span className="h-px flex-1 bg-line" aria-hidden />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
                {specRows.map((r, i) => (
                  <motion.div
                    key={r.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.3 + i * 0.05 }}
                    className="bg-white px-3 py-2.5"
                  >
                    <div className="text-xs text-ink-3">{r.label}</div>
                    <div className="mt-0.5 break-words font-mono text-sm font-bold leading-snug text-gold">{r.value}</div>
                  </motion.div>
                ))}
                {/* 补足网格末格：综合战力 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.3 + specRows.length * 0.05 }}
                  className="bg-gold-soft/60 px-3 py-2.5"
                >
                  <div className="text-xs text-ink-3" title="站点主观评估，非实测">综合战力 · 站点评分</div>
                  <div className="mt-0.5 font-mono text-sm font-bold leading-snug text-cinnabar">
                    {model.unreleased ? '未发布' : model.composite}
                  </div>
                </motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.55 }}
                className="mt-2.5 font-mono text-[11px] leading-relaxed text-ink-3"
              >
                诨名 {detail.profile.nicknames.join(' / ')} · 招牌 {detail.profile.signature} · {detail.profile.costNote}
              </motion.p>
              {/* CTA */}
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/tools"
                  className="rounded-lg bg-cinnabar px-5 py-2.5 text-sm font-medium text-white shadow-card transition-all duration-200 hover:scale-[1.02] hover:bg-cinnabar-deep active:scale-[0.98]"
                >
                  加入配队模拟 →
                </Link>
                <Link
                  to="/guides"
                  className="rounded-lg border border-line-strong bg-white px-5 py-2.5 text-sm font-medium text-gold transition-all duration-200 hover:border-gold hover:text-cinnabar"
                >
                  查看相关攻略
                </Link>
              </div>
            </div>
          </div>

          {/* 右：3D 立体雷达 */}
          <div className="relative flex items-center justify-center overflow-hidden border-t border-line bg-gradient-to-bl from-gold-soft via-gold-soft/70 to-paper-alt p-6 lg:min-h-[430px] lg:border-l lg:border-t-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex w-full flex-col items-center"
            >
              <Radar3D data={mainRadar} />
              <p className="mt-1 font-mono text-xs text-ink-3">
                {community ? '十维体感' : '六维属性'} · 柱阵 · 0–100 · 悬停停止旋转
              </p>
            </motion.div>
            {/* 四角云纹金线框 */}
            <div className="pointer-events-none absolute inset-3 border border-gold/40" aria-hidden />
            {(['left-1.5 top-1.5 border-l-2 border-t-2', 'right-1.5 top-1.5 border-r-2 border-t-2', 'bottom-1.5 left-1.5 border-b-2 border-l-2', 'bottom-1.5 right-1.5 border-b-2 border-r-2'] as const).map(
              (pos) => (
                <span key={pos} className={cn('pointer-events-none absolute h-5 w-5 border-gold', pos)} aria-hidden />
              ),
            )}
          </div>

          {/* 要点栏：擅长 / 不擅长（并入头版的 KEY POINTS 框） */}
          <div className="grid gap-x-8 gap-y-4 border-t border-line px-6 py-4 sm:grid-cols-2 md:px-8 lg:col-span-2">
            <div>
              <h3 className="font-serif text-sm font-semibold text-cinnabar">
                擅长 <span className="ml-1 font-mono text-[11px] font-normal text-ink-3">// BEST AT</span>
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {detail.trialGood.map((t, i) => (
                  <motion.span
                    key={t.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 16, delay: 0.5 + i * 0.06 }}
                  >
                    <Link
                      to={t.to}
                      className="inline-block rounded-full bg-cinnabar/10 px-3 py-1.5 text-sm font-medium text-cinnabar transition-colors duration-200 hover:bg-cinnabar hover:text-white"
                    >
                      {t.label}
                    </Link>
                  </motion.span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold text-ink-3">
                不擅长 <span className="ml-1 font-mono text-[11px] font-normal text-ink-3">// NOT FOR</span>
              </h3>
              <ul className="mt-2 space-y-1.5">
                {detail.trialBad.map((t, i) => (
                  <motion.li
                    key={t.label}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.55 + i * 0.06 }}
                    className="flex flex-wrap items-center gap-2"
                  >
                    <Link
                      to={t.to}
                      className="inline-block rounded-full bg-paper px-3 py-1.5 text-sm font-medium text-ink-2 transition-colors duration-200 hover:bg-ink-3 hover:text-white"
                    >
                      {t.label}
                    </Link>
                    {t.note && <span className="font-mono text-xs text-ink-3">（{t.note}）</span>}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* S2.5 版面标签页（吸顶页内导航） */}
        <nav
          className="sticky top-[60px] z-30 -mx-4 mt-4 overflow-x-auto bg-paper/45 px-4 py-1.5 backdrop-blur-[6px] md:-mx-6 md:px-6"
          aria-label="词条导航"
        >
          <div className="flex gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  // 立即切换高亮并播放金点滑动动画，滚动同时进行
                  tabLockRef.current = Date.now();
                  setActiveTab(t.id);
                  document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={cn(
                  'relative shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200',
                  activeTab === t.id ? 'text-gold' : 'text-ink-3/70 hover:text-gold',
                )}
              >
                {t.label}
                {activeTab === t.id && (
                  <motion.span
                    layoutId="md-tab-dot"
                    className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* S4 装备与配队：怎么把它用起来 */}
        <section id="md-gear" className="mt-12 scroll-mt-[130px]">
          <SectionHeader title="装备与配队 · 上手" en="// LOADOUT" moreTo="/harnesses" moreLabel="全部装备 →" barColor={SECTION_BAR} />
          <div className="space-y-8">
            {/* 推荐装备（实战评测并入卡内） */}
            <div>
              <SubHead en="BEST IN SLOT">推荐装备</SubHead>
              <div className="grid gap-4 md:grid-cols-3">
                {detail.bestInSlot.map((b, i) => {
                  const h = harnessMap[b.id];
                  if (!h) return null;
                  const fit = h.topFits.find((f) => f.modelId === model.id)?.pct ?? null;
                  const review = community?.harnessReviews?.find((r) => r.id === b.id);
                  return (
                    <Reveal key={b.id} delay={i * 0.1}>
                      <div className="relative pt-3">
                        {fit != null && (
                          <div className="absolute right-3 top-0 z-10">
                            <FitRing pct={fit} />
                          </div>
                        )}
                        <HarnessCard harness={h} />
                        <div className="mt-2 space-y-1.5 px-1">
                          <p className="font-serif text-sm italic text-ink-2">「{b.note}」</p>
                          {review && (
                            <p className="border-t border-line/70 pt-1.5 text-[13px] leading-[1.7] text-ink-2">
                              <span className="mr-1 font-mono text-[11px] font-semibold text-gold">实战 //</span>
                              {review.text}
                              {review.placeholder && <span className="ml-1 font-mono text-[11px] text-ink-3">（占位 · 待补）</span>}
                            </p>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
            {/* 推荐配队 */}
            <div>
              <SubHead en="TEAMS">推荐配队</SubHead>
              <div className="space-y-4">
                {detail.teamIds.map((id, i) => {
                  const team = teams.find((t) => t.id === id);
                  if (!team) return null;
                  return (
                    <Reveal key={id} delay={i * 0.1}>
                      <TeamCard team={team} />
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* S5 口碑现场：情绪、引语与社区原声 */}
        {community && (
          <section id="md-voice" className="mt-12 scroll-mt-[130px]">
            <SectionHeader title="口碑现场 · 社区体感" en="// VOX POP" barColor={SECTION_BAR} />
            <div className="space-y-4">
              {/* 十维体感雷达（左右夹强弱项） */}
              <Reveal>
                <div className="flex flex-col rounded-[10px] border border-line bg-white p-4 shadow-card">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* 左：公认强项 */}
                    <div className="sm:w-[26%] sm:shrink-0">
                      <h3 className="font-serif text-sm font-semibold text-gold">公认强项</h3>
                      <div className="mt-2 flex flex-wrap gap-1.5 sm:flex-col sm:items-start">
                        {community.strengths.map((s, i) => (
                          <motion.span
                            key={s}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.06 }}
                            className="rounded-full bg-gold/10 px-2.5 py-1 text-sm font-medium text-gold"
                          >
                            {s}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    {/* 中：雷达 */}
                    <motion.div
                      className="min-w-0 flex-1"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ type: 'spring', stiffness: 180, damping: 15 }}
                      style={{ transformOrigin: 'center' }}
                    >
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={community.radar} outerRadius="62%">
                          <PolarGrid stroke="#E7DFCC" />
                          <PolarAngleAxis dataKey="axis" tick={{ fill: '#6E6455', fontSize: 11 }} />
                          <Radar
                            name={model.name}
                            dataKey="value"
                            stroke="#B8860B"
                            strokeWidth={2}
                            fill="#B8860B"
                            fillOpacity={0.25}
                            dot={{ r: 3, fill: '#B8860B', strokeWidth: 0 }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </motion.div>
                    {/* 右：公认弱项 */}
                    <div className="sm:w-[26%] sm:shrink-0">
                      <h3 className="font-serif text-sm font-semibold text-cinnabar sm:text-right">公认弱项</h3>
                      <div className="mt-2 flex flex-wrap gap-1.5 sm:flex-col sm:items-end">
                        {community.weaknesses.map((s, i) => (
                          <motion.span
                            key={s}
                            initial={{ opacity: 0, x: 8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.06 }}
                            className="rounded-full bg-cinnabar/10 px-2.5 py-1 text-sm font-medium text-cinnabar"
                          >
                            {s}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-1 text-center font-mono text-xs text-ink-3">
                    社区体感评分（0–100，非官方跑分）· 聚合多平台讨论
                  </p>
                </div>
              </Reveal>

              <div className="grid items-start gap-4 lg:grid-cols-[7fr_5fr]">
                {/* 情绪 + 分平台 */}
                <Reveal delay={0.06}>
                  <div className="rounded-[10px] border border-line bg-white shadow-card">
                    <div className="px-4 pb-3 pt-3.5">
                      <h3 className="font-serif text-sm font-semibold text-ink">整体情绪倾向</h3>
                      <div className="mt-2.5">
                        <SentimentBar {...community.sentiment} />
                        <div className="mt-2 flex justify-between font-mono text-xs">
                          <span style={{ color: TONE_META.pos.color }}>正面 {community.sentiment.positive}%</span>
                          <span style={{ color: TONE_META.mix.color }}>混合 {community.sentiment.mixed}%</span>
                          <span style={{ color: TONE_META.neg.color }}>负面 {community.sentiment.negative}%</span>
                        </div>
                      </div>
                      <p className="mt-2.5 border-t border-line pt-2 text-xs leading-relaxed text-ink-2">
                        跨平台综合：能力层面高度认可，使用体验层面争议集中——「分数高但体感差」是核心矛盾。
                      </p>
                    </div>
                    <div className="border-t border-line bg-paper-alt px-4 py-1.5">
                      <h3 className="font-serif text-sm font-semibold text-ink-2">分平台情绪</h3>
                    </div>
                    {community.platforms.map((p, i) => (
                      <div key={p.name} className={cn('flex items-start gap-3 px-4 py-2', i > 0 && 'border-t border-line')}>
                        <span className="w-20 shrink-0 pt-0.5 font-mono text-sm font-bold text-ink">{p.name}</span>
                        <span
                          className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium text-white"
                          style={{ backgroundColor: TONE_META[p.tone].color }}
                        >
                          {TONE_META[p.tone].label}
                        </span>
                        <p className="text-sm leading-[1.6] text-ink-2">{p.summary}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
                {/* 细分反馈 + 讨论热度 */}
                <div className="space-y-4">
                  <Reveal delay={0.1}>
                    <div className="divide-y divide-line rounded-[10px] border border-line bg-white px-4 shadow-card">
                      {community.notes.map((n) => (
                        <div key={n.label} className="flex gap-3 py-2.5">
                          <span className="w-10 shrink-0 pt-0.5 font-serif text-sm font-semibold text-gold">{n.label}</span>
                          <p className="text-sm leading-[1.7] text-ink-2">{n.text}</p>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                  {community.heat && (
                    <Reveal delay={0.14}>
                      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-line bg-line shadow-card sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        {community.heat.map((hh) => (
                          <div key={hh.label} className="bg-white px-3 py-2.5 text-center">
                            <div className="font-mono text-base font-bold text-gold">{hh.value}</div>
                            <div className="mt-0.5 text-xs text-ink-3">{hh.label}</div>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  )}
                </div>
              </div>

              {/* 名家锐评：双行右往左轮播，悬停暂停 */}
              {community.expertQuotes && (
                <div className="pt-2">
                  <SubHead en="QUOTED">名家锐评</SubHead>
                  <div className="space-y-3">
                    {[0, 1].map((ri) => {
                      const half = Math.ceil(community.expertQuotes!.length / 2);
                      const row = community.expertQuotes!.slice(ri * half, ri * half + half);
                      return (
                        <div
                          key={ri}
                          className="overflow-hidden"
                          style={{
                            maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
                          }}
                        >
                          <div
                            className="verdict-track flex w-max gap-3"
                            style={{ animationDuration: ri === 0 ? '80s' : '105s' }}
                          >
                            {[...row, ...row].map((q, qi) => (
                              <figure
                                key={qi}
                                className="relative w-[360px] shrink-0 overflow-hidden rounded-[10px] border border-line bg-white py-3 pl-4 pr-3.5 shadow-card"
                              >
                                <span
                                  className="absolute left-0 top-0 h-full w-[3px]"
                                  style={{ backgroundColor: TONE_META[q.tone].color }}
                                  aria-hidden
                                />
                                <span className="pointer-events-none absolute -top-1 right-2 font-serif text-4xl leading-none text-gold/25" aria-hidden>
                                  ”
                                </span>
                                <blockquote className="line-clamp-3 font-serif text-sm italic leading-[1.7] text-ink-2">
                                  「{q.text}」
                                </blockquote>
                                <figcaption className="mt-1.5 text-right text-xs">
                                  <span className="font-semibold text-ink">{q.name}</span>
                                  <span className="ml-1.5 font-mono text-ink-3">{q.role}</span>
                                </figcaption>
                              </figure>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* S6 数据档案：榜单、档位、争议共识、版本大事记（考据区，全量平铺） */}
        <section id="md-record" className="mt-12 scroll-mt-[130px]">
          <SectionHeader title="数据档案 · 榜单与变迁" en="// THE RECORD" barColor={SECTION_BAR} />
          <div className="grid items-start gap-4 lg:grid-cols-2">
            {/* 左：榜单成绩 + 争议事件 */}
            <div className="space-y-4">
              <Reveal>{benchCard}</Reveal>
              {community && (
                <Reveal delay={0.08}>
                  <div className="rounded-[10px] border border-line bg-white shadow-card">
                    <div className="border-b border-line px-4 py-2.5">
                      <h3 className="font-serif text-sm font-semibold text-ink">
                        争议事件 <span className="ml-1 font-mono text-xs font-normal text-ink-3">// CONTROVERSIES</span>
                      </h3>
                    </div>
                    <div className="divide-y divide-line">
                      {community.controversies.map((c) => (
                        <details key={c.event.slice(0, 12)} className="group px-4 py-2.5">
                          <summary className="cursor-pointer list-none text-sm leading-[1.7] text-ink-2 transition-colors group-open:text-ink">
                            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cinnabar align-middle" aria-hidden />
                            {c.event}
                          </summary>
                          {c.response && (
                            <p className="mt-2 rounded-[6px] bg-paper px-3 py-2 text-xs leading-relaxed text-ink-2">
                              <span className="font-serif font-semibold text-gold">官方回应 · </span>
                              {c.response}
                            </p>
                          )}
                        </details>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
            {/* 右：effort 档位 + 子榜单 + 升级共识 */}
            <div className="space-y-4">
              {effortCard && <Reveal delay={0.04}>{effortCard}</Reveal>}
              {community?.subBoards && (
                <Reveal delay={0.08}>
                  <div className="rounded-[10px] border border-line bg-white shadow-card">
                    <div className="border-b border-line bg-paper-alt px-4 py-1.5">
                      <span className="font-serif text-sm font-semibold text-ink-2">
                        子榜单交叉 <span className="ml-1 font-mono text-[11px] font-normal text-ink-3">// SUB-BOARDS</span>
                      </span>
                    </div>
                    {community.subBoards.map((b, i) => (
                      <div key={b.name} className={cn('flex items-baseline justify-between gap-3 px-4 py-2', i > 0 && 'border-t border-line')}>
                        <span className="shrink-0 text-sm text-ink-2">{b.name}</span>
                        <span className="text-right">
                          <span className="font-mono text-sm font-bold text-gold">{b.rank}</span>
                          {b.note && <span className="ml-1.5 font-mono text-[11px] text-ink-3">{b.note}</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}
              {community && (
                <Reveal delay={0.12}>
                  <div className="rounded-[10px] border border-line bg-white p-4 shadow-card">
                    <h3 className="font-serif text-sm font-semibold text-ink">
                      升级共识 <span className="ml-1 font-mono text-xs font-normal text-ink-3">// UPGRADE?</span>
                    </h3>
                    <div className="mt-3 flex items-center gap-3">
                      <span
                        className="flex h-14 w-14 shrink-0 rotate-3 items-center justify-center rounded-[8px] font-serif text-[13px] font-bold leading-tight text-white shadow-card"
                        style={{ backgroundColor: CONSENSUS_META[community.upgradeConsensus].color }}
                      >
                        {CONSENSUS_META[community.upgradeConsensus].label}
                      </span>
                      <p className="flex-1 text-sm leading-[1.7] text-ink-2">{community.consensusNote}</p>
                    </div>
                    <p className="mt-3 border-t border-line pt-2.5 font-mono text-[11px] text-ink-3">// 社区态度随版本与官方修复持续变化</p>
                  </div>
                </Reveal>
              )}
            </div>
          </div>

          {/* 版本变迁 · 大事记 */}
          {(community?.versionDelta || community?.timeline || community?.demos) && (
            <div className="mt-8">
              <SubHead en="PATCH NOTES & TIMELINE">版本变迁 · 大事记</SubHead>
              <div className={cn('grid items-stretch gap-4', community?.timeline && 'lg:grid-cols-[4fr_8fr]')}>
                {/* 左：发布大事记长条 */}
                {community?.timeline && (
                  <Reveal className="h-full">
                    <div className="flex h-full flex-col rounded-[10px] border border-line bg-white shadow-card">
                      <div className="border-b border-line px-4 py-2.5 font-serif text-sm font-semibold text-ink">
                        发布大事记 <span className="ml-1 font-mono text-xs font-normal text-ink-3">// TIMELINE</span>
                      </div>
                      <ol className="ml-4 flex-1 border-l border-line py-2">
                        {community.timeline.map((t) => (
                          <li key={t.date} className="relative px-4 py-1.5">
                            <span className="absolute -left-[5px] top-[13px] h-2 w-2 rounded-full bg-gold" aria-hidden />
                            <span className="font-mono text-xs font-bold text-gold">{t.date}</span>
                            <p className="text-sm leading-[1.6] text-ink-2">{t.event}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </Reveal>
                )}
                {/* 右：版本变迁（精进/失守）+ 官方演示 */}
                <div className="space-y-4">
                  {community?.versionDelta && (
                    <div>
                      <p className="mb-3 text-sm text-ink-3">对照基准：{community.versionDelta.base}</p>
                      <div className="grid items-start gap-4 sm:grid-cols-2">
                        <Reveal>
                          <div className="rounded-[10px] border border-line bg-white shadow-card">
                            <div className="border-b border-line px-4 py-2.5 font-serif text-sm font-semibold text-gold">精进</div>
                            <ul className="divide-y divide-line">
                              {community.versionDelta.improves.map((s) => (
                                <li key={s} className="flex gap-2.5 px-4 py-2 text-sm leading-[1.6] text-ink-2">
                                  <span className="shrink-0 font-mono font-bold text-gold">↑</span>
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Reveal>
                        <Reveal delay={0.08}>
                          <div className="rounded-[10px] border border-line bg-white shadow-card">
                            <div className="border-b border-line px-4 py-2.5 font-serif text-sm font-semibold text-cinnabar">失守</div>
                            <ul className="divide-y divide-line">
                              {community.versionDelta.regresses.map((s) => (
                                <li key={s} className="flex gap-2.5 px-4 py-2 text-sm leading-[1.6] text-ink-2">
                                  <span className="shrink-0 font-mono font-bold text-cinnabar">↓</span>
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Reveal>
                      </div>
                    </div>
                  )}
                  {community?.demos && (
                    <div>
                      <h3 className="mb-4 pt-1 font-serif text-sm font-semibold text-ink">
                        官方演示 <span className="ml-1 font-mono text-xs font-normal text-ink-3">// DEMOS</span>
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-3">
                        {community.demos.map((d, i) => (
                          <Reveal key={d.title} delay={0.06 + i * 0.06} className="h-full">
                            <div className={cn('h-full rounded-[10px] border bg-white p-4 shadow-card', d.placeholder ? 'border-dashed border-line-strong' : 'border-line')}>
                              <h4 className="font-serif text-[13px] font-semibold text-ink">{d.title}</h4>
                              <p className="mt-2 text-sm leading-[1.7] text-ink-2">{d.desc}</p>
                              {d.placeholder && <p className="mt-2 font-mono text-[11px] text-ink-3">// 占位 · 待补实测</p>}
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* S7 编辑室：相关攻略 + 存疑与信源 */}
        <section id="md-guides" className="my-12 scroll-mt-[130px]">
          <SectionHeader title="攻略与信源" en="// GUIDES & CITATIONS" moreTo="/guides" moreLabel="攻略阁 →" barColor={SECTION_BAR} />
          <Reveal>
            <div className="divide-y divide-line rounded-[10px] border border-line bg-white px-2 py-1 shadow-card">
              {relatedGuides.map((g) => {
                const cat = guideCategories.find((c) => c.id === g.category);
                return (
                  <Link
                    key={g.id}
                    to="/guides"
                    className="group block rounded-[6px] px-3 py-3 transition-colors duration-150 hover:bg-bg-alt"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="shrink-0 rounded-[4px] border px-1.5 py-px font-mono text-[11px]"
                        style={{ color: cat?.color ?? '#52525B', borderColor: 'currentColor' }}
                      >
                        {g.category}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink transition-colors duration-150 group-hover:text-gold">
                        {g.title}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-ink-3">
                        {g.pending ? '待撰写' : '已撰写'}
                      </span>
                    </div>
                    {g.excerpt && (
                      <p className="mt-1.5 line-clamp-2 text-sm leading-[1.7] text-ink-2 sm:pl-[52px]">{g.excerpt}</p>
                    )}
                  </Link>
                );
              })}
            </div>
          </Reveal>
          {(community?.uncertainties || community?.sources) && (
            <div className="mt-4 grid items-start gap-4 lg:grid-cols-[5fr_7fr]">
              {community?.uncertainties && (
                <Reveal>
                  <div className="rounded-[10px] border border-line bg-white shadow-card">
                    <div className="border-b border-line px-4 py-2.5 font-serif text-sm font-semibold text-ink">
                      存疑标注 <span className="ml-1 font-mono text-xs font-normal text-ink-3">// UNCERTAIN</span>
                    </div>
                    <ul className="divide-y divide-line">
                      {community.uncertainties.map((u) => (
                        <li key={u} className="flex gap-2.5 px-4 py-2 text-sm leading-[1.6] text-ink-2">
                          <span className="shrink-0 text-cinnabar">◇</span>
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
              {community?.sources && (
                <Reveal delay={0.08}>
                  <div className="rounded-[10px] border border-line bg-white shadow-card">
                    <details className="group">
                      <summary className="cursor-pointer list-none px-4 py-2.5 font-serif text-sm font-semibold text-ink">
                        参考来源
                        <span className="ml-1 font-mono text-xs font-normal text-ink-3">
                          // {community.sources.length} 条 · 点击展开
                        </span>
                      </summary>
                      <ul className="divide-y divide-line border-t border-line">
                        {community.sources.map((s) => (
                          <li key={s.url} className="px-4 py-2">
                            <a href={s.url} target="_blank" rel="noreferrer" className="text-sm text-gold transition-colors hover:text-cinnabar">
                              {s.title} ↗
                            </a>
                            <span className="ml-2 font-mono text-[11px] text-ink-3">{s.platform}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </Reveal>
              )}
            </div>
          )}
        </section>

        {/* FAQ 区（SEO：SoftwareApplication + FAQPage 结构化数据承载） */}
        {model && (
          <section className="mt-10">
            <Reveal>
              <div className="rounded-[10px] border border-line bg-white shadow-card">
                <div className="border-b border-line px-4 py-2.5 font-serif text-sm font-semibold text-ink">
                  常见问题 <span className="ml-1 font-mono text-xs font-normal text-ink-3">// FAQ</span>
                </div>
                <div className="divide-y divide-line">
                  {[
                    { q: `${model.name} 适合写什么代码？`, a: `${model.name} 的定位是「${model.title}」：${model.verdict}。擅长标签：${model.tags.join(' / ')}。具体场景建议参考「配队」与「攻略」栏目。` },
                    { q: `${model.name} 多少钱？`, a: `${model.name} ${model.priceIn == null ? model.priceLabel : `输入 $${model.priceIn} / 百万 token，输出 $${model.priceOut} / 百万 token`}。${model.system === 'deepseek' ? '开源可自部署，部署后按自有算力成本计。' : '具体按量计费见官方定价。'}` },
                    { q: `${model.name} 的上下文多大？`, a: `${model.contextLabel} tokens${model.maxOutputTokens ? `，单次输出上限 ${model.maxOutputTokens.toLocaleString()} tokens` : ''}。适合${model.contextTokens >= 1_000_000 ? '整库级长文档、大仓理解' : model.contextTokens >= 200_000 ? '长文档与中型仓库' : '常规代码任务'}。` },
                    { q: `${model.name} 和同档模型怎么选？`, a: `可到「对决」栏目查看 ${model.name} 参与的对比：SWE-bench、价格、上下文、场景结论一页看懂。` },
                  ].map((f) => (
                    <details key={f.q} className="group">
                      <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-ink">
                        {f.q}
                        <span className="font-mono text-xs text-ink-3 transition-transform duration-200 group-open:rotate-45">+</span>
                      </summary>
                      <p className="border-t border-line px-4 py-3 text-sm leading-[1.7] text-ink-2">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>
        )}
      </div>
    </div>
  );
}
