import type { Benchmark } from "@/lib/types";

/** 面板数值表：benchmark 名称 + 分数 + 相对条。 */
export default function BenchmarkTable({
  benchmarks,
}: {
  benchmarks?: Benchmark[];
}) {
  if (!benchmarks || benchmarks.length === 0) return null;
  const max = Math.max(...benchmarks.map((b) => b.score), 1);
  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        {benchmarks.map((b) => (
          <tr key={b.name} className="border-b border-ink-700/60 last:border-0">
            <td className="py-2 pr-4 text-zinc-300">{b.name}</td>
            <td className="w-40 py-2">
              <div className="h-1.5 w-full rounded bg-ink-700">
                <div
                  className="h-1.5 rounded bg-gold-500/80"
                  style={{ width: `${Math.max((b.score / max) * 100, 3)}%` }}
                />
              </div>
            </td>
            <td className="py-2 pl-4 text-right font-mono text-gold-300">
              {b.score}
              {b.unit ?? ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
