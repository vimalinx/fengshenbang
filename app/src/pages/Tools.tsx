import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import {
  Coins,
  Flame,
  Users,
  Plus,
  X,
  Sparkles,
  Wand2,
  Lightbulb,
  Info,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import { Reveal } from '@/components/Reveal';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { models, modelMap, systemMap, modelAvatar } from '@/data/models';
import type { Model, SystemId } from '@/data/models';
import { harnesses, harnessMap } from '@/data/harnesses';
import type { HarnessType } from '@/data/harnesses';
import { trials } from '@/data/trials';
import { teamStyles } from '@/data/teams';
import type { TeamStyleId } from '@/data/teams';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* 通用小工具                                                          */
/* ------------------------------------------------------------------ */

const CNY_PER_USD = 7.2;

function fmtCNY(n: number, digits = 0): string {
  return `¥${n.toLocaleString('zh-CN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;
}

function fmtTok(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M tok`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}k tok`;
  return `${Math.round(n)} tok`;
}

/** count-up：旧值 tween 到新值 */
function useCountUp(target: number, duration = 600): number {
  const [val, setVal] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const from = prev.current;
    prev.current = target;
    if (from === target) {
      setVal(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const e = 1 - Math.pow(1 - p, 2);
      setVal(from + (target - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function CountUpText({
  value,
  format,
  className,
  duration = 600,
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
  duration?: number;
}) {
  const v = useCountUp(value, duration);
  return <span className={className}>{format(v)}</span>;
}

/** 体系小圆点 */
function SystemDot({ system }: { system: SystemId }) {
  return (
    <span
      className="inline-block h-2 w-2 shrink-0 rounded-full"
      style={{ backgroundColor: systemMap[system].color }}
      aria-hidden
    />
  );
}

/* ------------------------------------------------------------------ */
/* 工具一：成本计算器「灵石算盘」                                       */
/* ------------------------------------------------------------------ */

const COMPARE_IDS = [
  'claude-opus-4-7',
  'gpt-5-2',
  'gemini-3-pro',
  'claude-sonnet-4-6',
  'deepseek-v4',
  'qwen3-max',
];

/** 对数刻度 <-> 滑杆位置 */
function logToPos(v: number, min: number, max: number): number {
  return ((Math.log10(v) - Math.log10(min)) / (Math.log10(max) - Math.log10(min))) * 100;
}
function posToLog(pos: number, min: number, max: number): number {
  const v = Math.pow(10, Math.log10(min) + (pos / 100) * (Math.log10(max) - Math.log10(min)));
  // 保留两位有效数字，读起来干净
  const mag = Math.pow(10, Math.floor(Math.log10(v)) - 1);
  return Math.round(v / mag) * mag;
}

function modelMonthlyUSD(m: Model, inTok: number, outTok: number, days: number, hours: number): number {
  if (m.priceIn == null || m.priceOut == null) return 0; // 自部署
  const scale = hours / 4; // 以 4h/日 为基准用量
  return (((inTok * m.priceIn + outTok * m.priceOut) / 1_000_000) * days * scale);
}

function CostCalculator() {
  const [modelId, setModelId] = useState('claude-opus-4-7');
  const [harnessId, setHarnessId] = useState('claude-code');
  const [hours, setHours] = useState(4);
  const [inPos, setInPos] = useState(() => logToPos(800_000, 10_000, 2_000_000));
  const [outPos, setOutPos] = useState(() => logToPos(120_000, 5_000, 500_000));
  const [days, setDays] = useState(22);

  const model = modelMap[modelId];
  const harness = harnessId === 'none' ? null : harnessMap[harnessId];
  const inTok = posToLog(inPos, 10_000, 2_000_000);
  const outTok = posToLog(outPos, 5_000, 500_000);

  const tokenUSD = modelMonthlyUSD(model, inTok, outTok, days, hours);
  const tokenFee = tokenUSD * CNY_PER_USD;
  const harnessFee = (harness?.monthlyUSD ?? 0) * CNY_PER_USD;
  const total = tokenFee + harnessFee;
  const totalUSD = tokenUSD + (harness?.monthlyUSD ?? 0);

  const compare = useMemo(() => {
    const rows = COMPARE_IDS.map((id) => {
      const m = modelMap[id];
      const usd = modelMonthlyUSD(m, inTok, outTok, days, hours);
      return { id, name: m.name, system: m.system, cny: usd * CNY_PER_USD + harnessFee };
    });
    return rows.sort((a, b) => b.cny - a.cny);
  }, [inTok, outTok, days, hours, harnessFee]);
  const maxCompare = Math.max(...compare.map((r) => r.cny), 1);

  // 省钱锦囊
  const tip = useMemo(() => {
    const cheaper = compare
      .filter((r) => r.id !== modelId && r.cny < total)
      .sort((a, b) => a.cny - b.cny)[0];
    const parts: string[] = [];
    if (cheaper) {
      const pct = Math.round((1 - cheaper.cny / total) * 100);
      parts.push(`若改用 ${cheaper.name}，同用量可省 ${pct}%`);
    } else {
      parts.push('当前组合已是同档用量下的省钱之选');
    }
    if (model.composite >= 88 && hours > 2) {
      const sonnet = modelMap['claude-sonnet-4-6'];
      const sonnetFee =
        modelMonthlyUSD(sonnet, inTok, outTok, days, hours) * CNY_PER_USD + harnessFee;
      const blended =
        (tokenFee * 2) / hours + (sonnetFee * (hours - 2)) / hours + harnessFee;
      if (blended < total) {
        const pct = Math.round((1 - blended / total) * 100);
        parts.push(
          `若仅需旗舰级质量攻坚 2 小时/日，其余时间交由 ${sonnet.name} 执行为快慢流，可再省 ${pct}%`,
        );
      }
    }
    return parts.join('；') + '。';
  }, [compare, modelId, model, total, tokenFee, harnessFee, hours, inTok, outTok, days]);

  const sliders: { label: string; display: string; node: React.ReactNode }[] = [
    {
      label: '每日使用时长',
      display: `${hours} h`,
      node: (
        <Slider
          value={[hours]}
          min={1}
          max={12}
          step={1}
          onValueChange={([v]) => setHours(v)}
          className="[&_[data-slot=slider-range]]:bg-gold [&_[data-slot=slider-thumb]]:border-gold [&_[data-slot=slider-track]]:bg-paper"
        />
      ),
    },
    {
      label: '日均输入',
      display: fmtTok(inTok),
      node: (
        <Slider
          value={[inPos]}
          min={0}
          max={100}
          step={0.5}
          onValueChange={([v]) => setInPos(v)}
          className="[&_[data-slot=slider-range]]:bg-gold [&_[data-slot=slider-thumb]]:border-gold [&_[data-slot=slider-track]]:bg-paper"
        />
      ),
    },
    {
      label: '日均输出',
      display: fmtTok(outTok),
      node: (
        <Slider
          value={[outPos]}
          min={0}
          max={100}
          step={0.5}
          onValueChange={([v]) => setOutPos(v)}
          className="[&_[data-slot=slider-range]]:bg-gold [&_[data-slot=slider-thumb]]:border-gold [&_[data-slot=slider-track]]:bg-paper"
        />
      ),
    },
    {
      label: '每月天数',
      display: `${days} 天`,
      node: (
        <Slider
          value={[days]}
          min={1}
          max={31}
          step={1}
          onValueChange={([v]) => setDays(v)}
          className="[&_[data-slot=slider-range]]:bg-gold [&_[data-slot=slider-thumb]]:border-gold [&_[data-slot=slider-track]]:bg-paper"
        />
      ),
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* 左：输入面板 */}
      <div className="lg:col-span-5">
        <div className="rounded-xl border border-line bg-white p-5 shadow-card">
          <h3 className="font-serif text-base font-semibold text-ink">掐指输入</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-ink-2">角色（模型）</label>
              <Select value={modelId} onValueChange={setModelId}>
                <SelectTrigger className="w-full border-line bg-paper-alt">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      <SystemDot system={m.system} />
                      <span>{m.name}</span>
                      <span className="font-mono text-[11px] text-ink-3">{m.priceLabel}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-ink-2">法宝（Harness）</label>
              <Select value={harnessId} onValueChange={setHarnessId}>
                <SelectTrigger className="w-full border-line bg-paper-alt">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">无（裸装上阵）</SelectItem>
                  {harnesses.map((h) => (
                    <SelectItem key={h.id} value={h.id}>
                      <span>{h.name}</span>
                      <span className="font-mono text-[11px] text-ink-3">{h.priceLabel}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {harness && harness.monthlyUSD > 0 && (
                <p className="mt-1 font-mono text-[11px] text-ink-3">
                  订阅制法宝 · 月费自动计入账单
                </p>
              )}
            </div>
            <div className="space-y-4 pt-1">
              {sliders.map((s) => (
                <div key={s.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs text-ink-2">{s.label}</span>
                    <span className="font-mono text-xs font-bold text-gold">{s.display}</span>
                  </div>
                  {s.node}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 右：结果面板 */}
      <div className="space-y-4 lg:col-span-7">
        {/* 月度账单大卡 */}
        <motion.div layout className="rounded-xl border border-gold/50 bg-white p-5 shadow-card">
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-base font-semibold text-ink">月度账单</h3>
            <span className="font-mono text-[11px] text-ink-3">2026-07 价目</span>
          </div>
          <div className="mt-2 flex items-end gap-3">
            <CountUpText
              value={total}
              format={(n) => fmtCNY(n)}
              className="gold-sheen-text font-mono text-[40px] font-bold leading-none"
            />
            <span className="pb-1 font-mono text-sm text-ink-2">/ 月</span>
          </div>
          <div className="mt-3 space-y-1.5 border-t border-line pt-3 font-mono text-[13px]">
            <div className="flex justify-between">
              <span className="text-ink-2">模型 Token 费</span>
              <span className="text-ink">{fmtCNY(tokenFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-2">法宝订阅</span>
              <span className="text-ink">
                {harness ? `${fmtCNY(harnessFee)}（≈$${harness.monthlyUSD}）` : '¥0（无装备）'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-2">缓存折扣</span>
              <span className="text-ink-3">-¥0（未启用）</span>
            </div>
          </div>
          <p className="mt-3 font-mono text-[11px] text-ink-3">
            ≈ ${Math.round(totalUSD).toLocaleString()} · 按 2026-07 价目 mock
          </p>
        </motion.div>

        {/* 横向对比条 */}
        <motion.div layout className="rounded-xl border border-line bg-white p-5 shadow-card">
          <h3 className="font-serif text-base font-semibold text-ink">同用量 · 换将对比</h3>
          <div className="mt-3 space-y-2.5">
            {compare.map((r, i) => {
              const active = r.id === modelId;
              return (
                <div key={r.id} className="flex items-center gap-3">
                  <div className="flex w-36 shrink-0 items-center gap-1.5">
                    <SystemDot system={r.system} />
                    <span
                      className={cn(
                        'truncate text-xs',
                        active ? 'font-semibold text-gold' : 'text-ink-2',
                      )}
                    >
                      {r.name}
                    </span>
                  </div>
                  <div className="h-4 flex-1 overflow-hidden rounded-full bg-paper">
                    <motion.div
                      key={`${r.id}-${Math.round(r.cny)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(r.cny / maxCompare) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background: active
                          ? 'linear-gradient(135deg,#E9CB72,#B8860B)'
                          : '#2F4858',
                        opacity: active ? 1 : 0.75,
                      }}
                    />
                  </div>
                  <span
                    className={cn(
                      'w-16 shrink-0 text-right font-mono text-xs',
                      active ? 'font-bold text-gold' : 'text-ink-2',
                    )}
                  >
                    {fmtCNY(r.cny)}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 省钱锦囊 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tip}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-gold/40 bg-gold-soft p-4"
          >
            <div className="flex items-start gap-2.5">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <div>
                <div className="text-xs font-semibold tracking-wide text-gold">省钱锦囊</div>
                <p className="mt-1 text-[13px] leading-relaxed text-ink">{tip}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 工具二：灵力模拟器「Token 罗盘」                                    */
/* ------------------------------------------------------------------ */

const PROJECT_SIZES = [
  { id: 'toy', name: '脚本玩具', ctx: 8_000 },
  { id: 'small', name: '小项目 <1万行', ctx: 60_000 },
  { id: 'mid', name: '中型项目 <10万行', ctx: 250_000 },
  { id: 'mono', name: '大型 monorepo ≥40万行', ctx: 800_000 },
];

const TASK_TYPES = [
  { id: 'feature', name: '新功能', outPerRound: 1_200 },
  { id: 'bugfix', name: '修 Bug', outPerRound: 800 },
  { id: 'refactor', name: '重构', outPerRound: 1_500 },
  { id: 'test', name: '写测试', outPerRound: 900 },
  { id: 'docs', name: '文档', outPerRound: 1_100 },
  { id: 'review', name: '代码评审', outPerRound: 700 },
];

const COMPOSITION = [
  { key: 'sys', name: '系统提示', color: '#A39883' },
  { key: 'code', name: '代码上下文', color: '#B8860B' },
  { key: 'hist', name: '历史对话', color: '#C03A28' },
  { key: 'tool', name: '工具返回', color: '#B8860B' },
];

function TokenCompass() {
  const [sizeId, setSizeId] = useState('mono');
  const [taskId, setTaskId] = useState('feature');
  const [modelId, setModelId] = useState('claude-opus-4-7');
  const [rounds, setRounds] = useState(8);

  const size = PROJECT_SIZES.find((s) => s.id === sizeId)!;
  const task = TASK_TYPES.find((t) => t.id === taskId)!;
  const model = modelMap[modelId];

  const parts = useMemo(() => {
    const sys = 4_000;
    const code = size.ctx * (0.6 + rounds * 0.08);
    const hist = rounds * 3_500;
    const tool = rounds * (taskId === 'bugfix' ? 2_600 : 1_600);
    return { sys, code, hist, tool };
  }, [size, rounds, taskId]);

  const inputTotal = parts.sys + parts.code + parts.hist + parts.tool;
  const outputTotal = rounds * task.outPerRound * (0.6 + model.stats.speed / 100);
  const costUSD =
    model.priceIn != null && model.priceOut != null
      ? (inputTotal * model.priceIn + outputTotal * model.priceOut) / 1_000_000
      : 0;
  const costCNY = costUSD * CNY_PER_USD;

  const cards: { label: string; value: number; format: (n: number) => string; color: string }[] = [
    { label: '单次任务输入', value: inputTotal, format: fmtTok, color: 'text-sys-gpt' },
    { label: '单次任务输出', value: outputTotal, format: fmtTok, color: 'text-cinnabar' },
    { label: '预估单任务成本', value: costCNY, format: (n) => fmtCNY(n, 1), color: 'text-gold' },
  ];

  const maxPart = Math.max(parts.sys, parts.code, parts.hist, parts.tool);
  const dominant = COMPOSITION[
    [parts.sys, parts.code, parts.hist, parts.tool].indexOf(maxPart)
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* 左：配置面板 */}
      <div className="lg:col-span-5">
        <div className="rounded-xl border border-line bg-white p-5 shadow-card">
          <h3 className="font-serif text-base font-semibold text-ink">罗盘定位</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-ink-2">项目规模</label>
              <Select value={sizeId} onValueChange={setSizeId}>
                <SelectTrigger className="w-full border-line bg-paper-alt">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_SIZES.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-ink-2">任务类型</label>
              <div className="flex flex-wrap gap-2">
                {TASK_TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTaskId(t.id)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs transition-colors',
                      taskId === t.id
                        ? 'border-cinnabar bg-cinnabar text-white'
                        : 'border-line bg-paper-alt text-ink-2 hover:border-cinnabar/50 hover:text-cinnabar',
                    )}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-ink-2">角色（影响输出效率）</label>
              <Select value={modelId} onValueChange={setModelId}>
                <SelectTrigger className="w-full border-line bg-paper-alt">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      <SystemDot system={m.system} />
                      <span>{m.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="pt-1">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs text-ink-2">轮次预估</span>
                <span className="font-mono text-xs font-bold text-gold">{rounds} 轮</span>
              </div>
              <Slider
                value={[rounds]}
                min={1}
                max={40}
                step={1}
                onValueChange={([v]) => setRounds(v)}
                className="[&_[data-slot=slider-range]]:bg-gold [&_[data-slot=slider-thumb]]:border-gold [&_[data-slot=slider-track]]:bg-paper"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 右：结果面板 */}
      <div className="space-y-4 lg:col-span-7">
        {/* 三枚大数字卡 */}
        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-line bg-white p-4 shadow-card"
            >
              <div className="text-xs text-ink-2">{c.label}</div>
              <CountUpText
                value={c.value}
                format={c.format}
                className={cn('mt-1.5 block font-mono text-[28px] font-bold leading-none', c.color)}
              />
            </motion.div>
          ))}
        </div>

        {/* 消耗构成堆叠条 */}
        <div className="rounded-xl border border-line bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-semibold text-ink">灵力消耗构成</h3>
            <span className="font-mono text-[11px] text-ink-3">输入侧 100%</span>
          </div>
          <div className="mt-4 flex h-7 w-full overflow-hidden rounded-full bg-paper">
            {COMPOSITION.map((c, i) => {
              const v = parts[c.key as keyof typeof parts];
              const pct = (v / inputTotal) * 100;
              return (
                <motion.div
                  key={c.key}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative h-full"
                  style={{ backgroundColor: c.color }}
                >
                  <div className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-white px-2 py-1 font-mono text-[11px] text-ink opacity-0 shadow-card transition-opacity group-hover:opacity-100">
                    {c.name} {fmtTok(v)} · {pct.toFixed(0)}%
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {COMPOSITION.map((c) => {
              const v = parts[c.key as keyof typeof parts];
              return (
                <span key={c.key} className="flex items-center gap-1.5 text-[11px] text-ink-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: c.color }}
                  />
                  {c.name}
                  <span className="font-mono text-ink-3">{((v / inputTotal) * 100).toFixed(0)}%</span>
                </span>
              );
            })}
          </div>
          <p className="mt-4 flex items-start gap-1.5 border-t border-line pt-3 text-xs leading-relaxed text-ink-2">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-3" />
            {sizeId === 'mono'
              ? '大型 monorepo 的代码上下文是大头——这正是 1M 窗口与缓存打折存在的意义。'
              : `此局以「${dominant.name}」耗灵最甚；轮次越多，历史对话的雪球越滚越大。`}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 工具三：配队模拟器「排兵布阵」                                       */
/* ------------------------------------------------------------------ */

type SlotKind = 'main' | 'aux' | 'harness';

/** 器型 × 试炼 匹配表 */
const TYPE_FIT: Record<HarnessType, string[]> = {
  'CLI 工具': ['refactor', 'algo'],
  'IDE 集成': ['frontend', 'fullstack'],
  编辑器插件: ['frontend', 'docs'],
  '自治 Agent': ['agent', 'refactor'],
  网页平台: ['frontend', 'fullstack'],
};

/** 名人堂首选阵容（推荐按钮预设） */
const HALL_PRESETS: Record<
  string,
  { main: string; aux: string | null; harness: string; team: string }
> = {
  frontend: { main: 'gemini-3-pro', aux: 'gemini-3-flash', harness: 'cursor', team: '星河战舰' },
  refactor: { main: 'claude-opus-4-7', aux: 'gpt-5-2', harness: 'claude-code', team: '封神旗舰队' },
  agent: { main: 'claude-sonnet-4-6', aux: 'claude-opus-4-7', harness: 'openhands', team: '机关工坊' },
  algo: { main: 'deepseek-r2', aux: 'deepseek-v4', harness: 'aider', team: '玄冥算圣队' },
  fullstack: { main: 'claude-opus-4-7', aux: 'gpt-5-2', harness: 'claude-code', team: '封神旗舰队' },
  docs: { main: 'gpt-5-2', aux: 'kimi-k3', harness: 'aider', team: '双剑合璧' },
};

/** 单模型在试炼场景的适应性分 */
function modelSceneStat(m: Model, trialId: string): number {
  const s = m.stats;
  switch (trialId) {
    case 'frontend':
      return s.multimodal * 0.5 + s.speed * 0.3 + s.code * 0.2;
    case 'refactor':
      return s.code * 0.5 + s.context * 0.3 + s.reasoning * 0.2;
    case 'agent':
      return s.code * 0.4 + s.reasoning * 0.4 + s.context * 0.2;
    case 'algo':
      return s.reasoning * 0.7 + s.code * 0.3;
    case 'fullstack':
      return s.code * 0.5 + s.speed * 0.2 + s.multimodal * 0.3;
    case 'docs':
      return s.context * 0.5 + s.multimodal * 0.2 + s.code * 0.3;
    default:
      return 70;
  }
}

/** T0 队六维均值（对照虚线 mock） */
const T0_AVG = [93, 91, 87, 85, 92, 82];

function ScoreRing({ score }: { score: number }) {
  const r = 62;
  const c = 2 * Math.PI * r;
  const shown = useCountUp(score, 900);
  return (
    <div className="relative h-[150px] w-[150px]">
      <svg viewBox="0 0 150 150" className="h-full w-full -rotate-90">
        <circle cx="75" cy="75" r={r} fill="none" stroke="#F5F0E6" strokeWidth="10" />
        <motion.circle
          key={score}
          cx="75"
          cy="75"
          r={r}
          fill="none"
          stroke="url(#ringGold)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - score / 100) }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E9CB72" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[34px] font-bold leading-none text-gold">
          {Math.round(shown)}
        </span>
        <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-ink-3">契合度</span>
      </div>
    </div>
  );
}

/** 打字机判词（仅首次完整播放） */
function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState(text);
  const played = useRef(false);
  useEffect(() => {
    if (played.current) {
      setShown(text);
      return;
    }
    played.current = true;
    setShown('');
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [text]);
  return <>{shown}</>;
}

function TeamBuilder({ presetHarness }: { presetHarness?: string }) {
  const [mainId, setMainId] = useState<string | null>('claude-opus-4-7');
  const [auxId, setAuxId] = useState<string | null>(null);
  const [harnessId, setHarnessId] = useState<string | null>(presetHarness ?? 'claude-code');
  const [trialId, setTrialId] = useState('refactor');
  const [picker, setPicker] = useState<SlotKind | null>(null);
  const [sysFilter, setSysFilter] = useState<SystemId | 'all'>('all');

  useEffect(() => {
    if (presetHarness && harnessMap[presetHarness]) setHarnessId(presetHarness);
  }, [presetHarness]);

  const main = mainId ? modelMap[mainId] : null;
  const aux = auxId ? modelMap[auxId] : null;
  const harness = harnessId ? harnessMap[harnessId] : null;
  const trial = trials.find((t) => t.id === trialId)!;

  /* ---------- 契合度演算 ---------- */
  const result = useMemo(() => {
    if (!main || !harness) return null;
    const lines: { label: string; delta: number }[] = [];
    let score = 62;

    // 同宗加成
    if (harness.fitSystemIds === 'all') {
      score += 10;
      lines.push({ label: `万用器缘 +10（${harness.name} 全系通用）`, delta: 10 });
    } else if (harness.fitSystemIds.includes(main.system)) {
      score += 18;
      lines.push({
        label: `同宗加成 +18（${systemMap[main.system].name} × ${harness.name}）`,
        delta: 18,
      });
    } else if (aux && harness.fitSystemIds.includes(aux.system)) {
      score += 8;
      lines.push({
        label: `侧翼结缘 +8（${systemMap[aux.system].name} × ${harness.name}）`,
        delta: 8,
      });
    } else {
      score -= 6;
      lines.push({ label: `器缘平平 -6（本命不合）`, delta: -6 });
    }

    // 器型匹配
    if (TYPE_FIT[harness.type].includes(trialId)) {
      score += 12;
      lines.push({ label: `器型匹配 +12（${harness.type} × ${trial.scene}）`, delta: 12 });
    } else {
      score += 3;
      lines.push({ label: `器型尚堪 +3（${harness.type} 亦可一战）`, delta: 3 });
    }

    // 场景相性
    const sceneStat = modelSceneStat(main, trialId);
    const sceneDelta = Math.max(-10, Math.min(10, Math.round((sceneStat - 72) / 3)));
    score += sceneDelta;
    lines.push({
      label:
        sceneDelta >= 0
          ? `场景相性 +${sceneDelta}（${trial.name}正合其长）`
          : `场景相性 ${sceneDelta}（${trial.name}非其所长）`,
      delta: sceneDelta,
    });

    // 双模型流派加成
    let styleName: string | null = null;
    if (aux) {
      let styleId: TeamStyleId;
      if (harness.type === '自治 Agent') styleId = 'fengqun';
      else if (aux.contextTokens >= 1_000_000 && aux.contextTokens > main.contextTokens)
        styleId = 'jieli';
      else if (aux.composite >= main.composite - 6) styleId = 'fuidu';
      else styleId = 'kuaiman';
      const style = teamStyles.find((s) => s.id === styleId)!;
      styleName = style.name;
      score += style.bonus;
      lines.push({ label: `双器合璧 +${style.bonus}（${style.name}）`, delta: style.bonus });
    }

    score = Math.max(40, Math.min(99, Math.round(score)));

    // 六维雷达
    const harnessScene = TYPE_FIT[harness.type].includes(trialId) ? 90 : 74;
    const styleBonus = styleName ? 4 : 0;
    const radar = trials.map((t, i) => {
      const hv = TYPE_FIT[harness.type].includes(t.id) ? 90 : harnessScene - 6;
      let v =
        modelSceneStat(main, t.id) * 0.68 +
        hv * 0.2 +
        (aux ? modelSceneStat(aux, t.id) * 0.12 : 8) +
        styleBonus;
      v = Math.max(30, Math.min(99, Math.round(v)));
      return { scene: t.scene, score: v, t0: T0_AVG[i] };
    });

    return { score, lines, radar };
  }, [main, aux, harness, trialId, trial]);

  const grade = useMemo(() => {
    if (!result) return null;
    const s = result.score;
    if (s >= 90) return { label: '甲等 · 天作之合', verdict: '此阵浑然天成，可登封神台。' };
    if (s >= 85) return { label: '甲等 · 天作之合', verdict: '此阵浑然天成，可登封神台。' };
    if (s >= 75) return { label: '乙上 · 珠联璧合', verdict: '此阵可用，然短板仍需留神。' };
    if (s >= 60) {
      const weakest = [...result.radar].sort((a, b) => a.score - b.score)[0];
      const trialName = trials.find((t) => t.scene === weakest.scene)?.name ?? weakest.scene;
      return { label: '乙等 · 可用之阵', verdict: `此阵可用，然短板在${trialName}之境。` };
    }
    return { label: '丙等 · 人器相冲', verdict: '人器相冲，道友请三思。' };
  }, [result]);

  const recommend = () => {
    const p = HALL_PRESETS[trialId];
    if (!p) return;
    setMainId(p.main);
    setAuxId(p.aux);
    setHarnessId(p.harness);
    toast('已抄录名人堂阵容', {
      description: `${p.team} · 主C ${modelMap[p.main].name} × ${harnessMap[p.harness].name}`,
    });
  };

  /* ---------- 选人网格 ---------- */
  const pickerModels = models.filter(
    (m) =>
      (sysFilter === 'all' || m.system === sysFilter) &&
      m.id !== mainId &&
      m.id !== auxId,
  );

  const slotCard = (
    kind: SlotKind,
    label: string,
    required: boolean,
    filled: { img: string; name: string } | null,
    onClear?: () => void,
  ) => (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => setPicker(picker === kind ? null : kind)}
        className={cn(
          'relative flex h-24 w-24 flex-col items-center justify-center rounded-xl border-2 transition-all sm:h-28 sm:w-28',
          filled
            ? 'border-line bg-white shadow-card hover:border-gold'
            : 'border-dashed border-line-strong bg-paper-alt hover:border-cinnabar/60',
          picker === kind && 'border-cinnabar',
        )}
      >
        {filled ? (
          <>
            <img src={filled.img} alt={filled.name} className="h-14 w-14 rounded-lg object-cover sm:h-16 sm:w-16" />
            <span className="mt-1 max-w-full truncate px-1 text-[11px] text-ink">{filled.name}</span>
            {onClear && (
              <span
                role="button"
                aria-label="移除"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-white text-ink-3 shadow-sm hover:text-cinnabar"
              >
                <X className="h-3 w-3" />
              </span>
            )}
          </>
        ) : (
          <>
            <Plus className="h-6 w-6 text-cinnabar" />
            <span className="mt-1 text-xs text-ink-2">点将</span>
          </>
        )}
      </button>
      <span className="mt-2 text-xs text-ink-2">
        {label}
        {required && <span className="text-cinnabar"> *</span>}
      </span>
    </div>
  );

  return (
    <div>
      {/* 上：槽位区 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {slotCard(
          'main',
          '主 C',
          true,
          main ? { img: modelAvatar(main), name: main.name } : null,
          main ? () => setMainId(null) : undefined,
        )}
        {slotCard(
          'aux',
          '辅助',
          false,
          aux ? { img: modelAvatar(aux), name: aux.name } : null,
          aux ? () => setAuxId(null) : undefined,
        )}
        {slotCard(
          'harness',
          '法宝',
          true,
          harness ? { img: harness.icon, name: harness.name } : null,
          harness ? () => setHarnessId(null) : undefined,
        )}
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-full flex-col justify-center rounded-xl border-2 border-line bg-white px-3 shadow-card sm:h-28">
            <span className="mb-1 text-[11px] text-ink-3">试炼场景</span>
            <Select value={trialId} onValueChange={setTrialId}>
              <SelectTrigger className="w-full border-line bg-paper-alt text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {trials.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="mt-2 text-xs text-ink-2">
            试炼场景 <span className="text-cinnabar">*</span>
          </span>
        </div>
      </div>

      {/* 选择网格 */}
      <AnimatePresence>
        {picker && (
          <motion.div
            key={picker}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl border border-line bg-white p-4 shadow-card">
              {picker === 'harness' ? (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {harnesses.map((h) => (
                    <motion.button
                      key={h.id}
                      layoutId={`pick-${h.id}`}
                      type="button"
                      onClick={() => {
                        setHarnessId(h.id);
                        setPicker(null);
                      }}
                      className={cn(
                        'flex flex-col items-center rounded-lg border p-3 transition-all hover:-translate-y-0.5 hover:border-gold',
                        harnessId === h.id ? 'border-gold bg-gold-soft' : 'border-line bg-paper-alt',
                      )}
                    >
                      <img src={h.icon} alt={h.name} className="h-10 w-10" />
                      <span className="mt-1.5 text-center text-[11px] leading-tight text-ink">
                        {h.name}
                      </span>
                      <span className="mt-0.5 rounded-full bg-paper px-1.5 py-0.5 text-[10px] text-ink-2">
                        {h.type}
                      </span>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSysFilter('all')}
                      className={cn(
                        'rounded-full border px-2.5 py-1 text-[11px] transition-colors',
                        sysFilter === 'all'
                          ? 'border-cinnabar bg-cinnabar text-white'
                          : 'border-line bg-paper-alt text-ink-2 hover:text-cinnabar',
                      )}
                    >
                      全体系
                    </button>
                    {Object.values(systemMap).map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSysFilter(s.id)}
                        className={cn(
                          'flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] transition-colors',
                          sysFilter === s.id
                            ? 'border-cinnabar bg-cinnabar text-white'
                            : 'border-line bg-paper-alt text-ink-2 hover:text-cinnabar',
                        )}
                      >
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: sysFilter === s.id ? '#fff' : s.color }}
                        />
                        {s.name}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {pickerModels.map((m) => (
                      <motion.button
                        key={m.id}
                        layoutId={`pick-${m.id}`}
                        type="button"
                        onClick={() => {
                          if (picker === 'main') setMainId(m.id);
                          else setAuxId(m.id);
                          setPicker(null);
                        }}
                        className={cn(
                          'flex flex-col items-center rounded-lg border p-3 transition-all hover:-translate-y-0.5 hover:border-gold',
                          mainId === m.id || auxId === m.id
                            ? 'border-gold bg-gold-soft'
                            : 'border-line bg-paper-alt',
                        )}
                      >
                        <img
                          src={modelAvatar(m)}
                          alt={m.name}
                          className="h-11 w-11 rounded-lg object-cover"
                        />
                        <span className="mt-1.5 max-w-full truncate text-[11px] text-ink">
                          {m.name}
                        </span>
                        <span
                          className="mt-0.5 rounded-full px-1.5 py-0.5 text-[10px]"
                          style={{ backgroundColor: `${systemMap[m.system].color}1a`, color: systemMap[m.system].color }}
                        >
                          {systemMap[m.system].name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 下：结果区 */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* 左：契合度评分卡 */}
        <div className="lg:col-span-5">
          <div className="flex h-full flex-col rounded-xl border border-gold/50 bg-white p-5 shadow-card">
            <h3 className="font-serif text-base font-semibold text-ink">契合度评分</h3>
            {result && grade ? (
              <>
                <div className="mt-4 flex items-center gap-5">
                  <ScoreRing score={result.score} />
                  <div>
                    <div className="inline-block rounded-md bg-cinnabar px-3 py-1.5 font-brand text-lg text-white shadow-sm">
                      {grade.label}
                    </div>
                    <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-3">
                      {trial.fullName}
                      <br />
                      基准 62 · 加减分明细如下
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5 border-t border-line pt-3 font-mono text-xs">
                  {result.lines.map((l) => (
                    <div key={l.label} className="flex items-center justify-between gap-2">
                      <span className="text-ink-2">{l.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg border border-line bg-paper-alt p-4">
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] tracking-wide text-ink-3">
                    <Sparkles className="h-3.5 w-3.5 text-gold" />
                    系统判词
                  </div>
                  <p className="font-brand text-lg leading-relaxed text-ink">
                    <Typewriter text={grade.verdict} />
                  </p>
                </div>
                <button
                  type="button"
                  onClick={recommend}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-cinnabar px-4 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:bg-cinnabar-deep active:scale-[0.98]"
                >
                  <Wand2 className="h-4 w-4" />
                  为我推荐此场景配队
                </button>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                <Users className="h-8 w-8 text-ink-3" />
                <p className="mt-3 text-sm text-ink-2">请先点将：主 C 与法宝为必选槽位。</p>
              </div>
            )}
          </div>
        </div>

        {/* 右：六维雷达 */}
        <div className="lg:col-span-7">
          <div className="flex h-full flex-col rounded-xl border border-line bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-semibold text-ink">六试炼适应性雷达</h3>
              <div className="flex items-center gap-3 text-[11px] text-ink-2">
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-3 rounded-sm bg-cinnabar/60" />
                  本阵
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block h-0 w-3 border-t-2 border-dashed border-tech" />
                  T0 均值
                </span>
              </div>
            </div>
            <div className="mt-2 h-[320px] flex-1">
              {result ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={result.radar} outerRadius="72%">
                    <PolarGrid stroke="#E7DFCC" />
                    <PolarAngleAxis
                      dataKey="scene"
                      tick={{ fill: '#6E6455', fontSize: 12, fontFamily: 'Noto Sans SC' }}
                    />
                    <Radar
                      name="T0 均值"
                      dataKey="t0"
                      stroke="#B8860B"
                      strokeDasharray="5 4"
                      fill="none"
                      isAnimationActive={false}
                    />
                    <Radar
                      name="本阵"
                      dataKey="score"
                      stroke="#C03A28"
                      fill="#C03A28"
                      fillOpacity={0.25}
                      animationDuration={700}
                      animationEasing="ease-out"
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-ink-3">
                  点将之后，阵形自现。
                </div>
              )}
            </div>
            {result && (
              <div className="grid grid-cols-3 gap-2 border-t border-line pt-3 sm:grid-cols-6">
                {result.radar.map((r) => (
                  <div key={r.scene} className="text-center">
                    <div className="font-mono text-sm font-bold text-ink">{r.score}</div>
                    <div className="text-[10px] text-ink-3">{r.scene}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 页面：神机百炼 /tools                                               */
/* ------------------------------------------------------------------ */

const TOOL_TABS = [
  { id: 'cost', name: '成本计算器', note: '一月灵石几两', icon: Coins },
  { id: 'token', name: '灵力模拟器', note: '一役耗几多 Token', icon: Flame },
  { id: 'team-builder', name: '配队模拟器', note: '契合度一算便知', icon: Users },
] as const;

type ToolTabId = (typeof TOOL_TABS)[number]['id'];

export default function Tools() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const presetHarness = searchParams.get('harness') ?? undefined;

  const [tab, setTab] = useState<ToolTabId>(() => {
    const h = window.location.hash.replace('#', '');
    return (TOOL_TABS.some((t) => t.id === h) ? h : 'cost') as ToolTabId;
  });

  // 从法宝页跳入时直达配队模拟器
  useEffect(() => {
    if (presetHarness) setTab('team-builder');
  }, [presetHarness]);

  // 响应外部 hash 变化
  useEffect(() => {
    const h = location.hash.replace('#', '');
    if (TOOL_TABS.some((t) => t.id === h) && h !== tab) setTab(h as ToolTabId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  const switchTab = (id: ToolTabId) => {
    setTab(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: '首页', to: '/' }, { label: '小工具' }]}
        title="神机百炼"
        en="// ARCANE TOOLS"
        verdict="掐指一算，灵石几何。工欲善其事，先算其账。"
        badges={['工具 3 件', '纯本地演算', '数据 2026-07 价目']}
      />

      {/* 工具 Tabs（吸顶于导航下） */}
      <div className="sticky top-[60px] z-30 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-4 py-3 md:px-6">
          {TOOL_TABS.map((t) => {
            const active = tab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => switchTab(t.id)}
                className={cn(
                  'relative flex min-w-0 flex-1 items-center gap-3 rounded-lg px-4 py-2.5 text-left transition-colors',
                  !active && 'bg-white hover:bg-gold-soft/60',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="tool-tab-pill"
                    className="absolute inset-0 rounded-lg bg-gold-grad shadow-card"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon
                  className={cn(
                    'relative z-10 h-5 w-5 shrink-0',
                    active ? 'text-white' : 'text-gold',
                  )}
                />
                <span className="relative z-10 min-w-0">
                  <span
                    className={cn(
                      'block truncate font-serif text-sm font-semibold',
                      active ? 'text-white' : 'text-ink',
                    )}
                  >
                    {t.name}
                  </span>
                  <span
                    className={cn(
                      'block truncate text-[11px]',
                      active ? 'text-white/80' : 'text-ink-3',
                    )}
                  >
                    {t.note}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 工具面板 */}
      <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-6">
              <SectionHeader
                title={
                  tab === 'cost'
                    ? '灵石算盘 · 成本计算器'
                    : tab === 'token'
                      ? 'Token 罗盘 · 灵力模拟器'
                      : '排兵布阵 · 配队模拟器'
                }
                en={
                  tab === 'cost'
                    ? '// SPIRIT-STONE ABACUS'
                    : tab === 'token'
                      ? '// TOKEN COMPASS'
                      : '// TEAM FORGE'
                }
              />
            </div>
            {tab === 'cost' && <CostCalculator />}
            {tab === 'token' && <TokenCompass />}
            {tab === 'team-builder' && <TeamBuilder presetHarness={presetHarness} />}
          </motion.div>
        </AnimatePresence>

        {/* 底部说明带 */}
        <Reveal className="mt-12">
          <div className="rounded-xl border border-line bg-paper-alt p-4 text-center text-xs leading-relaxed text-ink-2">
            三个工具皆为纯前端本地演算，不上传任何数据。价格取自站内图鉴的调研快照（2026-08-15），
            契合度与权重系数为站点主观评估——结果仅供量级参考，实际账单请以各官方计价为准。
          </div>
        </Reveal>
      </div>

      <Toaster position="top-center" richColors={false} />
    </div>
  );
}
